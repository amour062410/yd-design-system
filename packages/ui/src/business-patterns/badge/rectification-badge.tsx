"use client";

import { Badge } from "../../components/badge/badge";
import type { BadgeProps } from "../../components/badge/badge.types";

export type RectificationBadgeProps = Omit<BadgeProps, "status" | "type"> & {
  showLabel?: boolean;
};

export function RectificationBadge({
  size = "md",
  showLabel = false,
  ...props
}: RectificationBadgeProps) {
  const badge = <Badge type="count" status="warning" size={size} {...props} />;

  if (!showLabel) return badge;

  return (
    <span className="inline-flex items-center gap-1.5">
      <span className="text-sm text-foreground">待整改</span>
      {badge}
    </span>
  );
}
