"use client";

import { Badge } from "../../components/badge/badge";
import type { BadgeProps, RiskBadgeLevel } from "../../components/badge/badge.types";

export type RiskBadgeProps = Omit<BadgeProps, "status" | "type"> & {
  level?: RiskBadgeLevel;
};

const LEVEL_STATUS: Record<RiskBadgeLevel, BadgeProps["status"]> = {
  high: "danger",
  medium: "warning",
  low: "success",
};

export function RiskBadge({ level = "high", size = "md", ...props }: RiskBadgeProps) {
  return (
    <Badge type="count" status={LEVEL_STATUS[level]} size={size} {...props} />
  );
}
