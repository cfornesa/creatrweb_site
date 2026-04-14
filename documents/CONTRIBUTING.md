# CONTRIBUTING.md

Ideation by: Chris Fornesa, Assisted by: Claude Sonnet via Perplexity, Edits by: Grammarly.

CreatrWeb is a personal framework made public. Contributions are welcome, but the framework's direction is set by its author.

---

## What Can Be Contributed

* **Bug reports:** Agent behaviors that violate a documented rule, filed as GitHub Issues with the session log and tool version.  
* **New skill proposals:** A proposed SKILL.md for a new loadable skill, filed as a pull request with a justification for why the skill can't be covered by an existing one.  
* **Agent-specific configuration:** Additions to the agent-by-agent guide for tools not currently covered.  
* **Documentation corrections:** Fixes to factual errors in any .md file.

## What Should Not Be Contributed

* Changes to the Six Rules without discussion with the author.  
* Changes to AGENTS.md directly — proposals only, as described in AGENTS.md's own safeguards.  
* New vendor dependencies added to the default kit.

## How to Propose Documentation Changes

1. Make the specific documentation change.  
2. Open a pull request explaining why the change is necessary. It would help if you provided a direct source, such as an article or other published work, to back up your argument, even if you, yourself, are the author.

## How to Propose a New Skill

3. Create a directory under \`.agents/skills/\[skill-name\]/\`.  
4. Write \`SKILL.md\` with YAML frontmatter (name, load-when, version).  
5. Document: what it does, when it fires, example output.  
6. Open a pull request explaining the gap it fills and which existing skill it was determined not to cover.

## Authorship and Credit

All contributions must include the contributor's name and a brief description of AI assistance used, following the disclosure format established in Creatrweb\_Why.docx:

* Authored by: \[Name\].  
* AI assistance: \[Tool and role, e.g., "Claude Sonnet — structural framing; human-authored and edited throughout"\].

If accepted, you will be credited. If this does not occur, do not hesitate to contact me at [cfornesa@outlook.com](mailto:cfornesa@outlook.com). 