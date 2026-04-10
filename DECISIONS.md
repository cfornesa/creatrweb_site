# Decisions

## Project Profile

<!-- Operational details for this project. Kept here, not in AGENTS.md,
     to keep the root instruction file framework-agnostic and safe to
     publish. -->

- **Stack:** Next.js 15 + TypeScript
- **Deployment:** Hostinger Node.js v20 — single standalone app, one
  entry point (`npm start`), one process. Never propose a separate
  service, separate port, or separate deployment — route everything as
  a Next.js API route.
- **Database:** SQLite at `./data/creatrweb.sqlite` via Drizzle ORM.
  `DATABASE_URL` is set in `.env` locally and in hPanel on Hostinger.
  `.env` and `data/` are in `.gitignore` and do not deploy.
- **Version pin:** `next@^15.3.0`. Never run `npm install next` without
  an explicit version specifier. If a newer major resolves during
  install, stop, flag it, and downgrade before proceeding.
- **Required dev dependency:** `dotenv` — required by `drizzle.config.ts`
  to read `.env` at migration time. No external data transmission.
  Documented in `docs/dependencies.md`.
- **Framework AGENTS.md:** `nextjs/AGENTS.md` does not exist. Sessions
  follow root `AGENTS.md` only.
- **Profile switch rule:** Stop before touching existing files. Record
  current state and reason here. Confirm new profile explicitly. Flag
  every file needing migration before starting.

---

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

### Unresolved Checkpoints entering Phase 3
- [ ] Run `npx drizzle-kit generate && npx drizzle-kit migrate` for `document_embeddings` table.
- [ ] Implement Phase 3 content routes and admin panel as per the project plan.
