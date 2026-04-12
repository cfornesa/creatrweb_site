/**
 * Post-build patch for dist/server/entry.mjs.
 *
 * @astrojs/node bakes absolute file:// URLs into entry.mjs at build time,
 * pointing to the machine where `astro build` ran. When Hostinger copies the
 * built dist/ directory from the build workspace (.builds/...) to the
 * deployment directory (nodejs/), the hardcoded paths become stale and the
 * server cannot find dist/client/, causing all CSS and JS to 404.
 *
 * This script replaces those absolute paths with import.meta.url-relative
 * equivalents so entry.mjs resolves dist/client/ correctly from wherever it
 * is deployed.
 */

import { readFileSync, writeFileSync } from "fs";
import { resolve } from "path";

const entryPath = resolve(process.cwd(), "dist/server/entry.mjs");

let content;
try {
  content = readFileSync(entryPath, "utf8");
} catch {
  console.error(`[patch-entry] Could not read ${entryPath}`);
  process.exit(1);
}

if (!content.includes('"client": "file://') && !content.includes('"server": "file://')) {
  console.log("[patch-entry] No absolute file:// paths found — skipping (paths may already be relative).");
  process.exit(0);
}

// dist/server/entry.mjs -> ../../client/ = dist/client/
content = content.replace(
  /"client":\s*"file:\/\/[^"]*"/,
  '"client": new URL("../../client/", import.meta.url).href'
);

// dist/server/entry.mjs -> ./ = dist/server/
content = content.replace(
  /"server":\s*"file:\/\/[^"]*"/,
  '"server": new URL("./", import.meta.url).href'
);

writeFileSync(entryPath, content);
console.log("[patch-entry] Patched dist/server/entry.mjs: replaced absolute dist paths with import.meta.url-relative paths.");
