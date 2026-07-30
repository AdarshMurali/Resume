import { useState } from "react";
import { Menu, X } from "lucide-react";
import { content } from "@/content";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#certifications", label: "Certifications" },
  { href: "#contact", label: "Contact" },
];

export function SiteNav() {
  const [open, setOpen] = useState(false);
  const firstName = content.profile.name.split(" ")[0];

  return (
    <div className="relative flex items-center gap-6">
      <a href="#hero" className="font-semibold" onClick={() => setOpen(false)}>
        {firstName}
      </a>

      <nav className="hidden sm:flex items-center gap-6">
        {NAV_ITEMS.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className="text-sm font-medium text-muted-foreground hover:text-foreground"
          >
            {item.label}
          </a>
        ))}
      </nav>

      <button
        type="button"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="inline-flex size-8 items-center justify-center rounded-md text-muted-foreground hover:text-foreground sm:hidden"
      >
        {open ? <X className="size-5" /> : <Menu className="size-5" />}
      </button>

      {open && (
        <nav
          className={cn(
            "absolute top-full left-0 mt-2 flex w-48 flex-col gap-1 rounded-lg border border-border bg-card p-2 shadow-md sm:hidden",
          )}
        >
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
            >
              {item.label}
            </a>
          ))}
        </nav>
      )}
    </div>
  );
}
