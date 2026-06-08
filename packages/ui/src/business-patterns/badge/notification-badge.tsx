"use client";

import { Badge } from "../../components/badge/badge";
import type { BadgeProps } from "../../components/badge/badge.types";

export type NotificationBadgeProps = Omit<BadgeProps, "status" | "type"> & {
  /** 未读数；0 时默认不展示，可用 showZero */
  unread?: number;
};

export function NotificationBadge({
  unread,
  count,
  size = "md",
  maxCount = 99,
  overflowCount = "99+",
  pulse = false,
  dot: dotProp,
  ...props
}: NotificationBadgeProps) {
  const value = unread ?? count;
  const useDot = dotProp ?? value == null;

  return (
    <Badge
      type={useDot ? "dot" : "count"}
      status="danger"
      size={size}
      count={value}
      maxCount={maxCount}
      overflowCount={overflowCount}
      dot={useDot}
      pulse={pulse || useDot}
      {...props}
    />
  );
}
