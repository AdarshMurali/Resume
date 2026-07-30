/**
 * llm.ts — the ONLY file that talks to an LLM provider.
 *
 * Per CLAUDE.md §3 and ARCHITECTURE.md ADR-004, the provider is swappable:
 * everything else (api/chat.ts, the ChatWidget UI) depends only on
 * `ChatTurn` and `streamAssistantReply` below. Changing providers means
 * rewriting this one file.
 *
 * Current provider: OpenAI `gpt-4o-mini` (cheap, fast, plenty for grounded
 * fact-retrieval on a public endpoint — see ARCHITECTURE.md ADR-004).
 */
import OpenAI from "openai";

export interface ChatTurn {
  role: "user" | "assistant";
  content: string;
}

const MODEL = process.env.OPENAI_MODEL || "gpt-4o-mini";
const MAX_OUTPUT_TOKENS = 500;

let cachedClient: OpenAI | null = null;

function getClient(): OpenAI {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error("OPENAI_API_KEY is not set");
  }
  if (!cachedClient) {
    cachedClient = new OpenAI({ apiKey });
  }
  return cachedClient;
}

/**
 * Streams the assistant's reply as raw text chunks (no SSE envelope — the
 * client reads the response body directly). Throws on provider/network
 * errors; the caller (api/chat.ts) is responsible for the friendly fallback.
 */
export async function streamAssistantReply(
  systemPrompt: string,
  turns: ChatTurn[],
): Promise<ReadableStream<Uint8Array>> {
  const client = getClient();

  const completion = await client.chat.completions.create({
    model: MODEL,
    max_tokens: MAX_OUTPUT_TOKENS,
    temperature: 0.4,
    stream: true,
    messages: [{ role: "system", content: systemPrompt }, ...turns],
  });

  const encoder = new TextEncoder();
  return new ReadableStream<Uint8Array>({
    async start(controller) {
      try {
        for await (const chunk of completion) {
          const delta = chunk.choices[0]?.delta?.content;
          if (delta) controller.enqueue(encoder.encode(delta));
        }
        controller.close();
      } catch (err) {
        controller.error(err);
      }
    },
  });
}
