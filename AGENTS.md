# AGENTS.md

## Project Overview

- Stack: Next.js 15 + TypeScript.
- Package manager: npm.
- Runtime target: Node.js v20 (`20.x` in `package.json`).
- Deploy target: Hostinger Node.js v20 as a single standalone Next.js app.
- Process model: one app process started from `.next/standalone/server.js`.
- Database: one SQLite database, with the file path provided by `DATABASE_URL`.

## Key Commands

- `npm run build`  
  Currently defined. Runs `next build`.
- `npm start`  
  Currently defined. Runs `node .next/standalone/server.js`.
- `npm run dev`  
  Not defined yet. Add this script before using it.
- `npm run lint`  
  Not defined yet. Add this script before using it.
- `npm test`  
  Not defined yet. Add this script before using it.

## Schema Decisions

- Drizzle config reads the SQLite path from `DATABASE_URL`.
- Drizzle is configured against `./lib/schema.ts`.
- The schema currently defines four tables:
  - `posts`
  - `webmentions`
  - `auth_tokens`
  - `auth_codes`
- ID strategy is hybrid:
  - `posts.id` is a text primary key.
  - `webmentions.id`, `auth_tokens.id`, and `auth_codes.id` are auto-incrementing integer primary keys.
- `posts.slug` is unique.
- `auth_tokens.token_hash` and `auth_codes.code_hash` are unique.
- `posts.syndicated_urls` is stored as text with a default of `[]`.
- `webmentions.status` defaults to `pending`.

## File Structure Overview

- `next.config.ts`  
  Next.js config with `output: "standalone"`.
- `package.json`  
  npm metadata plus the current `build` and `start` scripts.
- `drizzle.config.ts`  
  Drizzle Kit config using `DATABASE_URL` for SQLite.
- `lib/db.ts`  
  `better-sqlite3` client and Drizzle connection.
- `lib/schema.ts`  
  Current SQLite schema definitions.
- `pm2.config.js`  
  PM2 process config for Hostinger VPS deployment.
- `DECISIONS.md`  
  Session decisions and recorded defaults.
- `README.md`  
  Project readme.
- `CLAUDE.md`  
  Additional agent guidance file present in the repo.
- `markdown/`  
  Contains separate markdown-specific guidance files.

## Boundaries

### May Do Without Asking

- Mechanical edits such as typo fixes, style adjustments, comment edits, and variable renames confined to one file.
- Work explicitly requested by the user within the stated scope.
- Update `DECISIONS.md` to record choices made during a session.

### Requires Confirmation

- Significant changes, including visible behavior changes, new routes, schema changes, or creating files that other files depend on.
- Irreversible decisions, especially URL structure, identity links, auth endpoints, syndication targets, and vendor dependencies.
- Any change to currently working specified technology if that technology appears non-functional.
- Creating `MEMORY.md` for the first time.
