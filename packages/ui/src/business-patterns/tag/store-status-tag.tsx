"use client";

import { Tag } from "../../components/tag/tag";
import type { TagStatus } from "../../components/tag/tag.types";

export type StoreStatus =
  | "open"
  | "closed"
  | "rectifying"
  | "risk"
  | "offline";

const STATUS_META: Record<
  StoreStatus,
  { label: string; status: TagStatus }
> = {
  open: { label: "营业中", status: "success" },
  closed: { label: "停业", status: "default" },
  rectifying: { label: "整改中", status: "warning" },
  risk: { label: "风险门店", status: "danger" },
  offline: { label: "未上线", status: "info" },
};

export function getStoreStatusLabel(status: StoreStatus) {
  return STATUS_META[status].label;
}

/** 门店经营状态 — 业务预设，内部使用 Tag light */
export function StoreStatusTag({
  status,
  className,
  size = "md",
}: {
  status: StoreStatus;
  className?: string;
  size?: "sm" | "md" | "lg";
}) {
  const meta = STATUS_META[status];

  return (
    <Tag
      variant="light"
      status={meta.status}
      size={size}
      className={className}
    >
      {meta.label}
    </Tag>
  );
}
