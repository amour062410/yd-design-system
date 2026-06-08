import { brandPrimary, neutralGray } from "./colors";
import { radius } from "./radius";

export const tabsTokens = {
  "tabs-color-active": brandPrimary[6],
  "tabs-color-hover": brandPrimary[5],
  "tabs-color-disabled": neutralGray[5],
  "tabs-border-color": neutralGray[4],
  "tabs-indicator-color": brandPrimary[6],
  "tabs-height-sm": "32px",
  "tabs-height-md": "40px",
  "tabs-height-lg": "48px",
  "tabs-text-default": neutralGray[8],
  "tabs-segment-track": neutralGray[3],
  "tabs-card-radius": radius.md,
} as const;

export type TabsTokenKey = keyof typeof tabsTokens;

export const tabsSizeSpecs = {
  sm: {
    height: tabsTokens["tabs-height-sm"],
    fontSizeKey: "xs" as const,
    paddingX: "12px",
    indicator: "2px",
  },
  md: {
    height: tabsTokens["tabs-height-md"],
    fontSizeKey: "sm" as const,
    paddingX: "16px",
    indicator: "2px",
  },
  lg: {
    height: tabsTokens["tabs-height-lg"],
    fontSizeKey: "base" as const,
    paddingX: "20px",
    indicator: "3px",
  },
} as const;

export type TabsSizeKey = keyof typeof tabsSizeSpecs;

export const tabsTokenRows = [
  {
    token: "tabs-color-active",
    value: tabsTokens["tabs-color-active"],
    description: "选中标签文字色",
  },
  {
    token: "tabs-color-hover",
    value: tabsTokens["tabs-color-hover"],
    description: "Hover 文字色",
  },
  {
    token: "tabs-color-disabled",
    value: tabsTokens["tabs-color-disabled"],
    description: "禁用文字色",
  },
  {
    token: "tabs-border-color",
    value: tabsTokens["tabs-border-color"],
    description: "分割线 / 卡片边框色",
  },
  {
    token: "tabs-indicator-color",
    value: tabsTokens["tabs-indicator-color"],
    description: "Line 类型下划线指示器色",
  },
  {
    token: "tabs-height-sm",
    value: tabsTokens["tabs-height-sm"],
    description: "Small 标签高度",
  },
  {
    token: "tabs-height-md",
    value: tabsTokens["tabs-height-md"],
    description: "Medium 标签高度",
  },
  {
    token: "tabs-height-lg",
    value: tabsTokens["tabs-height-lg"],
    description: "Large 标签高度",
  },
] as const;
