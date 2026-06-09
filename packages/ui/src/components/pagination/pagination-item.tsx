"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  paginationEllipsisClass,
  paginationItemClass,
} from "./pagination.styles";
import type { PaginationItemProps, PaginationNavButtonProps } from "./pagination.types";

export function PaginationItem({
  page,
  active,
  disabled,
  size = "default",
  onClick,
}: PaginationItemProps) {
  return (
    <button
      type="button"
      disabled={disabled}
      aria-current={active ? "page" : undefined}
      aria-label={`第 ${page} 页`}
      className={paginationItemClass({ active, disabled, size })}
      onClick={() => onClick?.(page)}
    >
      {page}
    </button>
  );
}

export function PaginationEllipsis({ size = "default" }: { size?: PaginationItemProps["size"] }) {
  return (
    <span className={paginationEllipsisClass(size)} aria-hidden>
      …
    </span>
  );
}

export function PaginationNavButton({
  direction,
  disabled,
  size = "default",
  onClick,
}: PaginationNavButtonProps) {
  const Icon = direction === "prev" ? ChevronLeft : ChevronRight;
  const label = direction === "prev" ? "上一页" : "下一页";

  return (
    <button
      type="button"
      disabled={disabled}
      aria-label={label}
      aria-disabled={disabled || undefined}
      className={paginationItemClass({ disabled, size })}
      onClick={onClick}
    >
      <Icon className={size === "small" ? "size-3.5" : "size-4"} aria-hidden />
    </button>
  );
}
