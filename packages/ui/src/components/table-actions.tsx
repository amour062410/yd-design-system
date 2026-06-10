"use client";

import type { ReactNode } from "react";
import { cn } from "../lib/utils";

export function TableActionLink({
  children,
  onClick,
  className,
}: {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "cursor-pointer text-[color:var(--table-action-color)] transition-colors hover:text-[color:var(--color-brand-button-hover)] hover:underline",
        className
      )}
    >
      {children}
    </button>
  );
}

export function TableActionGroup({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span className={cn("inline-flex flex-nowrap items-center gap-3 whitespace-nowrap", className)}>{children}</span>
  );
}
