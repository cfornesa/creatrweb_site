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
  follow root `AGENTS.md` only until it is created.
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

- **Home Page Centering:** Reduced `.main` padding in `app/page.module.css` from `64px` to `24px` to improve vertical centering on desktop.
- **Studio Journal Scaling:** 
    - Reduced `.symbolHero` to `80px` (mobile) / `100px` (desktop).
    - Reduced `.title` to `2.25rem` (mobile) to prevent line-wrapping.
    - Reduced `.section` padding and margins on mobile for better density.
- **Terminal Mobile UX:**
    - Terminal overlay is now full-screen on mobile (`max-width: 768px`).
    - Close button size increased (`1.5rem`) and padding added for accessibility.
    - Added `env(safe-area-inset-bottom)` to terminal footer.
- **Constraint Compliance:** Maintained `app/page.tsx` as a Server Component and avoided `<style jsx>` in new CSS Module implementations.

### Vendor Dependency Recorded
- `@mistralai/mistralai` sends data off-domain to Mistral API servers.
  Self-hosting path documented in `docs/dependencies.md`.
  Required env vars: `MISTRAL_API_KEY`, `AGENT_ID`.

### Environment Variables Required Before Build
- DATABASE_URL
- MISTRAL_API_KEY
- AGENT_ID

### Unresolved Checkpoints Entering Phase 3
- [ ] Run `npx drizzle-kit generate && npx drizzle-kit migrate` for
      `document_embeddings` table.
- [ ] Migrate `TerminalDialog.tsx` from `<style jsx>` to CSS Modules.
- [ ] Add `"dev": "next dev"` to `package.json` scripts.
- [ ] Confirm `npm run dev` and `npm run build` pass cleanly.
- [ ] `nextjs/AGENTS.md` does not yet exist — lint and test commands
      are unconfirmed.