import type { CSSProperties } from "react";
import type { StatisticTrend } from "./statistic.types";

export function formatStatisticValue(
  value: string | number | undefined,
  precision?: number
): string {
  if (value == null) return "—";
  if (typeof value === "string") return value;
  if (precision != null) return value.toFixed(precision);
  return String(value);
}

export function formatTrendLabel(
  trend: StatisticTrend,
  trendValue: string | number | undefined,
  compact = false
): string | null {
  if (trendValue == null) return null;
  const text =
    typeof trendValue === "number" ? `${trendValue}%` : String(trendValue);
  const arrow = trend === "up" ? "↑" : "↓";
  return compact ? `${arrow}${text}` : `${arrow} ${text}`;
}

export function getTrendStyle(trend: StatisticTrend): CSSProperties {
  return {
    color:
      trend === "up"
        ? "var(--statistic-trend-up, #00B42A)"
        : "var(--statistic-trend-down, #F53F3F)",
    fontSize: "var(--statistic-trend-font-size, 12px)",
    lineHeight: "var(--statistic-trend-line-height, 20px)",
    fontWeight: 500,
  };
}

export const statisticTitleStyle: CSSProperties = {
  color: "var(--statistic-title-color, rgba(0,0,0,0.45))",
  fontSize: "var(--statistic-title-font-size, 14px)",
  lineHeight: "var(--statistic-title-line-height, 22px)",
};

export const statisticValueStyle: CSSProperties = {
  color: "var(--statistic-value-color, rgba(0,0,0,0.88))",
  fontSize: "var(--statistic-value-font-size, 24px)",
  fontWeight: "var(--statistic-value-font-weight, 600)" as unknown as number,
  lineHeight: "var(--statistic-value-line-height, 32px)",
};
