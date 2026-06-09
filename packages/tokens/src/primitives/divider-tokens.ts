import { neutralGray } from "./colors";

/**
 * Divider 专属 Token（其余复用 color-border / text-secondary / spacing 体系）
 */
export const dividerTokens = {
  /** 分割线颜色，复用 border-secondary / neutral gray-4 */
  "divider-color": neutralGray[4],
  /** 水平分割线上下间距，复用 spacing-lg (24px) */
  "divider-margin": "24px",
  /** 移动端水平间距缩减 */
  "divider-margin-sm": "16px",
  /** 标题与线条左右间距，复用 spacing-md (16px) */
  "divider-text-gap": "16px",
  /** 垂直分割线高度 */
  "divider-vertical-height": "16px",
  /** 垂直分割线左右 margin */
  "divider-vertical-margin": "8px",
  /** 虚线间隔 */
  "divider-dashed-gap": "4px",
  /** 标题字号 */
  "divider-text-size": "14px",
  /** 移动端标题字号 */
  "divider-text-size-sm": "12px",
} as const;

export type DividerTokenKey = keyof typeof dividerTokens;

export const dividerUsageTokenNames = [
  "color-border",
  "color-text-secondary",
  "spacing-md",
  "spacing-lg",
  "spacing-xl",
  "divider-color",
  "divider-margin",
  "divider-text-gap",
  "divider-vertical-height",
  "divider-dashed-gap",
] as const;

export const dividerTokenRows = [
  {
    token: "divider-color" as const,
    value: dividerTokens["divider-color"],
    description: "分割线颜色，复用 color-border",
    reused: true,
  },
  {
    token: "divider-margin" as const,
    value: dividerTokens["divider-margin"],
    description: "水平分割线上下间距，复用 spacing-lg (24px)",
    reused: false,
  },
  {
    token: "divider-text-gap" as const,
    value: dividerTokens["divider-text-gap"],
    description: "标题与线条间距，复用 spacing-md (16px)",
    reused: false,
  },
  {
    token: "divider-vertical-height" as const,
    value: dividerTokens["divider-vertical-height"],
    description: "垂直分割线高度",
    reused: false,
  },
  {
    token: "divider-dashed-gap" as const,
    value: dividerTokens["divider-dashed-gap"],
    description: "虚线间隔",
    reused: false,
  },
] as const;
