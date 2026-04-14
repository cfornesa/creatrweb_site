# The Six Rules: Explained

Ideation by: Chris Fornesa, Assisted by: Claude Sonnet via Perplexity, Edits by: Grammarly.

These rules live in AGENTS.md and override all agent defaults in every session. This document explains the reasoning behind each one and what correct behavior looks like in practice.

---

## Rule 1: Ask One Question Before Any Significant Change

**What it says:**  
Ask one assumption-surfacing question before any significant change — not  
merely a confirmatory question. Ask what the person expects to be true  
after the change, not just whether to proceed.

**Why it exists:**  
Most agent failures stem from the agent acting on an unstated assumption  
rather than the user's actual intent. A confirmatory question ("Should I  
proceed?") only verifies momentum. An assumption-surfacing question  
("What do you expect to be true after this?") catches the gap between  
what the agent inferred and what the person actually meant.

**Question types by category (from $socratic-depth):**

* Assumption: "What's the thing you'd be most surprised to discover is wrong about this idea?"  
* Vision: "What feeling do you want someone to have when they first land on this?"  
* Ownership: "Who controls this content if you move hosts or switch frameworks?"  
* Specificity: "When you say 'post', do you mean article, note, reply, bookmark — or all of these?"

**One question at a time.** Reflect the answer back before acting.

---

## Rule 2: Show 2–3 Options Before Committing (Gallery Protocol)

**What it says:**  
Show 2–3 meaningfully different options before committing, plus one reframe entry. The unexpected option must surface a direction implied by the user's vision but not yet consciously articulated. The reframe entry challenges the premise of the request itself.

**Why it exists:**  
Research (Walton et al., 2026, doi:10.1145/377329) found human-steered sessions produce outcomes 2–4× better than passive ones. AI tools produce averaged outputs — the gallery protocol is the primary mechanism for counteracting this. The unexpected option and Reframe entry exist specifically to surface directions the person didn't know to ask for.

**What the Reframe is not:**  
Not a random variation. Not the agent's preference. Not a minor implementation difference. It must challenge the premise of the request itself by asking whether the thing being built is the right thing to build.

**When it fires:** Exploratory or open-ended prompts.  
**When it is suppressed:** Prompts containing specific measurements, named files, or exact values — the agent correctly reads those as directives and executes.

For full gallery format and output rules, load \`$gallery-format\`.

---

## Rule 3: Pause at Irreversible Decisions

**What it says:**  
URL structure, identity links, auth endpoints, syndication targets, and vendor dependencies require explicit sign-off before proceeding.

**Why it exists:**  
Some decisions can be undone; others cannot. Once a URL is published and linked, changing it breaks the web. Once a Webmention endpoint is advertised, external sites begin pinging it. Once a syndication target is set, words are subject to another platform's terms. The cost of pausing once is small. The cost of reversing these decisions is high or impossible.

**The Irreversible Decisions table:**

| Checkpoint | Why it matters |
| :---- | :---- |
| URL structure | Once published and linked, changing breaks the web |
| Post type schema | Shapes every feature built on top |
| \`rel=me\` / identity links | A public statement about who you are online |
| Webmention endpoint | Once advertised, external sites will start pinging |
| IndieAuth activation | Makes this domain an identity provider |
| Micropub activation | Allows external clients to create, update, and delete content |
| Any syndication target | Determines where and under whose terms words are published |
| New vendor dependency | Document self-hosting alternative before adding |

**Mandatory question for any new vendor dependency:**  
"This dependency sends data to \[service name\]. If \[service name\] changes  
its API, pricing, or shuts down, \[describe what breaks\]. The  
self-hosting alternative is \[X\]. Should I proceed and document this in  
docs/dependencies.md?"

Ask this even when the person appears to have already decided. The question is not about whether to proceed — it is about ensuring the trade-off is named out loud before it becomes invisible infrastructure.

---

## Rule 4: The Person Owns Everything

**What it says:**  
Amplify the person's judgment; do not substitute for it. Support unconventional choices fully. Surface the assumptions embedded in their direction before amplifying it — if a direction rests on an unstated assumption, name it and ask if it holds.

**Why it exists:**  
The distinction between amplification and substitution is the framework's core ethical line. An agent that executes without surfacing assumptions is not collaborating — it is making decisions on behalf of someone who may not have all the information. An agent that surfaces assumptions without acting on them wastes time. The balance is: name the assumption, confirm it holds, then act.

**What it rules out:**

* Overriding an unconventional choice because the agent prefers the conventional one.  
* Proceeding when a direction rests on an assumption the person hasn't stated aloud.  
* Substituting agent judgment for human judgment at any decision point.

---

## Rule 5: URLs Must Never Break. Content Must Always Be Exportable

**What it says:**  
Keep \`GET /export/json\`, \`GET /feed.xml\`, and \`GET /feed.json\` functional. Permanent redirects for moved content. No database IDs in public URLs.

**Why it exists:**  
Broken URLs destroy the cross-site citation graph that the open web depends on. Locked-in content destroys the person's ability to leave a platform or tool and take their work with them. These two properties — link permanence and content portability — are the technical expression of the IndieWeb principle that the person owns their site.

**In practice:**

* If a URL must change, a permanent redirect is not optional — it is required.   
* Export endpoints are not features to be added later. They are infrastructure that has been maintained from the beginning.  
* No database IDs in public URLs. Clean, human-readable paths only.

---

## Rule 6: If Specified Technology Appears Non-Functional, Stop

**What it says:**  
State the issue clearly. Present alternatives using the gallery format. Get explicit approval before modifying anything currently working. Never implement a silent workaround.

If an approved approach becomes unworkable due to runtime, version, platform, or library constraints — stop, name the incompatibility, present a fresh gallery, and get explicit approval before swapping tools or dependencies.

Each replacement backend or parser counts as a fresh non-functional-technology decision and requires a new pause, gallery, and confirmation before coding continues.

**Why it exists:**  
Silent workarounds are the most common source of invisible technical debt in AI-assisted development. An agent that swaps a library without disclosure is making an architectural decision without consent. The rule exists to make every pivot visible — not to slow progress, but to ensure nothing is decided without the person knowing it was decided.

**Compatibility pivots count.** If a framework version change makes a previously approved approach impossible, that is a non-functional technology event — it triggers this rule even if the original technology "worked" in isolation.

---

## The Three Silent Checks — Before Writing Any File

These checks fire before every file write, in every mode, without exception:

1\. \*\*Irreversible Decisions table\*\* — Does this file appear in it? If yes → stop and confirm before proceeding.

2\. \*\*Microformats rendering\*\* — Does this file render content that a  
   microformats parser will read? If yes → it must be a Server Component with no "use client".

3\. \*\*Dependency or external service\*\* — Does this change install a package or call an external service? If yes → docs/dependencies.md must be updated in the same session, before the session ends.