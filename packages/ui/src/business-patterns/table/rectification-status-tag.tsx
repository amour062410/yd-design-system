"use client";

import { cn } from "../../lib/utils";
import type { RectificationStatus } from "./inspection-risk.types";

const STATUS_META: Record<
  RectificationStatus,
  { label: string; color: string; bg: string }
> = {
  abnormal: {
    label: "异常",
    color: "#F53F3F",
    bg: "rgba(245, 63, 63, 0.1)",
  },
  pending_rectification: {
    label: "待整改",
    color: "#FF7D00",
    bg: "rgba(255, 125, 0, 0.1)",
  },
  rectifying: {
    label: "整改中",
    color: "#165DFF",
    bg: "rgba(22, 93, 255, 0.08)",
  },
  completed: {
    label: "已完成",
    color: "#00B42A",
    bg: "rgba(0, 180, 42, 0.1)",
  },
};

export function RectificationStatusTag({
  status,
  className,
}: {
  status: RectificationStatus;
  className?: string;
}) {
  const meta = STATUS_META[status];

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-[var(--table-radius)] px-2 py-0.5 text-xs font-medium",
        className
      )}
      style={{ backgroundColor: meta.bg, color: meta.color }}
    >
      {meta.label}
    </span>
  );
}

export function getRectificationStatusLabel(status: RectificationStatus) {
  return STATUS_META[status].label;
}
