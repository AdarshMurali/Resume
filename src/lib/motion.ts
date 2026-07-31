import type { Variants } from "motion/react";

/**
 * Shared motion presets — see docs/DESIGN.md §5.
 * Reduced motion is handled globally via <MotionConfig reducedMotion="user">
 * in App.tsx, not per-variant, so these don't need their own guards.
 */
export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

export const staggerChildren: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};
