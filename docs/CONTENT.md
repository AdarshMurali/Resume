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
export type Domain =
  | "Finance" | "Energy" | "Background Verification" | "Investment Banking";

export interface Profile {
  name: string;
  headline: string;          // e.g. "Data & BI Engineer · ETL · Python · AI"
  valueProp: string;         // one strong sentence
  location?: string;
  summary: string;           // 2–3 sentences, first person
  domains: Domain[];
  avatarUrl?: string;
  resumePdfUrl: string;      // "/resume.pdf"
  stats: { label: string; value: string }[]; // years, domains, tools, certs
}

export interface Experience {
  company: string;
  role: string;
  domain: Domain;
  start: string;             // "2023-01"
  end: string | "Present";
  location?: string;
  summary?: string;
  highlights: string[];      // 2–4 bullets: action + measurable impact + tech
  tech: string[];            // chips
}

export interface SkillCluster {
  category:
    | "Data & ETL" | "BI & Visualization" | "Databases"
    | "Python & Engineering" | "AI / ML" | "Cloud & DevOps"
    | "Ways of Working";
  skills: { name: string; level?: 1|2|3|4|5; note?: string }[];
}

export interface Project {
  title: string;
  blurb: string;
  tech: string[];
  domain?: Domain;
  links: { github?: string; demo?: string; tableau?: string; docs?: string };
  featured?: boolean;
  // filled at build from GitHub API:
  repoStats?: { stars: number; language: string; updated: string };
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
  jira?: string;             // see §4 — likely omitted / narrative only
}
```

Each `src/content/*.ts` exports a typed constant; `src/content/index.ts`
re-exports them. `scripts/build-knowledge.ts` serializes all of it to Markdown.

---

## 2. Content checklist (fill these — mark [x] when done)

Profile
- [ ] Full name, headline, one-line value prop
- [ ] 2–3 sentence professional summary (first person)
- [ ] Location (city/region — optional)
- [ ] Stat row values (years of experience, # domains, core tools, # certs)
- [ ] Headshot (optional) → `public/`

Experience (repeat per role — cover Finance, Energy, BGV, Investment Banking)
- [ ] Company, role/title, exact start–end dates, location
- [ ] Domain tag
- [ ] 2–4 achievement bullets each (what you did → impact → tech used)
- [ ] Tech chips per role

Skills
- [ ] Confirm/adjust the cluster list and populate skills + proficiency tiers
- [ ] Anything beyond ETL/BI/DB/Python/AI to add? (from the PDF)

Projects
- [ ] GitHub username + the repos to feature (mark `featured: true`)
- [ ] Short blurb + tech per project
- [ ] Any Tableau vizzes to showcase (URLs + a thumbnail image each)

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
- [ ] Accent color preference / any brand guidance
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

---

## 5. Keeping the chatbot in sync

After **any** content edit, run `pnpm run build:knowledge` (wraps
`scripts/build-knowledge.ts`). The generated file
(`src/content/knowledge.generated.md`, git-ignored or committed — your call) is
what the chatbot uses. CI/build should run it automatically before deploy.
