"use client";

import { cn } from "../../lib/utils";
import { filterCountClass, filterSummaryClass } from "./filter-bar.styles";
import type { FilterCountProps, FilterSummaryProps, StickyFilterBarProps } from "./filter-bar.types";

export function FilterSummary({ items = [], className, children }: FilterSummaryProps) {
  if (children) {
    return <div className={filterSummaryClass(className)}>{children}</div>;
  }

  if (!items.length) return null;

  return (
    <div className={filterSummaryClass(className)} data-filter-summary>
      <span>已筛选：</span>
      {items.map((item) => (
        <span
          key={item.key}
          className="rounded bg-[color:var(--muted,#f2f3f5)] px-2 py-0.5 text-[color:var(--color-text-primary,#1d2129)] dark:bg-[color:var(--surface-card-soft,#27272a)]"
        >
          {item.label}={item.value}
        </span>
      ))}
    </div>
  );
}

FilterSummary.displayName = "FilterSummary";

export function FilterCount({
  count,
  className,
  prefix = "共匹配",
  suffix = "条数据",
}: FilterCountProps) {
  return (
    <p className={filterCountClass(className)} data-filter-count>
      {prefix}{" "}
      <span className="font-medium text-[color:var(--color-text-primary,#1d2129)]">{count}</span>{" "}
      {suffix}
    </p>
  );
}

export function StickyFilterBar({ children, className, offsetTop = 0 }: StickyFilterBarProps) {
  return (
    <div
      className={cn("sticky z-20", className)}
      style={{ top: typeof offsetTop === "number" ? `${offsetTop}px` : offsetTop }}
    >
      {children}
    </div>
  );
}
