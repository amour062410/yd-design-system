"use client";

import { Card, CardContent } from "../../components/card";
import { cn } from "../../lib/utils";
import type {
  InspectionOverviewCardItem,
  InspectionOverviewCardsProps,
} from "./inspection-risk.types";

const TONE_COLORS: Record<
  InspectionOverviewCardItem["tone"],
  { value: string; border: string; bg: string }
> = {
  danger: { value: "#F53F3F", border: "rgba(245, 63, 63, 0.2)", bg: "rgba(245, 63, 63, 0.04)" },
  warning: { value: "#FF7D00", border: "rgba(255, 125, 0, 0.25)", bg: "rgba(255, 125, 0, 0.05)" },
  success: { value: "#00B42A", border: "rgba(0, 180, 42, 0.2)", bg: "rgba(0, 180, 42, 0.04)" },
  brand: { value: "#165DFF", border: "rgba(22, 93, 255, 0.2)", bg: "rgba(22, 93, 255, 0.04)" },
};

function OverviewCard({ title, value, unit, tone, metrics }: InspectionOverviewCardItem) {
  const styles = TONE_COLORS[tone];

  return (
    <Card
      className="min-h-[120px] overflow-hidden rounded-[8px] border shadow-sm"
      style={{ borderColor: styles.border, backgroundColor: styles.bg }}
    >
      <CardContent className="p-4">
        <p className="text-sm font-medium text-[color:var(--color-text-secondary)]">{title}</p>
        <p className="mt-3 leading-none">
          <span
            className="text-[32px] font-bold tabular-nums"
            style={{ color: styles.value }}
          >
            {value}
          </span>
          {unit ? (
            <span className="ml-1.5 text-sm font-normal text-[color:var(--color-text-secondary)]">
              {unit}
            </span>
          ) : null}
        </p>
        {metrics?.length ? (
          <ul className="mt-3 space-y-1">
            {metrics.map((line) => (
              <li
                key={line}
                className="text-xs leading-5 text-[color:var(--color-text-tertiary)]"
              >
                {line}
              </li>
            ))}
          </ul>
        ) : null}
      </CardContent>
    </Card>
  );
}

/** 巡检风险驾驶舱概览卡片 */
export function InspectionOverviewCards({ items, className }: InspectionOverviewCardsProps) {
  return (
    <div className={cn("grid gap-4 sm:grid-cols-2 xl:grid-cols-4", className)}>
      {items.map(({ key, ...item }) => (
        <OverviewCard key={key} {...item} />
      ))}
    </div>
  );
}
