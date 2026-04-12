# CreatrWeb — IndieWeb Creative Collaboration Agent Framework

A portable kit of context files and loadable skills that guides AI coding
agents toward creative, human-steered, IndieWeb-aligned development. Works
across Claude Code, Codex CLI, Cursor, Gemini CLI, GitHub Copilot, and
Replit from a single source of truth.

---

## What This Is

This framework applies three principles consistently across every AI
tool you use:

- **Human ownership** — the agent asks before building, shows options
  before committing, and stops at irreversible decisions.
- **Distinct voice** — gallery-format choices resist AI averaging.
  Research shows human-steered sessions produce outcomes 2–4× better
  than passive ones (Walton et al., 2026).
- **IndieWeb longevity** — your content stays portable, your URLs
  never break, and every dependency is documented.

---

## Repository Structure

Place these files at the root of every new project before your first
agent session:
your-project/
├── AGENTS.md ← Main instruction file (all agents)
├── CLAUDE.md ← Claude Code entry point
├── CONSTRAINTS.md ← Active project constraints (starts empty)
├── DECISIONS.md ← Architecture log (agent fills during sessions)
├── DESIGN.md ← Your aesthetic references and identity
├── EVAL_PROMPT.md ← Post-session compliance audit
├── .env.example ← Environment variable reference
├── .agents/
│ └── skills/
│ ├── gallery-format/
│ │ └── SKILL.md ← Options protocol before design decisions
│ ├── socratic-depth/
│ │ └── SKILL.md ← Assumption-surfacing question taxonomy
│ ├── indieweb-specs/
│ │ └── SKILL.md ← IndieWeb specification reference
│ ├── indieweb-principles/
│ │ └── SKILL.md ← IndieWeb philosophy reference
│ ├── posse-syndication/
│ │ └── SKILL.md ← POSSE, URL conventions, export endpoints
│ └── design-workflow/
│ └── SKILL.md ← Populating and maintaining DESIGN.md
├── .gemini/
│ └── settings.json ← Gemini CLI context configuration
└── .github/
└── copilot-instructions.md ← GitHub Copilot entry point

Files the agent creates during sessions — do not create manually:
MEMORY.md ← Confirmed lessons (agent proposes, you approve)
docs/dependencies.md ← Vendor dependency registry (agent maintains)


---

## Setup — New Project

### Step 1 — Copy the kit

Copy all files from this template into your project root. No
configuration required before your first session.

### Step 2 — Fill in the Project Profile (optional)

Open `AGENTS.md` and find the **Project Profile** section near the top.
If you know what you are building, fill in the four fields at an
architecture level — no technical details required:
<!-- Replace any of the following existing details if you know what you want -->
Deployment: Node.js PaaS, single process, Express via npm start
Database: SQLite via Drizzle ORM
Version pins: Node 20, esbuild 0.25.x, tsx 4.21.0
Stack: Express + TypeScript + static HTML/CSS/JS


If you leave this blank, the agent will ask three plain-language
questions at the start of the first session and fill it in for you.

### Step 3 — Set up your environment

Copy `.env.example` to `.env` and fill in any values your project
needs. Never commit `.env` to version control — it is in `.gitignore`
by default.

### Step 4 — Start your first session

Open your chosen agent tool in the project directory and begin. The
agent reads `AGENTS.md` automatically. No special prompt is required
for the first session — it will ask one question to confirm the
current phase before writing any code.

### Hostinger deployment note

This repo is configured to deploy as a bundled Express app.

- `npm run build` runs esbuild against `server.ts` and emits
  `server.bundle.js`.
- `npm start` runs `HOST=0.0.0.0 node server.bundle.js`.
- On Hostinger, use the `Other` framework preset, keep the root
  directory at `./`, use Node.js `20.x`, keep the output directory
  empty, and set the entry file to `server.bundle.js`.
- Hostinger build settings should stay on `npm` with `npm run build`.
- Runtime environment should include `NODE_ENV=production` and
  `HOST=0.0.0.0` and `PORT=5000`.
- Do not point Hostinger at `dist/server/entry.mjs` or use managed
  `Astro` / `Next.js` presets for this repo.

If Hostinger is left on a preset that assumes framework-managed startup
instead of the bundled Express entrypoint, the app can deploy with
the wrong runtime contract even if the build itself succeeds.

Because some hosts install production dependencies only before running
the build, this repo keeps build-critical modules in `dependencies`.
`esbuild` is required to create `server.bundle.js`, and `dotenv` is
imported by `server.ts` during bundling.

### Step 5 — Reference AGENTS.md directly at session start

While AI agents are programmed to read `AGENTS.md`, their attention
can drift toward generic coding defaults without an explicit anchor.
Start every session with a SESSION CONSTRAINTS block:

> "Starting a new session.
> SESSION CONSTRAINTS: Follow all rules in AGENTS.md when processing
> all prompts in this conversation. Are you ready?"

This promotes reference-section rules into active working context
for the full session.

**If the agent skips a rule mid-session**, stop it immediately:
- "Stop. Check AGENTS.md Rule 2 before proceeding."
- "Wait — did you ask the Rule 1 question for this change?"

Human feedback and judgment is the single most important component
in this process — especially when building something authentic to
who you are.

---

## How Skills Work

Skills are focused instruction sets that extend `AGENTS.md` for specific
tasks. They live in `.agents/skills/` and are loaded on demand — the
agent reads a skill's `SKILL.md` only when the situation calls for it,
keeping the active context lean.

### Loading a skill

Reference a skill by name in your session prompt or mid-session:

> "Load `$gallery-format` and show me options for the URL structure."

Or, if `AGENTS.md` instructs the agent to load a skill automatically
(e.g. Rule 2 fires), the agent reads it without you needing to ask.

### Skill reference

| Skill | Load when |
|-------|----------|
| `$gallery-format` | Rule 2 applies — options needed before a design decision |
| `$socratic-depth` | Rule 1 applies — a question is needed before a significant change |
| `$indieweb-specs` | Implementing or modifying any IndieWeb specification |
| `$indieweb-principles` | A decision touches ownership, portability, or longevity |
| `$posse-syndication` | URL structure, syndication targets, or export endpoints |
| `$design-workflow` | `DESIGN.md` is empty, incomplete, or needs updating |

---

## File Reference

### `AGENTS.md`
The authoritative instruction file. Read by every agent on every
session start. Contains:
- Six Rules that override all agent defaults
- Brainstorm Mode for open-ended exploration
- Gallery protocol for design decisions
- IndieWeb specifications and POSSE rules
- Memory file management and session-end requirements

**Do not edit during a session.** Only the project owner changes
this file. The agent proposes changes as a diff and waits for approval.

---

### `CLAUDE.md`
A one-line file that imports `AGENTS.md` into Claude Code. Claude
Code reads `CLAUDE.md` natively — this file ensures it gets the
full `AGENTS.md` ruleset without duplication. Add any Claude-specific
instructions below the import line.

```markdown
# CLAUDE.md
@AGENTS.md

<!-- Claude Code-specific additions below.
     AGENTS.md is the authoritative rule set. -->
```

---

### `CONSTRAINTS.md`
Starts empty. The agent creates an entry here the first time you
state a constraint during any session — licensing requirements,
data privacy rules, dependency restrictions, anything binding.
Constraints are permanent until you explicitly lift them.

Format the agent uses automatically:
CONSTRAINT: No third-party analytics or tracking scripts
SCOPE: All pages and API routes
SET: YYYY-MM-DD


If you find yourself repeating the same correction to the agent
(e.g. "Don't use styled-jsx"), add it to `CONSTRAINTS.md`. Agents
treat this file as a no-fly zone and are far more likely to respect
a written constraint than a verbal correction.

---

### `DECISIONS.md`
Starts as a template with a Project Profile and phase sections.
The agent fills in each section during sessions — you never need
to write to this file directly. It becomes the persistent audit
trail for every architectural decision made across all phases and
all tools.

---

### `DESIGN.md`
Your aesthetic identity file. Starts empty. Contains three sections:

- **References** — specific works, sites, designers, or artifacts
  you've named as influences. Written in your own words.
- **Derived Identity** — the agent's synthesis of what your
  references reveal about your aesthetic direction. Presented as
  a hypothesis and confirmed by you before being written.
- **Observed Taste** — patterns the agent notices in your actual
  decisions across sessions. Not what you say you like — what you
  consistently choose.

The `$design-workflow` skill governs how the agent populates and
maintains this file. Load it when you're ready to build your
design profile, or when a gallery option needs to reference your
aesthetic accurately.

When `DESIGN.md` is empty, the agent names the gap honestly and
draws gallery options from the current session's conversation
instead. Gallery options become more accurate to you as this file
is populated over time.

---

### `.agents/skills/`
Loadable instruction sets that extend `AGENTS.md` for specific work.
Each skill is a directory containing a `SKILL.md` file with YAML
frontmatter that agents use for automatic discovery. See
**How Skills Work** above for the full reference.

---

### `.env.example`
A reference file showing which environment variable names the
project requires. Contains no values — only names. Copy to `.env`
and fill in values locally. The agent updates `DECISIONS.md` with
required variable names as new ones are introduced.

---

### `.gemini/settings.json`
Required for Gemini CLI. Without it, Gemini ignores `AGENTS.md`
and uses its own defaults. Lists every context file and skill the
agent should load at session start:

```json
{
  "context": [
    "AGENTS.md",
    "DECISIONS.md",
    "CONSTRAINTS.md",
    "DESIGN.md",
    "MEMORY.md",
    ".agents/skills/gallery-format/SKILL.md",
    ".agents/skills/socratic-depth/SKILL.md",
    ".agents/skills/indieweb-specs/SKILL.md",
    ".agents/skills/indieweb-principles/SKILL.md",
    ".agents/skills/posse-syndication/SKILL.md",
    ".agents/skills/design-workflow/SKILL.md"
  ],
  "ignore": [
    "node_modules",
    ".next",
    ".env",
    ".env.*",
    "dist",
    "build",
    "*.lock"
  ]
}
```

`MEMORY.md` is listed so Gemini picks up confirmed lessons from
prior sessions automatically. If it does not yet exist, Gemini
skips it silently.

---

### `.github/copilot-instructions.md`
GitHub Copilot's entry point into the framework. Rather than
duplicating `AGENTS.md`, this file instructs Copilot to read it
and defines Copilot-specific behavior for chat mode, inline
suggestion mode, and Workspace plan mode. The full ruleset still
lives in `AGENTS.md`.

---

### `EVAL_PROMPT.md`
Not read automatically. Use it at the end of any session to run a
structured compliance audit. Paste its contents into the tool that
just completed the session, or into a separate analysis session
with the chat log attached. The agent scores each rule Pass /
Partial / Fail with one sentence of evidence, then recommends
only the `AGENTS.md` or `CONSTRAINTS.md` changes that would have
prevented an actual failure.

---

## Agent-by-Agent Guide

### Claude Code
**Best for:** Refactoring, cross-file consistency, IndieWeb spec
implementation (Webmention, IndieAuth, Micropub), and sessions
requiring strong instruction-following across many files.

**How it reads context:** Reads `CLAUDE.md` natively. `CLAUDE.md`
imports `AGENTS.md` with `@AGENTS.md`, so the full ruleset and all
skills load automatically. Skills are loaded on demand via the
`$skill-name` syntax.

**Ideal session type:** Implementing IndieWeb specifications,
security hardening, and any work touching multiple files
simultaneously. Handles Irreversible Decisions checkpoints more
reliably than other tools.

**Tip:** Reference `@CONSTRAINTS.md` and `@MEMORY.md` in the
opening prompt for full persistent context from prior sessions.
In Plan Mode, Claude Code names gallery suppression when a
high-specificity prompt is detected and offers one alternative
framing before building.

---

### Codex CLI
**Best for:** Phase 1 scaffolding, schema design, initial file
structure, and any work where you want strict question-before-build
discipline with full terminal access.

**How it reads context:** Natively reads `AGENTS.md` from the
project root. Skills in `.agents/skills/` are discovered
automatically. No additional configuration needed.

**Ideal session type:** Establishing the stack, creating the
database schema, configuring the build, and writing the first
migration. Follows Rule 1 (ask before building) most consistently.

**Tip:** Start each session with a `SESSION CONSTRAINTS` block
listing any phase-specific rules. This promotes reference-section
content into active working context.

---

### Codex and Claude Code (browser / interface versions)
Both browser-based tools read from an attached repository at
session start. As long as `AGENTS.md`, `DESIGN.md`, `CONSTRAINTS.md`,
`DECISIONS.md`, and `.agents/skills/` exist at the repo root, the
full framework is active even before any application code exists.
No special configuration is needed beyond connecting the repository.

---

### Cursor (Chat and Composer)
**Best for:** Day-to-day feature work, inline edits, and sessions
where you want suggestions before auto-apply.

**How it reads context:** Reads `AGENTS.md` natively in Chat and
Composer modes. Also reads `.cursor/rules/*.mdc` for scoped rules
if present. Inline edit mode is mechanical-only per `AGENTS.md` —
no architectural decisions.

**Ideal session type:** Feature iterations after major scaffolding
is complete. Use Composer (Plan mode) to generate a gallery of
approaches before committing — this maps directly to Rule 2.
Use inline edit only for typos, style tweaks, and single-file renames.

**Tip:** In Composer, ask for a plan first. The plan output takes
gallery form naturally when `AGENTS.md` is in context, giving you
options to react to before any code is written.

---

### Gemini CLI
**Best for:** UI components, interactive feature development, and
sessions where you want rapid iteration with gallery-style design
choices.

**How it reads context:** Requires `.gemini/settings.json` to read
`AGENTS.md` and the skills. Without this file, Gemini uses its own
defaults and ignores the framework.

**Ideal session type:** Building visible components — layouts,
pages, and client-side features — after the stack and schema are
confirmed. The gallery protocol (Rule 2) is where Gemini performs
best.

**Known limitation:** Reference sections (Irreversible Decisions
table, Specifications) are read at session start but not actively
consulted during code generation. Use a `SESSION CONSTRAINTS` block
to promote critical rules into active context.

**Tip:** The `SESSION CONSTRAINTS` anchor prompt is especially
important for Gemini. Use it at the start of every session.

---

### GitHub Copilot (Chat)
**Best for:** In-editor assistance, quick completions, and sessions
where you are driving and want suggestions rather than autonomous
building.

**How it reads context:** Reads `AGENTS.md` as a repository
instruction file in agent mode. Also reads
`.github/copilot-instructions.md` natively — this file points
Copilot to `AGENTS.md` and defines mode-specific behavior without
duplicating the ruleset.

**Ideal session type:** Asking questions about the codebase,
understanding decisions in `DECISIONS.md`, and targeted help on a
single file or function. Less suited for multi-file architectural work.

**Tip:** Treat Copilot suggestions as proposals, not decisions.
Review before accepting, especially for anything touching routes
or schemas.

---

### Replit Agent
**Best for:** Full-stack scaffolding and iterative build sessions
in a browser-based environment.

**How it reads context:** Reads `AGENTS.md` natively. Skills in
`.agents/skills/` are installed automatically via Replit's Agent
Skills pane, which writes to the same `.agents/skills/` path.

**Ideal session type:** Initial project setup and full-stack
feature builds where you want the agent working across front and
back end simultaneously. Use auto/build mode with `DECISIONS.md`
as the log — review it after each session.

**Tip:** In auto/build mode, Replit does not pause for gallery
confirmation. Review `DECISIONS.md` at the end of each session
to see which conservative defaults were selected and override any
that don't reflect your direction.

---

## How the Files Work Together Across Sessions

Session 1 (e.g. Codex CLI)
└── Reads: AGENTS.md
└── Creates: DECISIONS.md, CONSTRAINTS.md (if constraints stated)
└── Proposes: MEMORY.md entries at session end

Session 2 (e.g. Gemini CLI)
└── Reads: AGENTS.md + CONSTRAINTS.md + MEMORY.md (via settings.json)
└── Appends: DECISIONS.md
└── Inherits all constraints and confirmed lessons automatically

Session 3 (e.g. Cursor or Claude Code)
└── Reads: AGENTS.md + CONSTRAINTS.md + MEMORY.md
└── Resolves: unresolved checkpoints from DECISIONS.md
└── Continues without repeating Phase 1–2 decisions


No tool ever needs to be told what was decided in a prior session —
the memory files carry that context automatically.

---

## Post-Session Compliance Audit (Optional)

At the end of any session, run the eval prompt to check how well
the agent followed `AGENTS.md`:

1. Open `EVAL_PROMPT.md`
2. Paste its contents into the tool that just completed the session,
   or into a separate analysis session with the chat log attached
3. Review the Pass / Partial / Fail scores
4. Apply only the recommended changes that would have prevented an
   actual failure — not changes for rules already followed

The final section of the eval prompt asks the agent to recommend
`AGENTS.md` or `CONSTRAINTS.md` changes. This is the feedback loop
that improves the framework over time based on real failures, not
hypothetical ones.

---

## Known Behavioral Limitation — High-Specificity Prompts

The gallery protocol (Rule 2 — show 2–3 options before committing)
is the framework's primary mechanism for preserving human creative
ownership. It fires reliably when a prompt is exploratory or
open-ended. It is suppressed when a prompt contains specific
measurements, named files, or exact values — because the agent
correctly reads those details as a directive and executes rather
than offering alternatives.

This is a model-level inference pattern. Adding more rules to
`AGENTS.md` does not improve adherence when the suppression comes
from the prompt signal itself.

**If you already work this way** — arriving at sessions with a
direction formed — specific prompts may trigger gallery suppression
intentionally. This is not a failure. The eval prompt remains
useful not to catch missed options, but to ensure `DECISIONS.md`
and `MEMORY.md` are maintained, which is where the framework's
value concentrates for experienced users.

For many, this framework is a reminder to think more critically
and thoroughly while finding blind spots. For others, it simplifies
creation and reduces friction. Most will fall somewhere in between.
So long as you use AI tools to create what you would not have
created otherwise, it is a justified use case.

---

**What this means in practice:**

If you want options, write an open prompt:
> "The terminal dialog feels cramped on mobile. What are some
> approaches?"

If you want execution, write a specific prompt:
> "Reduce the terminal dialog padding to 24px on mobile."

Both are valid. The difference is intentional — the framework
respects your signal.

**Prompts that reliably trigger the gallery:**
- "What are some ways to approach X?"
- "I'm not happy with how Y looks — what would you try?"
- "Before you change anything, show me options for Z."

**Prompts that reliably suppress it:**
- Any prompt with exact pixel values, file names, or property names
- "Change X to Y"
- Feedback phrased as a correction rather than a question

**The eval prompt is the recovery mechanism.** If a session
produced changes you accepted but never saw alternatives for, run
the eval prompt. It will surface missed gallery opportunities,
log them in `DECISIONS.md`, and — over time — `MEMORY.md` will
accumulate your aesthetic preferences so future sessions need
fewer explicit options to reflect your direction accurately.

**For Claude Code users:** When Claude Code is in Plan Mode and
detects a high-specificity prompt, it names the suppression at the
top of the plan and offers one alternative framing before building.

---

## IndieWeb Quick Reference

This framework is built around IndieWeb principles. The
specifications table in `AGENTS.md` and the `$indieweb-specs`
skill list implementation priority:

| Priority | Spec | What it does |
|---|---|---|
| 1 | `rel=me` | Links your domain to your profiles elsewhere |
| 1 | microformats2 | Makes your content machine-readable without breaking HTML |
| 2 | Webmention | Lets other sites notify you when they link to you |
| 2 | IndieAuth | Makes your domain an identity provider |
| 3 | Micropub | Lets external apps publish to your site |
| 4 | WebSub | Pushes new content to subscribers in real time |

Build in this order. Do not implement a spec until a real user need
depends on it. Load `$indieweb-specs` for the full acceptance
criteria, test suite links, and dependency map before implementing
any of these.

---

> The person owns this site. You hold the brush.
> Ask before you paint. Show before you decide. Stop before you break anything.
