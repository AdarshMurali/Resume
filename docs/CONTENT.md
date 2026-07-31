# CONTENT.md — Content Model & Checklist

All resume facts live in `src/content/*.ts` as **typed objects** — the single
source of truth for both the UI and the chatbot. This file defines the schema
and tracks what content is still needed.

> Rule: components and the chatbot read from these files only. Never hardcode
> resume facts elsewhere. Missing facts get a `// TODO(content): ...` marker and
> a line in PROGRESS_LOG.md.

---

## 1. TypeScript schema (target shape)

```ts
// src/content/types.ts
export type Domain = "Finance" | "Energy" | "Background Verification" | "Investment Banking";

export interface Profile {
  name: string;
  headline: string; // e.g. "Data & BI Engineer · ETL · Python · AI"
  valueProp: string; // one strong sentence
  location?: string;
  summary: string; // 2–3 sentences, first person
  domains: Domain[];
  avatarUrl?: string;
  resumePdfUrl: string; // "/resume.pdf"
  stats: { label: string; value: string }[]; // years, domains, tools, certs
}

export interface Experience {
  company: string;
  role: string;
  domain: Domain;
  start: string; // "2023-01"
  end: string | "Present";
  location?: string;
  summary?: string;
  highlights: string[]; // 2–4 bullets: action + measurable impact + tech
  tech: string[]; // chips
}

export interface SkillCluster {
  category:
    | "Data & ETL"
    | "BI & Visualization"
    | "Databases"
    | "Python & Engineering"
    | "AI / ML"
    | "Cloud & DevOps"
    | "Ways of Working";
  skills: { name: string; level?: 1 | 2 | 3 | 4 | 5; note?: string }[];
}

export interface Project {
  title: string;
  blurb: string;
  tech: string[];
  domain?: Domain;
  links: { github?: string; demo?: string; tableau?: string; docs?: string };
  featured?: boolean;
  inProgress?: boolean; // renders an "In Progress" badge
  privateRepo?: boolean; // suppresses the link — see §4, same rule as Jira
  // filled at build from GitHub API:
  repoStats?: { stars: number; language: string; updated: string };
}

export interface AgenticAIContent {
  intro: string; // 1-2 sentences, must tie back to real/verifiable work
  groups: { category: string; items: { name: string; note?: string }[] }[];
  pursuing?: string; // one-liner about an in-progress certification
}

export interface Certification {
  name: string;
  issuer: string;
  year: string;
  credentialUrl?: string;
  logoUrl?: string;
}

export interface Links {
  linkedin: string;
  github: string;
  tableauPublic: string;
  email: string;
  jira?: string; // see §4 — likely omitted / narrative only
}
```

Each `src/content/*.ts` exports a typed constant; `src/content/index.ts`
re-exports them. `scripts/build-knowledge.ts` serializes all of it to Markdown.

---

## 2. Content checklist (fill these — mark [x] when done)

Profile

- [x] Full name, headline, one-line value prop — `src/content/profile.ts`
- [x] 2–3 sentence professional summary (first person)
- [ ] Location (city/region — optional; left blank/hidden for now)
- [x] Stat row values (15+ yrs, 4 domains, 8 certs, core tools)
- [x] Headshot → `public/avatar.jpg` (source: `02.jpg` studio headshot,
      originally a 4912×7360 1.5MB DSLR file; center-cropped to a 400×400
      square and re-encoded as JPEG q85 in Phase 7 — now 19KB).

Experience (repeat per role — cover Finance, Energy, BGV, Investment Banking)

- [x] Company, role/title, exact start–end dates — sourced from `TimeLine.xlsx`
      (Wells Fargo, Encora Labs/Accurate, Accenture/Shell, Accenture/TGP)
- [x] Domain tag — all 4 CLAUDE.md domains covered, one role each
- [x] 2–4 achievement bullets each (what you did → impact → tech used)
- [x] Tech chips per role
- [ ] Location per role (not provided — left unset)

Skills

- [x] Confirm/adjust the cluster list and populate skills + proficiency tiers
      — real levels + years-of-experience sourced from the Tableau workbook's
      underlying `Tools.csv` skill-level data
- [x] Anything beyond ETL/BI/DB/Python/AI to add? Cloud & DevOps (AWS/Azure/
      GCP/Docker) and Ways of Working (Agile) both populated with real data

Projects — renamed "Personal Projects" in the UI (eyebrow + a one-line
description) to make clear these are independent work, not employer
deliverables — see 2026-07-31 in PROGRESS_LOG.md.

- [x] GitHub username + the repo to feature — FinSight AI, confirmed public at
      `github.com/AdarshMurali/FinSight-AI`, `featured: true`
- [x] Short blurb + tech per project
- [x] MarginMaestro (agentic margin-call automation platform) added,
      `inProgress: true`, `privateRepo: true` — repo is private, so no public
      link is rendered (same rule as Jira, see §4); description sourced from
      the repo's own README
- [ ] Any additional Tableau vizzes to showcase beyond the main resume viz —
      none identified yet; revisit if Adarsh publishes more

Agentic AI (new section, added 2026-07-31 — see `src/content/agenticAI.ts`)

- [x] Building-with-AI group: MCP, RAG pipelines (FinSight AI + MarginMaestro),
      LLM agent orchestration
- [x] AI-assisted development group: Claude Code, Claude Skills, Claude Code
      plugins, GitHub Copilot, DBCode
- [x] "Currently pursuing" one-liner: Claude Certified Architect (Foundations)
- [ ] Confirm nothing else belongs here — Adarsh flagged prompt engineering,
      vector DBs/embeddings, tool use, multi-agent orchestration, fine-tuning,
      and other AI coding tools (Cursor, Windsurf, etc.) as candidates during
      the planning discussion; none confirmed yet, so none were added

Certifications

- [x] Each: name, issuer, year, verify/credential URL — all 8 extracted from
      the Tableau Public visual resume into `src/content/certifications.ts`.
      Logo assets still optional/unfilled.

Links

- [x] LinkedIn URL, GitHub URL, Tableau Public URL, contact email — see `src/content/links.ts`
- [ ] Jira — decide representation (see §4)

Assets

- [x] `public/resume.pdf` (canonical downloadable PDF) — copied from
      `AdarshResume2026.pdf` at repo root
- [x] Accent color preference — #e3ac14 (gold), confirmed 2026-07-30, see
      docs/DESIGN.md §2
- [ ] `og-image` source or let the build generate one

---

## 3. Writing guidance for bullets

Use the **action → impact → tech** shape, quantify where honest:

- "Built an ETL pipeline in Python/SQL that cut month-end close reporting from
  6 hours to 20 minutes for the energy trading desk."
- "Designed Tableau dashboards adopted by 40+ analysts to monitor KYC/AML
  background-verification throughput."
  Keep to real, verifiable facts. No inflation. Prefer specifics over adjectives.

---

## 4. Jira — how to represent it (privacy note)

Personal/company Jira boards are almost always **private**; do not link a live
board or expose ticket data. Options, best first:

1. **Narrative** in About/Experience: agile delivery, sprint cadence, story
   throughput, cross-team coordination — as prose, no link.
2. **Sanitized screenshots** you personally own and are comfortable sharing
   (e.g. a personal project board), placed as images.
3. If you have a genuinely public Jira/roadmap, link it; otherwise omit `jira`.

Default: omit the live link; fold Jira into the "Ways of Working" skill cluster
and experience narrative. Confirm with Adarsh before exposing anything.

**Same rule applied again for MarginMaestro** (added 2026-07-31): its GitHub
repo is private, so `Project.privateRepo: true` suppresses the link entirely
(`Projects.tsx` renders a "Private repository" note with a lock icon instead
of a dead link). This is now the general pattern for any private
resource — never render a link a visitor can't actually open.

---

## 5. Keeping the chatbot in sync

After **any** content edit, run `pnpm run build:knowledge` (wraps
`scripts/build-knowledge.ts`). The generated file
(`src/content/knowledge.generated.md`, git-ignored or committed — your call) is
what the chatbot uses. CI/build should run it automatically before deploy.
