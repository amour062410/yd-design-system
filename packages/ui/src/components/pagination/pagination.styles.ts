import { cn } from "../../lib/utils";
import type { PaginationSize } from "./pagination.types";

export const paginationRootClass = (className?: string) =>
  cn(
    "flex flex-wrap items-center justify-between gap-[var(--pagination-item-gap,8px)] text-[13px] text-[color:var(--pagination-text-secondary,#4e5969)]",
    className
  );

export const paginationControlsClass = () =>
  cn("flex flex-wrap items-center gap-[var(--pagination-item-gap,8px)]");

const itemSizeClass = (size: PaginationSize = "default") =>
  size === "small"
    ? "size-6 min-w-6 text-xs"
    : "size-[var(--pagination-item-size,32px)] min-w-[var(--pagination-min-width,32px)]";

export const paginationItemClass = ({
  active,
  disabled,
  size = "default",
}: {
  active?: boolean;
  disabled?: boolean;
  size?: PaginationSize;
}) =>
  cn(
    "inline-flex items-center justify-center rounded-[var(--pagination-radius,8px)] border font-medium transition-colors outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--pagination-primary,#165dff)] focus-visible:ring-offset-1",
    itemSizeClass(size),
    active &&
      "border-[color:var(--pagination-primary,#165dff)] bg-[color:var(--pagination-primary,#165dff)] text-white",
    !active &&
      !disabled &&
      "border-[color:var(--pagination-border,#e5e6eb)] bg-[color:var(--pagination-bg,#ffffff)] text-[color:var(--pagination-text-primary,#1d2129)] hover:bg-[color:var(--pagination-fill-hover,#f2f3f5)]",
    disabled && "cursor-not-allowed opacity-40"
  );

export const paginationEllipsisClass = (size: PaginationSize = "default") =>
  cn(
    "inline-flex items-center justify-center px-1 text-[color:var(--pagination-text-secondary,#4e5969)]",
    size === "small" ? "h-6 min-w-6" : "h-8 min-w-8"
  );

export const paginationSimpleTextClass = () =>
  "min-w-[3rem] text-center font-medium text-[color:var(--pagination-text-primary,#1d2129)]";

export const paginationJumperInputClass = (size: PaginationSize = "default") =>
  cn(
    "rounded-[var(--pagination-radius,8px)] border border-[color:var(--pagination-border,#e5e6eb)] bg-[color:var(--pagination-bg,#ffffff)] text-center text-[13px] text-[color:var(--pagination-text-primary,#1d2129)] outline-none transition-colors focus:border-[color:var(--pagination-primary,#165dff)]",
    size === "small" ? "h-6 w-10" : "h-8 w-[var(--pagination-jumper-width,64px)]"
  );

export const paginationSizeSelectClass = (size: PaginationSize = "default") =>
  cn(
    "rounded-[var(--pagination-radius,8px)] border border-[color:var(--pagination-border,#e5e6eb)] bg-[color:var(--pagination-bg,#ffffff)] px-2 text-[13px] text-[color:var(--pagination-text-primary,#1d2129)] outline-none transition-colors focus:border-[color:var(--pagination-primary,#165dff)] disabled:cursor-not-allowed disabled:opacity-40",
    size === "small" ? "h-6" : "h-8"
  );
