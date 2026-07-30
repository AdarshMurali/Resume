# DEPLOYMENT.md — Build, Env & Deploy

Target host: **Vercel** (free tier, global CDN, HTTPS, serverless functions,
custom domain). These steps assume the repo layout in CLAUDE.md §6.

---

## 1. Prerequisites
- Node LTS (match `.nvmrc`), `pnpm` (or npm), a GitHub repo, a Vercel account,
  and an Anthropic API key for the chatbot.

## 2. Environment variables
Create `.env.local` for local dev (never commit it). Mirror the **names** in
`.env.example`:

```
ANTHROPIC_API_KEY=      # server-only; used by api/chat.ts
PUBLIC_SITE_URL=        # e.g. https://adarsh.dev  (for OG tags, canonical)
GITHUB_USERNAME=        # for build-time repo fetch (optional)
```

In Vercel: **Project → Settings → Environment Variables** — add the same keys
for **Production** and **Preview**. `ANTHROPIC_API_KEY` must be a *server* env
(no `VITE_`/`PUBLIC_` prefix) so it never ships to the browser.

> Anything exposed to the client in Vite must be prefixed `VITE_`. The API key
> must NOT be — keep it server-only, read it inside `api/chat.ts`.

## 3. Local development
```bash
pnpm install
pnpm run build:knowledge      # compile src/content -> knowledge for the bot
pnpm dev                      # Vite front-end
# in a second terminal, to test the serverless function locally:
vercel dev                    # serves /api/chat alongside the app
```

## 4. Scripts (define in package.json)
```
dev              vite
build:knowledge  tsx scripts/build-knowledge.ts
build            pnpm run build:knowledge && vite build
preview          vite preview
lint             eslint .
```
The `build` script must run `build:knowledge` first so the deployed chatbot
always reflects the latest content.

## 5. First deploy
1. Push repo to GitHub.
2. Vercel → **New Project** → import the repo.
3. Framework preset: **Vite**. Build command: `pnpm build`. Output dir: `dist`.
4. Add env vars (§2). Deploy. You get a preview URL.
5. Verify: site loads, theme toggle works, chatbot responds, PDF downloads.

## 6. Custom domain
Vercel → **Settings → Domains** → add your domain → follow DNS instructions
(A/CNAME or use Vercel nameservers). HTTPS is automatic. Set `PUBLIC_SITE_URL`
to the final domain and redeploy so OG/canonical tags are correct.

## 7. Security headers (optional but recommended)
Add `vercel.json` with headers: `Content-Security-Policy`,
`X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`,
`X-Frame-Options: DENY` (relax `frame-ancestors`/CSP if embedding Tableau).

## 8. Post-deploy checklist
- [ ] Lighthouse (mobile) ≥ 95 Perf / 100 A11y / 100 BP / 100 SEO on live URL
- [ ] OG image renders when pasting the link into LinkedIn/Slack/email
- [ ] Chatbot: no key in network tab; rate limit works; grounded answers
- [ ] `Cmd/Ctrl+P` prints a clean one-page résumé
- [ ] Works on a real phone; no layout breaks; tap targets fine
- [ ] All `TODO(content)` removed; links resolve; PDF is current

## 9. Updating content later
Edit `src/content/*`, run `pnpm run build:knowledge`, commit, push → Vercel
auto-deploys. The site and chatbot update together. No other steps.

## 10. Rollback
Vercel keeps every deployment. To roll back: **Deployments → pick a good one →
Promote to Production**. Instant, no rebuild.
