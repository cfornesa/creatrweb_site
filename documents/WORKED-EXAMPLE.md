# Worked Example: Building [creatrweb.com](http://creatrweb.com)

Ideation by: Chris Fornesa, Assisted by: Claude Sonnet via Perplexity, Edits by: Grammarly.

This is a real project, not a hypothetical. Every session, decision, gallery, failure, and correction documented here occurred during the build of creatrweb.com, the homepage for this framework.

**What this demonstrates:** The framework doesn't prevent mistakes. It makes mistakes visible, recoverable, and instructive.

---

## Project Overview

**Goal:** A personal IndieWeb site with a retro iMac-framed UI and an AI chat terminal, deployed on Hostinger, owned entirely by the author.

**Final stack:** Express 4 \+ TypeScript, bundled via esbuild, vanilla JS frontend, SQLite via Drizzle ORM, Mistral AI for RAG chat.

**Tools used, in order:** Codex CLI → Gemini CLI → Claude Code → Gemini CLI → Codex CLI → Gemini CLI → Codex CLI → Gemini CLI

**Build span:** 2026-04-08 to 2026-04-13 (6 days from app consolidation to viability)

---

## Phase 1: Scaffolding (Codex CLI, 2026-04-08)

### What was confirmed

* Stack: Next.js 15 \+ TypeScript on Hostinger Node.js v20  
* Database ID strategy: hybrid model, text primary key for \`posts.id\` (content portability), integer auto-increment for operational tables (webmentions, auth tokens)  
* Timestamp columns stored as SQLite text for human-readable exports  
* \`posts.syndicated\_urls\` stored as JSON string: no locked-in format.

### What AGENTS.md caught

Rule 3 fired on the database schema: text IDs for posts were confirmed as an Irreversible Decision because they shape every feature built on top. The choice was deliberate: text IDs survive database migrations and export/import cycles intact.

### What was missed

\`tsconfig.json\` was never created. This surfaced as a Phase 1 gap in Phase 2:Gemini CLI created it when the TypeScript compilation failed. The lesson: \`DECISIONS.md\` flagged this as a prior-phase gap, not a Phase 2 decision, which is the correct pattern.

**MEMORY.md entry created:**

* 2026-04-08 · DECISION · The database uses hybrid IDs: text for  
* \`posts.id\`, integers for webmentions, auth\_tokens, and auth\_codes.

---

## Phase 2: UI Components (Gemini CLI, 2026-04-09)

### What the gallery protocol produced

The gallery protocol was used throughout the discourse with each agent to ensure that the proper features were being built and that I had ample choices (and at least some context about them) to make a good decision. For instance, when I stated that I wanted to create an iPhone and iPad interface for mobile and tablet mode, the gallery options included: building the scheme as I described, building a beveled display to make it appear that the user is viewing a screen in mobile and tablet mode, or reframing the screen in a Safari browser-inspired overlay. After considering the points made, I decided to go with the Safari browser-inspired overlay as the iPhone/iPad overlay would be too cluttered, while the beveled glass appearance would be too subtle for the theme that I was going for. 

### The DESIGN.md collaboration

DESIGN.md was empty at session start. Rather than asking for stated references, the agent derived its identity from the implemented code: "Retro hardware nostalgia combined with neo-brutalist flatness, vintage computing warmth alongside strong 2px borders, offset shadows, and flat color. No gradients except functional ones."

This was proposed as a hypothesis and confirmed. The key line in the process: the agent cannot derive your taste from code alone. The value is in the confirmation: you either ratify or correct the observation.

### Rule 2 failure: and how the eval prompt caught it

After approving the \`/readme\` route in Plan Mode, the agent implemented it without presenting gallery options. The session eval prompt flagged this as a Rule 2 failure caused by high-specificity prompt suppression. The correction: a new rule was added to \`[CLAUDE.md](http://CLAUDE.md)\`: "When Claude Code is in Plan Mode and the user's prompt names a specific route, file, or output format, explicitly note the gallery suppression at the top of the plan and offer one alternative framing before building."

**What this shows:** The eval prompt is the recovery mechanism. The framework doesn't prevent suppression; it makes the failure visible and turns it into a permanent improvement to the protocol.

A second Rule 2 violation also occurred during the same infrastructure session: patch-entry.mjs was implemented without a gallery. This was later flagged by the eval prompt. 

**The lesson:** Rule 2 applies to infrastructure decisions, not only UI changes, and was significant enough to make it into MEMORY.md permanently. The mechanism that surfaced is exactly what the eval prompt exists for."

---

## The Stack Migration: A Rule 6 Case Study

The most instructive part of this build is what happened to the stack.

### From Next.js 15 to Astro 5 (2026-04-11)

Hostinger's standalone build contract made the Next.js deployment fragile — absolute file paths baked into \`entry.mjs\` broke on every redeploy. Rule 6 fired: the specified technology was non-functional. Gallery presented. Astro 5 SSR chosen.

### From Astro 5 to Express 4 (2026-04-11, same day)

Astro 5 introduced its own deployment fragility — \`@astrojs/node\` baked absolute paths into the build artifact. Rule 6 fired again. A second gallery was presented. Express 4 \+ esbuild chosen as the most portable, dependency-light option.

**The Rule 6 principle in practice:**  
Each replacement counted as a fresh non-functional-technology decision. The agent did not silently swap Astro for Express — it stopped, named the incompatibility, presented options, and waited for confirmation.

The \`MEMORY.md\` entry from this day captures the root lesson:

* 2026-04-11 · DECISION · Astro SSR absolute-path fragility was the  
* root cause of the original deployment failures. Express 4 \+ esbuild  
* is the correct deployment contract for Hostinger.

Similarly, the gallery protocol produced incorrect decisions from time to time, necessitating multiple rebuilds. This was a reminder that, regardless of the safeguards, the probabilistic nature of generative AI models means that decisions can only be so correct. However, in such cases, such as when a different PDF parser was recommended, it was my lack of context provided (I did not realize that the PDF parser that I chose for RAG embeddings was not compatible with Node version 20.x), it was because some context, such as Node 20.x as the standard for the build, was either forgotten or not specified. Thus, when I specified that I wanted Node 20.x to remain the build version, the agent corrected itself by providing a new set of decisions tailored to Node 20.x.

---

## The RAG Architecture (Gemini CLI → Codex CLI, 2026-04-12–13)

### The decision that made the chatbot work

RAG storage moved from a SQLite \`document\_embeddings\` table to a flat \`embeddings.json\` file. The reason: SQLite locking under Hostinger's Phusion Passenger was causing race conditions. The JSON approach simplified deployment and added in-memory caching to improve response times.

### The PDF parser failure — Rule 6 in a smaller scope

Both \`pdf-parse\` and \`pdfreader\` failed on real project PDFs. Rule 6: Stop, name the issue, and present alternatives. The gallery surfaced Poppler's \`pdftotext\` as the correct tool — local CLI, Apache 2.0 license, no data sent off-domain.

**MEMORY.md entry:**

* 2026-04-13 · CORRECTION · In-process PDF parsers failed on real  
* project PDFs; PDF extraction now uses Poppler's \`pdftotext\` CLI.

---

## What DESIGN.MD looked like at the session end

By session end, DESIGN.md had moved from empty to fully operational. Here's what a completed file provides to every future session: gallery options traceable to specific aesthetic signals, not statistical defaults.

### Declared Preferences

**Color direction:**  
Two-mode palette. Light: warm off-white ground (\#fffdfa), dark blue-grey text (\#2c3e50), warm beige card surface (\#f9f6f0), orange accent (\#e67e22). Dark: deep charcoal (\#1a1814), warm off-white text (\#f4f0ea), golden-orange accent (\#f39c12). One accent color used sparingly — on identity photo border, organisation label, icon hover state. Terminal uses its own isolated palette: pure black ground, neon green (\#0f0). macOS chrome colors (\#ff5f56, \#ffbd2e, \#27c93f) appear only in the title bar row — decorative system reference, not available for reuse elsewhere.

**Type direction:**  
System-UI stack for all UI and body copy (system-ui, \-apple-system, BlinkMacSystemFont). Courier New / monospace for terminal, code blocks, and any metadata that needs to read as machine-output. No web fonts loaded — no external network requests for type, no FOUT. Size hierarchy: 3–3.5rem titles, 1.5–1.8rem section heads, 1rem body, 0.85–0.9rem metadata. Weight hierarchy: 800 for page titles, 700 for section heads, 600 for UI labels, 400 for body. Line height 1.6–1.8 for readable body copy.

**Layout disposition:**  
Content lives inside an iMac monitor frame on desktop (max 1024px threshold). Inside: bento grid (12-column) for the home h-card; constrained single-column for detail pages (800–1000px max-width). Generous top padding (64px) on desktop; compact on mobile (24px). No sidebars. Bottom padding accommodates the mobile nav pill (100px extra). All layout switches at a single 768px breakpoint — no complex multi-step breakpoint ladder.

**Motion and interaction:**  
No decorative animation. Transitions only where they carry meaning: state change (hover elevation via translateY(-4px), translate(-2px, \-2px) lift pattern), and overlay appearance. Standard duration: 0.2s ease. Maximum: 0.3s ease. Icon "press" uses a 2px inward translate to simulate physical click. No spring physics, no entrance animations, no scroll-triggered effects.

**What must never appear:**  
Gradients on UI surfaces (the monitor stand gradient is a deliberate hardware reference, not a UI pattern — do not reuse it for buttons or cards). Stock photography. Blur-heavy hero sections. Soft drop shadows (all shadows use hard offset pattern: 4px 4px 0px). Auto-playing media. Emoji as decoration. Icon library icons (Unicode symbols only — ◈, ✦, ♡, ⊛, ⎈). Any visual language associated with SaaS product pages or generic portfolio templates.

---

## What MEMORY.md Captured Across All Sessions

The 6-day build produced several confirmed lessons about the Creatrweb framework. The most consequential:

* **Rule 2 applies to infrastructure decisions**, not only UI changes; the \`patch-entry.mjs\` gallery violation proved this.  
* **Plan Mode does not substitute for the gallery protocol**; explicit suppression disclosure was added to CLAUDE.md as a result.  
* **DECISIONS.md must be updated in the same session as any new route or file creation**, logged after the \`/readme\` compliance gap.  
* **Hostinger requires build-critical packages in \`dependencies\`**, not \`devDependencies\` — \`esbuild\` and \`dotenv\` moved accordingly.  
* **Because MEMORY.md travels with the project**, a Gemini CLI session three days later inherited the Hostinger build lesson without being explicitly told; it simply read the file at the start of the session.

---

## What This Build Would Have Looked Like Without the Framework

This set of development tasks included: consolidating different applications, redesigning the website, changing the website architecture, and placing finishing touches to make the chatbot functional (using retrieval-augmented generation), While these tasks would have still been possible without the Creatrweb framework, these efforts would have been much more disjointed and would have necessitated more context engineering at the prompt level compared to only needing to provide screenshots, error logs, and human decision-making. This framework made the process more seamless than my usual vibe coding (also known as agentic engineering) practices. The time savings from increased efficiency mean that I can now spend time I would not otherwise have had on developing documentation for this framework and improving it by mandating disability-friendly details in this scheme. 

Personally, despite my own experiences with disability, I often forget these necessary details as I am normally focused on the task at hand, with anything that doesn’t have to do with the aesthetic or backend of the project unfairly serving as an afterthought. Though the [Swansea University study](https://www.swansea.ac.uk/press-office/news-events/news/2025/11/can-ai-make-us-more-creative-new-study-reveals-surprising-benefits-of-human-ai-collaboration.php) on human-AI creative collaboration noted that time savings are not necessarily a factor in improving output quality, it should be noted that time savings from eliminating inefficiencies can provide users with extra time and cognitive offloading to take on more intellectually rich, critical-thinking tasks.