"use client";

import { Children, forwardRef } from "react";
import { cn } from "../../lib/utils";
import type { StatisticCardGroupProps } from "./statistic.types";

const COLUMN_CLASS: Record<
  NonNullable<StatisticCardGroupProps["columns"]>,
  string
> = {
  2: "grid-cols-1 sm:grid-cols-2",
  3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
  4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
};

export const StatisticCardGroup = forwardRef<
  HTMLDivElement,
  StatisticCardGroupProps
>(function StatisticCardGroup({ columns = 4, className, children }, ref) {
  const count = Children.count(children);

  return (
    <div
      ref={ref}
      role="group"
      aria-label="KPI 指标卡"
      className={cn("grid w-full", COLUMN_CLASS[columns], className)}
      style={{
        gap: "var(--statistic-group-gap, 24px)",
      }}
      data-statistic-card-count={count}
    >
      {children}
    </div>
  );
});
