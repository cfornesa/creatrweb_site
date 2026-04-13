# Decisions

## Project Profile

<!-- Operational details for this project. Kept here, not in AGENTS.md,
     to keep the root instruction file framework-agnostic and safe to
     publish. -->

- **Stack:** Express 4 + TypeScript, bundled to `server.bundle.js` via
  esbuild. No React — client interactivity is vanilla JS in
  `public/js/app.js`. Static HTML pages in `public/`.
- **Deployment:** Hostinger Node.js v20 — single esbuild bundle
  (`server.bundle.js`), one process. Entry file in hPanel:
  `server.bundle.js`. NPM install command: `npm install && npm run build`.
  Never propose a separate service, separate port, or separate deployment
  — route everything through `server.ts` as an Express route or
  `POST /chat`.
- **Database:** SQLite at `./data/creatrweb.sqlite` via Drizzle ORM.
  `SQLITE_DATABASE_URL` is set in `.env` locally and in hPanel on
  Hostinger. `.env` and `data/` are in `.gitignore` and do not deploy.
  RAG context is stored separately in `embeddings.json`.
- **Version pin:** `express@^4`, `esbuild@^0.25`, `tsx@4.21.0` (pinned),
  Node `20.x`
- **Build artifact:** `server.bundle.js` is gitignored. Hostinger builds
  it at deploy time via `npm install && npm run build` in hPanel.
- **Required dev dependency:** `dotenv` — loaded at server start via
  `import "dotenv/config"` in `server.ts`. No external data transmission.
  Documented in `docs/dependencies.md`.
- **Framework AGENTS.md:** No framework-specific AGENTS.md. Sessions
  follow root `AGENTS.md` only.
- **Profile switch rule:** Stop before touching existing files. Record
  current state and reason here. Confirm new profile explicitly. Flag
  every file needing migration before starting. Visual parity with the
  current site is mandatory during framework migration. Preserve the
  iMac monitor frame, two-mode palette, system-font stack, hard-offset
  shadows, Unicode-only symbol language, mobile pill navigation, and
  current motion limits unless a specific incompatibility is documented
  first.

---

## Example Phase 1 — [Tool Name]

<!-- Created by the agent at session start.
     Record every significant decision made during this phase.
     Use bullet points. One fact per bullet.
     Flag gaps or deferred items as noted below. -->

### Stack Confirmed
<!-- e.g. which framework, runtime, package manager, config approach -->

### Schema and Data Decisions
<!-- e.g. ID strategy, timestamp format, default values, unique columns -->

### Files Created
<!-- List every file created and its purpose -->

### Vendor Dependencies Added
<!-- For each: name, purpose, sends data off-domain (yes/no),
     self-hosting alternative, documented in docs/dependencies.md -->

### Environment Variables Required
<!-- List names only — no values. e.g.:
     - DATABASE_URL
     - API_KEY_NAME -->

### Gaps and Deferred Items
<!-- Any Phase 1 deliverable not completed, logged for the next phase -->

### Unresolved Checkpoints Entering Phase 2
- [ ] <!-- item -->

---

## Example Phase 2 — [Tool Name]

<!-- Same structure as Phase 1. Add a "Corrections Applied" subsection
     if prior-phase errors were fixed in this session. -->

### Phase N Gap Discovered
<!-- If a prior-phase deliverable was missing, record it here with a
     note that it is a prior-phase gap, not a Phase 2 decision. -->

### Components Built
<!-- List each component/route/feature with its file path and purpose -->

### Corrections Applied
<!-- What was wrong, what was fixed, what file changed -->

### Vendor Dependencies Added
<!-- Same format as Phase 1 -->

### Environment Variables Required
<!-- Cumulative list — include all variables from prior phases plus new -->

### Unresolved Checkpoints Entering Phase 3
- [ ] <!-- item -->

---

<!-- Add a new dated section at the start of each phase following
     the same pattern. Resolved checkpoints from the prior phase
     should be marked [x] and left in place — do not delete them.
     They are the audit trail. If empty, begin with Phase 1. -->

## 2026-04-11 — Hostinger Build Contract Fix (Codex CLI)

- Reproduced the Hostinger failure locally with the exact production-only
  install path: `npm ci --omit=dev && npm run build` failed with
  `sh: esbuild: command not found`.
- Root cause confirmed: `package.json` classified both `esbuild` and
  `dotenv` as `devDependencies`, but the deploy build depends on both.
  `esbuild` must exist as a CLI during `npm run build`, and
  `server.ts` imports `dotenv/config` during bundling.
- Promoted `esbuild` and `dotenv` to `dependencies`. Left `tsx`,
  `typescript`, `drizzle-kit`, and `@types/*` in `devDependencies`.
- Kept the build and runtime contract unchanged: `npm run build` still
  emits `server.bundle.js`, and production startup still uses
  `node server.bundle.js`.
- Updated `README.md` so the documented Hostinger settings now match the
  current Express + esbuild deployment: `Other` preset, root `./`,
  Node `20.x`, blank Output directory, build command `npm run build`,
  entry file `server.bundle.js`.
- No routes, public files, styles, database logic, or chat behavior were
  changed in this fix.

## 2026-04-08 — Phase 1 (Codex CLI)

- Confirmed stack: Next.js 15 + TypeScript on Hostinger Node.js v20
  using npm.
- `next.config.ts` uses `output: "standalone"` only, with no
  experimental flags.
- `package.json` was kept minimal — only `build` and `start` scripts
  plus the Node.js engine constraint.
- No additional package declarations added beyond what was requested.
- `drizzle.config.ts` reads the SQLite database file path from
  `DATABASE_URL` via `import "dotenv/config"`.
- Database ID strategy — confirmed hybrid model:
  - `posts.id` — text primary key for content portability.
  - `webmentions.id`, `auth_tokens.id`, `auth_codes.id` — auto-
    incrementing integer primary keys.
- Timestamp columns stored as SQLite text for human-readable exports:
  `posts.published_at`, `webmentions.received_at`,
  `auth_tokens.issued_at`, `auth_tokens.expires_at`,
  `auth_codes.expires_at`.
- Operational timestamp defaults use `CURRENT_TIMESTAMP` where
  appropriate: `webmentions.received_at`, `auth_tokens.issued_at`.
- `posts.slug` is unique. `auth_tokens.token_hash` and
  `auth_codes.code_hash` are unique.
- `posts.syndicated_urls` stored as JSON string in text column,
  default `[]`.
- `webmentions.status` defaults to `pending`.
- `pm2.config.js` runs a single forked process named `creatrweb` from
  `.next/standalone/server.js` with `NODE_ENV=production`.
- Root `AGENTS.md` was rewritten from generic template into a project-
  specific guide during this session. **Superseded** — root `AGENTS.md`
  has since been restored to the generic portable template. Project-
  specific details now live in this file under Project Profile above.
- `MEMORY.md` created with initial confirmed session learnings after
  explicit user approval.
- Local database path set to `./data/creatrweb.sqlite`. `data/` and
  `.env` added to `.gitignore`.
- `drizzle-kit generate` created initial migration at
  `drizzle/0000_regular_marrow.sql`.
- `drizzle-kit migrate` applied successfully.
- `next` initially resolved to `^16.2.3` due to unpinned install.
  Downgraded to confirmed `^15.3.0` range.
- `dotenv` added as dev dependency.

---

## 2026-04-09 — Phase 2 (Gemini CLI)

### Phase 1 Gap Discovered
- `tsconfig.json` was absent — a Phase 1 deliverable that was never
  created. Gemini CLI created it during this session with
  `moduleResolution: "bundler"` and the `@/*` path alias for Next.js
  15. This is a Phase 1 gap, not a Phase 2 decision.

### Components Built
- **Identity-First Home Page** (`/`) using `HCard.tsx` with IndieWeb
  microformats (`h-card`, `p-name`, `u-url`, `u-photo`, `p-org`,
  `p-note`).
- **Studio-Journal Projects Page** (`/projects`) — mobile-first bento-
  box grid.
- **Terminal Dialog** — `TerminalDialog.tsx` retro-terminal UI for
  chat, launched via `TerminalTrigger.tsx`.
- **Mistral AI chat backend** — `app/chat/route.ts` (not
  `/api/chat/route.ts` — confirmed route is `/chat`).
- **RAG indexing script** — `scripts/rag-index.ts`, invoked only via
  `npm run rag:index`. Embeds files from `documents/` folder.
- `document_embeddings` table added to `lib/schema.ts`.
  **Migration not yet run** — `npx drizzle-kit generate &&
  npx drizzle-kit migrate` required before first use.

### Corrections Applied in Fix Session
- `app/page.tsx` was incorrectly set as a `"use client"` component.
  Corrected — it is now a Server Component. Client state moved to
  `TerminalTrigger.tsx`.
- `app/projects/page.tsx` used `<style jsx>` — replaced with
  `projects.module.css` (CSS Modules).
- `TerminalDialog.tsx` still contains `<style jsx>` as of Phase 2
  close. **Unresolved — must be migrated to CSS Modules in Phase 3.**
- Chat route confirmed at `/chat`, not `/api/chat`. `TerminalDialog`
  fetch URL updated accordingly.
- `HCard.tsx` updated to accept a `profiles` prop for `rel="me"` links
  rather than hardcoded values.
- Cosine similarity implemented in `app/chat/route.ts` for true vector
  RAG retrieval, replacing the earlier keyword fallback.
- `global.d.ts` created to declare CSS module types for TypeScript.
- `npx tsc --noEmit` passes with zero errors as of Phase 2 close.

### 2026-04-09 — UI/UX Refinement (Gemini CLI)

- **Home Page Centering:** Reduced `.main` padding in `app/(system)/page.module.css` from `64px` to `24px` to improve vertical centering on desktop.
- **Studio Journal Scaling:** 
    - Reduced `.symbolHero` to `80px` (mobile) / `100px` (desktop).
    - Reduced `.title` to `2.25rem` (mobile) to prevent line-wrapping.
    - Reduced `.section` padding and margins on mobile for better density.
- **Terminal Mobile UX:**
    - Terminal overlay is now full-screen on mobile (`max-width: 768px`).
    - Close button size increased (`1.5rem`) and padding added for accessibility.
    - Added `env(safe-area-inset-bottom)` to terminal footer.
- **Constraint Compliance:** Maintained `app/(system)/page.tsx` as a Server Component and avoided `<style jsx>` in new CSS Module implementations.

### Vendor Dependency Recorded
- `@mistralai/mistralai` sends data off-domain to Mistral API servers.
  Self-hosting path documented in `docs/dependencies.md`.
  Required env vars: `MISTRAL_API_KEY`, `AGENT_ID`.

### Environment Variables Required Before Build
- DATABASE_URL
- MISTRAL_API_KEY
- AGENT_ID

### 2026-04-09 — Hostinger Deploy Fix (Codex CLI)

- Hostinger build failed while collecting `/chat` because `lib/db.ts`
  opened SQLite at import time and the deploy environment did not have
  the git-ignored `./data/` directory yet.
- Least disruptive fix applied: `lib/db.ts` now creates the parent
  directory for `DATABASE_URL` before opening the SQLite file, which
  preserves existing route behavior while preventing this deploy-time
  crash.
- No dependency or design changes were made. npm deprecation warnings
  and audit notices were not treated as the build blocker.

---

## 2026-04-09 — /readme Route (Claude Code)

- New public route `/readme` created. Renders the full README.md methodology as a styled page.
- Back link goes to `/` (home), not `/projects` — this page describes the framework, not a project.
- Symbol hero: `◈`.
- Styling: reuses `app/project-detail.module.css` base; `app/readme/readme.module.css` adds code blocks, table, prompt examples, and sub-section headings.
- No new vendor dependency introduced. No microformats markup. No `"use client"` directive.
- URL `/readme` is a new permanent URL. Confirmed by user as part of this session scope.
- DECISIONS.md and MEMORY.md were not updated during the implementation session — logged as a compliance gap in the post-session eval.

### CLAUDE.md Rule — Gallery Suppression in Plan Mode

- Rule added to root-level `CLAUDE.md` and `public/markdown/CLAUDE.md` after post-session eval identified a Rule 2 failure caused by high-specificity prompt suppression.
- Rule text: *"When Claude Code is in Plan Mode and the user's prompt names a specific route, file, or output format — triggering gallery suppression — explicitly note the suppression at the top of the plan and offer one alternative framing before building."*
- **Applicability to new projects:** Confirmed applicable. Gallery suppression is a model-level inference behavior, not project-specific. The rule travels correctly with the `public/markdown/CLAUDE.md` template. New users get the protection without needing the history that surfaced it; the README `/readme` page documents that history under "Known Behavioral Limitation."

---

## 2026-04-09 — Phase 2 Final Cleanup (Gemini CLI)

- **Structural Consistency:** Migrated `TerminalDialog.tsx` to CSS Modules (`TerminalDialog.module.css`). Inline `<style jsx>` removed.
- **Standalone Tracing:** Updated `next.config.ts` with `outputFileTracingRoot: __dirname` to resolve the workspace root lockfile warning and ensure reliable standalone builds.
- **Integrity Check:** Final `npm run build` completed successfully with zero warnings.
- **Visual Design - Retro-Modern Hybrid:** Implemented a major visual overhaul combining modern MacOS window elements (traffic light dots, CamelCase naming) with a retro computer monitor aesthetic (thick borders, hard shadows, monitor frame wrapper).
- **Navigation Transformation:** All primary navigation and social links converted from text/pills to "Desktop Icons" with square graphics and hard shadows.
- **Terminal Integration:** The terminal UI was updated to match the Mac window aesthetic, and its trigger was integrated into the desktop icon area.
- **Drawer Refinement:** The methodology drawer was adjusted to a standard 24px margin for better cohesion with the identity card.
- **Note on Protocols:** Speculative creation of `nextjs/AGENTS.md` was attempted and subsequently reverted to maintain strict compliance with root `AGENTS.md` ownership rules.

### 2026-04-09 — Phase 2 UI Redesign (Gemini CLI)

- **Desktop Height Optimization:** Applied Option 1 (Max-Height Clamp) using `calc(100dvh - 120px)` on `.monitorFrame`. This ensures the iMac stand and base are always visible within the viewport, with the monitor scaling down proportionally on shorter screens.
- **Mobile Safari Redesign (Option C):** 
    - Implemented a floating "pill" navigation bar (`MobileNavPill.tsx`) at the bottom center of the mobile view.
    - Pill contains: Back button (external link to Augment Humankind), current page title, and a Chat icon (💬).
    - Added a static server-rendered UTC time (`HH:MM UTC`) to the top-left of the mobile Safari header.
    - Hidden the top URL bar and navigation arrows in the mobile Safari interface for a cleaner, modern look.
    - Hidden the desktop-style "Terminal" icon on mobile, as its functionality is now served by the chat icon in the navigation pill.
- **Structural Integrity:** Maintained `app/page.tsx` as a Server Component by extracting interactive mobile navigation logic into the `MobileNavPill` Client Component.

### 2026-04-10 — Layout Refinement (Gemini CLI)

- **Desktop Alignment:** Changed `.main` to `justify-content: flex-start` with `padding-top: 64px`. This provides a consistent top margin for the iMac frame while the `max-height` ensures the base remains visible.
- **Mobile Safari Cleanup:** Completely hidden the top `.safariHeader` framing on mobile for a cleaner, full-screen content feel.
- **Real-Time Clock:** Replaced static server-rendered time with a ticking `MobileClock.tsx` Client Component. It is `position: fixed` at the top-left of the mobile viewport, floating over the content.
- **Site-Wide Framing (Option C):**
    - Implemented a Route Group `(system)` to wrap all core pages in the iMac and Safari framing.
    - Extracted shared layout logic into `app/(system)/layout.tsx` and shared styles into `system-layout.module.css`.
    - Refactored `DesktopToolbar` and `MobileNavPill` to dynamically display the page title based on the current URL path using `usePathname`.
    - Moved `/readme`, `/projects`, `/indieweb-platform`, `/creatrweb-rag`, and `/terminal-ui` into the `(system)` route group to inherit the shared layout automatically.
- **Mobile Navigation Hierarchy:** Implemented dynamic back-button logic in `MobileNavPill.tsx`. `/projects` and `/readme` link back to `/`; project detail pages (`/indieweb-platform`, etc.) link back to `/projects`; the root route (`/`) maintains the external link to Augment Humankind.

### 2026-04-10 — Path and Documentation Alignment (Gemini CLI)

- **Constraint Remapping:** Updated `CONSTRAINTS.md` to reflect the move of core pages to the `(system)` route group (e.g., `app/page.tsx` → `app/(system)/page.tsx`).
- **EVAL_PROMPT.md Consolidation:** Confirmed `EVAL_PROMPT.md` remains at the root directory. Updated `README.md` and `app/(system)/readme/page.tsx` (manually by user) to remove stale references to `docs/eval-prompt.md`.
- **Template Separation:** Confirmed that `public/markdown/` files serve as immutable templates and must remain separate from root-level active project documentation.

---

## 2026-04-12 — Chat Route and Port Fix (Gemini CLI)

- **Decision:** Renamed the chatbot endpoint from `/chat` to `/api/api/chat`. This reduces the risk of the route being blocked by Hostinger's Web Application Firewall (WAF) or other hosting-level security filters which often flag root-level `/chat` paths.
- **Decision:** Changed the default development port from `5000` to `3000` in `server.ts`. This avoids `EADDRINUSE` conflicts on macOS workstations where port 5000 is often reserved by AirPlay Receiver.
- **Correction:** Enhanced the `extractErrorMessage` logic in `src/routes/chat.ts` to handle Mistral AI error bodies that are either non-JSON or contain a `detail` field instead of a `message` field.
- **Correction:** Added explicit `console.error` logging for server-side configuration gaps (missing API keys or database URLs) to improve debugging speed.
- **Deployment Guidance:** Confirmed that `SQLITE_DATABASE_URL` on Hostinger must use an absolute path (`/home/u276695328/...`) to ensure the `better-sqlite3` driver resolves the file correctly under Phusion Passenger.

### Environment Variables Required
- SQLITE_DATABASE_URL (Absolute path for Hostinger)
- MISTRAL_API_KEY
- AGENT_ID
- PORT (Optional, defaults to 3000)


## 2026-04-11 — Local Dev Port Adjustment (Codex CLI)

- Local `npm run dev` changed from port `5000` to `3000` in
  `package.json` because port `5000` was already occupied on this macOS
  workstation.
- Production `npm start` remains on port `5000` to preserve the
  existing Hostinger deployment contract and avoid changing runtime
  assumptions.
- No route, database, or deployment behavior changed in this session;
  only the local development entrypoint was adjusted.

---

## 2026-04-11 — Hostinger Asset Fix (Gemini CLI)

- **Root Cause Identified:** 404 errors for CSS/JS on Hostinger were caused by the Next.js server not finding the `public` and `static` folders. Even when using `npm start`, environmental differences in how Hostinger routes requests can cause asset misplacement.
- **Correction Applied:** 
    - Re-enabled `output: "standalone"` in `next.config.ts`.
    - Updated `package.json` to manually copy `public/` and `.next/static/` into the standalone directory as part of the `build` script.
    - Updated `pm2.config.js` to run the standalone `.next/standalone/server.js` directly with `NODE_ENV=production` and `PORT: 5000`.
- **Outcome:** This ensures all assets are bundled alongside the server entry point, making the deployment independent of parent directory structure.

---

## 2026-04-11 — Hostinger Runtime Alignment (Codex CLI)

- Updated `package.json` so production `npm start` now runs
  `node .next/standalone/server.js` directly instead of `next start`.
- Kept `npm run build` on the standalone contract that copies
  `public/` and `.next/static/` into `.next/standalone/`.
- Updated `README.md` so Hostinger deployment guidance now matches the
  actual runtime contract: repo root working directory, standalone
  server entrypoint, `NODE_ENV=production`, and `PORT=5000`.
- This removes the mismatch where project docs suggested a generic
  Next.js start flow while the deployed build artifacts were prepared
  for standalone execution.

---

## 2026-04-11 — Standalone Asset Verification (Codex CLI)

- Added `scripts/verify-standalone-assets.mjs` to read
  `.next/app-build-manifest.json` and `.next/build-manifest.json`,
  collect all referenced `static/` assets, and fail if either the
  build output or `.next/standalone/.next/` is missing any of them.
- Updated `package.json` so `npm run build` now runs the standalone
  asset verifier after copying `public/` and `.next/static/`.
- Added `npm run verify:standalone` for manual post-build checks.
- Updated `README.md` so Hostinger deployment instructions now name
  the required `Other` preset, `./` root directory, empty output
  directory, `.next/standalone/server.js` entrypoint, and clean-
  cutover validation steps.

---

## 2026-04-11 — Astro Migration (Codex CLI)

- Replaced the Next.js 15 runtime with Astro 5 SSR using
  `@astrojs/node` in standalone mode and `@astrojs/react` for the
  existing interactive components.
- Preserved the existing visual system by keeping the iMac-frame
  layout, current CSS Modules, Unicode iconography, system font stack,
  and motion patterns while moving page routing into `src/pages/`.
- Converted the `/chat` endpoint to an Astro API route and kept the
  SQLite + Drizzle layer unchanged apart from framework integration.
- Updated production startup to `HOST=0.0.0.0 node ./dist/server/entry.mjs`
  and aligned `pm2.config.js`, `README.md`, `.gitignore`, and
  `docs/dependencies.md` with the Astro deployment contract.

---

## 2026-04-11 — Hostinger Cutover Guidance (Codex CLI)

- Confirmed the presence of both `nodejs/` and `public_html/` on
  Hostinger is normal for this app and does not, by itself, indicate a
  bad deployment.
- Confirmed `public_html/.htaccess` is the routing layer and should
  point Passenger at `nodejs/dist/server/entry.mjs`, while `nodejs/`
  remains the live application workspace.
- Confirmed `public_html/.builds/` is Hostinger-managed deployment
  state rather than published site content.
- Identified stale deployment state as the main operational risk:
  `nodejs/` may retain old framework artifacts such as `.next/`, and
  `.builds/` may preserve install/build cache across redeploys.
- Adopted a clean-cutover recovery path for the next redeploy:
  purge Hostinger build cache, stop the app if possible, clear stale
  app artifacts from `nodejs/`, keep only routing glue in
  `public_html/`, and redeploy the Astro SSR app from the normalized
  `dist/server/entry.mjs` contract.
- Deferred any `tsx` version pin until after a clean redeploy; the
  `tsx` / `esbuild` mismatch is treated as a secondary install/cache
  issue unless it reproduces again from the cleaned state.

---

## 2026-04-11 — Hostinger Static Asset Fix (Claude Code)

- **Root cause identified:** `@astrojs/node` standalone mode bakes absolute
  `file://` paths into `dist/server/entry.mjs` at build time, pointing to
  the machine where `astro build` ran. Hostinger builds in
  `.builds/source/repository/` but Passenger runs the app from `nodejs/`.
  The hardcoded `client` path in `entry.mjs` references the build-time
  location, so static assets (`/_astro/*.css`, `/_astro/*.js`) cannot be
  found at runtime — causing all CSS and JS to return 404 while SSR HTML
  renders correctly.
- **Fix applied:** `scripts/patch-entry.mjs` added as a post-build step.
  Replaces the two absolute `file://` paths in `dist/server/entry.mjs`
  (`client` and `server` keys in `_args`) with `import.meta.url`-relative
  equivalents so the built file resolves correctly from wherever it is
  deployed.
- `package.json` build script updated to:
  `astro build && node scripts/patch-entry.mjs`
- Script is idempotent: re-running after paths are already relative is a
  safe no-op.
- **Dependency note:** The patch relies on `@astrojs/node` continuing to
  emit `"client": "file://..."` as a string literal in `_args`. If that
  output format changes in a future adapter version, the regex will not
  match and the script will skip silently with a log message — the
  deployment will revert to broken static-asset behavior.
- **Separate hPanel fix still required:** Framework preset → `Other`,
  Output directory → blank. This fixes server startup. The patch-entry.mjs
  fix addresses CSS/JS serving once the server is running. Both changes
  are needed for a working deployment.

---

## 2026-04-11 — Express + esbuild Migration (Claude Code)

- Replaced Astro 5 SSR with Express 4 + static HTML + vanilla JS.
  Removed: `astro`, `@astrojs/node`, `@astrojs/react`, `react`,
  `react-dom`, `@types/react`, `@types/react-dom`, `scripts/patch-entry.mjs`,
  `app/`, `components/`, `src/pages/`, `src/layouts/`, `src/styles/`,
  `astro.config.mjs`.
- Added: `express@^4.21.2` (runtime), `esbuild@^0.25.5` (build),
  `@types/express@^5.0.1` (dev). Both documented in `docs/dependencies.md`.
- `server.ts` is the new entry point. Serves `public/` statically and
  routes `/`, `/projects`, `/readme`, `/indieweb-platform`,
  `/creatrweb-rag`, `/terminal-ui` to corresponding HTML files.
- `src/routes/chat.ts` ports the Astro chat API route to an Express
  `RequestHandler`. All business logic unchanged.
- Six static HTML pages in `public/` replace the React+Astro page tree.
  All CSS Modules merged to `public/styles/app.css` (kebab-case).
  `public/js/app.js` (vanilla) handles clock, nav pill, and terminal modal.
- h-card microformats (`h-card`, `u-url`, `p-name`, `u-photo`, `p-org`,
  `p-note`, `rel=me`) are server-rendered as static HTML in
  `public/index.html` — constraint satisfied without React or Astro SSR.
- `server.bundle.js` produced via esbuild with `--format=esm`,
  `--external:better-sqlite3`, `--external:fsevents`, and a
  `createRequire` banner for CJS interop.
- `package.json` adds `"type": "module"` so Node.js treats `.js` as ESM.
- Default local dev port: `3000` (Express convention, replacing Astro's
  `4321`). Production uses `PORT` env var from Hostinger.
- **Deployment contract:** `server.bundle.js` is gitignored. Hostinger
  builds it at deploy time via `npm install && npm run build` in hPanel.
  Entry file in hPanel changed from `dist/server/entry.mjs` →
  `server.bundle.js`.

---

## 2026-04-12 — Runtime Artifact Cleanup + Build Verification (Codex CLI)

- User confirmed that `./.agents`, `./.claude`, `./.gemini`, `./.github`,
  `./docs`, `./public`, `./screenshots`, `./scripts`, `./src`, and root
  markdown files must not be deleted under any circumstance.
- User confirmed `./deprecated` and `./public_html` can be removed.
- Cleanup policy for this session: preserve historical deployment notes in
  `MEMORY.md` and `DECISIONS.md`, even when related runtime artifacts are
  deleted from the repository.
- Removed stale runtime artifacts and files no longer used by the current
  Express deployment: `.next/`, `deprecated/`, `public_html/`,
  `pm2.config.js`, `global.d.ts`, `tsconfig.tsbuildinfo`, `.DS_Store`.
- Retained Drizzle runtime and migration files because the active routes
  still open SQLite through Drizzle ORM for posts and webmentions.
- Updated current-facing repo docs to match the active Express runtime while
  leaving older Next/Astro notes intact in historical records.
- Reinstalled dependencies with `npm install`; local `npm run build` now
  succeeds and emits `server.bundle.js` via esbuild.

---

## 2026-04-12 — RAG Structure: JSON-based Vector Storage (Gemini CLI)

- **Decision:** Shifted RAG storage from a SQLite database (`document_embeddings` table) to a flat JSON file (`embeddings.json`) in the root directory. This simplifies deployment and avoids database locking/schema issues on Hostinger.
- **Decision:** Switched to Mistral Embeddings Model (`mistral-embed`) for all document chunking and user query embedding.
- **Decision:** Implemented character-based chunking with overlap in `scripts/rag-index.ts` to improve retrieval context quality.
- **Decision:** Indexing is now strictly manual via `npm run rag:index`. No indexing occurs during server startup or visitor interaction, fulfilling the "no indexing on deployment" requirement.
- **Correction:** Removed the unused `document_embeddings` table from `lib/schema.ts` to clean up the codebase.
- **Optimization:** Added in-memory caching for the `embeddings.json` content in `src/routes/chat.ts` to ensure fast response times for chat requests.
- **Context:** Documents are now sourced from a new `documents/` folder in the root directory.
