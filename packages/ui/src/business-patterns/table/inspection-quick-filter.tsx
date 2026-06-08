"use client";

import { cn } from "../../lib/utils";
import type { InspectionStatus } from "./inspection-status-tag";

export type QuickFilterValue = "all" | InspectionStatus;

export interface QuickFilterItem {
  value: QuickFilterValue;
  label: string;
  count: number;
}

export interface InspectionQuickFilterProps {
  value: QuickFilterValue;
  onChange: (value: QuickFilterValue) => void;
  items: QuickFilterItem[];
  className?: string;
}

/** 快捷状态 Tag 组 — 点击切换 + Badge 数量 */
export function InspectionQuickFilter({
  value,
  onChange,
  items,
  className,
}: InspectionQuickFilterProps) {
  return (
    <div
      className={cn("flex flex-nowrap items-center gap-2 overflow-x-auto", className)}
      role="tablist"
      aria-label="巡检状态筛选"
    >
      {items.map((item) => {
        const active = value === item.value;
        return (
          <button
            key={item.value}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onChange(item.value)}
            className={cn(
              "inline-flex h-8 shrink-0 items-center gap-1.5 rounded-[var(--table-radius)] border px-3 text-sm transition-colors",
              active
                ? "border-[color:var(--table-action-color)] bg-[color:var(--table-row-selected-bg)] font-medium text-[color:var(--table-action-color)]"
                : "border-[color:var(--table-border-color)] bg-[color:var(--table-bg)] text-[color:var(--color-text-secondary)] hover:border-[color:var(--table-action-color)]/40 hover:text-[color:var(--color-text-primary)]"
            )}
          >
            <span>{item.label}</span>
            <span
              className={cn(
                "inline-flex min-w-[20px] items-center justify-center rounded-full px-1.5 text-[11px] leading-4",
                active
                  ? "bg-[color:var(--table-action-color)] text-white"
                  : "bg-[color:var(--table-skeleton-bg)] text-[color:var(--color-text-tertiary)]"
              )}
            >
              {item.count}
            </span>
          </button>
        );
      })}
    </div>
  );
}

export function buildQuickFilterItems(
  data: { status: InspectionStatus }[],
  labels: Partial<Record<QuickFilterValue, string>> = {}
): QuickFilterItem[] {
  const defaults: Record<QuickFilterValue, string> = {
    all: labels.all ?? "全部",
    pending: labels.pending ?? "待开始",
    in_progress: labels.in_progress ?? "进行中",
    completed: labels.completed ?? "已完成",
    overdue: labels.overdue ?? "已逾期",
    cancelled: labels.cancelled ?? "已取消",
  };

  const counts: Record<string, number> = { all: data.length };
  for (const row of data) {
    counts[row.status] = (counts[row.status] ?? 0) + 1;
  }

  const order: QuickFilterValue[] = [
    "all",
    "pending",
    "in_progress",
    "completed",
    "overdue",
  ];

  return order.map((value) => ({
    value,
    label: defaults[value],
    count: value === "all" ? counts.all : counts[value] ?? 0,
  }));
}
