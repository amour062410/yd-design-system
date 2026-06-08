import type { CSSProperties } from "react";
import type { StatisticCardStatus } from "./statistic.types";

export const statisticCardStatusStyles: Record<
  StatisticCardStatus,
  { iconColor: string; iconBg: string }
> = {
  primary: {
    iconColor: "var(--statistic-primary, #165DFF)",
    iconBg: "var(--statistic-card-icon-bg-primary, rgba(22, 93, 255, 0.08))",
  },
  success: {
    iconColor: "var(--statistic-trend-up, #00B42A)",
    iconBg: "var(--statistic-card-icon-bg-success, rgba(0, 180, 42, 0.08))",
  },
  warning: {
    iconColor: "var(--color-warning, #FF7D00)",
    iconBg: "var(--statistic-card-icon-bg-warning, rgba(255, 125, 0, 0.08))",
  },
  danger: {
    iconColor: "var(--statistic-trend-down, #F53F3F)",
    iconBg: "var(--statistic-card-icon-bg-danger, rgba(245, 63, 63, 0.08))",
  },
};

export const statisticCardBaseStyle: CSSProperties = {
  minHeight: "var(--statistic-card-height, 120px)",
  padding: "var(--statistic-card-padding, 20px)",
  borderRadius: "var(--statistic-card-radius, 12px)",
  border: "1px solid var(--statistic-card-border-color, #E5E6EB)",
  boxShadow: "var(--statistic-card-shadow, none)",
  backgroundColor: "var(--statistic-card-bg, #FFFFFF)",
};

export const statisticCardDescriptionStyle: CSSProperties = {
  color: "var(--statistic-card-description-color, rgba(0,0,0,0.45))",
  fontSize: "var(--statistic-card-description-font-size, 12px)",
  lineHeight: "var(--statistic-card-description-line-height, 20px)",
};
