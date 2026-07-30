import { useEffect, useRef, useState } from "react";
import { Download, Mail, ArrowRight, Sparkles } from "lucide-react";
import { content } from "@/content";
import { SECTION_LINKS } from "@/lib/nav";
import { requestOpenChat } from "@/lib/chatBus";
import { GitHubIcon, LinkedInIcon } from "@/components/common/BrandIcons";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const { links, profile } = content;
  // CommandDialog's trigger isn't a Radix <DialogTrigger> (it's also opened
  // via the global ⌘K shortcut, which can fire from anywhere on the page),
  // so Radix has no trigger element to auto-restore focus to on close. Track
  // it ourselves. requestAnimationFrame runs after Radix's own close-focus
  // handling, so ours wins instead of losing a race to it.
  const previouslyFocused = useRef<HTMLElement | null>(null);

  function handleOpenChange(next: boolean) {
    if (next) {
      previouslyFocused.current = document.activeElement as HTMLElement | null;
    }
    setOpen(next);
    if (!next) {
      requestAnimationFrame(() => previouslyFocused.current?.focus());
    }
  }

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        handleOpenChange(!open);
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  function go(href: string, external = false) {
    handleOpenChange(false);
    if (external) {
      window.open(href, "_blank", "noreferrer");
      return;
    }
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <>
      <button
        type="button"
        onClick={() => handleOpenChange(true)}
        className="hidden items-center gap-1.5 rounded-md border border-border px-2.5 py-1.5 text-xs text-muted-foreground hover:text-foreground sm:inline-flex"
      >
        Jump to…
        <kbd className="rounded border border-border bg-muted px-1.5 py-0.5 font-mono text-[0.7rem]">
          ⌘K
        </kbd>
      </button>

      <CommandDialog open={open} onOpenChange={handleOpenChange}>
        <Command>
          <CommandInput placeholder="Jump to a section or link…" />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Sections">
              {SECTION_LINKS.map((item) => (
                <CommandItem key={item.href} onSelect={() => go(item.href)}>
                  <ArrowRight aria-hidden="true" />
                  {item.label}
                </CommandItem>
              ))}
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading="Assistant">
              <CommandItem
                onSelect={() => {
                  setOpen(false);
                  requestOpenChat();
                }}
              >
                <Sparkles aria-hidden="true" className="size-4" />
                Ask my AI
              </CommandItem>
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading="Links">
              <CommandItem onSelect={() => go(profile.resumePdfUrl, true)}>
                <Download aria-hidden="true" />
                Download résumé
              </CommandItem>
              <CommandItem onSelect={() => go(links.github, true)}>
                <GitHubIcon aria-hidden="true" className="size-4" />
                GitHub
                <CommandShortcut>github.com</CommandShortcut>
              </CommandItem>
              <CommandItem onSelect={() => go(links.linkedin, true)}>
                <LinkedInIcon aria-hidden="true" className="size-4" />
                LinkedIn
              </CommandItem>
              <CommandItem onSelect={() => go(links.tableauPublic, true)}>
                <ArrowRight aria-hidden="true" />
                Tableau Public
              </CommandItem>
              <CommandItem onSelect={() => go(`mailto:${links.email}`, true)}>
                <Mail aria-hidden="true" />
                Email
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </CommandDialog>
    </>
  );
}
