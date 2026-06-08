import type { ReactNode } from "react";
import type { BadgeSizeKey } from "@yd-ds/tokens";

export type BadgeType = "dot" | "count" | "status" | "ribbon";

export type BadgeStatus =
  | "default"
  | "primary"
  | "success"
  | "warning"
  | "danger"
  | "info";

export type BadgeSize = BadgeSizeKey;

export interface BadgeProps {
  type?: BadgeType;
  status?: BadgeStatus;
  size?: BadgeSize;
  count?: number;
  maxCount?: number;
  overflowCount?: string;
  showZero?: boolean;
  dot?: boolean;
  pulse?: boolean;
  /** status / ribbon 文案 */
  text?: string;
  children?: ReactNode;
  className?: string;
}

export type InspectionBadgeVariant = "pending" | "overdue";

export type RiskBadgeLevel = "high" | "medium" | "low";
