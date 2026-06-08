"use client";

import { TrendingDown, TrendingUp } from "lucide-react";
import { Card, CardContent } from "../../components/card";
import { cn } from "../../lib/utils";
import { ProgressCircle } from "../../components/progress/progress-circle";
import { ProgressLine } from "../../components/progress/progress";
import { PROGRESS_STATUS_TEXT } from "../../components/progress/progress-styles";
import type { BusinessProgressShellProps } from "../../components/progress/progress.types";

function TrendBadge({
  trend,
}: {
  trend: NonNullable<BusinessProgressShellProps["trend"]>;
}) {
  const isUp = trend.direction === "up";
  const Icon = isUp ? TrendingUp : TrendingDown;
  const color = isUp
    ? "var(--progress-trend-up, #00B42A)"
    : "var(--progress-trend-down, #F53F3F)";

  return (
    <span
      className="inline-flex items-center gap-0.5 text-xs font-medium tabular-nums"
      style={{ color }}
    >
      <Icon className="size-3.5" />
      {trend.value}%
      <span className="text-[color:var(--progress-text-default,rgba(0,0,0,0.45))]">
        {trend.label}
      </span>
    </span>
  );
}

function BusinessProgressBody({
  title,
  percent,
  status,
  trend,
  size = "regular",
  footer,
  progressType = "line",
  extra,
  variant = "default",
}: Omit<BusinessProgressShellProps, "className">) {
  const isCompact = variant === "default" && size === "small" && !footer;

  if (isCompact) {
    return (
      <div className="space-y-1.5">
        <div className="flex items-center justify-between gap-2">
          <span
            className="text-[13px] font-semibold tabular-nums"
            style={{ color: PROGRESS_STATUS_TEXT[status] }}
          >
            {percent}%
          </span>
          {trend ? <TrendBadge trend={trend} /> : null}
        </div>
        <ProgressLine percent={percent} status={status} size={size} />
      </div>
    );
  }

  return (
    <>
      <div className="flex items-start justify-between gap-3">
        <p className="text-sm font-medium text-[color:var(--color-text-secondary,rgba(0,0,0,0.65))]">
          {title}
        </p>
        {extra}
      </div>
      <div className="mt-2 flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <span
          className="text-2xl font-bold tabular-nums leading-none"
          style={{ color: PROGRESS_STATUS_TEXT[status] }}
        >
          {percent}%
        </span>
        {trend ? <TrendBadge trend={trend} /> : null}
      </div>
      <div className="mt-3">
        {progressType === "circle" ? (
          <ProgressCircle percent={percent} status={status} size={size} />
        ) : (
          <ProgressLine percent={percent} status={status} size={size} />
        )}
      </div>
      {footer ? (
        <p className="mt-3 text-xs text-[color:var(--color-text-tertiary,rgba(0,0,0,0.45))]">
          {footer}
        </p>
      ) : null}
    </>
  );
}

/** 业务进度统一布局：default 行内 / card 驾驶舱卡片 */
export function BusinessProgressShell({
  variant = "default",
  className,
  ...props
}: BusinessProgressShellProps) {
  if (variant === "card") {
    const borderColor =
      props.status === "danger"
        ? "rgba(245, 63, 63, 0.2)"
        : props.status === "warning"
          ? "rgba(255, 125, 0, 0.25)"
          : "rgba(22, 93, 255, 0.2)";
    const bgColor =
      props.status === "danger"
        ? "rgba(245, 63, 63, 0.04)"
        : props.status === "warning"
          ? "rgba(255, 125, 0, 0.05)"
          : "rgba(22, 93, 255, 0.04)";

    return (
      <Card
        className={cn("min-h-[140px] overflow-hidden rounded-[8px] border shadow-sm", className)}
        style={{ borderColor, backgroundColor: bgColor }}
      >
        <CardContent className="p-4">
          <BusinessProgressBody {...props} />
        </CardContent>
      </Card>
    );
  }

  return (
    <div className={cn("min-w-[160px]", className)}>
      <BusinessProgressBody {...props} />
    </div>
  );
}
