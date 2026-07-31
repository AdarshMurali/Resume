import { lazy, Suspense } from "react";
import { ThemeProvider } from "@/components/common/ThemeProvider";
import { ThemeToggle } from "@/components/common/ThemeToggle";
import { SiteNav } from "@/components/common/SiteNav";
import { CommandPalette } from "@/components/common/CommandPalette";
import { ChatLauncher } from "@/components/chat/ChatLauncher";
import { Hero } from "@/components/sections/Hero";

// Framer Motion (About..Certifications + the footer both use it via Reveal)
// is kept off the initial bundle — see BelowFoldSections.tsx / LazyFooter.tsx
// for why. This is the single biggest lever on the hero's LCP.
const BelowFoldSections = lazy(() => import("@/components/BelowFoldSections"));
const LazyFooter = lazy(() => import("@/components/LazyFooter"));

function App() {
  return (
    <ThemeProvider>
      <a
        href="#hero"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-primary focus:px-3 focus:py-2 focus:text-primary-foreground"
      >
        Skip to content
      </a>
      <header className="sticky top-0 z-40 flex items-center justify-between border-b border-border bg-background/80 px-6 py-3 backdrop-blur">
        <SiteNav />
        <div className="flex items-center gap-3">
          <CommandPalette />
          <ThemeToggle />
        </div>
      </header>
      <main>
        <Hero />
        <Suspense fallback={null}>
          <BelowFoldSections />
        </Suspense>
      </main>
      <Suspense fallback={null}>
        <LazyFooter />
      </Suspense>
      <ChatLauncher />
    </ThemeProvider>
  );
}

export default App;
