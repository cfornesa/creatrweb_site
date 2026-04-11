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
