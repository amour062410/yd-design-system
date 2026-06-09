import { brandPrimary, neutralGray } from "./colors";

/**
 * Card 专属 Token（云盯业务卡片体系）
 */
export const cardTokens = {
  "card-radius": "8px",
  "card-bg": "#FFFFFF",
  "card-border": "#F0F0F0",
  "card-padding": "16px",
  "card-padding-compact": "12px",
  "card-header-gap": "4px",
  "card-body-gap": "12px",
  "card-footer-gap": "12px",
  "card-header-font-size": "15px",
  "card-header-font-weight": "500",
  "card-subtitle-font-size": "12px",
  "card-body-font-size": "13px",
  "card-value-font-size": "28px",
  "card-value-font-weight": "600",
  "card-unit-font-size": "14px",
  "card-shadow": "0 1px 2px rgba(0, 0, 0, 0.04)",
  "card-hover-shadow": "0 3px 6px rgba(0, 0, 0, 0.1)",
  "card-hover-translate": "-2px",
  "card-status-success": "#00B42A",
  "card-status-warning": "#FF7D00",
  "card-status-danger": "#F53F3F",
  "card-status-processing": brandPrimary[6],
  "card-status-offline": neutralGray[6],
  "card-priority-high": "#F53F3F",
  "card-priority-medium": "#FF7D00",
  "card-priority-low": brandPrimary[6],
  "card-trend-up": "#00B42A",
  "card-trend-down": "#F53F3F",
  "card-skeleton-bg": "#F2F3F5",
  "card-skeleton-highlight": "#E5E6EB",
} as const;

export type CardTokenKey = keyof typeof cardTokens;

export const cardUsageTokenNames = [
  "card-radius",
  "card-bg",
  "card-border",
  "card-padding",
  "card-shadow",
  "card-hover-shadow",
  "color-brand",
  "color-text-primary",
  "color-text-secondary",
] as const;

export const cardTokenRows = [
  {
    token: "card-radius" as const,
    value: cardTokens["card-radius"],
    description: "卡片圆角 (8px)",
  },
  {
    token: "card-bg" as const,
    value: cardTokens["card-bg"],
    description: "卡片背景色",
  },
  {
    token: "card-border" as const,
    value: cardTokens["card-border"],
    description: "卡片描边色",
  },
  {
    token: "card-padding" as const,
    value: cardTokens["card-padding"],
    description: "默认内边距 (16px)",
  },
  {
    token: "card-hover-shadow" as const,
    value: cardTokens["card-hover-shadow"],
    description: "Hover 品牌蓝浅色阴影",
  },
  {
    token: "card-value-font-size" as const,
    value: cardTokens["card-value-font-size"],
    description: "数据数字字号 (28px)",
  },
] as const;
