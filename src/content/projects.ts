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
      "CI/CD",
    ],
    domain: "Investment Banking",
    links: {},
    inProgress: true,
    privateRepo: true,
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
