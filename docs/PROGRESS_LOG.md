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
  gold; anything rendering gold *as text/border directly on the page
  background* should use `brand` instead.
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
