import type { ReactNode } from "react";
import { motion } from "motion/react";
import { fadeInUp, staggerChildren } from "@/lib/motion";

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Stagger direct children in (each must be a motion element using `fadeInUp`). */
  stagger?: boolean;
}

/** Fades + rises an element in once it scrolls into view. See docs/DESIGN.md §5. */
export function Reveal({ children, className, stagger = false }: RevealProps) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      variants={stagger ? staggerChildren : fadeInUp}
    >
      {children}
    </motion.div>
  );
}
