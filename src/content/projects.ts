import type { Project } from "./types";

/**
 * projects.ts — featured work. Link to GitHub repos and Tableau vizzes.
 * `repoStats` is filled automatically by the GitHub fetch step — leave it out.
 * Set `featured: true` on the 3–6 you most want recruiters to see.
 * See docs/ARCHITECTURE.md §5 for the GitHub/Tableau integration approach.
 */
export const projects: Project[] = [
  {
    title: "TODO(content): project name",
    blurb:
      "TODO(content): 1–2 sentences — the problem, what you built, the outcome.",
    tech: ["Python", "SQL", "ETL"],
    domain: "Finance",
    links: {
      github: "https://github.com/USERNAME/REPO", // TODO(content)
      // demo: "https://...",
    },
    featured: true,
  },
  {
    title: "TODO(content): Tableau dashboard",
    blurb: "TODO(content): what the dashboard shows and who uses it.",
    tech: ["Tableau", "SQL"],
    links: {
      tableau: "https://public.tableau.com/app/profile/USER/viz/NAME", // TODO(content)
    },
    featured: true,
  },
  {
    title: "TODO(content): project name",
    blurb: "TODO(content): short blurb.",
    tech: ["Python"],
    links: {
      github: "https://github.com/USERNAME/REPO", // TODO(content)
    },
  },
];
