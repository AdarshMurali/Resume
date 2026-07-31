import type { SkillLevel } from "@/content";

const MAX_LEVEL = 5;
const LEVEL_LABEL: Record<SkillLevel, string> = {
  1: "Familiar",
  1.5: "Familiar–Intermediate",
  2: "Intermediate",
  2.5: "Intermediate–Proficient",
  3: "Proficient",
  3.5: "Proficient–Advanced",
  4: "Advanced",
  4.5: "Advanced–Expert",
  5: "Expert",
};

interface SkillMeterProps {
  level: SkillLevel;
}

/** Dot-tier proficiency indicator; half-steps render a half-filled dot. See docs/DESIGN.md §6. */
export function SkillMeter({ level }: SkillMeterProps) {
  return (
    <div
      className="flex items-center gap-1"
      role="img"
      aria-label={`${LEVEL_LABEL[level]} (${level} of ${MAX_LEVEL})`}
    >
      {Array.from({ length: MAX_LEVEL }, (_, i) => {
        const fill = Math.min(Math.max(level - i, 0), 1);
        return (
          <span key={i} aria-hidden="true" className="h-1.5 w-4 overflow-hidden rounded-full bg-muted">
            <span className="block h-full bg-primary" style={{ width: `${fill * 100}%` }} />
          </span>
        );
      })}
    </div>
  );
}
