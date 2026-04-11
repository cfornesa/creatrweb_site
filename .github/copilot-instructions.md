# GitHub Copilot Instructions

This project uses AGENTS.md as its standing instruction set.
Read AGENTS.md at the project root before responding to any request.

## Instruction Priority

When instructions conflict, resolve in this order:

1. Explicit statement from the person during the session
2. SESSION CONSTRAINTS or PHASE CONSTRAINTS block in the opening prompt
3. AGENTS.md Six Rules
4. All reference sections in AGENTS.md
5. These Copilot instructions

## Project Memory Files

Read these files at session start, in this order:

| File | Purpose |
|------|---------|
| `AGENTS.md` | Standing rules, protocols, and principles |
| `MEMORY.md` | Durable confirmed lessons from past sessions |
| `DECISIONS.md` | Architectural choices and unresolved checkpoints |
| `CONSTRAINTS.md` | Active project constraints — all are binding |
| `DESIGN.md` | Person's aesthetic references and derived identity |

If any of these files does not exist yet, note the absence and
proceed. Do not create them speculatively — DECISIONS.md and
CONSTRAINTS.md are created on first need, MEMORY.md on first
confirmed lesson, DESIGN.md on first design reference.

## Skills

Skills are located in `.agents/skills/`. Each skill is a
directory containing a `SKILL.md` file. Load a skill by reading
its `SKILL.md` when AGENTS.md or the person references it by name.

| Skill | Load when |
|-------|----------|
| `$gallery-format` | Rule 2 applies — options needed before a design decision |
| `$socratic-depth` | Rule 1 applies — a question is needed before a significant change |
| `$indieweb-specs` | Implementing or modifying any IndieWeb specification |
| `$indieweb-principles` | A decision touches ownership, portability, or longevity |
| `$posse-syndication` | URL structure, syndication targets, or export endpoints |
| `$design-workflow` | DESIGN.md is empty, incomplete, or needs updating |

## Non-Negotiable Behaviors

These apply in every mode, regardless of how the request is phrased:

- Ask one question before any significant change. A significant
  change introduces visible behavior, adds a route, modifies a
  schema, creates a file others depend on, or touches the
  Irreversible Decisions table.
- Show 2–3 meaningfully different options before committing to
  any design or architectural direction.
- Never break a public URL. Permanent redirects for moved content.
  No database IDs in public URLs.
- Keep `GET /export/json`, `GET /feed.xml`, and `GET /feed.json`
  functional at all times.
- Never edit AGENTS.md without explicit human instruction.
- Never auto-syndicate content. Syndication is always
  human-initiated.
- Before writing any file, silently check:
  1. Does this file appear in the Irreversible Decisions table?
  2. Does this file render content a microformats parser will read?
     If yes, it must be a Server Component — no `use client`.
  3. Does this change install a package or call an external service?
     If yes, `docs/dependencies.md` must be updated this session.

## Copilot-Specific Notes

- In **chat mode**: apply full question and gallery protocols.
  Ask before building. Wait for answers.
- In **inline suggestion mode**: mechanical changes only.
  Do not make architectural decisions via inline suggestion.
  Surface significant choices as a chat comment instead.
- If a Copilot Workspace plan is being generated: present the
  plan as a gallery of approaches before implementing.
  Do not begin implementation until the person approves a direction.