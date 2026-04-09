2026-04-08 · DECISION · The database uses hybrid IDs: text for `posts.id`, integers for `webmentions.id`, `auth_tokens.id`, and `auth_codes.id`.
2026-04-08 · CORRECTION · `dev`, `lint`, and `test` scripts do not exist in `package.json` yet.
2026-04-08 · DECISION · The repo-root `AGENTS.md` was written from scratch in this session.
2026-04-08 · DECISION · Local `DATABASE_URL` is `./data/creatrweb.sqlite` and the initial Drizzle migration created that SQLite file.
2026-04-08 · CORRECTION · The unpinned `npm install` resolved `next` to `^16.2.3`, so the repo is not currently pinned to Next.js 15.
2026-04-08 · CORRECTION · `next` was corrected back to the requested `^15.3.0` range, and the installed version is now a verified 15.x release.
2026-04-08 · DECISION · `drizzle.config.ts` now auto-loads `.env` via `import "dotenv/config"`, with `dotenv` added as a dev dependency.
2026-04-09 · PREFERENCE · Use full-screen overlay for terminal UI on mobile (max-width: 768px).
2026-04-09 · PREFERENCE · Reduced vertical padding on home page (24px) for better vertical centering on desktop.
2026-04-09 · PREFERENCE · Studio Journal headings should be scaled down on mobile (2.25rem) to prevent excessive wrapping.
