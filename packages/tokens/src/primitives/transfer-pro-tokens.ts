import { brandPrimary, functionalColors, neutralGray } from "./colors";
import { radius } from "./radius";
import { spacing } from "./spacing";

export const transferProTokens = {
  "transfer-pro-panel-min-width": "280px",
  "transfer-pro-panel-default-width": "320px",
  "transfer-pro-table-panel-min-width": "520px",
  "transfer-pro-table-panel-default-width": "560px",
  "transfer-pro-list-height": "360px",
  "transfer-pro-header-height": "40px",
  "transfer-pro-batch-toolbar-height": "44px",
  "transfer-pro-item-height": "32px",
  "transfer-pro-border-radius": radius.lg,
  "transfer-pro-gap": spacing[4],
  "transfer-pro-node-indent": "24px",
  "transfer-pro-title-font-size": "14px",
  "transfer-pro-mode-tree": brandPrimary[6],
  "transfer-pro-mode-table": brandPrimary[7],
  "transfer-pro-diff-add": functionalColors.success,
  "transfer-pro-diff-remove": functionalColors.danger,
  "transfer-pro-rule-tag-bg": brandPrimary[1],
  "transfer-pro-color-bg": neutralGray[1],
  "transfer-pro-color-border": "#F0F0F0",
  "transfer-pro-color-title": neutralGray[10],
  "transfer-pro-color-text": neutralGray[10],
  "transfer-pro-color-text-secondary": neutralGray[6],
  "transfer-pro-color-item-hover-bg": brandPrimary[1],
  "transfer-pro-color-item-selected-bg": "rgba(22, 93, 255, 0.08)",
  "transfer-pro-color-operation-bg": brandPrimary[6],
  "transfer-pro-color-operation-disabled-bg": neutralGray[3],
  "transfer-pro-color-operation-disabled-text": neutralGray[5],
  "transfer-pro-color-disabled-opacity": "0.45",
  "transfer-pro-operations-sticky-top": "0px",
} as const;

export type TransferProTokenKey = keyof typeof transferProTokens;

export const transferProTokenRows = [
  { token: "transfer-pro-mode-tree" as const, value: transferProTokens["transfer-pro-mode-tree"], description: "Tree 模式标识色" },
  { token: "transfer-pro-mode-table" as const, value: transferProTokens["transfer-pro-mode-table"], description: "Table 模式标识色" },
  { token: "transfer-pro-diff-add" as const, value: transferProTokens["transfer-pro-diff-add"], description: "Diff 新增高亮（绿）" },
  { token: "transfer-pro-diff-remove" as const, value: transferProTokens["transfer-pro-diff-remove"], description: "Diff 移除高亮（红）" },
  { token: "transfer-pro-rule-tag-bg" as const, value: transferProTokens["transfer-pro-rule-tag-bg"], description: "规则标签背景" },
  { token: "transfer-pro-batch-toolbar-height" as const, value: transferProTokens["transfer-pro-batch-toolbar-height"], description: "批量工具栏高度 44px" },
  { token: "transfer-pro-panel-min-width" as const, value: transferProTokens["transfer-pro-panel-min-width"], description: "面板最小宽度 280px" },
  { token: "transfer-pro-node-indent" as const, value: transferProTokens["transfer-pro-node-indent"], description: "Tree 节点缩进 24px" },
] as const;
