# GETTING_STARTED.md — How to drive this with Claude Code in VSCode

This package is **planning only** — no app code yet. Here's how to go from these
docs to a built site using Claude Code.

---

## 0. Put these files at your project root

Create an empty folder, drop `CLAUDE.md`, `README.md`, and the `docs/` folder in
it, then open it in VSCode and start Claude Code there. Claude Code auto-reads
`CLAUDE.md`.

Add your résumé PDF at `public/resume.pdf` before Phase 0 (create the folder).

## 1. Kick-off prompt (paste into Claude Code)

> "Read CLAUDE.md and docs/. We're building the interactive résumé described
> there. Start Phase 0: I've added my résumé at public/resume.pdf — extract my
> experience, skills, projects, and certifications into typed files under
> src/content per docs/CONTENT.md. Leave TODO(content) markers for anything
> missing and update docs/TASKS.md and docs/PROGRESS_LOG.md."

## 2. Then go phase by phase

After each phase, review the result, then prompt the next one, e.g.:

> "Phase 0 looks good. Do Phase 1 (scaffold) per docs/PROJECT_PLAN.md. Deploy an
> empty shell to Vercel and give me the preview URL."

> "Now Phase 2 — build the design system in docs/DESIGN.md. Show me the
> kitchen-sink page in both themes before we build sections."

Keep phases small. Review, commit, continue. Don't ask it to build everything in
one shot — quality drops.

## 3. Content you'll be asked for (gather now to move fast)

Résumé PDF · exact roles/companies/dates · 2–4 achievement bullets per role ·
GitHub username + repos to feature · Tableau Public URL + vizzes · LinkedIn URL ·
certifications (name/issuer/year/link) · contact email · Jira decision (see
CONTENT.md §4) · accent color preference · optional headshot.

## 4. Good habits

- Tell Claude Code to **update `TASKS.md` and `PROGRESS_LOG.md`** at the end of
  every working session — that's its memory between sessions.
- Ask for a **commit after each coherent chunk** with a conventional message.
- Before "done" on a phase, ask it to run the **quality gates** in CLAUDE.md §7
  (build, lint, types, Lighthouse, responsive check).
- If it proposes a heavy dependency or a stack change, it should **ask first**
  (per CLAUDE.md §7.10).

## 5. Fastest path to something shareable

If time is tight, tell it to target the **MVP cut line** in PROJECT_PLAN.md:
Phases 0–3 + minimal 6 + 7 (a beautiful static résumé, no chatbot), ship that,
then add the chatbot (Phases 4–5) later.

## 6. When you add the chatbot

You'll need an `ANTHROPIC_API_KEY` in Vercel (server env, not `VITE_`-prefixed).
Follow docs/CHATBOT.md and docs/DEPLOYMENT.md. Test that the key never appears in
the browser network tab.

---

That's it. Read order for the docs: **PROJECT_PLAN → CONTENT → DESIGN →
ARCHITECTURE → CHATBOT → DEPLOYMENT**, with **TASKS** and **PROGRESS_LOG** as
your living tracker.
