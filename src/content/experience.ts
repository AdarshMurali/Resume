import type { Experience } from "./types";

/**
 * experience.ts — roles in reverse-chronological order (newest first).
 * One entry per role. Cover: Finance, Energy, Background Verification,
 * Investment Banking. Fill from your résumé PDF. See docs/CONTENT.md §3 for
 * how to write good highlight bullets (action → measurable impact → tech).
 */
export const experience: Experience[] = [
  {
    company: "TODO(content): company", // Investment Banking (current)
    role: "TODO(content): title",
    domain: "Investment Banking",
    start: "YYYY-MM",
    end: "Present",
    location: "",
    summary: "TODO(content): one-line context about the mandate/team.",
    highlights: [
      "TODO(content): achievement — what you did, the impact, and the tech.",
      "TODO(content): achievement bullet 2.",
    ],
    tech: ["TODO", "SQL", "Python"], // TODO(content): real tech chips
  },
  {
    company: "TODO(content): company", // Background Verification
    role: "TODO(content): title",
    domain: "Background Verification",
    start: "YYYY-MM",
    end: "YYYY-MM",
    location: "",
    highlights: [
      "TODO(content): achievement bullet.",
      "TODO(content): achievement bullet.",
    ],
    tech: ["ETL", "SQL", "Tableau"],
  },
  {
    company: "TODO(content): company", // Energy
    role: "TODO(content): title",
    domain: "Energy",
    start: "YYYY-MM",
    end: "YYYY-MM",
    location: "",
    highlights: [
      "TODO(content): achievement bullet.",
      "TODO(content): achievement bullet.",
    ],
    tech: ["ETL", "SQL", "BI"],
  },
  {
    company: "TODO(content): company", // Finance
    role: "TODO(content): title",
    domain: "Finance",
    start: "YYYY-MM",
    end: "YYYY-MM",
    location: "",
    highlights: [
      "TODO(content): achievement bullet.",
      "TODO(content): achievement bullet.",
    ],
    tech: ["ETL", "SQL"],
  },
];
