# TASKS.md — Working Task Tracker

Check items off as you go. Claude Code: at the start of each session, read this
file + PROGRESS_LOG.md, pick the first unchecked item in the current phase, and
update both files when done. `[ ]` = todo, `[~]` = in progress, `[x]` = done,
`[!]` = blocked (note why).

Legend for owners: **CC** = Claude Code, **A** = Adarsh (content/decisions).

---

## Phase 0 — Discovery & content extraction

- [x] (A) Add source résumé PDF to `public/resume.pdf`
- [x] (CC) Extract facts from PDF/Tableau workbook into `src/content/*` first pass
- [x] (A) Confirm job titles, companies, dates, achievement bullets per role
- [x] (A) Provide GitHub username + repos to feature (AdarshMurali/FinSight-AI)
- [x] (A) Provide Tableau Public URL + vizzes to showcase
- [ ] (A) Decide Jira representation (narrative vs screenshots vs omit) — default (omit, narrative-only) still in effect, not explicitly confirmed
- [x] (A) Provide LinkedIn URL, certifications, contact email
- [x] (A) Accent color preference (#e3ac14) / headshot (public/avatar.jpg)
- [x] (CC) Fill `docs/CONTENT.md` checklist; leave TODO(content) for gaps

## Phase 1 — Scaffold & tooling

- [x] (CC) Init Vite + React + TS (React 18 pinned per CLAUDE.md, not the npm-default 19)
- [x] (CC) Add Tailwind + CSS variables + globals.css (Tailwind v4, `@theme inline`)
- [x] (CC) Init shadcn/ui; add base components (Nova preset, Radix primitives, Button added)
- [x] (CC) ESLint + Prettier + path aliases (`@/`) + `.nvmrc`
- [x] (CC) Theme provider (light/dark/system) + toggle
- [x] (CC) Layout shell + empty section stubs (Hero/About/Experience/Skills/Projects/Certifications/Contact, all reading from `src/content`)
- [x] (CC) First Vercel deploy (prove pipeline) → https://adarsh-resume-sepia.vercel.app

## Phase 2 — Design system

- [x] (CC) Color tokens (light+dark), type scale, spacing, radius, shadow, motion
- [x] (CC) Primitives: SectionHeading, Card, Badge, Timeline, StatTile, SkillMeter
- [x] (CC) Kitchen-sink page to review the system in both themes (`/kitchen-sink`, dev-only)
- [ ] (A) Approve the visual direction

## Phase 3 — Core sections

- [x] (CC) Hero (name, role, value prop, CTAs, domain pills) — headshot, download résumé + contact CTAs, 4 domain pills
- [x] (CC) About + stat row (StatTile primitive)
- [x] (CC) Experience timeline (expandable, tech chips, domain tags) — Timeline + Collapsible, highlights + tech Badges on expand
- [x] (CC) Skills clusters (tiers/meters) — Card per category, SkillMeter per skill
- [x] (CC) Projects grid (cards + links) — Card, tech Badges, Featured badge, GitHub link
- [x] (CC) Certifications grid — Card grid, verify links
- [x] (CC) Contact / footer — icon links (custom inline SVGs for GitHub/LinkedIn — lucide-react v1 dropped brand logos), résumé download repeated
- [x] (CC) Sticky top nav with section anchors — DESIGN.md §6 called for this from
      the start but it never got its own checklist line (only the ⌘K palette did,
      in Phase 4); added retroactively after Adarsh flagged the gap. Desktop:
      inline links; mobile (<640px): hamburger toggles a dropdown. "Ask my AI"
      nav item still pending Phase 5 (chatbot doesn't exist yet)
- [x] (CC) Responsive pass at 375/768/1024/1440 — verified both themes via Chrome DevTools

## Phase 4 — Integrations

- [x] (CC) GitHub repos via REST, cached at build + fallback — `scripts/fetch-github.ts`
      runs via `prebuild`, writes `src/content/github-cache.json`; failures keep the
      previous cached entry rather than breaking the build
- [x] (CC) Tableau vizzes (thumbnails/embeds) — no image embed: Tableau's static
      thumbnail exposes Adarsh's phone number (the `4_3.png` crop) and the full-page
      variant renders with broken/missing text. Adarsh chose a text/icon callout
      card instead (Projects section) — see docs/PROGRESS_LOG.md
- [x] (CC) Jira representation per decision — CONTENT.md §4 default (omit live link,
      narrative only) already satisfied via the "Agile delivery" skill entry from
      Phase 0; no new work needed, not explicitly reconfirmed by Adarsh but no
      change requested either
- [x] (CC) Command palette (⌘K) wired to sections + links — `cmdk` via shadcn's
      `command` component; sections + résumé/GitHub/LinkedIn/Tableau/email

## Phase 5 — AI assistant

- [x] (CC) `scripts/build-knowledge.ts` compiles content → knowledge —
      outputs `src/content/knowledge.generated.ts` (a `.ts` export, not raw
      `.md`, so both the Vite build and the Vercel Edge Function bundler can
      import it directly with no raw-text loader); wired into `prebuild`
- [x] (CC) `api/chat.ts` serverless endpoint (streaming, rate-limited) —
      Vercel Edge Function; validates input (role/length/turn-count),
      best-effort in-memory per-IP rate limit (`api/_lib/rateLimit.ts`,
      ~10 msgs/min), never leaks the key or system prompt, friendly fallback
      on provider errors
- [x] (CC) LLM provider adapter (`api/_lib/llm.ts`) — **provider is OpenAI
      `gpt-4o-mini`, not Anthropic Claude** (Adarsh's explicit call, made
      after weighing cost/latency for this small grounded-Q&A task on a
      public endpoint — see ARCHITECTURE.md ADR-004). Isolated behind this
      one file per CLAUDE.md §3's swappability requirement.
- [x] (CC) ChatWidget UI (launcher, streaming, suggested prompts, fallback) —
      `src/components/chat/{ChatLauncher,ChatPanel,ChatMessage}.tsx` +
      `src/hooks/useChat.ts`; code-split (ChatPanel lazy-loads on first
      open); wired into `App.tsx`, `SiteNav`, and `CommandPalette` via a
      tiny window-event bus (`src/lib/chatBus.ts`)
- [x] (CC) Grounding + safety tests (15 sample questions) — `docs/chatbot-eval.md`
      + `pnpm eval:chatbot` (`scripts/eval-chatbot.ts`); **not yet run**, needs
      a real `OPENAI_API_KEY` in `.env.local` (none available in this
      environment) — run once a key is available, before calling Phase 5 done
- [ ] (A) Set `OPENAI_API_KEY` in Vercel env (renamed from `ANTHROPIC_API_KEY`
      per the provider switch above)

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
