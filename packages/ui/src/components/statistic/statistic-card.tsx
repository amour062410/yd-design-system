"use client";

import { forwardRef } from "react";
import { cn } from "../../lib/utils";
import {
  formatStatisticValue,
  formatTrendLabel,
  getTrendStyle,
  statisticTitleStyle,
  statisticValueStyle,
} from "./statistic-styles";
import {
  statisticCardBaseStyle,
  statisticCardDescriptionStyle,
  statisticCardStatusStyles,
} from "./statistic-card-styles";
import type { StatisticCardProps } from "./statistic.types";

function StatisticCardLoading() {
  return (
    <div className="flex h-full w-full flex-col" aria-busy="true">
      <div className="flex items-center gap-2">
        <span
          className="shrink-0 animate-pulse rounded-md"
          style={{
            width: "var(--statistic-card-icon-size, 22px)",
            height: "var(--statistic-card-icon-size, 22px)",
            backgroundColor: "var(--statistic-loading-bg, #F2F3F5)",
          }}
        />
        <span
          className="inline-block animate-pulse rounded"
          style={{
            width: "72px",
            height: "var(--statistic-title-line-height, 22px)",
            backgroundColor: "var(--statistic-loading-bg, #F2F3F5)",
          }}
        />
      </div>
      <span
        className="mt-3 inline-block animate-pulse rounded"
        style={{
          width: "96px",
          height: "var(--statistic-value-line-height, 32px)",
          backgroundColor: "var(--statistic-loading-highlight, #E5E6EB)",
        }}
      />
    </div>
  );
}

export const StatisticCard = forwardRef<HTMLDivElement, StatisticCardProps>(
  function StatisticCard(
    {
      title,
      value,
      precision,
      prefix,
      suffix,
      loading = false,
      trend,
      trendValue,
      description,
      status = "primary",
      icon,
      className,
    },
    ref
  ) {
    const statusStyle = statisticCardStatusStyles[status];
    const displayValue = formatStatisticValue(value, precision);
    const trendLabel = trend ? formatTrendLabel(trend, trendValue, true) : null;

    return (
      <div
        ref={ref}
        className={cn(
          "flex transition-shadow duration-200 hover:shadow-[var(--statistic-card-hover-shadow,0_4px_12px_rgba(0,0,0,0.08))]",
          className
        )}
        style={statisticCardBaseStyle}
      >
        {loading ? (
          <StatisticCardLoading />
        ) : (
          <div className="flex h-full w-full flex-col">
            <div className="flex items-center gap-2">
              {icon ? (
                <span
                  className="flex shrink-0 items-center justify-center rounded-md"
                  style={{
                    width: "var(--statistic-card-icon-size, 22px)",
                    height: "var(--statistic-card-icon-size, 22px)",
                    color: statusStyle.iconColor,
                    backgroundColor: statusStyle.iconBg,
                  }}
                >
                  {icon}
                </span>
              ) : null}
              {title != null ? (
                <div className="min-w-0 truncate" style={statisticTitleStyle}>
                  {title}
                </div>
              ) : null}
            </div>
            <div className="mt-2 inline-flex flex-wrap items-baseline gap-1 tabular-nums">
              {prefix ? (
                <span
                  style={{
                    fontSize: "var(--statistic-prefix-font-size, 20px)",
                    color: "var(--statistic-value-color, rgba(0,0,0,0.88))",
                  }}
                >
                  {prefix}
                </span>
              ) : null}
              <span style={statisticValueStyle}>{displayValue}</span>
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
            </div>
            {trendLabel || description != null ? (
              <div className="mt-auto flex flex-wrap items-center gap-x-2 gap-y-0.5 pt-2">
                {trendLabel ? (
                  <span style={getTrendStyle(trend!)}>{trendLabel}</span>
                ) : null}
                {description != null ? (
                  <span style={statisticCardDescriptionStyle}>{description}</span>
                ) : null}
              </div>
            ) : null}
          </div>
        )}
      </div>
    );
  }
);
