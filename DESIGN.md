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
  Retro hardware nostalgia combined with neo-brutalist flatness. The iMac bezel acts as a window into a cozy, physical workspace diorama—featuring a flat 2D glass desk and tabletop peripherals (keyboard, mouse, mug) built from simple CSS geometry that ground the digital content in a comfortable environment while maintaining strict 2D flatness.

- **The tension you are navigating:**
  Personal and specific, but not self-indulgent. The iMac frame and flat desk scene say "this is *my* computer in *my* room" — a place with an owner — while the bento grid and restrained palette keep it readable and purposeful.

- **What you dislike in contrast:**
  The SaaS landing page visual grammar: gradient CTAs, stock photography of smiling teams, soft hero blurs, rounded-corner-everything with no intentional weight, artificial whitespace used to signal "premium." Equally: decorative animation, auto-playing media, emoji as ornament, icons from icon libraries (Unicode symbols preferred). Anything that could belong to a generic product page.

- **The feeling on first load:**
  Intrigue and comfort. The visitor is booting someone else's personal computer in a cozy studio environment — the frame and flat desk are the invitation, not just decoration.

---

## Declared Preferences
<!-- HUMAN-AUTHORED, after Derived Identity is complete.
     These are starting points, not permanent constraints.
     If you change your mind, update this section and note the
     change in DECISIONS.md. Do not move taste preferences to
     CONSTRAINTS.md unless they become technical requirements. -->

- **Color direction:**
  Two-mode palette. Light: warm off-white ground (`#fffdfa`), dark blue-grey text
  (`#2c3e50`), warm beige card surface (`#f9f6f0`), orange accent (`#d35400`).
  Dark: deep charcoal (`#1a1814`), warm off-white text (`#f4f0ea`), golden-orange
  accent (`#f39c12`). Glass table uses semi-transparent glassmorphism (`backdrop-filter`).
  Keyboard and mouse match the monitor frame borders. Mug is off-white/white.

- **Type direction:**
  System-UI stack for all UI and body copy (`system-ui, -apple-system, BlinkMacSystemFont`).
  Courier New / monospace for terminal, code blocks, and any metadata that needs
  to read as machine-output. No web fonts loaded — no external network requests for
  type, no FOUT.

- **Layout disposition:**
  Content lives inside an iMac monitor frame sitting on a flat glass desk in desktop mode
  (viewports > 1024px). The desk and peripherals are built entirely from 2D CSS shapes
  with hard offset shadows. Mobile and tablet layouts use a Safari-inspired mobile interface
  with a floating navigation pill.

- **Motion and interaction:**
  No decorative animation. Transitions only where they carry meaning: state change
  (hover elevation) and overlay appearance. Standard duration: 0.2s ease.

- **What must never appear:**
  Gradients on UI surfaces (except for hardware references like the monitor stand or
  glass table top). Stock photography. Blur-heavy hero sections. Soft drop shadows
  (all shadows use hard offset pattern: `4px 4px 0px`).

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

2026-04-14 · DIRECTION · Chose a high-contrast focus outline (3px solid var(--accent-orange)) for accessibility — ensuring keyboard navigation is visible without breaking the neo-brutalist aesthetic.
    [Consistent with Rule 4: "Amplify their judgment; do not substitute for it" - chose a style that fits the established brand]

2026-04-14 · REFUSAL · Modified the primary accent color (#e67e22 -> #d35400) in light mode to meet WCAG AA contrast standards — prioritizing accessibility over the original brand hex.
    [User confirmation of the trade-off between brand color and accessibility compliance]

2026-04-14 · DIRECTION · Shifted from an abstract monitor frame to a literal "cozy workspace diorama" featuring a flat 2D glass desk and peripherals built from CSS geometry to maintain strict flat visual discipline.
    [User: "I want a cozy, comfortable theme... I want some level of coziness added to the layout to turn it into a scene..."]


2026-04-20 Â· TENSION Â· Wants the site to be assistive-first without visually drifting away from the established retro hardware framing.
    [User request: "Please make these changes assistive-first but prioritize keeping the design as-is as much as possible..."]

2026-04-20 Â· DIRECTION Â· Prefers accessibility improvements that preserve the resting appearance and reveal themselves mainly through focus, motion, and assistive-tech behavior.
    [User asked that CSS-impacting design changes be stated explicitly for review]

---

<!-- The agent holds the brush. You choose what gets painted.
     This document is how you tell the agent what you see. -->
