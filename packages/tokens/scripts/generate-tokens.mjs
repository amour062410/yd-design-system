#!/usr/bin/env node
/**
 * Future SSOT codegen (Phase 1+ in docs/token-migration-plan.md)
 *
 * Today: runtime export via packages/tokens/index.ts + src/ssot/load.ts
 * Tomorrow: this script writes src/generated/* from token.json and CI fails on drift
 *
 * Planned outputs:
 *   src/generated/primitives/colors.ts
 *   src/generated/primitives/spacing.ts
 *   src/generated/primitives/radius.ts
 *   src/generated/primitives/shadows.ts
 *   src/generated/semantic/colors.ts
 *   src/generated/css/primitives.css
 *   apps/docs-site/styles/showcase-tokens.css (optional flag)
 *
 * Usage (not wired to build yet):
 *   node scripts/generate-tokens.mjs --check
 *   node scripts/generate-tokens.mjs --write
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const packageRoot = path.resolve(__dirname, "..");
const tokenJsonPath = path.join(packageRoot, "token.json");
const generatedDir = path.join(packageRoot, "src", "generated");

const WRITE = process.argv.includes("--write");
const CHECK = process.argv.includes("--check") || !WRITE;

function loadDocument() {
  return JSON.parse(fs.readFileSync(tokenJsonPath, "utf8"));
}

function flatten(doc, prefix = "") {
  const entries = [];
  const walk = (node, p) => {
    if (node && typeof node === "object" && "value" in node && (typeof node.value === "string" || typeof node.value === "number")) {
      entries.push({ path: p, value: node.value, type: node.type, token: node.token });
      return;
    }
    if (node && typeof node === "object" && !Array.isArray(node)) {
      for (const [k, child] of Object.entries(node)) {
        if (k === "$metadata") continue;
        walk(child, p ? `${p}.${k}` : k);
      }
    }
  };
  const { $metadata, ...rest } = doc;
  for (const [k, child] of Object.entries(rest)) walk(child, k);
  return entries;
}

function banner() {
  return `/** AUTO-GENERATED from token.json — do not edit. Run: pnpm --filter @yd-ds/tokens generate */\n`;
}

function emitColorsTs(entries) {
  const brand = entries.filter((e) => e.path.startsWith("color.brand.primary."));
  const lines = brand.map((e) => {
    const step = e.path.split(".").pop();
    return `  ${step}: ${JSON.stringify(e.value)},`;
  });
  return `${banner()}export const brandPrimaryGenerated = {\n${lines.join("\n")}\n} as const;\n`;
}

function main() {
  const doc = loadDocument();
  const entries = flatten(doc);
  console.log(`[generate-tokens] ${entries.length} leaf tokens in token.json`);

  if (CHECK) {
    console.log("[generate-tokens] --check: generated/ output not enabled yet (export layer uses runtime JSON import).");
    console.log("[generate-tokens] See packages/tokens/index.ts and src/ssot/ for current SSOT API.");
    process.exit(0);
  }

  fs.mkdirSync(generatedDir, { recursive: true });
  fs.writeFileSync(path.join(generatedDir, "colors.ts"), emitColorsTs(entries), "utf8");
  console.log(`[generate-tokens] wrote ${path.relative(packageRoot, generatedDir)}/colors.ts`);
}

main();
