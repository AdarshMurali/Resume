import { cn } from "@/lib/utils";
import type { ChatMessage as ChatMessageData } from "@/hooks/useChat";

interface ChatMessageProps {
  message: ChatMessageData;
  pending?: boolean;
}

export function ChatMessage({ message, pending }: ChatMessageProps) {
  const isUser = message.role === "user";

  return (
    <div className={cn("flex", isUser ? "justify-end" : "justify-start")}>
      <div
        className={cn(
          "max-w-[85%] rounded-lg px-3 py-2 text-sm whitespace-pre-wrap",
          isUser ? "bg-primary text-primary-foreground" : "bg-muted text-foreground",
        )}
      >
        {pending ? (
          <span className="inline-flex items-center gap-1" aria-hidden="true">
            <span className="size-1.5 animate-bounce rounded-full bg-current [animation-delay:-0.3s]" />
            <span className="size-1.5 animate-bounce rounded-full bg-current [animation-delay:-0.15s]" />
            <span className="size-1.5 animate-bounce rounded-full bg-current" />
          </span>
        ) : (
          message.content
        )}
      </div>
    </div>
  );
}
