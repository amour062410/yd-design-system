"use client";

import { ChevronDown } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "../../lib/utils";
import { useDropdownTriggerContext } from "./dropdown-link-trigger";

/** 表格操作列规范：链接文案 + 16×16 下拉箭头（云盯 Business Pattern） */
export function DropdownTableActionTrigger({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const { open, disabled } = useDropdownTriggerContext();

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 text-sm transition-colors duration-150",
        disabled
          ? "cursor-not-allowed text-[color:var(--select-color-disabled,#c9cdd4)]"
          : "cursor-pointer text-[color:var(--table-action-color)] hover:text-[color:var(--color-brand-button-hover)] hover:underline",
        className
      )}
    >
      <span>{children}</span>
      <ChevronDown
        size={16}
        strokeWidth={2}
        aria-hidden
        className={cn(
          "size-4 shrink-0 transition-transform duration-150",
          open && "rotate-180"
        )}
      />
    </span>
  );
}
