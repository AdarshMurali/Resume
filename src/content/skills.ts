import type { SkillCluster } from "./types";

/**
 * skills.ts — grouped skills with real proficiency tiers.
 * Levels and years-of-experience notes sourced from the underlying Tableau
 * data source (Tools.csv skill-level chart + Tools_Used_Daily.xlsx usage
 * split). See docs/PROGRESS_LOG.md 2026-07-30 for provenance.
 */
export const skills: SkillCluster[] = [
  {
    category: "BI & Visualization",
    skills: [
      { name: "Tableau", level: 4, note: "8+ certs; ~4 yrs as primary BI tool" },
      { name: "Microsoft BI (SSIS/SSRS)", level: 4, note: "~6 yrs" },
      { name: "Dashboard design", level: 4 },
    ],
  },
  {
    category: "Databases",
    skills: [
      { name: "SQL Server", level: 4, note: "~8 yrs" },
      { name: "AWS Redshift", level: 3, note: "real-time reporting at Accurate Background" },
      { name: "MongoDB", level: 3 },
    ],
  },
  {
    category: "Data & ETL",
    skills: [
      { name: "Informatica", level: 3, note: "~2 yrs" },
      { name: "Apache Spark", level: 3, note: "streaming & big data, ~1 yr" },
      { name: "Hadoop", level: 2, note: "batch storage for audit/reporting" },
      { name: "SSIS", level: 4 },
    ],
  },
  {
    category: "Python & Engineering",
    skills: [
      { name: "Python", level: 3, note: "~2.5 yrs — pandas, Flask, NumPy, unit testing" },
      { name: "GitHub Copilot", level: 3, note: "~2 yrs, daily driver" },
    ],
  },
  {
    category: "AI / ML",
    skills: [
      {
        name: "Applied AI / agentic tooling",
        level: 3,
        note: "hands-on via FinSight AI — GPT-4o function calling, RAG (ChromaDB)",
      },
    ],
  },
  {
    category: "Cloud & DevOps",
    skills: [
      { name: "AWS", level: 3, note: "~1 yr — Redshift, DMS" },
      { name: "Azure", level: 2, note: "~0.5 yr — DevOps Hackathon 2023" },
      { name: "Google Cloud", level: 2, note: "~0.5 yr — Vertex AI Hackathon 2024" },
      { name: "Docker", level: 2, note: "~0.5 yr" },
    ],
  },
  {
    category: "Ways of Working",
    skills: [
      { name: "Agile delivery", level: 4, note: "Encora Labs & Wells Fargo were Agile; Accenture roles were not" },
      { name: "Stakeholder collaboration", level: 4 },
    ],
  },
];
