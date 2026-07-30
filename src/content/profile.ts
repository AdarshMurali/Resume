import type { Profile } from "./types";

/**
 * profile.ts — top-level identity, summary, and headline stats.
 * Replace the TODO(content) values with real ones. See docs/CONTENT.md.
 */
export const profile: Profile = {
  name: "Adarsh", // TODO(content): full name as you want it displayed
  headline: "Data & BI Engineer · ETL · Python · AI", // TODO(content): refine
  valueProp:
    // TODO(content): one strong sentence — who you help and how.
    "I build data pipelines, BI dashboards, and AI-assisted tooling that turn " +
    "messy operational data into decisions — across finance, energy, background " +
    "verification, and investment banking.",
  location: "", // TODO(content): city/region, or leave "" to hide
  summary:
    // TODO(content): 2–3 sentences, first person.
    "Software engineer specializing in data engineering and business " +
    "intelligence. I've delivered ETL pipelines, databases, and Tableau/BI " +
    "solutions across multiple regulated industries, and I'm increasingly " +
    "applying Python and AI/ML to automate and augment analytics work.",
  domains: [
    "Finance",
    "Energy",
    "Background Verification",
    "Investment Banking",
  ],
  // avatarUrl: "/avatar.jpg", // TODO(content): optional headshot in /public
  resumePdfUrl: "/resume.pdf", // TODO(content): drop your PDF at public/resume.pdf
  stats: [
    // TODO(content): make these real; keep to 3–4 punchy numbers.
    { label: "Years of experience", value: "X+" },
    { label: "Industry domains", value: "4" },
    { label: "Core tools", value: "ETL · SQL · Tableau · Python" },
    { label: "Certifications", value: "X" },
  ],
};
