"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useMemo, useState } from "react";
import { cn } from "../lib/utils";

export interface TablePaginationConfig {
  current?: number;
  defaultCurrent?: number;
  pageSize?: number;
  defaultPageSize?: number;
  total?: number;
  pageSizeOptions?: number[];
  showSizeChanger?: boolean;
  showQuickJumper?: boolean;
  showTotal?: boolean;
  onChange?: (page: number, pageSize: number) => void;
}

export function TablePagination({
  current: controlledCurrent,
  defaultCurrent = 1,
  pageSize: controlledPageSize,
  defaultPageSize = 10,
  total = 0,
  pageSizeOptions = [10, 20, 50],
  showSizeChanger = true,
  showQuickJumper = true,
  showTotal = true,
  onChange,
  className,
}: TablePaginationConfig & { className?: string }) {
  const [page, setPage] = useState(controlledCurrent ?? defaultCurrent);
  const [pageSize, setPageSize] = useState(controlledPageSize ?? defaultPageSize);
  const [jumpValue, setJumpValue] = useState("");

  const current = controlledCurrent ?? page;
  const size = controlledPageSize ?? pageSize;
  const totalPages = Math.max(1, Math.ceil(total / size));

  const update = useCallback(
    (p: number, ps: number) => {
      if (controlledCurrent === undefined) setPage(p);
      if (controlledPageSize === undefined) setPageSize(ps);
      onChange?.(p, ps);
    },
    [controlledCurrent, controlledPageSize, onChange]
  );

  const pages = useMemo(() => {
    const list: (number | "...")[] = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) list.push(i);
      return list;
    }
    list.push(1);
    if (current > 3) list.push("...");
    for (let i = Math.max(2, current - 1); i <= Math.min(totalPages - 1, current + 1); i++) {
      list.push(i);
    }
    if (current < totalPages - 2) list.push("...");
    list.push(totalPages);
    return list;
  }, [current, totalPages]);

  const handleJump = () => {
    const n = parseInt(jumpValue, 10);
    if (!Number.isNaN(n) && n >= 1 && n <= totalPages) {
      update(n, size);
      setJumpValue("");
    }
  };

  return (
    <div
      className={cn(
        "flex flex-wrap items-center justify-between gap-4 pt-4 text-[13px] text-[color:var(--color-text-secondary)]",
        className
      )}
    >
      {showTotal ? (
        <span>
          共 <strong className="text-[color:var(--color-text-primary)]">{total}</strong> 条
        </span>
      ) : (
        <span />
      )}
      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          disabled={current <= 1}
          onClick={() => update(current - 1, size)}
          className="flex size-8 items-center justify-center rounded-[var(--table-radius)] border border-[color:var(--table-border-color)] bg-[color:var(--table-bg)] transition-colors hover:border-[color:var(--table-action-color)] disabled:opacity-40"
          aria-label="上一页"
        >
          <ChevronLeft className="size-4" />
        </button>
        {pages.map((p, i) =>
          p === "..." ? (
            <span key={`e-${i}`} className="px-1">
              …
            </span>
          ) : (
            <button
              key={p}
              type="button"
              onClick={() => update(p, size)}
              className={cn(
                "flex min-w-8 items-center justify-center rounded-[var(--table-radius)] px-2 py-1.5 transition-colors",
                current === p
                  ? "bg-[color:var(--table-pagination-active)] font-medium text-white"
                  : "border border-[color:var(--table-border-color)] bg-[color:var(--table-bg)] hover:border-[color:var(--table-action-color)]"
              )}
            >
              {p}
            </button>
          )
        )}
        <button
          type="button"
          disabled={current >= totalPages}
          onClick={() => update(current + 1, size)}
          className="flex size-8 items-center justify-center rounded-[var(--table-radius)] border border-[color:var(--table-border-color)] bg-[color:var(--table-bg)] transition-colors hover:border-[color:var(--table-action-color)] disabled:opacity-40"
          aria-label="下一页"
        >
          <ChevronRight className="size-4" />
        </button>
        {showSizeChanger ? (
          <select
            value={size}
            onChange={(e) => update(1, Number(e.target.value))}
            className="ml-2 h-8 rounded-[var(--table-radius)] border border-[color:var(--table-border-color)] bg-[color:var(--table-bg)] px-2 text-[13px] outline-none focus:border-[color:var(--table-action-color)]"
          >
            {pageSizeOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt} 条/页
              </option>
            ))}
          </select>
        ) : null}
        {showQuickJumper ? (
          <span className="ml-2 flex items-center gap-2">
            跳至
            <input
              type="text"
              value={jumpValue}
              onChange={(e) => setJumpValue(e.target.value.replace(/\D/g, ""))}
              onKeyDown={(e) => e.key === "Enter" && handleJump()}
              className="h-8 w-12 rounded-[var(--table-radius)] border border-[color:var(--table-border-color)] bg-[color:var(--table-bg)] px-2 text-center text-[13px] outline-none focus:border-[color:var(--table-action-color)]"
            />
            页
            <button
              type="button"
              onClick={handleJump}
              className="h-8 rounded-[var(--table-radius)] border border-[color:var(--table-border-color)] px-3 transition-colors hover:border-[color:var(--table-action-color)]"
            >
              确定
            </button>
          </span>
        ) : null}
      </div>
    </div>
  );
}
