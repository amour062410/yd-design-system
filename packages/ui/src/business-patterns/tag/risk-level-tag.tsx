"use client";

import { Tag } from "../../components/tag/tag";
import type { TagStatus } from "../../components/tag/tag.types";

export type StoreRiskLevel = "high" | "medium" | "low";

const LEVEL_META: Record<
  StoreRiskLevel,
  { label: string; status: TagStatus }
> = {
  high: { label: "高风险", status: "danger" },
  medium: { label: "中风险", status: "warning" },
  low: { label: "低风险", status: "success" },
};

function RiskDot({ status }: { status: TagStatus }) {
  const colorMap: Record<TagStatus, string> = {
    primary: "var(--tag-primary, #165DFF)",
    success: "var(--tag-success, #00B42A)",
    warning: "var(--tag-warning, #FF7D00)",
    danger: "var(--tag-danger, #F53F3F)",
    info: "var(--tag-info, #3491FA)",
    default: "var(--tag-text-default, rgba(0,0,0,0.45))",
  };

  return (
    <span
      className="rounded-full"
      style={{
        width: "6px",
        height: "6px",
        backgroundColor: colorMap[status],
      }}
      aria-hidden
    />
  );
}

export function getStoreRiskLevelLabel(level: StoreRiskLevel) {
  return LEVEL_META[level].label;
}

/** 门店风险等级 — 业务预设，内部使用 Tag light + 圆点 */
export function RiskLevelTag({
  level,
  className,
  size = "md",
}: {
  level: StoreRiskLevel;
  className?: string;
  size?: "sm" | "md" | "lg";
}) {
  const meta = LEVEL_META[level];

  return (
    <Tag
      variant="light"
      status={meta.status}
      size={size}
      className={className}
      icon={<RiskDot status={meta.status} />}
    >
      {meta.label}
    </Tag>
  );
}

/** @deprecated 使用 RiskLevelTag */
export const StoreRiskLevelTag = RiskLevelTag;
