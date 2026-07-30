import { MotionConfig } from "motion/react";
import { ThemeProvider } from "@/components/common/ThemeProvider";
import { ThemeToggle } from "@/components/common/ThemeToggle";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Experience } from "@/components/sections/Experience";
import { Skills } from "@/components/sections/Skills";
import { Projects } from "@/components/sections/Projects";
import { Certifications } from "@/components/sections/Certifications";
import { Contact } from "@/components/sections/Contact";

function App() {
  return (
    <MotionConfig reducedMotion="user">
      <ThemeProvider>
        <a
          href="#hero"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-primary focus:px-3 focus:py-2 focus:text-primary-foreground"
        >
          Skip to content
        </a>
        <header className="sticky top-0 z-40 flex items-center justify-end border-b border-border bg-background/80 px-6 py-3 backdrop-blur">
          <ThemeToggle />
        </header>
        <main>
          <Hero />
          <About />
          <Experience />
          <Skills />
          <Projects />
          <Certifications />
        </main>
        <Contact />
      </ThemeProvider>
    </MotionConfig>
  );
}

export default App;
