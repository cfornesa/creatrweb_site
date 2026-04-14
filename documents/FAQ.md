# Frequently Asked Questions

Ideation by: Chris Fornesa, Assisted by: Claude Sonnet via Perplexity, Edits by: Grammarly.

---

## Getting Started

**Q: Do I need to fill in AGENTS.md before my first session?** No. If the Project Profile is blank, the agent asks three plain-language questions at session start and fills it in for you:

1. "What are you trying to build — a website, an app, a blog, something else?"  
2. "Do you already have any code or files for this project, or are we starting from scratch?"  
3. "Is there a specific tool or service you've been told to use, or should I suggest something?"

**Q: What is the SESSION CONSTRAINTS block, and do I always need it?** It promotes the rules from AGENTS.md's reference sections into the agent's active working context for the duration of the session. Start every session with:

* "Starting a new session. SESSION CONSTRAINTS: Follow all rules in AGENTS.md when processing all prompts in this conversation. Are you ready?"

Without it, the agent may drift toward generic coding defaults as the session progresses.

**Q: Which agent should I start with for a new project?**  
It depends on the AI coding tools that you have access to. As I have access to the Codex CLI, I often use it for Phase 1 scaffolding to follow Rule 1 (ask before building) most consistently. Then, since I have access to Claude Code, I use it for IndieWeb spec implementation or for any work that touches multiple files simultaneously.

---

## The Gallery Protocol

**Q: Why isn't the gallery showing up when I ask for changes?** The gallery is suppressed by specific prompts. If you wrote "Change X to Y" or included exact pixel values, file names, or property names, the agent read that as a directive and executed. To get options, use an  
open prompt instead:

* "The terminal dialog feels cramped on mobile. What are some approaches?"  
* "I'm not happy with how Y looks. What would you try?"  
* "Before you change anything, show me options for Z."

**Q: The gallery options don't match my taste.**  
Populate DESIGN.md. Gallery options must be traceable to your specific References, Derived Identity, or Observed Taste entries, not to generic defaults. An empty DESIGN.md means the agent is guessing based on statistical patterns from other users, not yours.

**Q: What is the Reframe entry in a gallery?**  
It challenges the premise of the request itself, not a variation on your approach, but a question about whether the approach is the right one. If you asked for a nav redesign, the Reframe might ask whether the nav is the right solution to the navigation problem at all. You can ignore it, but it exists to surface directions you might not have considered.

**Q: Can I skip the gallery for a session?**  
You can suppress it by writing specific prompts (see above). If you want to work without it for a whole session, add a SESSION CONSTRAINTS item: \`Skip gallery protocol this session — execute on specific instructions.\` The eval prompt at session end will still flag missed opportunities, so DECISIONS.md stays accurate.

---

## Agent-Specific Issues

**Q: Gemini is ignoring AGENTS.md.**  
Gemini requires \`.gemini/settings.json\` to read the framework. Without it, Gemini uses its own defaults. Verify that the file exists at the project root and that it lists AGENTS.md in the context array. Also note that Gemini reads reference sections at session start but doesn't actively consult them during code generation — use a SESSION CONSTRAINTS block to promote critical rules into the active context.

**Q: Claude Code stopped following a rule mid-session.**  
Stop the session immediately:

* "Stop. Check AGENTS.md Rule \[N\] before proceeding."  
* "Wait… did you ask the Rule 1 question for this change?"

For persistent drift, start the next session with the full SESSION CONSTRAINTS block. Reference @CONSTRAINTS.md and @MEMORY.md explicitly in the opening prompt.

**Q: The agent edited AGENTS.md without my permission.**  
This is a safeguard violation. AGENTS.md is owned by the person, not the session. If AGENTS.md is non-empty when first read, the agent must never replace its contents. "Populate", "update", or "fill in" applied to a non-empty AGENTS.md means propose an append as a clearly marked diff, never a replacement. If this happens, restore the previous version from git and add an explicit CONSTRAINT: "Never modify AGENTS.md without explicit written instruction."

**Q: Replit auto-applied changes without gallery confirmation.**  
Replit in auto/build mode does not pause for gallery confirmation — this is expected behavior. Review DECISIONS.md at the end of every Replit session to see which conservative defaults were selected and override any that don't reflect your direction.

**Q: Two agents gave me conflicting recommendations across sessions.**  
The memory files exist to prevent this. Check DECISIONS.md for the prior decision and MEMORY.md for any confirmed lessons. If neither file records the relevant decision, the session that made the choice didn't log it — add it manually, and it will carry forward into all future sessions.

---

## IndieWeb Adaptations

**Q: I don't know what POSSE means. Do I need to?**  
POSSE stands for Publish on Own Site, Syndicate Elsewhere. The short version: write everything on your own domain first, then share it to other platforms. This means you always own the original. Load \`$posse-syndication\` for the full URL conventions and syndication rules.

**Q: Which IndieWeb spec should I implement first?**  
\`rel=me\` and microformats2. Both have zero server-side requirements and make everything else easier. Don't implement Webmention until you have a real use case for cross-site replies. Don't activate IndieAuth or Micropub until those features are directly needed.

**Q: How does the Creatrweb idea differ from the Indieweb?**  
The Creatrweb also shares the ideals of decentralization, content ownership, and the desire for alternatives to the “corporate web” that the Indieweb community holds at its core. However, the Creatrweb also understands the corporate realities of the modern internet: there is no such thing as a website that falls outside the grasp of big tech corporations. It also recognizes that human-tool collaboration can foster creativity, even when the tool is rooted in generative AI. However, ownership of identity rules has been integrated into [AGENTS.md](http://AGENTS.md) and other documentation, as these should be normalized components of the basic experience of owning content on the internet.

**Q: How does the Creatrweb idea approach accessibility?**  
I modeled the idea of the Creatrweb in part on my experiences with ableism and gatekeeping. Coming from the contexts of neurodivergence, physical disability, and chronic pain, I have often needed to exclude myself from many normal parts of life. At the same time, even when I have wanted to include myself, things have not always gone well. This is why I stand for accessibility beyond vague statements about what I believe accessibility to be. As someone who has dealt with access issues throughout my entire life, whether it be due to disability, socioeconomic status, or identity-based discrimination, accessibility is about acceptance as the norm, not just diversity for quotas. Accessibility is not an afterthought but rather the implicit focus that defines all that I do, including with this framework, starting with the acceptance that access to generative AI tools can ethically, morally, and authentically uphold creativity. 

**Q: Why does the agent stop and ask before I add a package?**  
New vendor dependencies are Irreversible Decisions. Once a service is woven into your project, you depend on its continued availability, pricing, and API stability. The mandatory question,  "The self-hosting alternative is X. Should I proceed?", ensures that the trade-off is named out loud before it becomes invisible infrastructure.

---

## Memory and Session Continuity

**Q: How does the agent remember decisions across sessions?**  
Three files automatically carry context: MEMORY.md (confirmed durable lessons), DECISIONS.md (architectural choices and unresolved checkpoints), and CONSTRAINTS.md (binding constraints). Any agent that reads these files at session start picks up the full project history without being told explicitly.

**Q: What is an unresolved checkpoint?**  
A decision that needed to be made but couldn't be completed in the session — usually because the session ended before a question was answered. The agent logs these in DECISIONS.md and halts at the relevant point in the next session.

**Q: MEMORY.md is getting long.**  
Keep it under 150 lines. When near the limit, review it with the agent and move older entries to docs/memory-archive.md. Never delete entries without reviewing them — a "stale" lesson may still be relevant. Think of this as akin to the concept of memory vs storage (RAM vs SSD) wherein memory is meant to be short-term and immediately accessible, while storage is meant to be long-term but stored out of sight until you need it.

\---

## AI Authorship and Ethics

**Q: Is AI-assisted code still "my" code?**  
Firstly, code is not truly owned. Code relies on dependencies to run (e.g., JavaScript on a website requires a web browser for interactivity), and code elements, such as functions, cannot (and should not) be subject to copyright. Subjecting these elements to copyright would be akin to allowing a single artist to copyright an art style and deeming it illegal for another artist to draw or paint in that style. Secondly, code is functional for software, akin to how words are functional for essays, and medium and canvas are functional for art. Functional building blocks are the backbone of any practice. Thus, while code can be bought and sold (as software), words can be sold as news articles, and media and canvases can be sold as art, it is unethical to disallow functional building blocks from being limited beyond reasonable bounds. Thirdly, the root of all practice is the novel idea. Personally, I believe that allowing an idea a chance to develop will always be preferable to not allowing it to be executed. Life is too short, and the world is too big for our ideas to fall to the wayside just because of a lack of skill, connections, or resources.

**Q: But isn’t AI unethical?**  
We need to understand this question from a broader perspective, rather than oversimplified ideas of ownership. Firstly, the technology is now available to non-technical people, enabling them to bring their vision to life. Some people, like myself, would see it as unethical to prioritize someone else’s discomfort (no matter how justified) over bringing a non-technical creative’s vision to life. Secondly, the global supply chain is notorious for unethical practices, and, more specifically, in the tech industry, unethical model training has occurred throughout the rise of social media, as highlighted in [this article](https://www.sciencedirect.com/science/article/abs/pii/S0736585325001030). But why the spotlight on generative AI? It is simply a matter of the times that we live in. It is extremely easy to scapegoat a technology, such as generative AI, as the global economic system runs in such opaque ways that true transparency is often fleeting. As a result, individuals tend to draw on what they know, and, in the present day, the idea that generative AI is unethical prevails, as the carceral public consciousness does not easily draw the line between AI corporations and AI technologies. At the same time, [as early as 2020](https://crcs.seas.harvard.edu/news/10-wonderful-examples-using-artificial-intelligence-ai-good), researchers have been using AI technologies for positive use cases, while [MIT](https://mitsloan.mit.edu/ideas-made-to-matter/machine-learning-and-generative-ai-what-are-they-good-for) emphasizes that generative AI is best used for “dealing with everyday language or common images” as it is difficult for other AI techniques, such as traditional machine learning, to meaningfully work with unstructured data (data that isn’t formatted in a tabular format). For instance, a notable use case of generative AI is [generating synthetic data](https://pmc.ncbi.nlm.nih.gov/articles/PMC12614387/) to accelerate breast cancer research, leading to improved models that translate into more accurate breast cancer detection technologies. In short, while AI companies should absolutely train AI models, we need not forget that social media companies have been unethically training their own algorithms for decades. Also, while AI companies should find ways to make training more environmentally conscious and resource-efficient, this is a matter of what AI companies believe they can get away with, rather than an inherent flaw in the ethics of generative AI and other AI technologies.

**Q: What is the proper way to attribute AI-generated content?**  
There is no widely accepted standard for attributing AI-generated content as of April 2026\. However, explicitly citing a specific chatbot may be a good place to start. If AI-generated content is created using something that you wrote as source material, it may be best to state something of this nature. For instance, I explicitly state “Assisted by…” in the tagline of the FAQ as Claude Sonnet via Perplexity utilized my stated philosophy as context to generate many parts of this document. While not usually demanded, doing this helps to normalize how AI-generated content is perceived and may also help to specify where human creativity and ingenuity is present in a given work. This also helps us to get an accurate inventory of how we are using generative AI technologies and outputs, hopefully ensuring that we are leveraging generative AI effectively while duly developing our ideas, creativity, and ingenuity, rather than replacing this crucial aspect of human creation.