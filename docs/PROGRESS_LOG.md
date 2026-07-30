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
