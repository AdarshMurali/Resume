# PROJECT_PLAN.md — Phased Delivery Plan

A phase = a shippable, reviewable chunk. Do them in order. Each phase lists its
**goal**, **deliverables**, **exit criteria**, and a rough **effort estimate**
(assuming you drive Claude Code and review as you go).

> Total realistic effort: **~3–5 focused evenings** to a great v1. The heaviest
> cost is content accuracy and design polish, not code volume.

---

## Phase 0 — Discovery & content extraction · ~0.5 day

**Goal:** Have all real resume facts structured before writing any UI.

Deliverables

- `public/resume.pdf` added (source of truth).
- Facts extracted into a first pass of `src/content/*` (see CONTENT.md schema).
- Collected links: GitHub, Tableau Public, LinkedIn, Jira (see note), certs.
- `docs/CONTENT.md` checklist filled or `TODO(content)` markers left.

Exit criteria: content files compile and contain no placeholder lorem ipsum for
anything already known.

---

## Phase 1 — Scaffold & tooling · ~0.5 day

**Goal:** A running Vite + React + TS + Tailwind app with the design tokens wired.

Deliverables

- Vite + React + TS project; Tailwind + CSS variables; shadcn/ui initialized.
- `.nvmrc`, `.env.example`, ESLint + Prettier, path aliases (`@/`).
- Theme provider (dark/light + system), base layout shell, empty section stubs.
- Deploy the empty shell to Vercel once to prove the pipeline (preview URL).

Exit criteria: `pnpm dev` runs, theme toggle works, deploys green.

---

## Phase 2 — Design system · ~0.5 day

**Goal:** Lock the visual language before building sections. See DESIGN.md.

Deliverables

- Color tokens (light/dark), type scale, spacing, radius, shadows, motion presets.
- Reusable primitives: `SectionHeading`, `Card`, `Badge/Pill`, `Timeline`,
  `StatTile`, `SkillMeter`.
- One assembled "kitchen sink" page to eyeball the system.

Exit criteria: primitives look polished in both themes at all breakpoints.

---

## Phase 3 — Core sections · ~1–1.5 days · **the heart of the site**

Build these, each looking excellent before moving on:

1. **Hero** — name, role, one-line value prop, primary CTAs (Download PDF,
   Contact, "Ask my AI"), domain tags (Finance · Energy · BGV · Investment Banking).
2. **About / Summary** — 2–3 sentence narrative + key stats (years, domains,
   tools).
3. **Experience** — vertical timeline; each role expandable with achievement
   bullets, tech chips, domain tag.
4. **Skills** — grouped (Data/ETL, BI & Viz, Databases, Python, AI/ML, Cloud,
   Ways of working). Meters or tiers, not a wall of logos.
5. **Projects** — cards linking to GitHub; pull live repo stars/lang via GitHub
   REST (cached). Feature Tableau vizzes with thumbnails/embeds.
6. **Certifications** — grid with issuer, year, verify link.
7. **Contact / Footer** — LinkedIn, GitHub, Tableau, email, download resume.

Exit criteria: full page scrolls top-to-bottom with real content, responsive,
animated tastefully.

---

## Phase 4 — Integrations · ~0.5 day

**Goal:** Live proof, not just links.

Deliverables

- GitHub: featured repos via REST API, cached at build or fetched client-side
  with graceful fallback to static data.
- Tableau Public: embed via Tableau JS API or link out with preview images.
- Jira: represent contributions safely (see CONTENT.md — usually a summary of
  ways-of-working / metrics, **not** a live private board).
- Command palette (⌘K) wired to all sections + external links.

Exit criteria: integrations degrade gracefully offline / on API failure.

---

## Phase 5 — AI assistant · ~0.5–1 day

**Goal:** Grounded chatbot answering as Adarsh. See CHATBOT.md.

Deliverables

- `scripts/build-knowledge.ts` compiling `src/content` → knowledge string.
- `api/chat.ts` serverless endpoint (streaming, rate-limited, key server-side).
- `ChatWidget` UI — launcher, streaming messages, suggested prompts, sources,
  graceful "I don't have that; here's how to reach Adarsh" fallback.

Exit criteria: answers real questions correctly; refuses/deflects unknowns; no
key leakage; works on mobile.

---

## Phase 6 — Polish, a11y, SEO, performance · ~0.5 day

Deliverables

- Print stylesheet → clean one-page PDF.
- OG/Twitter meta + generated OG image; sitemap, robots, favicon set.
- Accessibility pass (focus rings, aria, contrast, reduced-motion, alt text).
- Lighthouse tuning to the targets in CLAUDE.md §7. Image optimization, lazy
  loading, font strategy.

Exit criteria: Lighthouse mobile ≥ 95/100/100/100; keyboard-only usable.

---

## Phase 7 — Launch · ~0.25 day

Deliverables

- Custom domain on Vercel + HTTPS; env vars set in prod.
- Final content proofread; remove all `TODO(content)`.
- README finalized; share the URL.
- (Optional) privacy-friendly analytics (Vercel Analytics / Plausible).

Exit criteria: the URL is ready to paste to recruiters. 🎉

---

## Milestones / suggested cut lines

- **MVP (share-ready):** Phases 0–3 + 6 minimal + 7. A gorgeous static resume,
  no chatbot yet. Ship this first if time is tight.
- **v1 (full):** add Phases 4 & 5.
- **v1.1 (nice-to-have):** analytics, more Tableau embeds, blog/case studies
  (only then reconsider RAG).
