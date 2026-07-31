import type { AgenticAIContent } from "./types";

/**
 * agenticAI.ts — hands-on agentic AI / LLM tooling, kept separate from
 * skills.ts because it's presented as its own section (see App.tsx nav
 * order), not folded into the general Skills grid.
 */
export const agenticAI: AgenticAIContent = {
  intro:
    "I build with agentic AI day to day, not just use it: RAG pipelines and LLM agent " +
    "orchestration power FinSight AI and MarginMaestro (see Personal Projects), and " +
    "Claude-based tooling is part of how I write software — this résumé site itself " +
    "was built end-to-end with Claude Code.",
  groups: [
    {
      category: "Building with agentic AI",
      items: [
        {
          name: "Model Context Protocol (MCP)",
          note: "Implemented MCP integrations for agentic workflows",
        },
        {
          name: "RAG pipelines",
          note: "ChromaDB for FinSight AI; a legal/policy-document RAG pipeline in progress for MarginMaestro",
        },
        {
          name: "LLM agent orchestration",
          note: "GPT-4o function calling and orchestrator/specialist agent patterns",
        },
      ],
    },
    {
      category: "AI-assisted development",
      items: [
        { name: "Claude Code", note: "Daily driver — this site was built with it" },
        { name: "Claude Skills" },
        { name: "Claude Code plugins" },
        { name: "GitHub Copilot", note: "~2 yrs, daily driver" },
        { name: "DBCode", note: "Database tooling — used as both a Claude plugin and a VS Code extension" },
      ],
    },
  ],
  pursuing: "Currently pursuing: Claude Certified Architect (Foundations)",
};
