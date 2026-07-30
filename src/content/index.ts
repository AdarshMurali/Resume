/**
 * index.ts — aggregates all content into one typed object.
 * Import from here in components and in scripts/build-knowledge.ts so the UI
 * and the AI assistant always read the exact same data.
 *
 *   import { content } from "@/content";
 *   content.profile.name;  content.experience.map(...)
 */
import type { ResumeContent } from "./types";
import { profile } from "./profile";
import { experience } from "./experience";
import { skills } from "./skills";
import { projects } from "./projects";
import { certifications } from "./certifications";
import { links } from "./links";

export const content: ResumeContent = {
  profile,
  experience,
  skills,
  projects,
  certifications,
  links,
};

// Named re-exports for convenience.
export { profile, experience, skills, projects, certifications, links };
export * from "./types";
