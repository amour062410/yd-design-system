"use client";

import { forwardRef } from "react";
import type { CSSProperties } from "react";
import { cn } from "../../lib/utils";
import {
  formatStatisticValue,
  formatTrendLabel,
  getTrendStyle,
  statisticTitleStyle,
  statisticValueStyle,
} from "./statistic-styles";
import type { StatisticProps } from "./statistic.types";

function StatisticLoading() {
  return (
    <div className="inline-flex flex-col gap-2" aria-busy="true">
      <span
        className="inline-block animate-pulse rounded"
        style={{
          width: "72px",
          height: "var(--statistic-title-line-height, 22px)",
          backgroundColor: "var(--statistic-loading-bg, #F2F3F5)",
        }}
      />
      <span
        className="inline-block animate-pulse rounded"
        style={{
          width: "96px",
          height: "var(--statistic-value-line-height, 32px)",
          backgroundColor: "var(--statistic-loading-highlight, #E5E6EB)",
        }}
      />
    </div>
  );
}

export const Statistic = forwardRef<HTMLDivElement, StatisticProps>(
  function Statistic(
    {
      title,
      value,
      precision,
      prefix,
      suffix,
      loading = false,
      valueStyle,
      trend,
      trendValue,
      className,
    },
    ref
  ) {
    if (loading) {
      return (
        <div ref={ref} className={cn("inline-flex flex-col", className)}>
          <StatisticLoading />
        </div>
      );
    }

    const displayValue = formatStatisticValue(value, precision);
    const trendLabel = trend ? formatTrendLabel(trend, trendValue) : null;

    const valueMerged: CSSProperties = {
      ...statisticValueStyle,
      ...valueStyle,
    };

    return (
      <div ref={ref} className={cn("inline-flex flex-col", className)}>
        {title != null ? (
          <span className="mb-1" style={statisticTitleStyle}>
            {title}
          </span>
        ) : null}
        <span className="inline-flex flex-wrap items-baseline gap-1 tabular-nums">
          {prefix ? (
            <span
              className="inline-flex items-center"
              style={{
                fontSize: "var(--statistic-prefix-font-size, 20px)",
                color: valueMerged.color,
              }}
            >
              {prefix}
            </span>
          ) : null}
          <span style={valueMerged}>{displayValue}</span>
          {suffix ? (
            <span
              style={{
                fontSize: "var(--statistic-suffix-font-size, 14px)",
                color: "var(--statistic-suffix-color, rgba(0,0,0,0.65))",
              }}
            >
              {suffix}
            </span>
          ) : null}
        </span>
        {trendLabel ? (
          <span className="mt-1" style={getTrendStyle(trend!)}>
            {trendLabel}
          </span>
        ) : null}
      </div>
    );
  }
);
