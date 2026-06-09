import { brandPrimary, neutralGray } from "./colors";
import { radius } from "./radius";
import { spacing } from "./spacing";

export const treeTokens = {
  "tree-color-bg": "#FFFFFF",
  "tree-color-border": neutralGray[4],
  "tree-color-title": neutralGray[10],
  "tree-color-title-hover": neutralGray[10],
  "tree-color-title-selected": brandPrimary[6],
  "tree-color-title-disabled": neutralGray[5],
  "tree-color-icon": neutralGray[7],
  "tree-color-switcher": neutralGray[7],
  "tree-color-node-hover-bg": brandPrimary[1],
  "tree-color-node-selected-bg": "rgba(22, 93, 255, 0.08)",
  "tree-color-search-highlight": brandPrimary[6],
  "tree-color-line": neutralGray[4],
  "tree-indent-size": "24px",
  "tree-node-height": "32px",
  "tree-radius": radius.sm,
  "tree-font-size": "13px",
  "tree-switcher-size": "16px",
  "tree-checkbox-gap": spacing[2],
  "tree-search-gap": spacing[3],
} as const;

export type TreeTokenKey = keyof typeof treeTokens;

export const treeUsageTokenNames = [
  "tree-color-bg",
  "tree-color-border",
  "tree-color-title",
  "tree-color-title-selected",
  "tree-color-node-hover-bg",
  "tree-color-node-selected-bg",
  "tree-color-search-highlight",
  "tree-indent-size",
  "tree-node-height",
  "tree-radius",
] as const;

export const treeTokenRows = [
  { token: "tree-color-bg" as const, value: treeTokens["tree-color-bg"], description: "树容器背景" },
  { token: "tree-color-border" as const, value: treeTokens["tree-color-border"], description: "边框色 #F0F0F0" },
  { token: "tree-color-title-selected" as const, value: treeTokens["tree-color-title-selected"], description: "选中节点文字 #165DFF" },
  { token: "tree-color-node-selected-bg" as const, value: treeTokens["tree-color-node-selected-bg"], description: "选中节点背景" },
  { token: "tree-indent-size" as const, value: treeTokens["tree-indent-size"], description: "层级缩进 24px" },
  { token: "tree-node-height" as const, value: treeTokens["tree-node-height"], description: "节点行高 32px" },
] as const;
