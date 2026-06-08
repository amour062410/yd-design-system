"use client";

import { X } from "lucide-react";
import { Button } from "../button";
import { cn } from "../../lib/utils";
import type { TableBatchActionsProps } from "./table.types";

const DEFAULT_ACTIONS = [
  { key: "assign", label: "批量指派", variant: "default" as const },
  { key: "complete", label: "批量完成", variant: "outline" as const },
  { key: "export", label: "批量导出", variant: "outline" as const },
];

/** 勾选多行时展示的批量操作条 */
export function TableBatchActions({
  selectedCount,
  selectedKeys,
  actions = DEFAULT_ACTIONS,
  onClear,
  className,
}: TableBatchActionsProps) {
  if (selectedCount <= 0) return null;

  return (
    <div
      className={cn(
        "flex flex-wrap items-center gap-3 rounded-[var(--table-radius)] border border-[color:var(--table-action-color)] bg-[color:var(--table-row-selected-bg)] px-4 py-2.5",
        className
      )}
      role="status"
      aria-live="polite"
    >
      <span className="text-sm font-medium text-[color:var(--table-action-color)]">
        已选择 {selectedCount} 项
      </span>
      <div className="flex flex-wrap items-center gap-2">
        {actions.map((action) => (
          <Button
            key={action.key}
            size="sm"
            variant={action.variant ?? "outline"}
            onClick={() => action.onClick?.(selectedKeys)}
          >
            {action.label}
          </Button>
        ))}
      </div>
      {onClear ? (
        <button
          type="button"
          onClick={onClear}
          className="ml-auto inline-flex size-8 items-center justify-center rounded-[var(--table-radius)] text-[color:var(--color-text-tertiary)] hover:bg-[color:var(--table-bg)]"
          aria-label="取消选择"
        >
          <X className="size-4" />
        </button>
      ) : null}
    </div>
  );
}
