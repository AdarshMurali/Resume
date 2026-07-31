/**
 * chatBus.ts — tiny window-event bridge so SiteNav / CommandPalette can open
 * the chat widget without threading React context through the whole tree.
 * Mirrors the existing pattern in this codebase of talking to the DOM
 * directly for simple cross-component signals (see CommandPalette's
 * document.querySelector scroll-into-view).
 */
const OPEN_EVENT = "resume:open-chat";

export function requestOpenChat(): void {
  window.dispatchEvent(new Event(OPEN_EVENT));
}

export function onOpenChatRequest(handler: () => void): () => void {
  window.addEventListener(OPEN_EVENT, handler);
  return () => window.removeEventListener(OPEN_EVENT, handler);
}
