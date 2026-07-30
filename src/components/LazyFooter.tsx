/**
 * LazyFooter.tsx — the <footer> (Contact section) needs its own lazy
 * boundary separate from BelowFoldSections because it must render as a
 * sibling of <main>, not a descendant (footer only gets the `contentinfo`
 * landmark role when it isn't nested inside main/article/aside/nav/section —
 * see docs/DESIGN.md §9). Rollup dedupes the shared motion/react chunk
 * between this and BelowFoldSections, so it's fetched once either way.
 */
import { MotionConfig } from "motion/react";
import { Contact } from "@/components/sections/Contact";

export default function LazyFooter() {
  return (
    <MotionConfig reducedMotion="user">
      <Contact />
    </MotionConfig>
  );
}
