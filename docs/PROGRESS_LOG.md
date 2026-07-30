# PROGRESS_LOG.md — Running Development Log

Append a short dated entry whenever you finish a task, make a decision, or hit a
blocker. Newest at the top. This is the memory across Claude Code sessions —
keep it honest and current. Format:

```
## YYYY-MM-DD
- <what changed / decided / blocked>  (phase N)
- TODO(content): <anything you need from Adarsh>
```

---

## 2026-07-30 (Phase 5 — AI assistant)
- Built the full chatbot: `scripts/build-knowledge.ts` (compiles
  `src/content` → `src/content/knowledge.generated.ts`), `api/_lib/llm.ts`
  (provider adapter), `api/_lib/rateLimit.ts`, `api/_lib/systemPrompt.ts`,
  `api/chat.ts` (Vercel Edge Function), and the ChatWidget UI
  (`src/components/chat/*`, `src/hooks/useChat.ts`), wired into `App.tsx`,
  `SiteNav`, and `CommandPalette`.
- **Decision (Adarsh, ADR-004 in ARCHITECTURE.md): LLM provider is OpenAI
  `gpt-4o-mini`, not Anthropic Claude as CLAUDE.md originally specified.**
  Rationale: small grounded fact-retrieval task on a public endpoint;
  gpt-4o-mini is cheaper than Claude Haiku 4.5 and plenty capable. Updated
  CLAUDE.md, ARCHITECTURE.md, CHATBOT.md, and `.env.example` accordingly
  (`OPENAI_API_KEY` replaces `ANTHROPIC_API_KEY`).
- Rate limiting is a deliberately simple in-memory per-IP limiter
  (best-effort only — Vercel Edge isolates aren't guaranteed to persist
  across requests). Acceptable for résumé-site traffic per CLAUDE.md's
  "no heavy backend" non-goal; documented the tradeoff in
  `api/_lib/rateLimit.ts` for future reference if it ever needs Vercel
  KV/Redis.
- `pnpm build` and `pnpm lint` both clean; visually verified the widget in
  Chrome DevTools (dark theme, 390px mobile and 1440px desktop) — launcher,
  suggested prompts, streaming placeholder, and the error-fallback card
  (LinkedIn/email CTA) all render correctly. `/api/chat` itself can't be
  exercised via `pnpm dev` (Vite doesn't run serverless functions) or via
  `pnpm eval:chatbot` (no `OPENAI_API_KEY` available in this environment) —
  both need a real key before the grounding checklist in
  `docs/chatbot-eval.md` can actually be run.
- TODO(content): none — Phase 5 needs no new résumé facts.
- Blocked: (A) set `OPENAI_API_KEY` in Vercel env (Production + Preview),
  and ideally run `pnpm eval:chatbot` locally against the 15 sample
  questions in `docs/chatbot-eval.md` before considering Phase 5 fully done.

## 2026-07-30 (Phase 4 — integrations)

- **GitHub live stats**: `scripts/fetch-github.ts` calls the public GitHub API
  (unauthenticated, fine at this volume) for each project's repo, writes
  `src/content/github-cache.json` (stars/language/last-push). Wired as an npm
  `prebuild` script so it runs automatically before every `pnpm build` (and
  therefore on every Vercel build too). Per-repo failures keep the previous
  cached entry rather than failing the build — the actual "graceful
  degradation" ARCHITECTURE.md asks for. The cache file is **committed**, not
  gitignored, specifically so `pnpm dev` still works on a fresh clone before
  anyone has ever run the fetch script (`pnpm dev` doesn't trigger
  `prebuild`, only `pnpm build` does) — it'll show a real diff after every
  build since the data legitimately refreshes, similar to a lockfile.
  `content/index.ts` merges cache entries into `repoStats` by matching the
  project's `links.github` URL. `Projects.tsx` now shows stars/language/last
  updated when present.
- **Tableau embed — changed course after finding a real problem**: confirmed
  Tableau Public's static-thumbnail URL pattern
  (`/static/images/{2-letter-prefix}/{workbook}/{view}/{variant}.png`) works,
  but both variants I tried were unusable: the `4_3` crop clearly shows
  Adarsh's phone number (which he explicitly asked to keep off the site —
  see docs/PROGRESS_LOG.md Phase 0), and the full-page `1.png` variant
  renders with broken/missing text (Tableau's static renderer seems to drop
  custom fonts). Asked Adarsh rather than guessing; he chose no thumbnail.
  Built a text/icon callout `Card` in the Projects section instead —
  consistent visual weight with the FinSight AI project card, zero privacy
  risk, no reliance on a flaky static-render pipeline.
- **Jira**: no new work — CONTENT.md §4's default (omit the live link,
  represent as narrative) was already satisfied by the "Agile delivery"
  skill entry from Phase 0. Marked done in TASKS.md.
- **Command palette (⌘K)**: added via shadcn's `command` component (pulls in
  `cmdk`, a small standard library — already implicitly pre-approved, since
  CLAUDE.md §5 lists the command palette itself as an intentional feature).
  Visible "Jump to…" button in the header (not just the invisible shortcut)
  so recruiters who don't know ⌘K can still find it. Groups: Sections (jump
  via `scrollIntoView`) and Links (résumé download, GitHub, LinkedIn,
  Tableau, email — open via `window.open`).
  - **Real bug caught and fixed**: shadcn's generated `CommandDialog` does
    _not_ wrap its children in the `Command` root (cmdk's context provider)
    — it just drops `{children}` into `DialogContent`. Using
    `CommandInput`/`CommandList`/etc. directly inside `CommandDialog` without
    an explicit `<Command>` wrapper crashed with "Cannot read properties of
    undefined (reading 'subscribe')" the moment the dialog opened. Fixed by
    wrapping the contents in `<Command>` explicitly. If any other shadcn
    "compound" component behaves oddly, check whether the wrapper actually
    provides the context you'd assume it does — don't assume the shadcn
    recipe is complete just because it compiles.
  - **False-positive lint caught**: the newer `eslint-plugin-react-hooks`
    "immutability" rule flagged `window.location.hash = href` inside an
    event handler as "Modifying a variable defined outside a component or
    hook" — not a real bug (it's user-triggered, not a render-time
    mutation), but avoided the pattern anyway by using
    `document.querySelector(href)?.scrollIntoView(...)` instead, which
    sidesteps the false positive entirely.
  - **Benign warning, not a bug**: clicking to open the palette logs a React
    dev-only warning ("Function components cannot be given refs... did you
    mean React.forwardRef?") pointing at `DialogOverlay`. `radix-ui`'s
    peerDependencies explicitly declare React 18 support, and click-outside-
    to-dismiss was verified working regardless — concluded this is a
    StrictMode double-render artifact (React strips these checks from
    production builds), not a functional problem. Not worth more time.
  - Added `html { scroll-smooth }` + `scroll-padding-top` (clears the sticky
    header) globally while implementing this, since the palette's "jump to
    section" behavior made the lack of smooth scroll obvious.
  - Also added `github-cache.json`'s reuse: extracted `SECTION_LINKS` into
    `src/lib/nav.ts` so `SiteNav` (Phase 3) and `CommandPalette` share one
    list instead of duplicating it.
- Verified end-to-end in Chrome DevTools: keyboard shortcut (⌘K/Ctrl+K),
  click-to-open button, fuzzy search filtering, Enter-to-select for both a
  section (scrolls) and an external link (opens new tab), Escape/click-
  outside to close. `pnpm build`/`lint`/`tsc -b` all pass clean.
- All Phase 4 TASKS.md items done.

## 2026-07-30 (Phase 3 addendum — sticky nav)

- Adarsh flagged that there was no visible way to jump to a section without
  scrolling. Checked the docs: DESIGN.md §6 always called for a "sticky,
  minimal top nav (name + section anchors + theme toggle)", but it never got
  its own TASKS.md line — only the ⌘K command palette did, and that's a
  Phase 4 item and a power-user feature, not a substitute for visible nav.
  Added `src/components/common/SiteNav.tsx`: first-name logo linking to
  `#hero`, inline section links on `sm:` and up, a hamburger-triggered
  dropdown below `sm:` (plain React state, no extra dependency — a Sheet/
  DropdownMenu component would've been overkill for 6 links). Wired into
  `App.tsx`'s header next to `ThemeToggle`. "Ask my AI" nav item is
  intentionally not there yet — no chatbot exists until Phase 5. Verified
  desktop nav, mobile dropdown open/close, and actual scroll-to-section
  behavior in Chrome DevTools. `pnpm build`/`lint`/`tsc -b` all clean.

## 2026-07-30 (Phase 3 — core sections)

- Wired Phase 2's primitives into all 7 real sections, replacing the Phase 1
  stubs: Hero (headshot, domain pills, Download résumé + Contact CTAs — no
  "Ask my AI" CTA yet since the chatbot doesn't exist until Phase 5), About
  (StatTile), Experience (Timeline + per-item Radix Collapsible for
  expand/collapse, tech chips + domain tag revealed on expand), Skills (Card
  per category + SkillMeter), Projects (Card, tech Badges, Featured badge),
  Certifications (Card grid), Contact (icon links + résumé download repeat).
- Added shadcn's `collapsible` component (same `@/` folder bug as
  button/card/badge — same fix, see Phase 1/2 entries).
- **Gotcha**: `lucide-react` v1 dropped all brand/logo icons (GitHub,
  LinkedIn, etc.) for trademark reasons — `import { Github, Linkedin } from
"lucide-react"` fails to compile. Added `src/components/common/BrandIcons.tsx`
  with the two needed marks as inline SVGs (standard Simple Icons CC0 paths)
  rather than pulling in a new icon-library dependency for two icons.
- **Gotcha**: initially wrapped `<Collapsible>` (renders a `div`) directly
  around `<TimelineItem>` (renders an `<li>`), producing invalid
  `<ol><div><li>` nesting. Fixed by moving `Collapsible` inside
  `TimelineItem`'s children instead of around the whole item — `li > div` is
  valid, `ol > div` is not.
- **Gotcha worth remembering**: a `fullPage` screenshot taken without first
  scrolling showed almost the entire page blank except Hero. This was not a
  bug — every section is wrapped in `<Reveal>` (`whileInView`), and Chrome
  DevTools Protocol's full-page capture renders an extended viewport in one
  shot without dispatching real scroll/intersection events, so anything
  below the actual (pre-resize) viewport height never got marked as
  intersecting and stayed at its `hidden` (opacity 0) state. Confirmed by
  scripting an incremental `window.scrollTo` sweep before capturing — every
  section rendered correctly once genuinely scrolled through. **Takeaway for
  future screenshots on this project**: always scroll through the page
  programmatically before a `fullPage` capture, or the shot will look broken
  even when the site works fine for a real visitor.
- Verified in Chrome DevTools: light + dark, 375/768/1440px, expand/collapse
  interaction, no console errors, all links/hrefs correct (resume.pdf,
  mailto, LinkedIn, GitHub, Tableau Public, FinSight-AI repo, all 8
  certification verify links).
- `pnpm build`/`lint`/`tsc -b` all pass clean. Bundle grew from ~60KB to
  ~108KB gzip JS (motion/react + Radix Collapsible + more shadcn components) —
  confirmed lucide-react tree-shaking still works (no unused icons leaked
  into the bundle); further bundle-size tuning is a Phase 6 concern, not now.
- All Phase 3 TASKS.md items done. Full page now scrolls top-to-bottom with
  real content, per PROJECT_PLAN.md's Phase 3 exit criteria.

## 2026-07-30 (Phase 2 — design system)

- Added shadcn's `card` and `badge` components (same `@/` folder relocation
  bug as `button` in Phase 1 — see docs/PROGRESS_LOG.md Phase 1 entry, same
  fix applied).
- Bumped `--radius` from shadcn Nova's default `0.625rem` back to `0.75rem`
  to match DESIGN.md §4's original 12–16px guidance.
- Added a fluid `clamp()`-based type scale as Tailwind v4 theme tokens
  (`text-display`, `text-h1`, `text-h2`, `text-h3`, `text-body-lg` in
  `globals.css` `@theme inline`, each paired with a `--text-*--line-height`
  and `--text-*--font-weight` companion key — Tailwind v4 bundles those into
  the generated utility automatically, so e.g. `text-h2` alone sets size +
  line-height + weight). `body`/`small`/`caption` reuse Tailwind's stock
  `text-base`/`text-sm`/`text-xs`. Decided against a second font family
  (DESIGN.md originally suggested one for headings, one for body) — Geist
  Variable alone reads well at both ends of the scale; documented the
  decision in DESIGN.md §3 so it doesn't look like an unfinished TODO later.
- Built the primitives: `StatTile`, `SkillMeter` (dot-tier proficiency,
  `role="img"` + descriptive `aria-label` since the dots themselves are
  `aria-hidden`), `Timeline`/`TimelineItem`, and extended `SectionHeading`
  with an optional `description`. `Card`/`Badge` came from shadcn; `Button`
  already existed from Phase 1.
- Added `src/lib/motion.ts` (fadeInUp / staggerChildren variants) and a
  `Reveal` wrapper component using `motion/react`'s `whileInView`. Wrapped
  the app root in `<MotionConfig reducedMotion="user">` so every motion
  component automatically respects `prefers-reduced-motion` without
  per-component guards — simpler than DESIGN.md's original per-animation
  reduced-motion checklist item, and verified working.
- Built `/kitchen-sink` (`src/dev/KitchenSink.tsx`) to review every
  primitive, both themes, all four breakpoints (375/768/1024/1440) in one
  place. It's gated behind `import.meta.env.DEV` + a pathname check in
  `main.tsx` (no router — CLAUDE.md §3 says none needed for the real site) so
  it's dynamically imported only in dev; confirmed via `pnpm build` that no
  separate chunk is emitted, so it never ships to production.
- Verified in Chrome DevTools: light + dark, 375/768/1440px, no console
  errors, scroll-reveal fires correctly. One thing to flag: a screenshot at
  768px showed "Heading 2" rendering in an apparently different (bluish)
  color than "Heading 1"/"Heading 3" — checked via `getComputedStyle` and
  confirmed all three have the identical color value; it's a one-off
  screenshot/PNG rendering artifact, not a real CSS bug. Worth a sanity
  glance if it ever recurs, but not something to chase.
- `pnpm build`/`lint`/`tsc -b` all pass clean.
- CC-owned Phase 2 tasks done; **(A) Approve the visual direction** is still
  open — waiting on Adarsh to review `/kitchen-sink` before Phase 3 starts.

## 2026-07-30 (Phase 1 — scaffold & tooling)

- Scaffolded Vite + React 18 + TypeScript by hand (create-vite defaults to
  React 19; pinned to 18.3.1 per CLAUDE.md §3 — "do not swap without updating
  ARCHITECTURE.md"). Installed with pnpm (installed globally, wasn't present).
- Tailwind v4 wired via `@tailwindcss/vite` (no `tailwind.config.ts` needed —
  v4 is CSS-first; tokens live in `src/styles/globals.css` `@theme inline`).
- shadcn/ui initialized (`-t vite -b radix -p nova`, Radix primitives per
  CLAUDE.md). Two gotchas hit along the way:
  1. The CLI wrote `button.tsx`/`utils.ts` into a literal `./@/...` folder
     instead of resolving the `@/*` alias to `src/*` (Windows path bug) —
     moved manually. If `shadcn add <component>` does this again, check for
     a stray `@/` folder at repo root.
  2. `pnpm-workspace.yaml` (auto-created by pnpm for its own build-approval
     config) made shadcn's init think this was a monorepo and fail with
     "Could not load the workspace config" — fixed with `--no-monorepo`.
- shadcn's init also overwrote the hand-written design tokens with its own
  neutral "Nova" oklch palette. Resolved by keeping shadcn's neutral scale but
  overriding `--primary`/`--ring` to the confirmed gold `#e3ac14`, and adding
  a separate `--brand` token for standalone text/links/borders — the raw gold
  is only ~2:1 contrast on white (fails WCAG AA 4.5:1), so light-mode `brand`
  is a darkened amber (`#b45309`, ~5:1) while dark mode reuses the vivid gold
  since dark backgrounds give it ~10:1 headroom. Rule of thumb going forward:
  `bg-primary` + `text-primary-foreground` (filled buttons) can use the vivid
  gold; anything rendering gold _as text/border directly on the page
  background_ should use `brand` instead.
- Switched dark-mode mechanism from a `data-theme` attribute to toggling a
  `.dark` class on `<html>`, to match shadcn/Tailwind v4's
  `@custom-variant dark (&:is(.dark *))` convention that all future shadcn
  components will rely on. Updated both `ThemeProvider.tsx` and the
  anti-flash inline script in `index.html`.
- Built the layout shell: sticky header with `ThemeToggle`, and 7 section
  stubs (Hero/About/Experience/Skills/Projects/Certifications/Contact), all
  reading from `@/content` — verified in-browser (light + dark, no console
  errors) via Chrome DevTools MCP before calling it done.
- `pnpm build`, `pnpm lint` (ESLint flat config + typescript-eslint +
  react-hooks/react-refresh), and `tsc -b` all pass clean.
- First Vercel deploy done: https://adarsh-resume-sepia.vercel.app (team
  "FinSightsAI", project `adarsh-resume`). Deployed via the Vercel MCP
  `deploy_to_vercel` tool (file-tree upload) rather than the `vercel` CLI —
  no CLI was installed and `vercel link`/`vercel login` need an interactive
  browser OAuth flow that isn't available in this environment; the MCP
  plugin already had an authenticated session. This first deploy excluded
  `public/avatar.jpg` and `public/resume.pdf` (kept the payload small; the
  stub UI doesn't reference either yet) and has no lockfile uploaded, so
  Vercel resolved dependencies fresh via `npm install` rather than using
  the exact pnpm-locked versions — fine for this smoke test, but the real
  git-integrated deploy (Phase 7) should import directly from GitHub so
  builds use the committed `pnpm-lock.yaml` and full `public/` assets.
  Verified the live URL in Chrome (matches local dev, no console errors).
  Note: since this was the project's first-ever deployment, Vercel
  auto-promoted it to production (normal for a brand-new project, not a
  Phase 7 launch action).
- **Phase 1 complete.** All TASKS.md items checked off.

## 2026-07-30

- **Phase 0 complete.** Populated `profile.ts`, `experience.ts`, `skills.ts`,
  and `projects.ts` with real data, sourced from files Adarsh provided at
  `C:\Tableau Certification\Resume\` (TimeLine.xlsx for exact employment
  dates/education, Tools.csv for per-skill proficiency levels + years,
  Tools_Used_Daily.xlsx, RESUME.txt for headline language) plus the GitHub
  API (confirmed `AdarshMurali/FinSight-AI` is public). Decisions locked:
  headline "Data Engineer, Capital Markets · Python · Big Data · Applied AI";
  accent color #e3ac14 (gold, matches existing Tableau resume branding, see
  docs/DESIGN.md §2); headshot copied to `public/avatar.jpg` (needs
  compression in Phase 6 — currently ~1.5MB); job titles: Data Engineer
  (Wells Fargo), Senior Data Analyst (Encora Labs, Accenture x2); phone
  number intentionally excluded from public content. Domains mapped 1:1 to
  CLAUDE.md's four categories: Wells Fargo → Investment Banking, Encora/
  Accurate → Background Verification, Accenture/Shell → Energy, Accenture/
  TGP → Finance. Remaining open item: Jira representation still defaults to
  "omit" per CONTENT.md §4, not explicitly reconfirmed. TASKS.md Phase 0
  checklist fully checked off; ready to start Phase 1 (scaffold & tooling).
- Extracted all 8 certifications (name, issuer, year, credential URL) from the
  Tableau Public visual resume via browser automation (Tableau's accessible/
  keyboard-nav mode exposes mark-level detail — Shape chart, Detail=URL — that
  isn't in the static HTML). Populated `src/content/certifications.ts`:
  Databricks Spark 3.0 Associate Developer, Tableau Certified Data Analyst,
  AWS Data Analytics Specialty, Databricks GenAI Fundamentals, AWS Developer
  Associate, Google Associate Cloud Engineer, Azure Fundamentals, Tableau
  Desktop Specialist. Certifications checklist item in CONTENT.md is done.
- Filled in real links: LinkedIn, GitHub (AdarshMurali), Tableau Public visual
  resume URL — updated `src/content/links.ts` and `.env.example`. Copied
  `AdarshResume2026.pdf` to `public/resume.pdf`. Certifications still TODO:
  the 8 certs + verify links live inside the Tableau viz's Certifications
  section and need manual extraction into `src/content/certifications.ts`.
- Project planning package created: CLAUDE.md + docs (PROJECT_PLAN, ARCHITECTURE,
  DESIGN, CONTENT, CHATBOT, DEPLOYMENT, TASKS, this log). (planning)
- Decisions locked: Vite+React+TS+Tailwind+shadcn+Framer Motion; Vercel hosting;
  chatbot = context-stuffing (NO RAG) via one serverless function. (ADR-001/002/003)
- Next up: Phase 0 — add `public/resume.pdf` and extract facts into `src/content`.
- TODO(content): résumé PDF, roles/dates/bullets, GitHub/Tableau/LinkedIn URLs,
  certifications, Jira decision, accent color. (see docs/CONTENT.md checklist)

<!-- add new entries above this line -->
