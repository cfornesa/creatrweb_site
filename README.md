# CreatrWeb

A personal IndieWeb site with a retro-modern iMac-framed UI and an AI chat
terminal. Built to own the content, keep the URLs permanent, and stay
portable across hosts.

---

## Features

- **iMac monitor frame** — the entire site renders inside a styled iMac shell
  on desktop; a floating nav pill takes over on mobile
- **AI chat terminal** — a retro terminal overlay powered by Mistral AI with
  local RAG over documents you index yourself
- **IndieWeb microformats** — h-card and rel=me links are server-rendered in
  static HTML; no client-side hydration required
- **Six pages** — `/` (home), `/projects`, `/readme`, `/indieweb-platform`,
  `/creatrweb-rag`, `/terminal-ui`

---

## Stack

| Layer | Choice |
|---|---|
| Runtime | Node.js 20, Express 4 |
| Language | TypeScript — bundled via esbuild to `server.bundle.js` |
| Frontend | Vanilla JS + static HTML in `public/` |
| Database | SQLite via Drizzle ORM |
| AI | Mistral AI (`mistral-embed` + agent inference) |
| RAG store | `embeddings.json` — built locally, committed to the repo |

---

## Local development

```bash
cp .env.example .env        # fill in the three required vars below
npm install
npm run dev                 # http://localhost:3000
```

**Required environment variables:**

| Variable | Purpose |
|---|---|
| `SQLITE_DATABASE_URL` | Path to the SQLite file, e.g. `./data/creatrweb.sqlite` |
| `MISTRAL_API_KEY` | Mistral API key |
| `AGENT_ID` | Mistral agent ID for chat inference |

`PORT` is optional and defaults to `3001` in local dev.

---

## RAG indexing

Place `.md`, `.txt`, `.html`, or `.pdf` files in `documents/` and run:

```bash
npm run rag:index
```

Output is written to `embeddings.json` in the repo root. PDF extraction
runs locally through Poppler's `pdftotext` — no document text is sent to
a remote parser. Poppler must be installed on the machine running the
indexer (`brew install poppler` on macOS).

Indexing is manual-only. Nothing indexes on server start or during a
visitor request.

---

## Deployment (Hostinger)

This repo deploys as a bundled Express app on Hostinger Node.js v20.

**hPanel settings:**

| Setting | Value |
|---|---|
| Framework preset | Other |
| Root directory | `./` |
| Node.js version | `20.x` |
| Output directory | *(leave blank)* |
| Build command | `npm install && npm run build` |
| Entry file | `server.bundle.js` |

**Runtime environment variables** (set in hPanel):

```
NODE_ENV=production
HOST=0.0.0.0
PORT=5000
SQLITE_DATABASE_URL=/home/<username>/path/to/creatrweb.sqlite
MISTRAL_API_KEY=...
AGENT_ID=...
```

`SQLITE_DATABASE_URL` must be an absolute path on Hostinger — relative
paths are not resolved correctly under Phusion Passenger.

`esbuild` and `dotenv` are listed under `dependencies` (not
`devDependencies`) because Hostinger installs only production dependencies
before running the build step. Both are required at build time.
