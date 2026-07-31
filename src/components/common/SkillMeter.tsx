import type { SkillLevel } from "@/content";
import { cn } from "@/lib/utils";

const MAX_LEVEL = 5;
const LEVEL_LABEL: Record<SkillLevel, string> = {
  1: "Familiar",
  2: "Intermediate",
  3: "Proficient",
  4: "Advanced",
  5: "Expert",
};

interface SkillMeterProps {
  level: SkillLevel;
}

/** Dot-tier proficiency indicator. See docs/DESIGN.md §6 (avoid a meaningless logo wall). */
export function SkillMeter({ level }: SkillMeterProps) {
  return (
    <div
      className="flex items-center gap-1"
      role="img"
      aria-label={`${LEVEL_LABEL[level]} (${level} of ${MAX_LEVEL})`}
    >
      {Array.from({ length: MAX_LEVEL }, (_, i) => (
        <span
          key={i}
          aria-hidden="true"
          className={cn("h-1.5 w-4 rounded-full", i < level ? "bg-primary" : "bg-muted")}
        />
      ))}
    </div>
  );
}
