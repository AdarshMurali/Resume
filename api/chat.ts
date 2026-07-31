/**
 * /api/chat — Vercel Edge Function. Streams a grounded reply from the résumé
 * chatbot. Contract and safety rules: docs/CHATBOT.md §3.
 *
 * Edge runtime (not Node) so the response body can be a plain ReadableStream
 * without manual res.write()/flush plumbing.
 */
import { streamAssistantReply, type ChatTurn } from "./_lib/llm";
import { isRateLimited } from "./_lib/rateLimit";
import { SYSTEM_PROMPT } from "./_lib/systemPrompt";

export const config = { runtime: "edge" };

const MAX_TURNS = 20;
const MAX_MESSAGE_LENGTH = 1000;

function jsonError(message: string, status: number): Response {
  return new Response(JSON.stringify({ error: message }), {
    status,
    headers: { "content-type": "application/json" },
  });
}

function isValidTurn(turn: unknown): turn is ChatTurn {
  if (typeof turn !== "object" || turn === null) return false;
  const { role, content } = turn as Record<string, unknown>;
  if (role !== "user" && role !== "assistant") return false;
  if (typeof content !== "string") return false;
  if (content.length === 0 || content.length > MAX_MESSAGE_LENGTH) return false;
  return true;
}

export default async function handler(req: Request): Promise<Response> {
  if (req.method !== "POST") {
    return jsonError("Method not allowed.", 405);
  }

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (isRateLimited(ip)) {
    return jsonError("Too many messages — please wait a moment and try again.", 429);
  }

  let body: { messages?: unknown };
  try {
    body = await req.json();
  } catch {
    return jsonError("Invalid request body.", 400);
  }

  const messages = body.messages;
  if (!Array.isArray(messages) || messages.length === 0) {
    return jsonError("No message provided.", 400);
  }
  if (messages.length > MAX_TURNS) {
    return jsonError("This conversation has gotten long — please start a new chat.", 400);
  }
  if (!messages.every(isValidTurn)) {
    return jsonError(
      `Each message must have a role of "user" or "assistant" and be 1-${MAX_MESSAGE_LENGTH} characters.`,
      400,
    );
  }

  try {
    const stream = await streamAssistantReply(SYSTEM_PROMPT, messages as ChatTurn[]);
    return new Response(stream, {
      headers: {
        "content-type": "text/plain; charset=utf-8",
        "cache-control": "no-store",
      },
    });
  } catch (err) {
    console.error("[api/chat] LLM error:", err);
    return jsonError(
      "I'm having trouble responding right now — please try again in a moment, or reach out directly via the contact links on the site.",
      502,
    );
  }
}
