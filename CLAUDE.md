# CLAUDE.md — Interactive Resume / Portfolio

> This file is the single source of truth for **Claude Code** working on this
> repository. Read it fully at the start of every session. Keep it up to date.
> When in doubt about scope, defaults, or conventions, this file wins.

---

## 1. What we are building

An **interactive, single-page web resume** for **Adarsh**, a software engineer
whose experience spans **finance, energy, background verification, and
(currently) investment banking**. The site is shared as a single URL with
recruiters and hiring managers — it *is* the resume.

Core goals, in priority order:

1. **Credibility & clarity** — a recruiter understands who Adarsh is and why he
   is strong within ~20 seconds of landing.
2. **Top-tier UI/UX** — this is a frontend-first product. The design must feel
   modern, fast, polished, and effortless. This is the primary bar for "done".
3. **Showcase breadth of skills** — ETL development, BI development, databases,
   Python, AI/ML, plus the rest extracted from the source resume PDF.
4. **Aggregate proof** — deep-link to GitHub projects, public Tableau portfolio,
   Jira, certifications, and LinkedIn.
5. **AI assistant** — a small, tasteful chatbot that answers recruiter questions
   "on Adarsh's behalf," grounded strictly in his real resume content.

Non-goals (do **not** build these unless explicitly asked):

- No login/auth, no user accounts, no CMS, no database of visitors.
- No blog engine, no comment system, no analytics dashboard beyond basic
  privacy-friendly page views (optional).
- No full RAG vector pipeline. See §4 — the corpus is tiny; we context-stuff.
- No heavy backend. One thin serverless function for the chatbot is the ceiling.

---

## 2. Guiding principles

- **Frontend excellence over feature count.** A smaller site that feels
  beautiful beats a bloated one. When trading off, pick polish.
- **Content is data.** All resume content lives in typed files under
  `src/content/`. Components never hardcode resume facts. One edit updates the
  site *and* the chatbot's knowledge.
- **Ship fast.** Target a working, deployable site quickly. Prefer proven,
  boring, well-documented libraries over novel ones. Latest tech is welcome
  **only when it adds real value** (see §5), never for novelty.
- **Accessible & responsive by default.** Mobile-first. Keyboard navigable.
  WCAG AA contrast. Respect `prefers-reduced-motion`.
- **No secrets in the client.** API keys live only in serverless env vars.
- **Every claim is real.** Never invent experience, metrics, employers, or
  certifications. If a fact is missing, leave a `TODO(content)` marker and ask.

---

## 3. Tech stack (decided — do not swap without updating ARCHITECTURE.md)

| Layer            | Choice                                             |
|------------------|----------------------------------------------------|
| Build tool       | **Vite**                                           |
| Framework        | **React 18 + TypeScript**                          |
| Styling          | **Tailwind CSS** + CSS variables for theming       |
| Components       | **shadcn/ui** (Radix primitives) — copy-in, owned  |
| Animation        | **Framer Motion** (`motion`)                       |
| Icons            | **lucide-react**                                   |
| Routing          | Single page + scroll sections (no router needed)   |
| Chatbot backend  | **Vercel Serverless Function** (`/api/chat`)       |
| LLM              | Anthropic Claude (via `@anthropic-ai/sdk`) *       |
| Hosting          | **Vercel** (free tier, custom domain, HTTPS)       |
| Package manager  | **pnpm** (fallback: npm)                           |

\* LLM provider is swappable; see CHATBOT.md. Keep the call behind one adapter
module so it can change without touching the UI.

Node version: pin in `.nvmrc` (use current LTS). Commit `pnpm-lock.yaml`.

---

## 4. The chatbot: why NOT full RAG (important)

The user explicitly asked to use RAG **only if it adds value**. It does not here.

- The entire knowledge base = one resume + a handful of projects + certs +
  short bios. This is a few thousand tokens — it fits **entirely** in a single
  system prompt. A vector DB, chunking, and embeddings would add moving parts,
  cost, and latency for **zero** retrieval benefit at this size.
- **Decision: context-stuffing.** At build time we compile all of `src/content/`
  into one Markdown knowledge string and inject it into the system prompt of the
  serverless function. The model answers only from that.
- **Guardrails:** the system prompt instructs the model to answer only from the
  provided facts, to decline politely and offer contact details when asked
  something not covered, and never to fabricate.
- **Revisit trigger:** if the corpus ever grows large (e.g. a real blog, dozens
  of long case studies > ~40k tokens), *then* introduce embeddings + retrieval.
  Document that pivot in ARCHITECTURE.md before doing it.

See `docs/CHATBOT.md` for the full spec, system prompt, and API contract.

---

## 5. "Latest tech" we DO include (each earns its place)

- **Streaming chat responses** — perceived speed; feels alive.
- **Command palette (⌘K / Ctrl-K)** — jump to any section or link; recruiters
  love the polish, and it doubles as fast navigation.
- **Dark / light theme** with system detection and a manual toggle.
- **Print-optimized stylesheet** — visitor can `Cmd+P` → save a clean one-page
  PDF resume straight from the site. High practical value for recruiters.
- **Tasteful motion** — scroll-reveal, animated skill meters, hover states —
  all gated behind `prefers-reduced-motion`.
- **Great SEO / social cards** — Open Graph + Twitter meta + a generated OG
  image, so the link previews well when pasted into email/LinkedIn/Slack.

Explicitly **out** (would be overdoing it): 3D/WebGL scenes, cursor-follow
particle fields, autoplaying audio/video, gimmicky page transitions that slow
navigation, or an AI avatar that talks.

---

## 6. Repository layout (target)

```
/
├── CLAUDE.md                  # this file
├── README.md
├── docs/                      # planning & tracking (see below)
├── index.html
├── vite.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── .nvmrc
├── .env.example
├── api/
│   └── chat.ts                # Vercel serverless chatbot endpoint
├── scripts/
│   └── build-knowledge.ts     # compiles src/content -> knowledge.generated.md
├── public/
│   ├── resume.pdf             # downloadable canonical PDF
│   ├── og-image.png
│   └── favicon.svg
└── src/
    ├── main.tsx
    ├── App.tsx
    ├── content/               # SINGLE SOURCE OF TRUTH (typed data)
    │   ├── profile.ts
    │   ├── experience.ts
    │   ├── skills.ts
    │   ├── projects.ts
    │   ├── certifications.ts
    │   ├── links.ts
    │   └── index.ts
    ├── components/
    │   ├── ui/                # shadcn components
    │   ├── sections/          # Hero, About, Experience, Skills, Projects, ...
    │   ├── chat/              # ChatWidget, ChatMessage, etc.
    │   └── common/            # CommandPalette, ThemeToggle, SectionHeading
    ├── hooks/
    ├── lib/                   # utils, analytics, api client
    └── styles/
        └── globals.css
```

`docs/` contains: `PROJECT_PLAN.md`, `ARCHITECTURE.md`, `DESIGN.md`,
`CONTENT.md`, `CHATBOT.md`, `DEPLOYMENT.md`, `TASKS.md`, `PROGRESS_LOG.md`.

---

## 7. Working agreement for Claude Code (how to behave in this repo)

1. **Start each session** by reading `docs/TASKS.md` and `docs/PROGRESS_LOG.md`
   to see current state and the next unblocked task. Work in phase order
   (PROJECT_PLAN.md) unless told otherwise.
2. **One phase / one coherent chunk at a time.** Don't scaffold everything at
   once. Get a section looking great, commit, then move on.
3. **Update tracking as you go.** When you complete a task, check it off in
   `TASKS.md` and append a dated one-line entry to `PROGRESS_LOG.md`.
4. **Never invent resume facts.** Pull only from `src/content/`. If content is
   missing, insert `// TODO(content): <what you need>` and list it in the
   progress log so Adarsh can fill it.
5. **Keep components dumb about data.** Read from `src/content` via typed
   imports; no inline copy of resume facts inside JSX.
6. **After any content change**, re-run `scripts/build-knowledge.ts` so the
   chatbot stays in sync.
7. **Quality gates before "done" on a phase:** `pnpm build` passes, `pnpm lint`
   clean, no TypeScript errors, Lighthouse (mobile) ≥ 95 Performance /
   100 Accessibility / 100 Best-Practices / 100 SEO on the deployed preview,
   and it looks correct at 375px, 768px, and 1440px widths.
8. **Commits:** small, conventional (`feat:`, `fix:`, `chore:`, `docs:`,
   `style:`). Reference the phase, e.g. `feat(experience): timeline section`.
9. **Secrets:** never commit `.env`. Only edit `.env.example` with placeholder
   names.
10. **Ask before**: adding a heavy dependency, introducing a router/SSR
    framework, changing the stack, or building anything in the non-goals list.

---

## 8. Content still needed from Adarsh (fill these in `src/content/`)

Track completion in `docs/CONTENT.md`. Blocking items to request early:

- The **source resume PDF** (drop at `public/resume.pdf`; extract facts to
  `src/content/`).
- Exact **job titles, companies, dates, and 2–4 achievement bullets** per role
  (finance, energy, background verification, investment banking).
- **GitHub** username + which repos to feature.
- **Tableau Public** profile URL + which vizzes to embed.
- **Jira** — what is shareable/public (Jira is often private; see CONTENT.md for
  how we represent it without leaking a private board).
- **LinkedIn** URL, **certifications** (name, issuer, year, credential URL).
- Preferred **contact** method and whether to show email directly or via a form.
- A **headshot** (optional) and preferred accent color / any brand preference.

---

## 9. Definition of Done (whole project)

- Deployed at a custom URL over HTTPS, fast on mobile.
- All real content in place, no `TODO(content)` left.
- Chatbot answers grounded questions correctly and declines gracefully.
- Print-to-PDF produces a clean one-pager.
- Passes the quality gates in §7 on the live URL.
- README explains how to run, edit content, and deploy.
