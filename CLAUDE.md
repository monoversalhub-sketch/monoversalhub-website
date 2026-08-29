# CLAUDE.md — Project Guide for Monoversal Hub Website

This file exists so any future Claude session (or human) can get oriented on this
project quickly without re-discovering everything from scratch. Read this first.

## What this project is

Next.js 16 (App Router) marketing/waitlist site for "Monoversal Hub", deployed on
Vercel. Database is Neon (serverless Postgres) via `@neondatabase/serverless`.
No DB credentials reach the browser — everything goes through `/api/*` routes.

```
Browser → /api/db/waitlist       → Neon
Browser → /api/db/messages       → Neon
Browser → /api/db/testimonials   → Neon
Browser → /api/admin/data        → Neon (admin only, cookie-protected)
Browser → /api/admin/auth        → sets httpOnly cookie
```

## Folder map

- `src/app/page.tsx` — homepage. Renders `<Nav />` + a giant client-rendered HTML
  blob (`websiteHtml`, a template literal containing the entire legacy site's
  markup/CSS/JS) via a `LegacyLoader` component.
- `src/app/admin/page.js` — admin dashboard (44K, large single file).
- `src/app/t/[slug]/page.tsx` — dynamic tailor profile pages.
- `src/app/api/db/*` — public CRUD endpoints (waitlist, messages, testimonials).
- `src/app/api/admin/*` — admin auth + data endpoints.
- `src/app/api/monoversal/*` — orchestrator/status/resume/approve endpoints
  (background job system, worth understanding before touching admin flows).
- `src/components/Nav.client.tsx` — client nav component, calls a global
  `window.show(section)` function (defined inside the legacy HTML blob's inline
  `<script>`, not in a normal React component).
- `src/components/structured-data.tsx` — JSON-LD SEO schema components.
- `neon/schema.sql`, `neon/migrations/` — DB schema + migrations.
- `README.md` — setup/deploy instructions, env vars, API route table.

**Important architectural quirk:** the "real" site content isn't written as JSX —
it's a big string of raw HTML/CSS/`<script>` injected client-side by a loader
component. Nav is the only part that was extracted into real React. Keep this in
mind: most UI bugs live inside that HTML string, not in normal component code.

## 🔴 Known issue: blank page in production (diagnosed 2026-08-29)

Screenshot showed the deployed `*.vercel.app` site rendering completely blank
(nav bar visible, empty body). Root causes found in this codebase:

1. **Missing component** — `src/app/page.tsx` does:
   ```tsx
   import LegacyLoader from '@/components/LegacyLoader.client'
   ```
   but `LegacyLoader.client.tsx` (or `.jsx`) **does not exist** in
   `src/components/`. This is a fatal unresolved-import error, so the page
   fails to render.

2. **No root layout** — there is no `src/app/layout.tsx` (or `.js`) anywhere in
   the project. The App Router requires a root layout that wraps `<html>` and
   `<body>`; without it the app won't build correctly.

3. **Duplicate page files** — `src/app/page.js` and `src/app/page.tsx` both
   resolve to the same route (`page.js` just does
   `export { default } from './page.tsx'`). Next.js treats this as a duplicate
   page and will error/behave unpredictably. Delete `page.js`, keep `page.tsx`.

4. **Dependency mismatch in `package.json`** — `next: ^16.2.6` requires
   React 19, but `react`/`react-dom` are pinned to `18.3.1`. Also
   `typescript: ^6.0.0` isn't a real published TypeScript version (latest
   major is 5.x). Either can cause `npm install` to fail or silently install
   the wrong versions on Vercel, which can also produce a broken/blank build.

### Fix checklist (do these in order)
- [ ] Create `src/components/LegacyLoader.client.tsx` — a `"use client"`
      component that accepts `html: string` and renders it (e.g. via
      `dangerouslySetInnerHTML`), and re-executes any `<script>` tags inside it
      (scripts inserted via `dangerouslySetInnerHTML` don't auto-execute in the
      browser — the loader needs to manually re-create `<script>` nodes).
- [ ] Add `src/app/layout.tsx` with `<html><body>{children}</body></html>` plus
      any global metadata/fonts.
- [ ] Delete `src/app/page.js` (redundant now that `page.tsx` is the real file).
- [ ] Fix `package.json`: bump `react`/`react-dom` to `^19` (to match Next 16)
      or downgrade `next` to a version compatible with React 18 — pick one
      direction deliberately. Fix `typescript` to a real version (e.g. `^5.6.0`).
- [ ] Run `npm install && npm run build` locally before redeploying, so build
      errors surface locally instead of as a blank page in production.

## Changelog — 2026-08-29, part 3: web dev service page

Replaced the "SOVR" product with a Web Development service offering, per
request. Changes in `src/app/page.tsx`:

- Products section now shows **BOSS** (live) and **Web Development**
  (service) instead of BOSS/SOVR.
- New page, `id="webdev"`, reachable from the Products card ("View our work
  →") or the homepage hero ("Get a website built →"). Contains:
  - A services grid (marketing sites, web apps, e-commerce, maintenance).
  - A portfolio grid — **currently 3 placeholder client-project cards**,
    clearly labeled "Placeholder" in the UI. Replace `name`, description,
    tag, and link for each with real client work.
  - A testimonials section that fetches from the same `/api/db/testimonials`
    endpoint as the main Reviews page (the schema doesn't distinguish
    testimonials by product/service, so both sections currently show the
    same approved testimonials — add a `service` column to
    `website_testimonials` if you want them separated later).
- Waitlist form's "interest" dropdown changed from BOSS/SOVR/Both to
  BOSS/Web Development/Both.
- FAQ, About, and Home hero copy updated to reference web development
  instead of SOVR.

## Changelog — 2026-08-29 fix session

Everything in the "Fix checklist" above is now done:

- **Created `src/components/LegacyLoader.client.tsx`** — was imported but never
  existed. Renders the HTML string and re-executes any `<script>` tags inside
  it (required, since `dangerouslySetInnerHTML` does not auto-run scripts).
- **Created `src/app/layout.tsx`** — root layout, was missing entirely.
  Includes base `<html>`/`<body>` + site metadata/Open Graph tags.
- **Deleted `src/app/page.js`** — was a duplicate of `page.tsx` on the same
  route.
- **Rebuilt `src/app/page.tsx`** — the previous file only had placeholder
  comments where real content should be (see below). Rebuilt as a real,
  functional page with 8 sections matching the nav (home, products, about,
  testimonials, support, contact/"care", faq, waitlist), wired to the real
  `/api/db/*` routes: the waitlist and contact forms POST and show live
  success/error states, and the testimonials section fetches approved
  testimonials on demand. Copy is a placeholder built from verified facts
  found elsewhere in the repo (product names BOSS/SOVR, tagline, live BOSS
  app URL, CAC number) — **swap in real marketing copy when you have it.**
- **Fixed `package.json`** — `react`/`react-dom` bumped to `^19.0.0` to match
  Next 16's requirement; `typescript` fixed from a non-existent `^6.0.0` to
  `^5.6.3`; added `@types/node` and `@types/react-dom`.
- **Fixed `src/app/t/[slug]/page.tsx`** — Next.js 16 made route `params` a
  `Promise`; the code was still accessing it synchronously (`params.slug`),
  which throws at runtime. Now does `const { slug } = await params`. Also
  fixed a `BASE_URL` that pointed at `boss-africa.vercel.app` instead of this
  site's actual domain.
- **Fixed `src/app/sitemap.ts`** — same stray `boss-africa.vercel.app`
  fallback URL, now matches `robots.ts`/`layout.tsx`/`structured-data.tsx`.

### ⚠️ Things I found but deliberately did NOT change (need your decision)

- **`src/app/api/monoversal/*` (orchestrator/status/resume/admin/approve)**
  read and write files under `.monoversal/` on the local filesystem via
  Node's `fs`/`path`. **This will not work on Vercel** — serverless functions
  there have a read-only filesystem (except `/tmp`, which doesn't persist
  between invocations). If this subsystem needs to run in production, it
  needs to move to Neon (or another persistent store) instead of local files.
  Left as-is since this may be intentionally local-only dev tooling — confirm
  before I rework it.
- **Admin auth (`/api/admin/auth`, checked by `/api/admin/data`)** signs a
  token as `base64("mono-" + timestamp + "-" + ADMIN_PASS)` and later checks
  the decoded string contains `ADMIN_PASS`. This is reversible (base64 isn't
  encryption) and the "signature" is really just the password again in
  disguise — functionally it works, but isn't a real signed token. Consider
  a proper HMAC-signed cookie or a session table if this needs to be hardened.
- **No `tailors` table in `neon/schema.sql`** — `/api/tailors`,
  `/t/[slug]/page.tsx`, and `sitemap.ts` all query a `tailors` table with
  very defensive `COALESCE(col_a, col_b, col_c)` column lookups, suggesting
  the schema was uncertain even to whoever wrote it. This likely lives in a
  separate database (probably the BOSS app's own DB, not this repo's Neon
  instance) — confirm where `tailors` actually lives before relying on
  `/t/[slug]` pages working.

## How to work on this project going forward

- Before changing anything in `page.tsx`'s HTML blob, search within the string
  for the relevant `id`/class — it's effectively a self-contained mini SPA with
  its own `.page`/`.page.active` show/hide system driven by `window.show()`.
- Treat `src/app/api/monoversal/*` as a distinct subsystem (orchestrator/job
  queue) — read all four routes together before editing any one of them.
- Env vars needed: `DATABASE_URL`, `ADMIN_PASS` (see README.md).
- Always run a local `npm run build` before assuming a deploy will work — this
  project has already shipped at least one build-breaking change (the missing
  `LegacyLoader` import) straight to production.
