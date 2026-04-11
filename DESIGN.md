# DESIGN.md — Creative Identity Document

<!-- GOVERNANCE
     This file is owned by the human. Sections marked HUMAN-AUTHORED
     are filled in by you, ideally before the first build session, or
     collaboratively with an AI assistant in a dedicated conversation.
     Sections marked AGENT-PROPOSED are populated by the agent during
     sessions and confirmed by you — the same pattern as MEMORY.md.

     The agent reads this file at every session start.
     The agent never asks design questions out of sequence:
       1. References must exist before Derived Identity is attempted.
       2. Derived Identity must exist before Declared Preferences are prompted.
       3. Observed Taste is queued during sessions and proposed at session end.

     If this file is empty or incomplete, the agent asks for References
     before any other design question. It never asks for Declared
     Preferences first.

     Taste constraints recorded here are distinct from technical
     constraints in CONSTRAINTS.md. Do not move entries between files
     unless a taste preference becomes a technical requirement. -->

---

## References
<!-- HUMAN-AUTHORED
     The most important section. Fill this before anything else.
     The agent derives everything downstream from what you put here.
     Screenshots and art files should be committed to your repository.
     URLs are acceptable if files are not available. -->

- **Admired applications or websites:**
  <!-- Filenames of screenshots in your repo, or URLs.
       Example: screenshots/notion-dark.png, https://example.com -->
       - https://cfornesa.com/chat
       - https://nekoweb.org
       - https://neocities.org 

- **Admired art, design work, or visual culture:**
  <!-- Filenames, URLs, or plain descriptions.
       Example: Saul Bass film posters, brutalist typography,
       screenshots/bauhaus-ref.jpg -->

- **Admired writing or editorial voices:**
  <!-- Publications, authors, or specific pieces whose tone or
       structure you want to echo. These inform copy direction
       as much as visual references do. -->

- **Logo:**
  <!-- Filename if available in your repository.
       Example: assets/logo.svg
       Leave blank if none exists yet. -->

- **Existing brand materials:**
  <!-- Any other files — type specimens, color swatches, style guides —
       already committed to the repo. -->
       - **Existing brand materials:**
  public/guide.png — robot mascot, used as profile avatar; green body,
  blue joints, orange hands, holding a lightbulb. Transparent PNG.
  No logo SVG, type specimen, or color swatch file exists yet.
  Active color palette and Unicode symbol set are documented in
  Declared Preferences below.

---

## Derived Identity
<!-- AGENT-PROPOSED, HUMAN-CONFIRMED
     The agent fills this section collaboratively after References exist,
     by asking questions and proposing observations. You confirm, correct,
     or expand each entry before it is considered stable.
     Do not fill this section yourself before discussing it with the agent —
     the value is in the derivation process, not the output alone. -->

- **What your references share:**
  <!-- AGENT-PROPOSED 2026-04-11 — derived from implemented code, not from stated references.
       Confirm, correct, or expand. -->
  Retro hardware nostalgia combined with neo-brutalist flatness — vintage computing
  warmth (the iMac bezel, beige-grey, brushed metal stand, neon-green terminal) alongside
  strong 2px borders, offset shadows, and flat color. No gradients except functional ones.
  Type and structure do the work; illustration and decoration are absent entirely.

- **The tension you are navigating:**
  <!-- AGENT-PROPOSED 2026-04-11 -->
  Personal and specific, but not self-indulgent. The iMac frame says "this is *my* computer"
  — a thing with an owner — while the bento grid and restrained palette keep it readable and
  purposeful rather than nostalgic for its own sake.

- **What you dislike in contrast:**
  <!-- AGENT-PROPOSED 2026-04-11 -->
  The SaaS landing page visual grammar: gradient CTAs, stock photography of smiling teams,
  soft hero blurs, rounded-corner-everything with no intentional weight, artificial whitespace
  used to signal "premium." Equally: decorative animation, auto-playing media, emoji as
  ornament, icons from icon libraries (Unicode symbols preferred). Anything that could belong
  to a generic product page.

- **The feeling on first load:**
  <!-- Confirmed by user 2026-04-11 -->
  Intrigue. The visitor is booting someone else's personal computer — the frame is the
  invitation, not the content. The expectation is: what does this person's perspective
  look like from the inside?

---

## Declared Preferences
<!-- HUMAN-AUTHORED, after Derived Identity is complete.
     These are starting points, not permanent constraints.
     If you change your mind, update this section and note the
     change in DECISIONS.md. Do not move taste preferences to
     CONSTRAINTS.md unless they become technical requirements. -->

- **Color direction:**
  <!-- Documented from implementation 2026-04-11 -->
  Two-mode palette. Light: warm off-white ground (`#fffdfa`), dark blue-grey text
  (`#2c3e50`), warm beige card surface (`#f9f6f0`), orange accent (`#e67e22`).
  Dark: deep charcoal (`#1a1814`), warm off-white text (`#f4f0ea`), golden-orange
  accent (`#f39c12`). One accent color used sparingly — on identity photo border,
  organisation label, icon hover state. Terminal uses its own isolated palette:
  pure black ground, neon green (`#0f0`). macOS chrome colors (`#ff5f56`, `#ffbd2e`,
  `#27c93f`) appear only in the title bar row — decorative system reference, not
  available for reuse elsewhere.

- **Type direction:**
  <!-- Documented from implementation 2026-04-11 -->
  System-UI stack for all UI and body copy (`system-ui, -apple-system, BlinkMacSystemFont`).
  Courier New / monospace for terminal, code blocks, and any metadata that needs
  to read as machine-output. No web fonts loaded — no external network requests for
  type, no FOUT. Size hierarchy: 3–3.5rem titles, 1.5–1.8rem section heads, 1rem body,
  0.85–0.9rem metadata. Weight hierarchy: 800 for page titles, 700 for section heads,
  600 for UI labels, 400 for body. Line height 1.6–1.8 for readable body copy.

- **Layout disposition:**
  <!-- Documented from implementation 2026-04-11 -->
  Content lives inside an iMac monitor frame on desktop (max 1024px threshold).
  Inside: bento grid (12-column) for the home h-card; constrained single-column for
  detail pages (800–1000px max-width). Generous top padding (64px) on desktop;
  compact on mobile (24px). No sidebars. Bottom padding accommodates the mobile nav
  pill (100px extra). All layout switches at a single 768px breakpoint — no complex
  multi-step breakpoint ladder.

- **Motion and interaction:**
  <!-- Documented from implementation 2026-04-11 -->
  No decorative animation. Transitions only where they carry meaning: state change
  (hover elevation via `translateY(-4px)`, `translate(-2px, -2px)` lift pattern),
  and overlay appearance. Standard duration: 0.2s ease. Maximum: 0.3s ease.
  Icon "press" uses a 2px inward translate to simulate physical click. No spring
  physics, no entrance animations, no scroll-triggered effects.

- **What must never appear:**
  <!-- Documented from implementation 2026-04-11 -->
  Gradients on UI surfaces (the monitor stand gradient is a deliberate hardware
  reference, not a UI pattern — do not reuse it for buttons or cards). Stock
  photography. Blur-heavy hero sections. Soft drop shadows (all shadows use hard
  offset pattern: `4px 4px 0px`). Auto-playing media. Emoji as decoration.
  Icon library icons (Unicode symbols only — ◈, ✦, ♡, ⊛, ⎈). Any visual
  language associated with SaaS product pages or generic portfolio templates.

---

## Observed Taste
<!-- AGENT-PROPOSED, HUMAN-CONFIRMED
     Populated during sessions when the agent notices a signal —
     an enthusiasm, a complaint, a reference made in passing,
     an implied direction not yet consciously claimed.
     Proposed at session end alongside MEMORY.md updates.
     Format mirrors MEMORY.md:

     YYYY-MM-DD · CATEGORY · Observation in one sentence.
         [Optional: the exact exchange or context that surfaced it]

     Valid categories:
     INFLUENCE · REFUSAL · TENSION · VOICE · DIRECTION

     Examples:
     2026-04-10 · REFUSAL · Finds AI-generated imagery dishonest
         rather than merely aesthetically displeasing.
         [User: "it's not that I dislike how it looks, I dislike
         what it means"]
     2026-04-10 · TENSION · Wants the site to feel personal but
         is resistant to anything that reads as self-indulgent.
     2026-04-10 · INFLUENCE · Referenced Saul Bass twice without
         being asked about visual influences.

     Keep under 50 entries. When approaching the limit, ask the
     user to review — consolidate stable patterns into Derived
     Identity and archive older entries to docs/design-archive.md. -->

2026-04-11 · INFLUENCE · Chose a literal iMac monitor frame as the primary UI metaphor — hardware nostalgia as identity statement rather than illustration.
    [Derived from Phase 2 Final Cleanup decision: "Visual Design - Retro-Modern Hybrid" in DECISIONS.md]

2026-04-11 · DIRECTION · Unicode symbols preferred over icon libraries for all navigation and section markers (◈, ✦, ♡, ⊛, ⎈).
    [Consistent across all pages — no SVG icon imports found in codebase]

2026-04-11 · REFUSAL · Hard offset shadows (`4px 4px 0px`) chosen over soft drop shadows — neo-brutalist weight, not SaaS softness.
    [Applied uniformly across cards, bento boxes, desktop icons, terminal]

2026-04-11 · TENSION · Retro hardware warmth (beige, neon green, brushed metal) held in tension with modern layout discipline (CSS Grid, 12-column, constrained widths).
    [The iMac bezel is vintage but everything inside the screen is clean and structured]

2026-04-11 · DIRECTION · Mobile experience redesigned as a distinct UI (floating pill nav, fixed clock) rather than a collapsed version of desktop — mobile gets its own interaction model.
    [Phase 2 UI Redesign: "Option C" mobile Safari redesign, not a responsive collapse]

2026-04-11 · REFUSAL · No web fonts loaded — system-UI stack chosen deliberately, eliminating external network requests for typography.
    [No @font-face or Google Fonts imports found anywhere in codebase]

2026-04-11 · VOICE · The iMac frame is an invitation, not a decoration — the visitor is "booting" someone else's computer to understand their perspective.
    [User: "I would like the user to feel a sense of intrigue as they boot my personal computer to understand my perspective."]

2026-04-11 · DIRECTION · Framework changes should happen beneath the surface; the retro hardware metaphor and existing UI weight must survive architectural rewrites intact.
    [User request: revise and implement the migration plan while preserving the site's original aesthetic design.]

---

<!-- The agent holds the brush. You choose what gets painted.
     This document is how you tell the agent what you see. -->
