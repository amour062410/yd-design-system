/**
 * FilterBar 专属 Token（其余复用 Form / Input / Select / Button / Card 体系）
 */
export const filterbarTokens = {
  "filterbar-gap": "16px",
  "filterbar-row-gap": "16px",
  "filterbar-label-width": "72px",
  "filterbar-max-visible-fields": "4",
  "filterbar-action-gap": "8px",
  "filterbar-padding": "16px",
  "filterbar-label-font-size": "13px",
  "filterbar-label-font-weight": "500",
  "filterbar-control-height": "40px",
  "filterbar-label-gap": "8px",
  "filterbar-primary-control-width": "460px",
  "filterbar-primary-control-min-width": "420px",
  "filterbar-primary-control-max-width": "500px",
  "filterbar-secondary-control-width": "180px",
  "filterbar-business-shadow": "0 1px 2px rgba(0, 0, 0, 0.04)",
} as const;

export type FilterbarTokenKey = keyof typeof filterbarTokens;

export const filterbarUsageTokenNames = [
  "filterbar-gap",
  "filterbar-row-gap",
  "filterbar-label-width",
  "filterbar-max-visible-fields",
  "filterbar-action-gap",
  "color-border",
  "color-text-secondary",
  "spacing-md",
  "spacing-lg",
] as const;

export const filterbarTokenRows = [
  {
    token: "filterbar-gap" as const,
    value: filterbarTokens["filterbar-gap"],
    description: "字段间距，复用 spacing-md (16px)",
  },
  {
    token: "filterbar-row-gap" as const,
    value: filterbarTokens["filterbar-row-gap"],
    description: "行间距 (16px)",
  },
  {
    token: "filterbar-label-width" as const,
    value: filterbarTokens["filterbar-label-width"],
    description: "Label 固定宽度 (72px)",
  },
  {
    token: "filterbar-max-visible-fields" as const,
    value: filterbarTokens["filterbar-max-visible-fields"],
    description: "桌面端默认可见字段数",
  },
  {
    token: "filterbar-action-gap" as const,
    value: filterbarTokens["filterbar-action-gap"],
    description: "操作按钮间距 (8px)",
  },
] as const;
