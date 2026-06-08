import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));

fs.copyFileSync(
  path.join(root, "src/styles/globals.css"),
  path.join(root, "dist/styles.css")
);

const clientEntries = [
  ...[
    "input.js",
    "link.js",
    "radio.js",
    "checkbox.js",
    "switch.js",
    "tabs.js",
    "select.js",
    "date-picker.js",
    "time-picker.js",
    "upload.js",
    "table.js",
    "table-actions.js",
    "table-pagination.js",
    "modal.js",
    "drawer.js",
    "message.js",
    "empty.js",
    "steps.js",
    "collapse.js",
  ].map((file) => path.join(root, "dist/components", file)),
  path.join(root, "dist/business-patterns.js"),
  ...["table.js", "progress.js", "statistic.js", "tag.js", "badge.js", "steps.js"].map(
    (file) => path.join(root, "dist/business-patterns", file)
  ),
];

for (const filePath of clientEntries) {
  if (!fs.existsSync(filePath)) continue;
  const content = fs.readFileSync(filePath, "utf8");
  if (!content.startsWith('"use client"')) {
    fs.writeFileSync(filePath, `"use client";\n${content}`);
  }
}
