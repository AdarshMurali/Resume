import type { Links } from "./types";

/**
 * links.ts — external profiles and contact.
 * NOTE on Jira: personal/company boards are usually private — do NOT link a
 * live board. Leave `jira` undefined and represent Jira as a narrative skill
 * instead. See docs/CONTENT.md §4.
 */
export const links: Links = {
  linkedin: "https://www.linkedin.com/in/adarshmurali-ai/",
  github: "https://github.com/AdarshMurali/",
  tableauPublic:
    "https://public.tableau.com/app/profile/adarsh.m5164/viz/AdarshMuraliResume2026/AdarshResume",
  email: "adarsh.5.88@gmail.com",
  // jira: undefined, // intentionally omitted — see docs/CONTENT.md §4
};
