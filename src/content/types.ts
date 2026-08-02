/**
 * types.ts — the content model for the entire résumé.
 *
 * This is the single source of truth consumed by BOTH the UI and the AI
 * assistant (via scripts/build-knowledge.ts). Keep all résumé facts in the
 * `*.ts` files in this folder; never hardcode facts in components.
 *
 * See docs/CONTENT.md for the schema rationale and content checklist.
 */

export type Domain = "Finance" | "Energy" | "Background Verification" | "Investment Banking";

/**
 * Skill proficiency tier. 1 = familiar, 5 = expert. Half-steps allowed for
 * finer-grained self-assessment. Optional — omit if unsure.
 */
export type SkillLevel = 1 | 1.5 | 2 | 2.5 | 3 | 3.5 | 4 | 4.5 | 5;

export type SkillCategory =
  | "Data & ETL"
  | "BI & Visualization"
  | "Databases"
  | "Streaming"
  | "Python & Engineering"
  | "AI / ML"
  | "Cloud"
  | "DevOps"
  | "ITSM & Change Management"
  | "Ways of Working";

export interface Stat {
  /** e.g. "Years of experience" */
  label: string;
  /** e.g. "6+" */
  value: string;
}

export interface Profile {
  name: string;
  /** Short professional headline, e.g. "Data & BI Engineer · ETL · Python · AI". */
  headline: string;
  /** One strong sentence that captures the value you offer. */
  valueProp: string;
  location?: string;
  /** 2–3 sentence professional summary, written in the first person. */
  summary: string;
  domains: Domain[];
  /** Path under /public, e.g. "/avatar.jpg". Optional. */
  avatarUrl?: string;
  /** Path to the downloadable canonical PDF, e.g. "/resume.pdf". */
  resumePdfUrl: string;
  /** Small set of headline numbers shown as a stat row in the hero/about. */
  stats: Stat[];
}

export interface Experience {
  company: string;
  role: string;
  domain: Domain;
  /** ISO-ish "YYYY-MM". */
  start: string;
  /** "YYYY-MM" or the literal "Present". */
  end: string | "Present";
  location?: string;
  /** Optional one-line context about the team/mandate. */
  summary?: string;
  /**
   * 2–4 achievement bullets. Shape: action → measurable impact → tech.
   * Keep them real and verifiable. See docs/CONTENT.md §3.
   */
  highlights: string[];
  /** Tech chips shown on the card. */
  tech: string[];
}

export interface Skill {
  name: string;
  level?: SkillLevel;
  /** Optional short qualifier, e.g. "5+ yrs", "primary language". */
  note?: string;
}

export interface SkillCluster {
  category: SkillCategory;
  skills: Skill[];
}

export interface ProjectLinks {
  github?: string;
  demo?: string;
  tableau?: string;
  docs?: string;
}

/** Populated at build time from the GitHub API — leave undefined in content. */
export interface RepoStats {
  stars: number;
  language: string;
  /** ISO date string of last push. */
  updated: string;
}

export interface Project {
  title: string;
  blurb: string;
  tech: string[];
  domain?: Domain;
  links: ProjectLinks;
  /** Feature this project prominently in the grid. */
  featured?: boolean;
  /** Still being built — renders an "In Progress" badge. */
  inProgress?: boolean;
  /** Repo isn't public — don't render a link that 404s for visitors. */
  privateRepo?: boolean;
  /** Filled by the GitHub fetch step; do not hand-edit. */
  repoStats?: RepoStats;
}

export interface Certification {
  name: string;
  issuer: string;
  /** e.g. "2024". */
  year: string;
  /** Verification / credential URL. */
  credentialUrl?: string;
  /** Path under /public or remote logo URL. */
  logoUrl?: string;
}

export interface AgenticAIItem {
  name: string;
  /** Short note on how it's actually been used — keep it concrete, not a buzzword list. */
  note?: string;
}

export interface AgenticAIGroup {
  category: string;
  items: AgenticAIItem[];
}

export interface AgenticAIContent {
  /** 1-2 sentence intro tying this section to real, verifiable work. */
  intro: string;
  groups: AgenticAIGroup[];
  /** One-liner about an in-progress certification. Omit if none. */
  pursuing?: string;
}

export interface Links {
  linkedin: string;
  github: string;
  tableauPublic: string;
  email: string;
  /** See docs/CONTENT.md §4 — usually omitted (private boards). */
  jira?: string;
}

/** The full aggregated content object exported from index.ts. */
export interface ResumeContent {
  profile: Profile;
  experience: Experience[];
  skills: SkillCluster[];
  projects: Project[];
  agenticAI: AgenticAIContent;
  certifications: Certification[];
  links: Links;
}
