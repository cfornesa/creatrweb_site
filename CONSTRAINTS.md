CONSTRAINT: No styled-jsx syntax (<style jsx>) in any file.
SCOPE: All files under components/, app/, and scripts/. Applies to all new
files created in any phase. Use CSS Modules (*.module.css) only.
SET: 2026-04-09

CONSTRAINT: @mistralai/mistralai sends data off-domain. Any feature that
increases the volume or sensitivity of data sent to Mistral API servers
requires explicit human approval before implementation.
SCOPE: app/chat/route.ts, scripts/rag-index.ts, and any future file that
imports from @mistralai/mistralai.
SET: 2026-04-09

CONSTRAINT: app/(system)/page.tsx must remain a Server Component. No "use client"
directive on any page that renders microformats2 markup.
SCOPE: app/(system)/page.tsx and any future route page that includes h-card,
h-entry, h-feed, or h-cite markup.
SET: 2026-04-09