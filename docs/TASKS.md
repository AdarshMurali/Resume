# TASKS.md — Working Task Tracker

Check items off as you go. Claude Code: at the start of each session, read this
file + PROGRESS_LOG.md, pick the first unchecked item in the current phase, and
update both files when done. `[ ]` = todo, `[~]` = in progress, `[x]` = done,
`[!]` = blocked (note why).

Legend for owners: **CC** = Claude Code, **A** = Adarsh (content/decisions).

---

## Phase 0 — Discovery & content extraction
- [ ] (A) Add source résumé PDF to `public/resume.pdf`
- [ ] (CC) Extract facts from PDF into `src/content/*` first pass
- [ ] (A) Confirm job titles, companies, dates, achievement bullets per role
- [ ] (A) Provide GitHub username + repos to feature
- [ ] (A) Provide Tableau Public URL + vizzes to showcase
- [ ] (A) Decide Jira representation (narrative vs screenshots vs omit)
- [ ] (A) Provide LinkedIn URL, certifications, contact email
- [ ] (A) Accent color preference / headshot (optional)
- [ ] (CC) Fill `docs/CONTENT.md` checklist; leave TODO(content) for gaps

## Phase 1 — Scaffold & tooling
- [ ] (CC) Init Vite + React + TS
- [ ] (CC) Add Tailwind + CSS variables + globals.css
- [ ] (CC) Init shadcn/ui; add base components
- [ ] (CC) ESLint + Prettier + path aliases (`@/`) + `.nvmrc`
- [ ] (CC) Theme provider (light/dark/system) + toggle
- [ ] (CC) Layout shell + empty section stubs
- [ ] (CC) First Vercel deploy (prove pipeline) → preview URL

## Phase 2 — Design system
- [ ] (CC) Color tokens (light+dark), type scale, spacing, radius, shadow, motion
- [ ] (CC) Primitives: SectionHeading, Card, Badge, Timeline, StatTile, SkillMeter
- [ ] (CC) Kitchen-sink page to review the system in both themes
- [ ] (A) Approve the visual direction

## Phase 3 — Core sections
- [ ] (CC) Hero (name, role, value prop, CTAs, domain pills)
- [ ] (CC) About + stat row
- [ ] (CC) Experience timeline (expandable, tech chips, domain tags)
- [ ] (CC) Skills clusters (tiers/meters)
- [ ] (CC) Projects grid (cards + links)
- [ ] (CC) Certifications grid
- [ ] (CC) Contact / footer
- [ ] (CC) Responsive pass at 375/768/1024/1440

## Phase 4 — Integrations
- [ ] (CC) GitHub repos via REST, cached at build + fallback
- [ ] (CC) Tableau vizzes (thumbnails/embeds)
- [ ] (CC) Jira representation per decision
- [ ] (CC) Command palette (⌘K) wired to sections + links

## Phase 5 — AI assistant
- [ ] (CC) `scripts/build-knowledge.ts` compiles content → knowledge
- [ ] (CC) `api/chat.ts` serverless endpoint (streaming, rate-limited)
- [ ] (CC) LLM provider adapter (`lib/llm.ts`)
- [ ] (CC) ChatWidget UI (launcher, streaming, suggested prompts, fallback)
- [ ] (CC) Grounding + safety tests (15 sample questions)
- [ ] (A) Set `ANTHROPIC_API_KEY` in Vercel env

## Phase 6 — Polish, a11y, SEO, performance
- [ ] (CC) Print stylesheet → clean one-page PDF
- [ ] (CC) OG/Twitter meta + generated OG image + JSON-LD Person
- [ ] (CC) Favicon set, sitemap, robots
- [ ] (CC) Accessibility pass (focus, aria, contrast, reduced-motion, alt)
- [ ] (CC) Lighthouse tuning to targets (≥95/100/100/100 mobile)

## Phase 7 — Launch
- [ ] (A) Custom domain on Vercel
- [ ] (CC) Prod env vars set; final deploy
- [ ] (A) Proofread all content; remove every TODO(content)
- [ ] (CC) Finalize README
- [ ] (A) Share the URL 🎉
- [ ] (CC/A) (Optional) privacy-friendly analytics

---

## Backlog / nice-to-have (not scheduled)
- [ ] Case-study deep pages (would trigger RAG reconsideration)
- [ ] Multi-language toggle
- [ ] Visitor "download vCard" button
- [ ] Subtle sound/haptics off by default
