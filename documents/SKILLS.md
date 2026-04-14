# Skills Reference

Ideation by: Chris Fornesa, Assisted by: Claude Sonnet via Perplexity, Edits by: Grammarly.

Skills are loadable instruction sets that extend AGENTS.md for specific tasks. They live in \`.agents/skills/\` (and \`.claude/skills/\` for Claude Code). Load them on demand or let the rules load them automatically.

---

## \`$gallery-format\`

**Load when:** Rule 2 applies — options needed before a design decision.

**What it does:** Enforces the gallery output format for all design decisions. Ensures every gallery includes 2–3 meaningfully different options plus one Reframe entry.

**Rules the skill enforces:**

* The unexpected option must surface in a direction implied by the user's vision and conversation signals but not yet consciously articulated. Not a random variation, the agent's preference, or a minor implementation difference.  
* The Reframe entry challenges the premise of the request itself — it asks whether the thing being built is the right thing to build.  
* Gallery options must be informed by DESIGN.md. Each option must be traceable to specific signals in the user's References, Derived Identity, or Observed Taste — not to statistical patterns across other users.  
* If DESIGN.md is empty, name that gap before presenting options.

**Suppression conditions:**  
The gallery is suppressed when a prompt contains specific measurements,  
named files, or exact values. The agent reads those as directives and  
executes. This is intentional — the framework respects the user's signal.

---

## \`$socratic-depth\`

**\*\*Load when:\*\*** Rule 1 applies — a question is needed before a significant change.

**\*\*What it does:\*\***  
Provides the question taxonomy for assumption-surfacing questions. Ensures the agent asks the right category of question for the type of decision being made.

**\*\*Question categories:\*\***

| Category | When to use | Example |  
|---|---|---|  
| Assumption | Every feature, always — ask before Vision questions | "What's the thing you'd be most surprised to discover is wrong about this idea?" |  
| Vision | New feature or project | "What feeling do you want someone to have when they first land on this?" |  
| Ownership | Data, identity, or external dependency | "Who controls this content if you move hosts or switch frameworks?" |  
| Specificity | Before schemas, routes, or templates | "When you say 'post', do you mean article, note, reply, bookmark — or all of these?" |

## Sequencing rule:

Assumption questions always come first. Do not ask Vision questions before an Assumption question for that feature has been answered.

**One question at a time.** Reflect the answer back before acting on it.

---

## \`$indieweb-specs\`

**Load when:** Implementing or modifying any IndieWeb specification.

**What it does:** Provides the full acceptance criteria, test suite links, and dependency  
map for each IndieWeb specification.

**Implementation priority order:**

| Priority | Spec | What it does |  
|---|---|---|  
| 1 | \`rel=me\` | Links your domain to your profiles elsewhere |  
| 1 | microformats2 | Makes your content machine-readable without breaking HTML |  
| 2 | Webmention | Lets other sites notify you when they link to you |  
| 2 | IndieAuth | Makes your domain an identity provider |  
| 3 | Micropub | Lets external apps publish to your site |  
| 4 | WebSub | Pushes new content to subscribers in real time |

Build in this order. Do not implement a spec until a real user need depends on it.

**External test suites:**

* Webmention: webmention.rocks  
* Micropub: micropub.rocks  
* IndieAuth: indieauth.rocks

**Security requirements by spec:**

* Webmention: Validate async. Sanitize all external \`e-content\` before display.  
* IndieAuth: PKCE mandatory. No JWTs as tokens. Exact \`redirect\_uri\` match.  
* Micropub \`delete\`: Verify \`delete\` scope before any destructive action.

---

## \`$indieweb-principles\`

**Load when:** a decision affects ownership, portability, or longevity.

**What it does:** Surfaces the IndieWeb principle relevant to the decision being made and  
maps it to a concrete technical requirement.

**Principle-to-decision map:**  
| Principle | Triggers when... | Technical expression |  
|---|---|---|  
| Own your data | Any external dependency, syndication target, or hosted service | Require self-hosting alternative before approving dependency |  
| Permanent URLs | Any URL structure decision | No database IDs in public URLs; permanent redirects for moves |  
| Content portability | Any schema or export decision | Keep \`/export/json\`, \`/feed.xml\`, \`/feed.json\` functional |  
| Human-first | Any auto-publish or automation decision | Never auto-publish AI-generated content |  
| Design for longevity | Any vendor dependency | Document what breaks if the vendor changes or shuts down |

---

## \`$posse-syndication\`

**Load when:** URL structure, syndication targets, or export endpoints.

**What it does:** Enforces POSSE (Publish on Own Site, Syndicate Elsewhere) conventions  
for URL structure, syndication targets, and export endpoints.

**URL conventions:**

* \- No database IDs in public URLs  
* \- Post URLs follow a human-readable path convention  
*   (e.g. \`/YYYY/MM/DD/slug\` or \`/posts/slug\`)  
* \- Permanent redirects required for any moved content

**Export endpoints — always keep functional:**

* \- \`GET /export/json\`  
* \- \`GET /feed.xml\`  
* \- \`GET /feed.json\`

**Syndication checkpoint:** Any syndication target requires an Irreversible Decisions pause. Ask: "This will publish to \[platform\] under \[platform's\] terms. Once sent, you cannot un-send it. Should I proceed?"

---

## \`$design-workflow\`

**Load when:** DESIGN.md is empty, incomplete, or needs updating.

**What it does:** Governs the three-phase process for populating and maintaining DESIGN.md.

**The three phases — mandatory sequencing:**

1. **References:** Ask for specific works, sites, designers, or artifacts that the person names as influences. Written in their own words. Must exist before Phase 2\.  
2. **Derived Identity:** The agent synthesizes what the references reveal about the person's aesthetic direction. Presented as a hypothesis and confirmed by the person before being written. Must exist before Phase 3\.  
3. **Observed Taste:** Patterns the agent notices in the person's actual decisions across sessions. Not what they say they like — what they consistently choose. Queued during sessions and proposed at session end, same confirmation pattern as MEMORY.md.

**When DESIGN.md is empty:**

* In interactive mode: ask for References before any design question. Do not ask for Declared Preferences before Derived Identity exists.  
* In auto/build mode: note the absence in DECISIONS.md and apply the most reversible visual defaults available in the framework.

**Gallery options must be informed by DESIGN.md.** Each option must be traceable to specific signals in the user's References, Derived Identity, or Observed Taste — not to statistical patterns across other users.