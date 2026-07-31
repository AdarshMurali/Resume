# Interactive Résumé — Adarsh

A single-page, interactive web résumé that showcases Adarsh's work across
**finance, energy, background verification, and investment banking** — with an
AI assistant that answers recruiter questions grounded in his real experience.

**One link. Send it to recruiters. It _is_ the résumé.**

---

## Tech at a glance

- **Vite + React 18 + TypeScript**
- **Tailwind CSS + shadcn/ui + Framer Motion**
- **Vercel** hosting + one serverless (Edge) function for the chatbot
- Chatbot uses **context-stuffing** with **OpenAI `gpt-4o-mini`** (the résumé
  is small — no RAG/vector DB; see `docs/ARCHITECTURE.md` ADR-004 for why
  OpenAI rather than Anthropic)
- Content is **typed data** in `src/content/` → single source of truth for the
  UI _and_ the AI assistant

## Highlights

- Polished, responsive, dark/light UI with tasteful motion
- Experience timeline, grouped skills, live GitHub project cards, Tableau vizzes,
  certifications
- ⌘K command palette; print-to-PDF one-pager; strong SEO/social cards
- Small AI assistant that answers as Adarsh, strictly from real content,
  streamed and rate-limited

---

## Repo map

```
CLAUDE.md                    # guidance for Claude Code — read first
docs/                        # plan, architecture, design, content, chatbot, deploy, tasks
src/content/                 # all résumé facts (edit here) + knowledge.generated.ts
src/components/
  sections/                  # Hero, About, Experience, Skills, Projects, Certifications, Contact
  chat/                      # ChatLauncher, ChatPanel, ChatMessage
  common/                    # SiteNav, CommandPalette, ThemeProvider, etc.
  ui/                        # shadcn/ui primitives (copied in, owned)
  BelowFoldSections.tsx      # lazy-loaded below-the-hero sections (keeps LCP fast)
  LazyFooter.tsx             # lazy-loaded footer (same reason)
api/
  chat.ts                    # serverless (Edge) chatbot endpoint
  _lib/llm.ts                # the ONLY file that talks to the LLM provider
  _lib/rateLimit.ts          # per-IP rate limiter
  _lib/systemPrompt.ts       # guardrails + compiled knowledge
scripts/
  build-knowledge.ts         # compiles src/content -> knowledge.generated.ts
  fetch-github.ts            # build-time GitHub repo stats cache
  eval-chatbot.ts            # grounding/safety sanity check (docs/chatbot-eval.md)
```

## Quick start

```bash
pnpm install
pnpm dev              # front-end at localhost:5173
vercel dev            # separately, to test the /api/chat endpoint locally
```

`pnpm dev` alone won't serve `/api/chat` — Vite doesn't run serverless
functions. Use `vercel dev` (needs the Vercel CLI linked to this project) to
exercise the chatbot locally, or just test against a deployed preview.

## Editing content

Edit files in `src/content/`, then `pnpm run build:knowledge` (also runs
automatically in `prebuild`). The site and the chatbot's knowledge update
together from the same source. See `docs/CONTENT.md`.

After a content or system-prompt change, sanity-check the chatbot:

```bash
OPENAI_API_KEY=sk-... pnpm eval:chatbot
```

See `docs/chatbot-eval.md` for the 15 sample questions this checks against.

## Environment variables

See `.env.example` for the full list and comments. The only one that's
actually read by running code:

```
OPENAI_API_KEY      # server-only, used by api/_lib/llm.ts — never exposed to the browser
OPENAI_MODEL        # optional override, defaults to gpt-4o-mini
```

The `VITE_*` entries in `.env.example` (site URL, GitHub username, profile
links) are documentation/reference only — the actual values live as typed
data in `src/content/*.ts`, which is the real source of truth for the UI.

**Never commit real secrets.** Put them in `.env.local` (gitignored) for
local dev, and in Vercel's Project → Settings → Environment Variables for
deployed environments. `.env.example` holds placeholder names only.

## Deploy

Push to GitHub → connect the repo in Vercel (Project → Settings → Git) →
set `OPENAI_API_KEY` in Vercel env vars → deploy. See `docs/DEPLOYMENT.md`
and `docs/ARCHITECTURE.md` §8 for the full picture.

## Planning docs

Start with **`docs/PROJECT_PLAN.md`** (phases) and **`docs/TASKS.md`** (tracker).
Architecture and design rationale live in `docs/ARCHITECTURE.md` and
`docs/DESIGN.md`. `docs/PROGRESS_LOG.md` has a dated history of what was
built and why.
