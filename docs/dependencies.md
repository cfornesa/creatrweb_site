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

## astro
- Purpose: Astro SSR/static framework for the public site routes and layouts
- Sends data off-domain: NO
- Self-hosting alternative: Not applicable; Astro is the self-hosted framework runtime
- License: MIT

## @astrojs/node
- Purpose: Node adapter that builds the Astro app into a single standalone server entrypoint for Hostinger
- Sends data off-domain: NO
- Self-hosting alternative: Not applicable; this is the self-hosted deployment adapter
- License: MIT

## @astrojs/react
- Purpose: React integration used to preserve the existing interactive widgets as Astro islands
- Sends data off-domain: NO
- Self-hosting alternative: Not applicable; this is a local framework integration
- License: MIT

## @mistralai/mistralai
- Purpose: Mistral AI SDK for embeddings (RAG indexing) and agent completions (chat)
- Sends data off-domain: YES — messages and document chunks are sent to Mistral AI API servers
- Self-hosting alternative: Deploy Mistral Small 4 (open weights, 119B MoE) locally; minimum 4× H100 GPUs required. Weights at https://huggingface.co/mistralai/Mistral-Small-4-119B-2603
- License: Apache 2.0
