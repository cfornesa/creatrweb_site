## express
- Purpose: HTTP server framework — serves static files from public/, routes each URL to an HTML file, handles POST /chat
- Sends data off-domain: NO
- Self-hosting alternative: Not applicable; Express is the self-hosted server runtime
- License: MIT

## esbuild
- Purpose: Build-time bundler — compiles server.ts and all imports into a single server.bundle.js for deployment
- Sends data off-domain: NO
- Self-hosting alternative: Not applicable; build-time tool only, not used at runtime
- License: MIT

## dotenv
- Purpose: Loads local and deployment environment variables before the Express server and Drizzle config initialize
- Sends data off-domain: NO
- Self-hosting alternative: Not applicable; local configuration loader only
- License: BSD-2-Clause

## better-sqlite3
- Purpose: Native SQLite driver used by the app runtime to open `SQLITE_DATABASE_URL`
- Sends data off-domain: NO
- Self-hosting alternative: Not applicable; local embedded database driver
- License: MIT

## drizzle-orm
- Purpose: Type-safe ORM layer used by the chat route and indexing scripts to read and write SQLite tables
- Sends data off-domain: NO
- Self-hosting alternative: Not applicable; local query and schema layer
- License: Apache-2.0

## drizzle-kit
- Purpose: Migration and schema CLI for generating SQL files in `drizzle/` from `lib/schema.ts`
- Sends data off-domain: NO
- Self-hosting alternative: Not applicable; local development and migration tool
- License: Apache-2.0

## @mistralai/mistralai
- Purpose: Mistral AI SDK for embeddings (RAG indexing) and agent completions (chat)
- Sends data off-domain: YES — messages and document chunks are sent to Mistral AI API servers
- Self-hosting alternative: Deploy Mistral Small 4 (open weights, 119B MoE) locally; minimum 4× H100 GPUs required. Weights at https://huggingface.co/mistralai/Mistral-Small-4-119B-2603
- License: Apache 2.0

## Poppler (`pdftotext`)
- Purpose: Local PDF text extraction for `scripts/rag-index.ts`, so `.pdf` files in `documents/` can be converted to text before chunking and embedding through the `pdftotext` CLI
- Sends data off-domain: NO
- Self-hosting alternative: Not applicable; local CLI tool only
- License: GPL-2.0-or-later
