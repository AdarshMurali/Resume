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

## 2026-07-30
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
