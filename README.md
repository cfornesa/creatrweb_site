# CreatrWeb - IndieWeb Creative Collaboration Agent Framework

A portable kit of context files that guides AI coding agents toward
creative, human-steered, IndieWeb-aligned development. Works across
Gemini CLI, Claude Code, Codex CLI, Cursor, and GitHub Copilot from
a single source of truth.

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

```
your-project/
├── AGENTS.md                  ← Main instruction file (all agents)
├── CLAUDE.md                  ← Claude Code entry point
├── CONSTRAINTS.md             ← Active project constraints (starts empty)
├── DECISIONS.md               ← Architecture log (agent fills during sessions)
├── .env.example               ← Environment variable reference
├── .gemini/
│   └── settings.json          ← Gemini CLI context configuration
└── docs/
    └── eval-prompt.md         ← Optional: post-session compliance audit
```

Files the agent creates during sessions — do not create manually:

```
MEMORY.md                      ← Confirmed lessons (agent proposes, you approve)
docs/dependencies.md           ← Vendor dependency registry (agent maintains)
```

---

## Setup — New Project

### Step 1 — Copy the kit

Copy all files from this template into your project root. No
configuration required before your first session.

### Step 2 — Fill in the Project Profile (optional)

Open `AGENTS.md` and find the **Project Profile** section near the top.
If you know what you are building, fill in the four fields at an
architecture level — no technical details required:

```
Deployment: Node.js PaaS, single process, npm start
Database:   SQLite via Drizzle ORM
Version pins: Node 20, Next.js 15.x
Stack:      Next.js + TypeScript
```

If you leave this blank, the agent will ask you three plain-language
questions at the start of the first session and fill it in for you.

### Step 3 — Set up your environment

Copy `.env.example` to `.env` and fill in any values your project
needs. Never commit `.env` to version control — it is in `.gitignore`
by default.

### Step 4 — Start your first session

Open your chosen agent tool in the project directory and begin. The
agent reads AGENTS.md automatically. No special prompt is required
for the first session — it will ask one question to confirm the
current phase before writing any code.

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
this file. The agent will propose changes as a diff and wait for
approval.

### `CLAUDE.md`
A one-line file that imports `AGENTS.md` into Claude Code. Claude
Code reads `CLAUDE.md` natively — this file ensures it gets the
full AGENTS.md ruleset without duplication. Add any Claude-specific
instructions below the import line.

```markdown
# CLAUDE.md
@AGENTS.md

<!-- Claude Code-specific additions below.
     AGENTS.md is the authoritative rule set. -->
```

### `CONSTRAINTS.md`
Starts empty. The agent creates an entry here the first time you
state a constraint during any session — licensing requirements,
data privacy rules, dependency restrictions, anything binding.
Constraints are permanent until you explicitly lift them.

Format the agent uses automatically:
```
CONSTRAINT: No third-party analytics or tracking scripts
SCOPE:      All pages and API routes
SET:        YYYY-MM-DD
```

### `DECISIONS.md`
Starts as a template with a Project Profile and phase sections.
The agent fills in each section during sessions — you never need
to write to this file directly. It becomes the persistent audit
trail for every architectural decision made across all phases and
all tools.

### `.env.example`
A reference file showing which environment variable names the
project requires. Contains no values — only names. Copy to `.env`
and fill in values locally. The agent updates `DECISIONS.md` with
the required variable names as new ones are introduced.

### `.gemini/settings.json`
Required for Gemini CLI. Without it, Gemini ignores `AGENTS.md`
and uses its own defaults. This file points Gemini at the correct
context files:

```json
{
  "context": {
    "files": [
      "AGENTS.md",
      "CONSTRAINTS.md",
      "MEMORY.md"
    ]
  }
}
```

`MEMORY.md` is listed here so Gemini picks up confirmed lessons
from prior sessions even before the file is explicitly referenced
in a prompt. If `MEMORY.md` does not yet exist, Gemini skips it
silently.

### `docs/eval-prompt.md`
Not read automatically. Use it at the end of any session to run a
structured compliance audit. Paste the file's contents into the
same tool that just completed the session, or into a separate
analysis session with the chat log attached.

---

## Agent-by-Agent Guide

### Codex CLI
**Best for:** Phase 1 scaffolding, schema design, initial file
structure, and any work where you want strict question-before-build
discipline with full terminal access.

**How it reads context:** Natively reads `AGENTS.md` from the
project root. No configuration needed.

**Ideal session type:** Use for establishing the stack, creating
the database schema, configuring the build, and writing the first
migration. Codex follows Rule 1 (ask before building) most
consistently of all the tools.

**Tip:** Start each Codex session with a `SESSION CONSTRAINTS` block
in your opening prompt listing phase-specific rules. This promotes
reference-section rules into active working context.

---

### Gemini CLI
**Best for:** UI components, interactive feature development, and
sessions where you want rapid iteration with gallery-style design
choices.

**How it reads context:** Requires `.gemini/settings.json` to read
`AGENTS.md`. Without this file, Gemini uses its own defaults and
ignores the framework entirely.

**Ideal session type:** Use for building visible components —
layouts, pages, and client-side features — after the stack and
schema are confirmed by Codex. The gallery protocol (Rule 2) is
where Gemini performs best.

**Known limitation:** Reference sections (Irreversible Decisions
table, Specifications) are read at session start but not actively
consulted during code generation. Use a `SESSION CONSTRAINTS` block
to promote critical rules into active context for each session.

**Tip:** Include `CONSTRAINTS.md` and `MEMORY.md` in
`.gemini/settings.json` so confirmed lessons and active constraints
load automatically without prompt overhead.

---

### Claude Code
**Best for:** Refactoring, cross-file consistency, spec
implementation (Webmention, IndieAuth, Micropub), and sessions
requiring strong instruction-following across many files.

**How it reads context:** Reads `CLAUDE.md` natively. `CLAUDE.md`
imports `AGENTS.md` with `@AGENTS.md`, so the full ruleset loads
automatically.

**Ideal session type:** Use for implementing IndieWeb
specifications, security hardening, and any work that touches
multiple files simultaneously. Claude Code handles the Irreversible
Decisions checkpoints more reliably than other tools.

**Tip:** Claude Code supports `@CONSTRAINTS.md` and `@MEMORY.md`
references in the opening prompt. Including both gives it the full
persistent context from prior sessions.

---

### Cursor (Chat and Composer)
**Best for:** Day-to-day feature work, inline edits, and sessions
where you want suggestions before auto-apply.

**How it reads context:** Reads `AGENTS.md` natively in Chat and
Composer modes. Inline edit mode is mechanical-only per AGENTS.md
— no architectural decisions.

**Ideal session type:** Use Cursor Chat for feature iterations after
major scaffolding is done. Use Composer (Plan mode) to generate a
gallery of approaches before committing — this maps directly to
Rule 2. Use inline edit only for typos, style tweaks, and single-
file renames.

**Tip:** In Cursor Composer, ask for a plan first. The plan output
will naturally take gallery form if AGENTS.md is in context, giving
you three options to react to before any code is written.

---

### GitHub Copilot (Chat)
**Best for:** In-editor assistance, quick completions, and sessions
where the human is driving and wants suggestions rather than
autonomous building.

**How it reads context:** Reads `AGENTS.md` as a repository
instruction file. Also respects `.github/copilot-instructions.md`
if present — leave that file absent or add only tool-specific
additions, as AGENTS.md is the authoritative source.

**Ideal session type:** Use Copilot Chat for asking questions about
the codebase, understanding existing decisions in `DECISIONS.md`,
and getting targeted help on a single file or function. It is less
suited for multi-file architectural work.

**Tip:** Copilot operates closest to Inline Edit mode in practice.
Treat its suggestions as proposals, not decisions — review before
accepting, especially for anything touching routes or schemas.

---

## How the Files Work Together Across Sessions

```
Session 1 (e.g. Codex CLI)
  └── Reads: AGENTS.md
  └── Creates: DECISIONS.md (Phase 1), CONSTRAINTS.md (if constraints stated)
  └── Proposes: MEMORY.md entries at session end

Session 2 (e.g. Gemini CLI)
  └── Reads: AGENTS.md + CONSTRAINTS.md + MEMORY.md (via settings.json)
  └── Appends: DECISIONS.md (Phase 2)
  └── Inherits all constraints and confirmed lessons automatically

Session 3 (e.g. Cursor or Claude Code)
  └── Reads: AGENTS.md + CONSTRAINTS.md + MEMORY.md
  └── Resolves: unresolved checkpoints from DECISIONS.md
  └── Continues without repeating Phase 1–2 decisions
```

No tool ever needs to be told what was decided in a prior session —
the memory files carry that context automatically.

---

## Post-Session Compliance Audit (Optional)

At the end of any session, run the eval prompt to check how well the
agent followed AGENTS.md:

1. Open `docs/eval-prompt.md`
2. Paste its contents into the tool that just completed the session,
   or into a separate analysis session with the chat log attached
3. Review the Pass / Partial / Fail scores
4. Apply only the recommended changes that would have prevented an
   actual failure — not changes for rules already followed

The final section of the eval prompt asks the agent to recommend
AGENTS.md or CONSTRAINTS.md changes. This is the feedback loop that
improves the framework over time based on real failures.

---

---

## Known Behavioral Limitation — High-Specificity Prompts

The gallery protocol (Rule 2 — show 2–3 options before committing) is the framework's primary mechanism for preserving human creative ownership. It fires reliably when a prompt is exploratory or open-ended. It is suppressed when a prompt contains specific measurements, named files, or exact values — because the agent correctly reads those details as a directive and executes rather than offering alternatives.

This is a model-level inference pattern. It cannot be resolved in AGENTS.md — adding more rules does not improve adherence when the suppression comes from the prompt signal itself.

**If you already work this way** — Arriving at sessions with a direction formed, using specific prompts deliberately may trigger gallery
suppression, which is not a failure. The evaluation prompt remains useful not to catch missed options, but to ensure DECISIONS.md and MEMORY.md are maintained, which is where the framework's value concentrates for experienced users, or at least those who are used to prompt engineering or, otherwise, asking the right questions. For many, this framework is a reminder to think more critically and thoroughly (possibly finding blind spots) while, for others, this is meant to simplify the process of creation and reduce friction, while others will fall somewhere in between. So long as you utilize AI tools to create what you would not have created otherwise, it is a justified use case for this framework.

**What this means in practice:**

If you want options, write an open prompt:
> "The terminal dialog feels cramped on mobile. What are some
> approaches?"

If you want execution, write a specific prompt:
> "Reduce the terminal dialog padding to 24px on mobile."

Both are valid. The difference is intentional — the framework respects your signal. If you write a specific prompt and later wish you had seen options, run the eval prompt at session end. The agent will identify the missed gallery opportunity and log it.

**Prompts that reliably trigger the gallery:**
- "What are some ways to approach X?"
- "I'm not happy with how Y looks — what would you try?"
- "Before you change anything, show me options for Z."

**Prompts that reliably suppress it:**
- Any prompt with exact pixel values, file names, or property names
- "Change X to Y"
- Feedback phrased as a correction rather than a question

**The eval prompt is the recovery mechanism.** If a session produced changes you accepted but never saw alternatives for, run the eval prompt. It will surface missed gallery opportunities, log them in DECISIONS.md, and — over time — MEMORY.md will accumulate your aesthetic preferences so future sessions need fewer explicit options to reflect your direction accurately.

---

## IndieWeb Quick Reference

This framework is built around IndieWeb principles. The
specifications table in AGENTS.md lists implementation priority:

| Priority | What it does |
|---|---|
| `rel=me` | Links your domain to your profiles elsewhere |
| microformats2 | Makes your content machine-readable without breaking HTML |
| Webmention | Lets other sites notify you when they link to you |
| IndieAuth | Makes your domain an identity provider |
| Micropub | Lets external apps publish to your site |
| WebSub | Pushes new content to subscribers in real time |

Build in this order. Do not implement a spec until a real user need
depends on it.

---

> The person owns this site. You hold the brush.
> Ask before you paint. Show before you decide. Stop before you break anything.