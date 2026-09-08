import type { Project } from "./types";

/**
 * projects.ts — featured work. `repoStats` is filled automatically by the
 * GitHub fetch step (Phase 4) — leave it out here.
 * See docs/ARCHITECTURE.md §5 for the GitHub/Tableau integration approach.
 */
export const projects: Project[] = [
  {
    title: "FinSight AI — Hedge Fund Portfolio Analyzer",
    blurb:
      "An agentic AI-powered financial research platform for hedge funds and " +
      "institutional investors, combining real-time streaming analytics with " +
      "GPT-4o-driven portfolio intelligence — natural-language querying of " +
      "live portfolio data, risk metrics, and market events.",
    tech: [
      "Python",
      "FastAPI",
      "Apache Flink",
      "Apache Kafka",
      "SQL Server 2022",
      "ChromaDB",
      "OpenAI GPT-4o",
      "Next.js",
      "Docker",
      "AWS EC2",
      "AWS EventBridge",
    ],
    domain: "Investment Banking",
    links: {
      github: "https://github.com/AdarshMurali/FinSight-AI",
      demo: "https://www.fin-sightai.space/",
    },
    featured: true,
  },
  {
    title: "MarginMaestro — Agentic Margin Call Automation",
    blurb:
      "An agentic, event-driven platform that automates the end-to-end margin call " +
      "lifecycle — from market event to client notification, escalation, and audit — " +
      "using LLM agent orchestration, a RAG pipeline over legal and policy documents, " +
      "and a real-time Kafka streaming backbone.",
    tech: [
      "Python",
      "Apache Kafka",
      "Terraform",
      "Docker",
      "RAG Pipeline",
      "LLM Agent Orchestration",
      "LangGraph",
      "OpenAI",
      "Vector Databases",
      "ServiceNow",
      "Slack",
      "AWS S3",
      "AWS EC2",
      "CI/CD",
    ],
    domain: "Investment Banking",
    links: {
      github: "https://github.com/AdarshMurali/MarginMaestro",
      demo: "https://marginmaestro.vercel.app/",
    },
    featured: true,
  },
  {
    title: "TradeLens — AWS Spark Trade Surveillance Pipeline",
    blurb:
      "An end-to-end big data pipeline on AWS that processes 5M+ trade/order events " +
      "through Apache Spark (PySpark) to generate market analytics (VWAP, volatility, " +
      "spread) and surveillance alerts detecting spoofing, wash trading, and layering, " +
      "achieving 95–100% precision/recall against ground-truth abuse patterns. Built on " +
      "a bronze/silver/gold Delta Lake medallion lakehouse on S3 with advanced Spark " +
      "techniques — window functions, self-joins, broadcast joins, skew handling via key " +
      "salting, Pandas UDFs, and SCD Type 2 — containerized with Docker and deployed on " +
      "AWS EMR Serverless with full CI/CD via GitHub Actions, serving dual layers through " +
      "Amazon Athena and Redshift Serverless with Tableau dashboards, scaling to zero cost when idle.",
    tech: [
      "AWS",
      "Apache Spark",
      "PySpark",
      "Delta Lake",
      "AWS EMR Serverless",
      "AWS S3",
      "Amazon Athena",
      "Redshift Serverless",
      "Docker",
      "GitHub Actions",
      "CI/CD",
      "Tableau",
    ],
    domain: "Investment Banking",
    links: {
      github: "https://github.com/AdarshMurali/TradeLens",
    },
    featured: true,
  },
  {
    title: "Kanban Studio — AI-Assisted Project Board",
    blurb:
      "A project-management MVP combining a drag-and-drop Kanban board with an AI chat " +
      "assistant that can create, edit, and move cards on your behalf — a small end-to-end " +
      "exploration of pairing a conversational agent with a real, stateful UI.",
    tech: ["Next.js", "React", "TypeScript", "Tailwind CSS", "FastAPI", "Python", "SQLite", "Docker"],
    links: {
      github: "https://github.com/AdarshMurali/Kanban_Studio",
    },
  },
];
