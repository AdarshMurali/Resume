import type { SkillCluster } from "./types";

/**
 * skills.ts — grouped skills with real proficiency tiers.
 * Levels and years-of-experience notes sourced from the underlying Tableau
 * data source (Tools.csv skill-level chart + Tools_Used_Daily.xlsx usage
 * split). See docs/PROGRESS_LOG.md 2026-07-30 for provenance.
 *
 * Within each cluster, keep `skills` sorted by `level` descending.
 */
export const skills: SkillCluster[] = [
  {
    category: "BI & Visualization",
    skills: [
      { name: "Tableau", level: 4, note: "6+ years" },
      { name: "Microsoft BI (SSIS/SSRS)", level: 4, note: "~6 yrs" },
      { name: "Dashboard design", level: 4 },
    ],
  },
  {
    category: "Databases",
    skills: [
      { name: "SQL Server", level: 4, note: "~8 yrs" },
      { name: "AWS Redshift", level: 3, note: "real-time reporting at Accurate Background" },
      { name: "NetApp S3", level: 1 },
    ],
  },
  {
    category: "Data & ETL",
    skills: [
      { name: "SSIS", level: 4 },
      { name: "Informatica", level: 3, note: "~2 yrs" },
      { name: "Apache Spark", level: 3, note: "streaming & big data, ~1 yr" },
    ],
  },
  {
    category: "Streaming",
    skills: [
      { name: "Apache Flink", level: 3, note: "FinSight AI real-time analytics" },
      { name: "Spark Streaming", level: 3 },
      { name: "Apache Kafka", level: 1, note: "streaming integration for FinSight AI and MarginMaestro" },
    ],
  },
  {
    category: "Python & Engineering",
    skills: [
      { name: "Python", level: 3, note: "~4 yrs — data engineering & API development (pandas, Flask, FastAPI, NumPy), unit testing" },
    ],
  },
  {
    category: "Agentic AI",
    skills: [
      {
        name: "Applied AI / agentic tooling",
        level: 3,
        note: "hands-on via FinSight AI — GPT-4o function calling, RAG (ChromaDB)",
      },
      { name: "GitHub Copilot", level: 3, note: "~2 yrs, daily driver" },
      { name: "Claude Code", level: 2, note: "Daily driver — used to build this site" },
      { name: "Cursor", level: 2 },
    ],
  },
  {
    category: "Cloud",
    skills: [
      { name: "AWS", level: 3, note: "~2 yrs — IDBI Hackathon 2026" },
      { name: "Azure", level: 2, note: "~1 yr — DevOps Hackathon 2023" },
      { name: "Google Cloud", level: 2, note: "~1 yr — Vertex AI Hackathon 2024" },
    ],
  },
  {
    category: "DevOps",
    skills: [
      { name: "Jenkins", level: 2.5, note: "~4 yrs" },
      { name: "GitHub Actions", level: 2.5, note: "~1 yr" },
      { name: "Docker", level: 2, note: "~1 yr" },
      { name: "SonarQube", level: 2, note: "~2 yrs" },
      { name: "Harness", level: 2, note: "~1 yr" },
    ],
  },
  {
    category: "ITSM & Change Management",
    skills: [
      { name: "Jira", level: 3, note: "~5 yrs — task creation & tracking" },
      { name: "UrbanCode Deploy", level: 2.5, note: "~4 yrs — release/deployment governance" },
      { name: "ServiceNow", level: 2, note: "~2 yrs — change management" },
    ],
  },
  {
    category: "Ways of Working",
    skills: [
      {
        name: "Agile delivery",
        level: 4,
        note: "Encora Labs & Wells Fargo were Agile; Accenture roles were not",
      },
      { name: "Stakeholder collaboration", level: 4 },
    ],
  },
];
