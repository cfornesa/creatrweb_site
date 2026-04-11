import fs from "node:fs";
import path from "node:path";

const rootDir = process.cwd();
const appBuildManifestPath = path.join(rootDir, ".next", "app-build-manifest.json");
const buildManifestPath = path.join(rootDir, ".next", "build-manifest.json");
const standaloneNextDir = path.join(rootDir, ".next", "standalone", ".next");

function readJson(filePath) {
  if (!fs.existsSync(filePath)) {
    throw new Error(`Missing required manifest: ${path.relative(rootDir, filePath)}`);
  }

  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function collectAppAssets(appBuildManifest) {
  const pageAssets = Object.values(appBuildManifest.pages ?? {}).flat();

  return pageAssets.filter((asset) => typeof asset === "string" && asset.startsWith("static/"));
}

function collectBuildAssets(buildManifest) {
  const assets = [
    ...(buildManifest.rootMainFiles ?? []),
    ...(buildManifest.polyfillFiles ?? []),
    ...(buildManifest.lowPriorityFiles ?? []),
    ...Object.values(buildManifest.pages ?? {}).flat(),
  ];

  return assets.filter((asset) => typeof asset === "string" && asset.startsWith("static/"));
}

function unique(items) {
  return [...new Set(items)];
}

function verifyAsset(assetPath) {
  const sourcePath = path.join(rootDir, ".next", assetPath);
  const standalonePath = path.join(standaloneNextDir, assetPath);

  const missing = [];

  if (!fs.existsSync(sourcePath)) {
    missing.push(`source missing: ${assetPath}`);
  }

  if (!fs.existsSync(standalonePath)) {
    missing.push(`standalone missing: ${assetPath}`);
  }

  return missing;
}

const appBuildManifest = readJson(appBuildManifestPath);
const buildManifest = readJson(buildManifestPath);
const assetPaths = unique([
  ...collectAppAssets(appBuildManifest),
  ...collectBuildAssets(buildManifest),
]);

const failures = assetPaths.flatMap(verifyAsset);

if (failures.length > 0) {
  console.error("Standalone asset verification failed.");
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log(
  `Standalone asset verification passed for ${assetPaths.length} static assets.`,
);
