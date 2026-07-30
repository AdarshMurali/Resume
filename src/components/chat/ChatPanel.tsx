import { useEffect, useRef, useState, type FormEvent, type KeyboardEvent } from "react";
import { Send, RotateCcw, Sparkles } from "lucide-react";
import { content } from "@/content";
import { useChat } from "@/hooks/useChat";
import { ChatMessage } from "./ChatMessage";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from "@/components/ui/sheet";

const SUGGESTED_PROMPTS = [
  "Summarize Adarsh's experience",
  "What has he done in investment banking?",
  "How strong is his ETL / Python?",
  "Which certifications does he hold?",
  "How do I contact him?",
];

interface ChatPanelProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ChatPanel({ open, onOpenChange }: ChatPanelProps) {
  const { messages, sendMessage, isStreaming, error, reset } = useChat();
  const [input, setInput] = useState("");
  const listRef = useRef<HTMLDivElement>(null);
  const firstName = content.profile.name.split(" ")[0];

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  function submit() {
    if (!input.trim() || isStreaming) return;
    void sendMessage(input);
    setInput("");
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    submit();
  }

  function handleKeyDown(e: KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      submit();
    }
  }

  function handlePrompt(prompt: string) {
    if (isStreaming) return;
    void sendMessage(prompt);
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="flex flex-col gap-0 p-0 !w-full sm:!max-w-md">
        <SheetHeader className="border-b border-border">
          <SheetTitle className="flex items-center gap-2">
            <Sparkles aria-hidden="true" className="size-4 text-brand" />
            Ask my AI
          </SheetTitle>
          <SheetDescription>
            AI assistant answering as {firstName} · answers may be imperfect
          </SheetDescription>
        </SheetHeader>

        <div ref={listRef} role="log" aria-live="polite" className="flex-1 space-y-3 overflow-y-auto px-4 py-3">
          {messages.length === 0 && (
            <div className="flex flex-col gap-3">
              <p className="text-sm text-muted-foreground">
                Ask me anything about {firstName}&rsquo;s experience, skills, or projects.
              </p>
              <div className="flex flex-wrap gap-2">
                {SUGGESTED_PROMPTS.map((prompt) => (
                  <button
                    key={prompt}
                    type="button"
                    onClick={() => handlePrompt(prompt)}
                    className="rounded-full border border-border px-3 py-1.5 text-left text-xs font-medium text-muted-foreground hover:border-brand/40 hover:text-foreground"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.map((message, i) => (
            <ChatMessage
              key={i}
              message={message}
              pending={
                isStreaming &&
                i === messages.length - 1 &&
                message.role === "assistant" &&
                message.content === ""
              }
            />
          ))}

          {error && (
            <div className="rounded-lg border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">
              <p>{error}</p>
              <div className="mt-2 flex flex-wrap gap-3">
                <a href={`mailto:${content.links.email}`} className="font-medium underline">
                  Email {firstName}
                </a>
                <a href={content.links.linkedin} target="_blank" rel="noreferrer" className="font-medium underline">
                  LinkedIn
                </a>
              </div>
            </div>
          )}
        </div>

        <SheetFooter className="gap-3 border-t border-border">
          <form onSubmit={handleSubmit} className="flex items-end gap-2">
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask a question…"
              rows={1}
              maxLength={1000}
              className="min-h-9 flex-1 resize-none"
              aria-label="Message"
            />
            <Button type="submit" size="icon" disabled={isStreaming || !input.trim()} aria-label="Send">
              <Send aria-hidden="true" />
            </Button>
          </form>
          <button
            type="button"
            onClick={reset}
            disabled={messages.length === 0}
            className="inline-flex w-fit items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground disabled:opacity-50"
          >
            <RotateCcw aria-hidden="true" className="size-3.5" />
            Reset conversation
          </button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
