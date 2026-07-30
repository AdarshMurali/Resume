# Interactive Résumé — Adarsh

A single-page, interactive web résumé that showcases Adarsh's work across
**finance, energy, background verification, and investment banking** — with an
AI assistant that answers recruiter questions grounded in his real experience.

**One link. Send it to recruiters. It *is* the résumé.**

---

## Tech at a glance
- **Vite + React 18 + TypeScript**
- **Tailwind CSS + shadcn/ui + Framer Motion**
- **Vercel** hosting + one serverless function for the chatbot
- Chatbot uses **context-stuffing** (the résumé is small — no RAG/vector DB)
- Content is **typed data** in `src/content/` → single source of truth for the
  UI *and* the AI assistant

## Highlights
- Polished, responsive, dark/light UI with tasteful motion
- Experience timeline, grouped skills, live GitHub project cards, Tableau vizzes,
  certifications
- ⌘K command palette; print-to-PDF one-pager; strong SEO/social cards
- Small AI assistant that answers as Adarsh, strictly from real content

---

## Repo map
```
CLAUDE.md          # guidance for Claude Code — read first
docs/              # plan, architecture, design, content, chatbot, deploy, tasks
src/content/       # all résumé facts (edit here)
src/components/     # sections, chat, ui, common
api/chat.ts        # serverless chatbot endpoint
scripts/build-knowledge.ts   # compiles content -> chatbot knowledge
```

## Quick start
```bash
pnpm install
pnpm run build:knowledge
pnpm dev            # front-end
vercel dev          # to test the chatbot endpoint locally
```

## Editing content
Edit files in `src/content/`, then `pnpm run build:knowledge`, commit, push.
The site and the chatbot update together. See `docs/CONTENT.md`.

## Deploy
See `docs/DEPLOYMENT.md`. Short version: push to GitHub → import on Vercel →
set env vars → deploy → add custom domain.

## Planning docs
Start with **`docs/PROJECT_PLAN.md`** (phases) and **`docs/TASKS.md`** (tracker).
Architecture and design rationale live in `docs/ARCHITECTURE.md` and
`docs/DESIGN.md`.

---

## Environment
```
ANTHROPIC_API_KEY   # server-only (chatbot)
PUBLIC_SITE_URL     # canonical/OG
GITHUB_USERNAME     # optional, build-time repo fetch
```
Never commit real secrets. `.env.example` holds placeholder names only.
