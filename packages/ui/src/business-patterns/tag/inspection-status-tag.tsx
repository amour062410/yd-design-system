"use client";

import {
  Ban,
  CheckCircle2,
  CircleDashed,
  Clock3,
  Loader2,
  type LucideIcon,
} from "lucide-react";
import { cn } from "../../lib/utils";
import { Tag } from "../../components/tag/tag";
import type { TagStatus } from "../../components/tag/tag.types";

export type InspectionStatus =
  | "pending"
  | "in_progress"
  | "completed"
  | "overdue"
  | "cancelled";

const STATUS_META: Record<
  InspectionStatus,
  { label: string; status: TagStatus; Icon: LucideIcon; spin?: boolean }
> = {
  pending: { label: "待开始", status: "warning", Icon: CircleDashed },
  in_progress: { label: "进行中", status: "primary", Icon: Loader2, spin: true },
  completed: { label: "已完成", status: "success", Icon: CheckCircle2 },
  overdue: { label: "已超期", status: "danger", Icon: Clock3 },
  cancelled: { label: "已取消", status: "default", Icon: Ban },
};

export function getInspectionStatusLabel(status: InspectionStatus) {
  return STATUS_META[status]?.label ?? status;
}

/** 巡检任务状态 — 业务预设，内部使用 Tag light */
export function InspectionStatusTag({
  status,
  className,
  showIcon = true,
  size = "md",
}: {
  status: InspectionStatus;
  className?: string;
  showIcon?: boolean;
  size?: "sm" | "md" | "lg";
}) {
  const meta = STATUS_META[status] ?? STATUS_META.pending;
  const Icon = meta.Icon;

  return (
    <Tag
      variant="light"
      status={meta.status}
      size={size}
      className={className}
      icon={
        showIcon ? (
          <Icon className={cn(meta.spin && "animate-spin")} aria-hidden />
        ) : undefined
      }
    >
      {meta.label}
    </Tag>
  );
}
