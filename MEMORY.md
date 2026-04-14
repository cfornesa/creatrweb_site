2026-04-08 · DECISION · The database uses hybrid IDs: text for `posts.id`, integers for `webmentions.id`, `auth_tokens.id`, and `auth_codes.id`.
2026-04-08 · CORRECTION · `dev`, `lint`, and `test` scripts do not exist in `package.json` yet.
2026-04-08 · DECISION · The repo-root `AGENTS.md` was written from scratch in this session.
2026-04-08 · DECISION · Local `DATABASE_URL` is `./data/creatrweb.sqlite` and the initial Drizzle migration created that SQLite file.
2026-04-08 · CORRECTION · The unpinned `npm install` resolved `next` to `^16.2.3` due to unpinned install.
2026-04-08 · CORRECTION · `next` was corrected back to the requested `^15.3.0` range, and the installed version is now a verified 15.x release.
2026-04-08 · DECISION · `drizzle.config.ts` now auto-loads `.env` via `import "dotenv/config"`, with `dotenv` added as a dev dependency.
2026-04-09 · PREFERENCE · Use full-screen overlay for terminal UI on mobile (max-width: 768px).
2026-04-09 · PREFERENCE · Reduced vertical padding on home page (24px) for better vertical centering on desktop.
2026-04-09 · PREFERENCE · Studio Journal headings should be scaled down on mobile (2.25rem) to prevent excessive wrapping.
2026-04-09 · DECISION · Hostinger build failed because SQLite was opened before the git-ignored `data/` directory existed in the deploy environment.
2026-04-09 · DECISION · The deploy blocker was the SQLite directory assumption, not the npm deprecation or audit warnings from install.
2026-04-09 · DECISION · Hostinger deployment succeeded as a Node.js app after the SQLite parent directory was created before opening the database file.
2026-04-09 · CORRECTION · Plan Mode does not substitute for the gallery protocol (Rule 2); present 2–3 options even when a plan is approved via ExitPlanMode.
2026-04-09 · CORRECTION · DECISIONS.md must be updated in the same session as any new route or file creation, even when the change is simple.
2026-04-09 · CORRECTION · Propose MEMORY.md entries before every session end, including sessions that use Plan Mode — the end-of-session requirement applies regardless of mode.
2026-04-09 · DECISION · /readme route created; back link goes to / (home); uses project-detail.module.css base + readme.module.css for extended styles (code blocks, table, prompt examples).
2026-04-09 · DECISION · The CLAUDE.md gallery-suppression rule (Plan Mode + high-specificity prompts) is universally applicable and travels correctly with the public/markdown template to new projects; the Known Behavioral Limitation section in README.md and /readme provides the contextual backstory for new users.
2026-04-09 · PREFERENCE · Use `100dvh` and `align-items: flex-end` for mobile terminal layouts to ensure keyboard compatibility.
2026-04-09 · CORRECTION · Always present 2-3 divergent options before implementing UI layout changes, as per AGENTS.md Rule 2.
2026-04-09 · CORRECTION · Never create framework-specific AGENTS.md files speculatively; log their absence in DECISIONS.md instead.
2026-04-09 · PREFERENCE · Use CSS Modules (*.module.css) for all components to ensure structural consistency across phases.
2026-04-09 · DECISION · Use outputFileTracingRoot: __dirname in next.config.ts to ensure reliable standalone builds in workspace environments.
2026-04-09 · PREFERENCE · Implement \"recessed drawer\" article cards using negative top margins and higher stacking contexts for identity card depth.
2026-04-10 · PREFERENCE · Use `justify-content: flex-start` and `padding-top: 64px` on the main container to provide a top margin for the iMac without causing scroll overflow.
2026-04-10 · DECISION · Removed the top Safari framing on mobile to maximize content area and created a floating real-time `MobileClock` component.
2026-04-10 · DECISION · Used a semi-transparent backdrop blur (`backdrop-filter: blur(12px)`) for floating mobile elements to maintain readability over content.
2026-04-10 · DECISION · Implemented a glassmorphism desktop toolbar (48px height) inside the iMac screen with a real-time UTC clock and page title.
2026-04-10 · PREFERENCE · Increased desktop `.monitorContent` padding-top to 88px to compensate for the floating toolbar overlay and prevent content occlusion.
2026-04-10 · CORRECTION · When reorganizing route groups, audit CONSTRAINTS.md and README.md immediately to prevent broken path references in agent instructions.
2026-04-10 · DECISION · Root-level markdown files and their counterparts in `public/markdown/` must be maintained separately; root files track the active project, while `public/` files serve as immutable templates for new ones.
2026-04-10 · DECISION · Remapped CONSTRAINTS.md and README.md paths to align with the (system) route group migration and root-level EVAL_PROMPT.md location.
2026-04-10 · DECISION · Implemented a logical mobile navigation hierarchy in `MobileNavPill.tsx`: path-aware back buttons that transition through the site hierarchy (e.g., Detail -> Journal -> Home) rather than always linking externally.
2026-04-10 · PREFERENCE · Perform a documentation audit immediately following any route-group reorganization to ensure AGENTS.md and CONSTRAINTS.md remain actionable.
2026-04-10 · DECISION · Use helper functions like getBackUrlFromPath in Nav components to centralize navigation logic and ensure site-wide consistency.
2026-04-11 · DECISION · Local development now uses port 3000 while production remains on port 5000.
2026-04-11 · DECISION · A persistent macOS process was occupying port 5000, so the local Next.js dev script was moved off that port.
2026-04-11 · DECISION · Hostinger PM2 deployments are most reliable in `standalone` mode, provided that `public` and `.next/static` are manually copied into the standalone folder during the build script.
2026-04-11 · DECISION · Production `npm start` must run `node .next/standalone/server.js` so the Hostinger runtime matches the standalone build contract.
2026-04-11 · DECISION · Hostinger deployment guidance in `README.md` must stay aligned with the standalone runtime contract to avoid CSS and JS asset mismatches.
2026-04-11 · DECISION · Production builds now verify that every manifest-referenced static asset exists inside `.next/standalone` before deployment succeeds.
2026-04-11 · DECISION · Hostinger deployments for this repo must use the `Other` preset with entry file `.next/standalone/server.js`, not a managed `Next.js` preset.
2026-04-11 · DECISION · Next.js 15 was replaced with Astro 5 SSR using `@astrojs/node` and `@astrojs/react` while preserving the existing iMac-frame visual system.
2026-04-11 · DECISION · Hostinger production startup now uses `HOST=0.0.0.0 node ./dist/server/entry.mjs` for the standalone Astro runtime.
2026-04-11 · CORRECTION · Astro 5 is not compatible with `@astrojs/node@10` or `@astrojs/react@5`; the latest working adapter majors are 9 and 4.
2026-04-11 · PREFERENCE · For warning cleanup, prefer minimum-risk patches over component-boundary rewrites when visual parity should remain unchanged.
2026-04-11 · CORRECTION · Console errors mentioning "Receiving end does not exist" and "message channel closed" did not map to repo code and should be treated as likely extension noise unless reproduced in a clean browser profile.
2026-04-11 · CORRECTION · The terminal was hiding backend chat errors by falling back to "Error: No response." whenever `/chat` returned JSON without a `reply` field.
2026-04-11 · DECISION · Astro server runtime code now loads local env vars via `dotenv` so `/chat` and SQLite access work in local dev and standalone runs.
2026-04-11 · CORRECTION · Interactive React controls on Astro pages must be mounted as explicit islands; rendering them inside a non-hydrated page tree leaves them visibly present but non-clickable.
2026-04-11 · CORRECTION · Astro runtime files should not import `dotenv/config`; server secrets must come from Astro server env access instead.
2026-04-11 · DECISION · SQLite connection creation is now explicit per runtime context so Astro SSR and Node-only scripts can share the same DB code without import-time env coupling.
2026-04-11 · DECISION · On Hostinger, this Astro app's live runtime belongs in `nodejs/`, while `public_html/` acts as routing glue via `.htaccess` rather than as the app root.
2026-04-11 · CORRECTION · Hostinger deployment failures should be treated as stale-state issues first when `nodejs/` still contains old framework artifacts and `public_html/.builds` has preserved prior deploy state.
2026-04-11 · DECISION · Hostinger install instability around `tsx` / `esbuild` is first mitigated by exact-pinning `tsx` to the locally working resolved version before attempting broader dependency overrides.
2026-04-11 · CORRECTION · Adding `.npmrc` with `install-strategy=nested` did not resolve the `tsx` / `esbuild` install mismatch; the same failure reproduces on a clean local install.
2026-04-11 · DECISION · Hostinger-facing npm installs should use legacy peer handling up front; .npmrc now sets legacy-peer-deps=true alongside install-strategy=nested, which preserved local builds and fixed the clean-install tsx/esbuild mismatch reproduction.
2026-04-11 · DECISION · @astrojs/node standalone mode bakes absolute file:// paths into dist/server/entry.mjs at build time; these must be patched to import.meta.url-relative paths before deployment to Hostinger (scripts/patch-entry.mjs).
2026-04-11 · DECISION · Hostinger Astro preset is for static-output sites; SSR apps using output:"server" must use the Other preset with entry file dist/server/entry.mjs and a blank Output directory.
2026-04-11 · CORRECTION · Rule 2 (gallery) violated again — implemented patch-entry.mjs without presenting alternatives (copy to Apache web root, custom server.mjs wrapper). Gallery requirement applies to infrastructure/deployment fixes, not only UI changes.
2026-04-11 · DECISION · Replaced Astro 5 SSR with Express 4 + esbuild + vanilla JS. Stack: server.ts → server.bundle.js (esbuild), public/ for static HTML+CSS+JS, src/routes/chat.ts for the AI chat endpoint. React removed entirely.
2026-04-11 · DECISION · server.bundle.js is gitignored; Hostinger builds it at deploy time. hPanel NPM install command must be `npm install && npm run build`, not just `npm install`.
2026-04-11 · DECISION · hPanel Entry file must be `server.bundle.js` (was `dist/server/entry.mjs`). Astro SSR absolute-path fragility was the root cause of the original deployment failures.
2026-04-11 · DECISION · esbuild ESM bundle requires `--format=esm`, `"type":"module"` in package.json, and a `createRequire` banner for CJS dependencies (dotenv, express). Without the banner, CJS dynamic requires fail at startup.
2026-04-11 · DECISION · Local dev port is 3000 (Express convention). Port 4321 was Astro's default and should not be reused. Background test processes left running between shell sessions cause EADDRINUSE; always verify no orphaned process exists before running npm run dev.
2026-04-11 · CORRECTION · "Error: Failed to connect to backend" in the terminal chat means fetch() itself threw — the server crashed or the TCP connection was reset. It does NOT mean the server returned a JSON error. JSON errors produce "Error: [message]" instead.
2026-04-11 · DECISION · Hostinger production-only installs require build-critical packages like esbuild and dotenv to live in dependencies for the Express bundle contract to work.
2026-04-11 · CORRECTION · The repo README had stale Astro deployment guidance after the Express migration and must stay aligned with the current Hostinger entry file and build flow.
2026-04-12 · DECISION · Current deployment contract remains Express + esbuild + `server.bundle.js`; local `.next/` and similar framework runtime artifacts are legacy leftovers, while historical deployment notes stay preserved in project records.
2026-04-13 · DECISION · The RAG indexer now supports top-level `.md`, `.txt`, `.html`, and `.pdf` files in `documents/` through a shared local text-extraction pipeline.
2026-04-13 · STACK · PDF ingestion uses the local Apache-2.0 package `pdf-parse`, while HTML is converted to text without adding a second parser dependency.
2026-04-13 · CORRECTION · In-process PDF parsers failed on real project PDFs, so local PDF extraction for RAG indexing now uses Poppler's `pdftotext` CLI.
2026-04-13 · STACK · The RAG indexer supports `.md`, `.txt`, `.html`, and `.pdf`, with PDFs extracted locally through `pdftotext` rather than an npm PDF parser.
2026-04-14 · DECISION · Accessibility guidelines (semantic HTML, ARIA labels, keyboard navigation, contrast) implemented across all public HTML, CSS, and JS files.
2026-04-14 · PREFERENCE · Use High-Contrast Focus Outline (3px solid var(--accent-orange)) for :focus-visible project-wide.
2026-04-14 · DECISION · Darkened --accent-orange to #d35400 in light mode to meet WCAG AA contrast standards (4.79:1).
2026-04-14 · DECISION · Terminal modal implements focus trapping, Escape key listener, and focus restoration to the trigger element.
2026-04-14 Â· CORRECTION Â· Local tsx/esbuild failures on this Windows PC were caused by a missing or partial node_modules install, not by broken npm scripts.
2026-04-14 Â· DECISION Â· This repo expects Node 20.x for environment parity even though local build may still pass on Node 24.
