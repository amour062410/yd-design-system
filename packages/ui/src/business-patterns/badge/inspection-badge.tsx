"use client";

import { Badge } from "../../components/badge/badge";
import type { BadgeProps, InspectionBadgeVariant } from "../../components/badge/badge.types";

export type InspectionBadgeProps = Omit<BadgeProps, "status" | "type"> & {
  variant?: InspectionBadgeVariant;
};

const STATUS_MAP: Record<InspectionBadgeVariant, BadgeProps["status"]> = {
  pending: "primary",
  overdue: "danger",
};

export function InspectionBadge({
  variant = "pending",
  size = "md",
  ...props
}: InspectionBadgeProps) {
  return (
    <Badge type="count" status={STATUS_MAP[variant]} size={size} {...props} />
  );
}
