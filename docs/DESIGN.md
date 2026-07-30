# DESIGN.md — UI/UX Design System

This is a frontend-first product. The design bar is the primary measure of
success. This file defines the visual language so every section feels like one
cohesive, premium system. Keep it consistent — consistency reads as quality.

---

## 1. Design principles

- **Calm, confident, editorial.** Generous whitespace, strong typographic
  hierarchy, restrained color. Think a well-designed product landing page, not a
  flashy template.
- **Content leads, chrome recedes.** Motion and decoration support scanning;
  they never compete with the content.
- **One accent, used sparingly.** A single accent color for emphasis, links, and
  interactive states. Everything else is neutral.
- **Fast to scan.** A recruiter should get the gist without reading everything:
  clear headings, tags, stats, and a timeline.
- **Delight in the details.** Micro-interactions on hover/focus, smooth reveals,
  a satisfying ⌘K palette — small touches that signal craft.

---

## 2. Color system (define as CSS variables; light + dark)

Use HSL CSS variables so themes swap by changing the variable set, not classes.

```
Neutrals (light):  background very-light warm gray; foreground near-black.
Neutrals (dark):   background near-black (not pure #000); foreground off-white.
Accent:            ONE color — pick during Phase 2 with Adarsh (default: a
                   confident indigo/teal). Provide accent, accent-foreground,
                   and a subtle accent-muted for backgrounds.
Semantic:          border, muted, muted-foreground, card, card-foreground,
                   ring (focus). Mirror shadcn's token names for drop-in use.
```

Rules: body text contrast ≥ 4.5:1; large text/UI ≥ 3:1 (WCAG AA). Never rely on
color alone to convey meaning (pair with icon/label). Verify both themes.

> If you build charts/skill meters, read the **dataviz** skill first for palette
> and accessibility guidance before choosing chart colors.

---

## 3. Typography

- **Two families max:** one for headings (a characterful but professional sans
  or a refined serif for the name), one for body/UI (a clean neutral sans, e.g.
  Inter). A mono face only for code/tech chips if desired.
- **Type scale (fluid with `clamp`):** display / h1 / h2 / h3 / body-lg / body /
  small / caption. Keep line-length ~60–75ch for prose.
- **Hierarchy via size + weight + color**, not underlines or all-caps walls.
- Self-host fonts or use `font-display: swap`; preload the hero font.

---

## 4. Spacing, radius, elevation

- **Spacing scale:** 4px base (4, 8, 12, 16, 24, 32, 48, 64, 96). Use it
  everywhere; no magic numbers.
- **Section rhythm:** consistent vertical padding between sections (e.g. 96px
  desktop / 64px mobile) and a max content width (~1120px) centered.
- **Radius:** one token (e.g. 12–16px) for cards, inputs, buttons. Be consistent.
- **Elevation:** soft, low-spread shadows; stronger on hover. Avoid harsh drop
  shadows. In dark mode prefer subtle borders + faint glows over heavy shadows.

---

## 5. Motion

- **Library:** Framer Motion. **Always** wrap in a reduced-motion check.
- **Patterns:** fade+rise on scroll-in (translateY 12–16px, 300–500ms, ease-out);
  stagger children in lists/timelines; spring on hover for cards/buttons; count-up
  or width-grow for stats/skill meters when they enter the viewport.
- **Budget:** motion should feel quick and purposeful (≤ 500ms). No parallax
  that hurts scroll performance, no infinite looping distractions.
- `@media (prefers-reduced-motion: reduce)` → disable transforms, keep opacity
  only or none.

---

## 6. Layout & sections

Single scrolling page with a sticky, minimal top nav (name + section anchors +
theme toggle + "Ask AI"). Section order:

1. **Hero** — big name + role; one-sentence value prop; domain pills
   (Finance · Energy · Background Verification · Investment Banking); CTAs:
   *Download résumé (PDF)*, *Ask my AI*, *Contact*. Optional headshot.
2. **About** — short narrative + a **stat row** (years of experience, domains,
   core tools, certifications count).
3. **Experience** — vertical **timeline**; each entry: role, company, dates,
   domain tag, 2–4 achievement bullets (action + impact + tech), tech chips.
   Collapsible detail on click.
4. **Skills** — grouped clusters (Data & ETL, BI & Visualization, Databases,
   Python & Engineering, AI/ML, Cloud/DevOps, Ways of working). Show proficiency
   as tiers or subtle meters — avoid a meaningless logo wall.
5. **Projects** — responsive card grid; each card: title, blurb, tech chips,
   live GitHub stats, links (repo / demo / Tableau). Feature Tableau vizzes with
   thumbnails.
6. **Certifications** — compact grid; issuer logo/name, year, verify link.
7. **Contact / Footer** — LinkedIn, GitHub, Tableau, email; download résumé;
   subtle "built with React" credit.

Plus: floating **chat launcher** (bottom-right) and a **⌘K command palette**.

---

## 7. Components to standardize (build once, reuse)

`SectionHeading` (eyebrow + title + optional description), `Card`, `Pill/Badge`,
`Timeline` + `TimelineItem`, `StatTile`, `SkillCluster` + `SkillMeter`,
`ProjectCard`, `CertCard`, `IconButton`, `ThemeToggle`, `CommandPalette`,
`ChatLauncher` + `ChatPanel`. All keyboard-accessible with visible focus rings.

---

## 8. Responsive breakpoints

- **Mobile-first.** Verify at **375px**, **768px**, **1024px**, **1440px**.
- Hero stacks on mobile; timeline goes single-column; project grid 1→2→3 cols;
  nav collapses to a compact menu. Tap targets ≥ 44px. No horizontal scroll.

---

## 9. Accessibility checklist (must pass)

- Semantic landmarks (`header/nav/main/section/footer`), one `h1`, logical
  heading order.
- Keyboard: everything reachable & operable; visible focus; ⌘K and chat trap
  focus correctly and restore it on close; `Esc` closes overlays.
- `alt` text on all images; `aria-label` on icon-only buttons; live region for
  streaming chat text.
- Respect `prefers-reduced-motion` and `prefers-color-scheme`.
- Color contrast AA in both themes.

---

## 10. Print stylesheet (recruiter PDF)

`@media print`: hide nav/chat/toggles/animations; single column; black on white;
show contact + links as text URLs; keep it to one page. Result should look like a
clean, professional traditional résumé when saved via `Cmd/Ctrl+P`.

---

## 11. Inspiration guardrails

Aim for the polish of well-crafted developer portfolios and product marketing
pages: strong hero, clear hierarchy, tasteful motion, excellent typography.
Avoid: template-y hero videos, particle backgrounds, neon-on-black gamer
aesthetics, auto-playing anything, or more than one accent color.
