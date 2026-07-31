/**
 * index.ts — aggregates all content into one typed object.
 * Import from here in components and in scripts/build-knowledge.ts so the UI
 * and the AI assistant always read the exact same data.
 *
 *   import { content } from "@/content";
 *   content.profile.name;  content.experience.map(...)
 */
import type { ResumeContent, Project, RepoStats } from "./types";
import { profile } from "./profile";
import { experience } from "./experience";
import { skills } from "./skills";
import { projects as rawProjects } from "./projects";
import { agenticAI } from "./agenticAI";
import { certifications } from "./certifications";
import { links } from "./links";
import githubCache from "./github-cache.json";

// Merge build-time-fetched GitHub stats (see scripts/fetch-github.ts) into
// each project. Falls back to no repoStats if the cache has no entry for a
// repo — e.g. before the fetch script has ever run, or if the API call
// failed. See docs/ARCHITECTURE.md §5.
const repoStatsByUrl = githubCache as Record<string, RepoStats>;
const projects: Project[] = rawProjects.map((project) =>
  project.links.github && repoStatsByUrl[project.links.github]
    ? { ...project, repoStats: repoStatsByUrl[project.links.github] }
    : project,
);

export const content: ResumeContent = {
  profile,
  experience,
  skills,
  projects,
  agenticAI,
  certifications,
  links,
};

// Named re-exports for convenience.
export { profile, experience, skills, projects, agenticAI, certifications, links };
export * from "./types";
