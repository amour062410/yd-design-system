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
    "input-number.js",
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
    "tooltip.js",
    "popconfirm.js",
    "pagination.js",
    "descriptions.js",
    "divider.js",
    "dropdown.js",
    "menu.js",
    "cascader.js",
    "form.js",
    "card.js",
    "tree.js",
    "transfer.js",
    "transfer-pro.js",
  ].map((file) => path.join(root, "dist/components", file)),
  path.join(root, "dist/business-patterns.js"),
  path.join(root, "dist/business/filter-bar.js"),
  ...["table.js", "progress.js", "statistic.js", "tag.js", "badge.js", "steps.js", "feedback.js", "navigation.js", "detail.js", "layout.js"].map(
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
