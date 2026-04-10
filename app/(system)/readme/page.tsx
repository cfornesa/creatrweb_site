import React from "react";
import Link from "next/link";
import baseStyles from "../project-detail.module.css";
import styles from "./readme.module.css";

export default function ReadmePage() {
  return (
    <div className={baseStyles.container}>
      <header className={baseStyles.header}>
        <Link href="/" className={baseStyles.backLink}>
          <span>←</span> Home
        </Link>
        <div className={baseStyles.symbolHero}>◈</div>
        <h1 className={baseStyles.title}>Creatrweb</h1>
        <div className={baseStyles.tags}>
          <span className={baseStyles.tag}>Methodology</span>
          <span className={baseStyles.tag}>IndieWeb</span>
          <span className={baseStyles.tag}>AI</span>
        </div>
      </header>

      <main className={baseStyles.content}>

        {/* What This Is */}
        <section className={baseStyles.section}>
          <h2 className={baseStyles.sectionTitle}>What This Is</h2>
          <p>
            Creatrweb is a portable kit of context files that guides AI coding agents toward
            creative, human-steered, IndieWeb-aligned development. It works across Gemini CLI,
            Claude Code, Codex CLI, Cursor, and GitHub Copilot from a single source of truth.
          </p>
          <p style={{ marginTop: "16px" }}>
            The framework applies three principles consistently across every AI tool you use:
          </p>
          <ul style={{ marginTop: "12px", paddingLeft: "20px", lineHeight: "2" }}>
            <li>
              <strong>Human ownership</strong> — the agent asks before building, shows options
              before committing, and stops at irreversible decisions.
            </li>
            <li>
              <strong>Distinct voice</strong> — gallery-format choices resist AI averaging.
              Research shows human-steered sessions produce outcomes 2–4× better than passive ones.
            </li>
            <li>
              <strong>IndieWeb longevity</strong> — your content stays portable, your URLs never
              break, and every dependency is documented.
            </li>
          </ul>
        </section>

        {/* Repository Structure */}
        <section className={baseStyles.section}>
          <h2 className={baseStyles.sectionTitle}>Repository Structure</h2>
          <p>Place these files at the root of every new project before your first agent session:</p>
          <pre className={styles.codeBlock}>{`your-project/
├── AGENTS.md                  ← Main instruction file (all agents)
├── CLAUDE.md                  ← Claude Code entry point
├── CONSTRAINTS.md             ← Active project constraints (starts empty)
├── DECISIONS.md               ← Architecture log (agent fills during sessions)
├── .env.example               ← Environment variable reference
├── .gemini/
│   └── settings.json          ← Gemini CLI context configuration
└── docs/
    └── eval-prompt.md         ← Optional: post-session compliance audit`}</pre>
          <p style={{ marginTop: "16px" }}>Files the agent creates during sessions — do not create manually:</p>
          <pre className={styles.codeBlock}>{`MEMORY.md                      ← Confirmed lessons (agent proposes, you approve)
docs/dependencies.md           ← Vendor dependency registry (agent maintains)`}</pre>
        </section>

        {/* Setup */}
        <section className={baseStyles.section}>
          <h2 className={baseStyles.sectionTitle}>Setup — New Project</h2>

          <h3 className={styles.subSection}>Step 1 — Copy the kit</h3>
          <p>
            Copy all files from this template into your project root. No configuration required
            before your first session.
          </p>

          <h3 className={styles.subSection}>Step 2 — Fill in the Project Profile (optional)</h3>
          <p>
            Open <code>AGENTS.md</code> and find the <strong>Project Profile</strong> section near
            the top. If you know what you are building, fill in the four fields at an architecture
            level — no technical details required:
          </p>
          <pre className={styles.codeBlock}>{`Deployment: Node.js PaaS, single process, npm start
Database:   SQLite via Drizzle ORM
Version pins: Node 20, Next.js 15.x
Stack:      Next.js + TypeScript`}</pre>
          <p style={{ marginTop: "12px" }}>
            If you leave this blank, the agent will ask you three plain-language questions at the
            start of the first session and fill it in for you.
          </p>

          <h3 className={styles.subSection}>Step 3 — Set up your environment</h3>
          <p>
            Copy <code>.env.example</code> to <code>.env</code> and fill in any values your project
            needs. Never commit <code>.env</code> to version control — it is in <code>.gitignore</code> by default.
          </p>

          <h3 className={styles.subSection}>Step 4 — Start your first session</h3>
          <p>
            Open your chosen agent tool in the project directory and begin. The agent reads
            <code> AGENTS.md</code> automatically. No special prompt is required for the first
            session — it will ask one question to confirm the current phase before writing any code.
          </p>
        </section>

        {/* File Reference */}
        <section className={baseStyles.section}>
          <h2 className={baseStyles.sectionTitle}>File Reference</h2>

          <h3 className={styles.subSection}>AGENTS.md</h3>
          <p>
            The authoritative instruction file. Read by every agent on every session start. Contains
            the Six Rules that override all agent defaults, Brainstorm Mode for open-ended
            exploration, gallery protocol for design decisions, IndieWeb specifications and POSSE
            rules, and memory file management.
          </p>
          <p style={{ marginTop: "12px" }}>
            <strong>Do not edit during a session.</strong> Only the project owner changes this file.
            The agent will propose changes as a diff and wait for approval.
          </p>

          <h3 className={styles.subSection}>CLAUDE.md</h3>
          <p>
            A one-line file that imports <code>AGENTS.md</code> into Claude Code. Claude Code reads
            <code> CLAUDE.md</code> natively — this file ensures it gets the full AGENTS.md ruleset
            without duplication. Add any Claude-specific instructions below the import line.
          </p>

          <h3 className={styles.subSection}>CONSTRAINTS.md</h3>
          <p>
            Starts empty. The agent creates an entry here the first time you state a constraint
            during any session — licensing requirements, data privacy rules, dependency restrictions,
            anything binding. Constraints are permanent until you explicitly lift them.
          </p>
          <pre className={styles.codeBlock}>{`CONSTRAINT: No third-party analytics or tracking scripts
SCOPE:      All pages and API routes
SET:        YYYY-MM-DD`}</pre>

          <h3 className={styles.subSection}>DECISIONS.md</h3>
          <p>
            Starts as a template with a Project Profile and phase sections. The agent fills in each
            section during sessions — you never need to write to this file directly. It becomes the
            persistent audit trail for every architectural decision made across all phases and tools.
          </p>

          <h3 className={styles.subSection}>.env.example</h3>
          <p>
            A reference file showing which environment variable names the project requires. Contains
            no values — only names. Copy to <code>.env</code> and fill in values locally.
          </p>

          <h3 className={styles.subSection}>.gemini/settings.json</h3>
          <p>
            Required for Gemini CLI. Without it, Gemini ignores <code>AGENTS.md</code> and uses its
            own defaults. This file points Gemini at the correct context files:
          </p>
          <pre className={styles.codeBlock}>{`{
  "context": {
    "files": [
      "AGENTS.md",
      "CONSTRAINTS.md",
      "MEMORY.md"
    ]
  }
}`}</pre>

          <h3 className={styles.subSection}>EVALUATE_PROMPT.md</h3>
          <p>
            Not read automatically. Use it at the end of any session to run a structured compliance
            audit. Paste the file's contents into the same tool that just completed the session, or
            into a separate analysis session with the chat log attached.
          </p>
        </section>

        {/* Agent-by-Agent Guide */}
        <section className={baseStyles.section}>
          <h2 className={baseStyles.sectionTitle}>Agent-by-Agent Guide</h2>

          <h3 className={styles.subSection}>Codex CLI</h3>
          <p>
            <strong>Best for:</strong> Phase 1 scaffolding, schema design, initial file structure,
            and any work where you want strict question-before-build discipline with full terminal
            access.
          </p>
          <p style={{ marginTop: "8px" }}>
            Natively reads <code>AGENTS.md</code> from the project root. No configuration needed.
            Follows Rule 1 (ask before building) most consistently of all the tools.
          </p>
          <p style={{ marginTop: "8px" }}>
            <strong>Tip:</strong> Start each Codex session with a <code>SESSION CONSTRAINTS</code> block
            in your opening prompt listing phase-specific rules.
          </p>

          <h3 className={styles.subSection}>Gemini CLI</h3>
          <p>
            <strong>Best for:</strong> UI components, interactive feature development, and sessions
            where you want rapid iteration with gallery-style design choices.
          </p>
          <p style={{ marginTop: "8px" }}>
            Requires <code>.gemini/settings.json</code> to read <code>AGENTS.md</code>. Without this
            file, Gemini uses its own defaults and ignores the framework entirely. The gallery
            protocol (Rule 2) is where Gemini performs best.
          </p>
          <p style={{ marginTop: "8px" }}>
            <strong>Known limitation:</strong> Reference sections are read at session start but not
            actively consulted during code generation. Use a <code>SESSION CONSTRAINTS</code> block
            to promote critical rules into active context.
          </p>

          <h3 className={styles.subSection}>Claude Code</h3>
          <p>
            <strong>Best for:</strong> Refactoring, cross-file consistency, spec implementation
            (Webmention, IndieAuth, Micropub), and sessions requiring strong instruction-following
            across many files.
          </p>
          <p style={{ marginTop: "8px" }}>
            Reads <code>CLAUDE.md</code> natively. <code>CLAUDE.md</code> imports <code>AGENTS.md</code> with{" "}
            <code>@AGENTS.md</code>, so the full ruleset loads automatically. Handles the Irreversible
            Decisions checkpoints more reliably than other tools.
          </p>

          <h3 className={styles.subSection}>Cursor (Chat and Composer)</h3>
          <p>
            <strong>Best for:</strong> Day-to-day feature work, inline edits, and sessions where you
            want suggestions before auto-apply.
          </p>
          <p style={{ marginTop: "8px" }}>
            Reads <code>AGENTS.md</code> natively in Chat and Composer modes. In Cursor Composer,
            ask for a plan first — the plan output will naturally take gallery form if AGENTS.md is
            in context, giving you three options before any code is written.
          </p>

          <h3 className={styles.subSection}>GitHub Copilot (Chat)</h3>
          <p>
            <strong>Best for:</strong> In-editor assistance, quick completions, and sessions where
            the human is driving and wants suggestions rather than autonomous building.
          </p>
          <p style={{ marginTop: "8px" }}>
            Reads <code>AGENTS.md</code> as a repository instruction file. Best suited for asking
            questions about the codebase and getting targeted help on a single file or function.
            Treat its suggestions as proposals, not decisions — review before accepting.
          </p>
        </section>

        {/* How Files Work Together */}
        <section className={baseStyles.section}>
          <h2 className={baseStyles.sectionTitle}>How the Files Work Together Across Sessions</h2>
          <pre className={styles.codeBlock}>{`Session 1 (e.g. Codex CLI)
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
  └── Continues without repeating Phase 1–2 decisions`}</pre>
          <p style={{ marginTop: "12px" }}>
            No tool ever needs to be told what was decided in a prior session — the memory files
            carry that context automatically.
          </p>
        </section>

        {/* Post-Session Compliance Audit */}
        <section className={baseStyles.section}>
          <h2 className={baseStyles.sectionTitle}>Post-Session Compliance Audit</h2>
          <p>
            At the end of any session, run the eval prompt to check how well the agent followed AGENTS.md:
          </p>
          <ol style={{ marginTop: "12px", paddingLeft: "20px", lineHeight: "2" }}>
            <li>Open <code>EVALUATE_PROMPT.md</code></li>
            <li>
              Paste its contents into the tool that just completed the session, or into a separate
              analysis session with the chat log attached
            </li>
            <li>Review the Pass / Partial / Fail scores</li>
            <li>
              Apply only the recommended changes that would have prevented an actual failure — not
              changes for rules already followed
            </li>
          </ol>
          <p style={{ marginTop: "12px" }}>
            The final section of the eval prompt asks the agent to recommend AGENTS.md or
            CONSTRAINTS.md changes. This is the feedback loop that improves the framework over time
            based on real failures.
          </p>
        </section>

        {/* Known Behavioral Limitation */}
        <section className={baseStyles.section}>
          <h2 className={baseStyles.sectionTitle}>Known Behavioral Limitation</h2>
          <p>
            The gallery protocol (Rule 2 — show 2–3 options before committing) is the framework's
            primary mechanism for preserving human creative ownership. It fires reliably when a
            prompt is exploratory or open-ended. It is suppressed when a prompt contains specific
            measurements, named files, or exact values — because the agent correctly reads those
            details as a directive and executes rather than offering alternatives.
          </p>
          <p style={{ marginTop: "12px" }}>
            This is a model-level inference pattern. It cannot be resolved in AGENTS.md — adding
            more rules does not improve adherence when the suppression comes from the prompt signal
            itself.
          </p>
          <p style={{ marginTop: "12px" }}>
            Both modes are valid. If you want options, write an open prompt:
          </p>
          <div className={styles.promptExample}>
            "The terminal dialog feels cramped on mobile. What are some approaches?"
          </div>
          <p style={{ marginTop: "12px" }}>If you want execution, write a specific prompt:</p>
          <div className={styles.promptExample}>
            "Reduce the terminal dialog padding to 24px on mobile."
          </div>
          <p style={{ marginTop: "12px" }}>
            The framework respects your signal. If you write a specific prompt and later wish you
            had seen options, run the eval prompt at session end — the agent will identify the
            missed gallery opportunity and log it.
          </p>
          <p style={{ marginTop: "12px" }}>
            Over time, <code>MEMORY.md</code> accumulates your aesthetic preferences so future
            sessions need fewer explicit options to reflect your direction accurately.
          </p>
          <p style={{ marginTop: "12px" }}>
            <strong>For Claude Code users:</strong> This behavior is addressed proactively in{" "}
            <code>CLAUDE.md</code>. When Claude Code is in Plan Mode and detects a high-specificity
            prompt, it is instructed to name the suppression at the top of the plan and offer one
            alternative framing before building. The eval prompt remains the recovery mechanism for
            sessions where suppression was not caught in time.
          </p>
        </section>

        {/* IndieWeb Quick Reference */}
        <section className={baseStyles.section}>
          <h2 className={baseStyles.sectionTitle}>IndieWeb Quick Reference</h2>
          <p>
            This framework is built around IndieWeb principles. Build specifications in priority
            order — do not implement a spec until a real user need depends on it.
          </p>
          <table className={styles.table} style={{ marginTop: "20px" }}>
            <thead>
              <tr>
                <th>Priority</th>
                <th>Spec</th>
                <th>What it does</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td><span className={styles.badge}>rel=me</span></td>
                <td>Links your domain to your profiles elsewhere</td>
              </tr>
              <tr>
                <td>1</td>
                <td><span className={styles.badge}>microformats2</span></td>
                <td>Makes your content machine-readable without breaking HTML</td>
              </tr>
              <tr>
                <td>2</td>
                <td><span className={styles.badge}>Webmention</span></td>
                <td>Lets other sites notify you when they link to you</td>
              </tr>
              <tr>
                <td>2</td>
                <td><span className={styles.badge}>IndieAuth</span></td>
                <td>Makes your domain an identity provider</td>
              </tr>
              <tr>
                <td>3</td>
                <td><span className={styles.badge}>Micropub</span></td>
                <td>Lets external apps publish to your site</td>
              </tr>
              <tr>
                <td>4</td>
                <td><span className={styles.badge}>WebSub</span></td>
                <td>Pushes new content to subscribers in real time</td>
              </tr>
            </tbody>
          </table>
        </section>

        <p style={{ textAlign: "center", opacity: 0.5, fontStyle: "italic", marginTop: "8px" }}>
          The person owns this site. You hold the brush.
          <br />
          Ask before you paint. Show before you decide. Stop before you break anything.
        </p>

      </main>
    </div>
  );
}
