import type { Profile } from "./types";

/**
 * profile.ts — top-level identity, summary, and headline stats.
 * Sourced from RESUME.txt, TimeLine.xlsx, and the Tableau Public visual resume
 * (see docs/PROGRESS_LOG.md 2026-07-30 for provenance).
 */
export const profile: Profile = {
  name: "Adarsh Murali",
  headline: "Data Engineer, Capital Markets · Python · Big Data · Applied AI",
  valueProp:
    "I build ETL pipelines, Python-driven data engineering and API " +
    "development, and BI systems that keep regulatory reporting honest " +
    "in investment banking — paired with big data tooling like Spark and " +
    "agentic AI for financial analysis.",
  location: "",
  summary:
    "I'm a data engineer with 15+ years of experience across investment " +
    "banking, energy, and background verification. At Wells Fargo's Capital " +
    "Markets Division, I build ETL pipelines and BI systems supporting " +
    "Dodd-Frank Act compliance and Section 165(d) living-will regulatory " +
    "reporting. I'm increasingly applying Python and agentic AI to extend " +
    "that same rigor into financial analytics tooling.",
  domains: ["Finance", "Energy", "Background Verification", "Investment Banking"],
  avatarUrl: "/avatar.jpg",
  resumePdfUrl: "/resume.pdf",
  stats: [
    { label: "Total experience", value: "15+ yrs" },
    { label: "Industry domains", value: "4" },
    { label: "Certifications", value: "8" },
    { label: "Core tools", value: "ETL · SQL · Tableau · Python" },
  ],
};
