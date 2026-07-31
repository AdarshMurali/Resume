/**
 * BelowFoldSections.tsx — everything in <main> after the hero, lazy-loaded
 * from App.tsx. Framer Motion (via MotionConfig + Reveal) only needs to be
 * on the critical path for content that's actually below the fold; keeping
 * it out of the initial bundle lets the hero (the page's LCP element) paint
 * without waiting on it. See docs/PROGRESS_LOG.md Phase 6 for the trace that
 * found this.
 */
import { MotionConfig } from "motion/react";
import { About } from "@/components/sections/About";
import { Experience } from "@/components/sections/Experience";
import { Skills } from "@/components/sections/Skills";
import { Projects } from "@/components/sections/Projects";
import { Certifications } from "@/components/sections/Certifications";

export default function BelowFoldSections() {
  return (
    <MotionConfig reducedMotion="user">
      <About />
      <Experience />
      <Skills />
      <Projects />
      <Certifications />
    </MotionConfig>
  );
}
