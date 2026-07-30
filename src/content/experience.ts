import type { Experience } from "./types";

/**
 * experience.ts — roles in reverse-chronological order (newest first).
 * Dates and industry tags sourced from TimeLine.xlsx (exact start/end dates
 * from the underlying Tableau data source); bullets condensed from the
 * Tableau visual resume's per-role descriptions. See docs/PROGRESS_LOG.md
 * 2026-07-30 for provenance.
 */
export const experience: Experience[] = [
  {
    company: "Wells Fargo",
    role: "Data Engineer",
    domain: "Investment Banking",
    start: "2020-08",
    end: "Present",
    summary:
      "Capital Markets Division — Dodd-Frank Act compliance and Section " +
      "165(d) living-will regulatory reporting.",
    highlights: [
      "Built and maintain ETL pipelines (Informatica, Python, Spark, Hadoop) feeding Dodd-Frank Act Section 165(d) living-will submissions, ensuring timely, accurate Federal regulatory reporting.",
      "Use Tableau for regulatory Fed submission reporting and Hadoop/Spark for auditing and reporting data storage; GitHub Copilot for day-to-day development.",
      "Presented on Spark Streaming at a Technology Spotlight session to Wells Fargo India; completed the Markets College Training derivatives certification (a Capital Markets Initiative).",
      "Built hackathon projects on Azure DevOps (2023), Google Cloud Vertex AI (2024), and OpenShift Container Platform (2025).",
    ],
    tech: ["Python", "Tableau", "Informatica", "Spark", "Hadoop", "SQL Server", "GitHub Copilot"],
  },
  {
    company: "Encora Innovation Labs (client: Accurate Background)",
    role: "Senior Data Analyst",
    domain: "Background Verification",
    start: "2017-01",
    end: "2020-08",
    summary:
      "IT Business Intelligence & Analytics team for Accurate Background, " +
      "serving enterprise clients including Amazon, Uber, and Starbucks.",
    highlights: [
      "Cleansed and transformed background-verification data, applying business logic so client reporting for Amazon, Uber, and Starbucks stayed accurate and audit-ready.",
      "Combined AWS Redshift with Tableau to deliver real-time reporting, replacing slower batch-based dashboards.",
      "Owned BI delivery end-to-end — from requirements through dimensional modeling (SSIS/SSRS) to post-launch support.",
    ],
    tech: ["Microsoft BI (SSIS, SSRS)", "SQL Server", "Tableau", "MongoDB", "AWS Redshift", "AWS DMS", "Dimensional Modelling"],
  },
  {
    company: "Accenture (client: Shell)",
    role: "Senior Data Analyst",
    domain: "Energy",
    start: "2013-04",
    end: "2016-12",
    summary:
      "Data specialist on Shell's IT team, supporting oil & gas exploration " +
      "reporting (directional survey, facility monitoring).",
    highlights: [
      "Cleaned and prepared directional-survey and facility-monitoring data for Shell's energy operations using SSIS, SQL Server, and Oracle.",
      "Led project initiation — requirements gathering, feasibility analysis, stakeholder alignment — and managed the handover to production support.",
      "Gained hands-on exposure to SAP HANA and SAP BODS for enhanced data processing.",
    ],
    tech: ["SSIS", "SQL Server", "Oracle", "SAP BODS", "SAP HANA"],
  },
  {
    company: "Accenture",
    role: "Senior Data Analyst",
    domain: "Finance",
    start: "2010-11",
    end: "2013-04",
    summary:
      "Financial reporting and risk analysis for Accenture's top 100 clients.",
    highlights: [
      "Led ETL development (SSIS, SQL Server) for financial reporting and risk analysis serving Accenture's top 100 clients.",
      "Contributed to a firm-wide certification initiative, managing delivery-lead and solution-architect program content.",
    ],
    tech: ["C#", "SSIS", "SQL Server", "MS Access"],
  },
];
