import type { SkillCluster } from "./types";

/**
 * skills.ts — grouped skills. Adjust clusters/skills and set proficiency tiers
 * (1–5, optional). Prefer meaningful grouping over a long flat list. Pull the
 * full set from your résumé PDF. See docs/DESIGN.md §6 (Skills section).
 */
export const skills: SkillCluster[] = [
  {
    category: "Data & ETL",
    skills: [
      { name: "ETL pipeline development", level: 5, note: "core strength" },
      { name: "Data modeling / warehousing", level: 4 },
      { name: "Data quality & validation", level: 4 },
      // TODO(content): add specific ETL tools you use (e.g. SSIS, Informatica,
      // dbt, Airflow, Talend) with tiers.
    ],
  },
  {
    category: "BI & Visualization",
    skills: [
      { name: "Tableau", level: 5, note: "public portfolio" },
      { name: "Dashboard design", level: 4 },
      // TODO(content): Power BI? Looker? add here.
    ],
  },
  {
    category: "Databases",
    skills: [
      { name: "SQL", level: 5 },
      // TODO(content): which engines — SQL Server, PostgreSQL, Oracle, MySQL,
      // Snowflake, BigQuery? add with tiers.
    ],
  },
  {
    category: "Python & Engineering",
    skills: [
      { name: "Python", level: 4 },
      { name: "pandas / data wrangling", level: 4 },
      // TODO(content): APIs, testing, Git, scripting/automation.
    ],
  },
  {
    category: "AI / ML",
    skills: [
      // TODO(content): be specific & honest — LLM apps, RAG, scikit-learn,
      // prompt engineering, forecasting, etc.
      { name: "Applied AI / LLM tooling", level: 3 },
    ],
  },
  {
    category: "Cloud & DevOps",
    skills: [
      // TODO(content): AWS/Azure/GCP services, CI/CD, containers — or remove
      // this cluster if not applicable.
      { name: "TODO(content): cloud platform", level: 2 },
    ],
  },
  {
    category: "Ways of Working",
    skills: [
      { name: "Agile / Jira", level: 4, note: "sprint delivery" },
      { name: "Stakeholder collaboration", level: 4 },
      // Jira lives here as a narrative skill — see docs/CONTENT.md §4.
    ],
  },
];
