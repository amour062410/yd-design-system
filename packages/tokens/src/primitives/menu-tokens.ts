import { brandPrimary, neutralGray } from "./colors";

export const menuTokens = {
  "menu-item-height": "40px",
  "menu-item-padding-inline": "16px",
  "menu-icon-size": "16px",
  "menu-icon-margin-inline-end": "8px",
  "menu-collapsed-width": "48px",
  "menu-highlight-color": brandPrimary[6],
  "menu-highlight-bg": "rgba(22, 93, 255, 0.06)",
  "menu-hover-bg": "rgba(0, 0, 0, 0.04)",
  "menu-active-bar-width-vertical": "3px",
  "menu-active-bar-width-horizontal": "2px",
  "menu-font-size": "14px",
  "menu-sub-menu-inline-indent": "24px",
  "menu-color-text": neutralGray[10],
  "menu-color-text-secondary": neutralGray[6],
  "menu-color-border": "#F0F0F0",
  "menu-color-bg": neutralGray[1],
  "menu-group-color": neutralGray[6],
  "menu-motion-duration": "200ms",
  "menu-border-radius": "8px",
} as const;

export type MenuTokenKey = keyof typeof menuTokens;

export const menuUsageTokenNames = [
  "menu-item-height",
  "menu-item-padding-inline",
  "menu-icon-size",
  "menu-icon-margin-inline-end",
  "menu-collapsed-width",
  "menu-highlight-color",
  "menu-highlight-bg",
  "menu-hover-bg",
  "menu-active-bar-width-vertical",
  "menu-active-bar-width-horizontal",
  "menu-font-size",
  "menu-sub-menu-inline-indent",
] as const;

export const menuTokenRows = [
  {
    token: "menu-item-height",
    value: menuTokens["menu-item-height"],
    description: "菜单项高度",
  },
  {
    token: "menu-item-padding-inline",
    value: menuTokens["menu-item-padding-inline"],
    description: "菜单项水平内边距",
  },
  {
    token: "menu-icon-size",
    value: menuTokens["menu-icon-size"],
    description: "图标尺寸",
  },
  {
    token: "menu-collapsed-width",
    value: menuTokens["menu-collapsed-width"],
    description: "侧边栏收缩宽度",
  },
  {
    token: "menu-highlight-color",
    value: menuTokens["menu-highlight-color"],
    description: "选中态主色",
  },
  {
    token: "menu-highlight-bg",
    value: menuTokens["menu-highlight-bg"],
    description: "选中态背景（Vertical）",
  },
  {
    token: "menu-hover-bg",
    value: menuTokens["menu-hover-bg"],
    description: "Hover 背景",
  },
  {
    token: "menu-active-bar-width-vertical",
    value: menuTokens["menu-active-bar-width-vertical"],
    description: "Vertical 选中指示条宽度",
  },
  {
    token: "menu-active-bar-width-horizontal",
    value: menuTokens["menu-active-bar-width-horizontal"],
    description: "Horizontal 下划线高度",
  },
  {
    token: "menu-sub-menu-inline-indent",
    value: menuTokens["menu-sub-menu-inline-indent"],
    description: "子菜单缩进",
  },
] as const;
