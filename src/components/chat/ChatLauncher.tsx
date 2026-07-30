import { lazy, Suspense, useEffect, useState } from "react";
import { Sparkles } from "lucide-react";
import { onOpenChatRequest } from "@/lib/chatBus";

// Code-split: the panel (streaming logic, message list, sheet primitives)
// only downloads once the visitor actually opens the chat.
const ChatPanel = lazy(() => import("./ChatPanel").then((m) => ({ default: m.ChatPanel })));

export function ChatLauncher() {
  const [open, setOpen] = useState(false);
  const [everOpened, setEverOpened] = useState(false);

  useEffect(() => onOpenChatRequest(() => handleOpenChange(true)), []);

  function handleOpenChange(next: boolean) {
    if (next) setEverOpened(true);
    setOpen(next);
  }

  return (
    <>
      <button
        type="button"
        onClick={() => handleOpenChange(true)}
        aria-label="Ask my AI assistant about Adarsh's experience"
        className="fixed bottom-5 right-5 z-40 inline-flex items-center gap-2 rounded-full bg-primary px-4 py-3 text-sm font-medium text-primary-foreground shadow-lg transition-transform hover:scale-105"
      >
        <Sparkles aria-hidden="true" className="size-4" />
        <span className="hidden sm:inline">Ask my AI</span>
      </button>

      {everOpened && (
        <Suspense fallback={null}>
          <ChatPanel open={open} onOpenChange={handleOpenChange} />
        </Suspense>
      )}
    </>
  );
}
