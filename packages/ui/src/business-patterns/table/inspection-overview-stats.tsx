"use client";

import { cn } from "../../lib/utils";
import { InspectionStatusTag } from "./inspection-status-tag";

export interface InspectionOverviewItem {
  key: string;
  label: string;
  value: number;
  /** 关联状态 Tag 色调 */
  status?: "pending" | "in_progress" | "completed" | "overdue" | "cancelled";
  highlight?: boolean;
}

export interface InspectionOverviewStatsProps {
  items: InspectionOverviewItem[];
  className?: string;
}

function Statistic({ label, value, highlight }: { label: string; value: number; highlight?: boolean }) {
  return (
    <div className="text-right">
      <p
        className={cn(
          "text-lg font-semibold leading-6 tabular-nums",
          highlight
            ? "text-[color:var(--modal-error-color)]"
            : "text-[color:var(--color-text-primary)]"
        )}
      >
        {value}
      </p>
      <p className="text-xs text-[color:var(--color-text-tertiary)]">{label}</p>
    </div>
  );
}

/** 标题右侧巡检概览 — Statistic + StatusTag */
export function InspectionOverviewStats({ items, className }: InspectionOverviewStatsProps) {
  return (
    <div className={cn("flex flex-nowrap items-center gap-5", className)}>
      {items.map((item) => (
        <div key={item.key} className="flex items-center gap-2">
          {item.status ? (
            <InspectionStatusTag status={item.status} showIcon={false} className="!px-1.5 !py-0" />
          ) : null}
          <Statistic label={item.label} value={item.value} highlight={item.highlight} />
        </div>
      ))}
    </div>
  );
}
