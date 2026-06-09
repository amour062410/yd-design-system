"use client";

import { Search } from "lucide-react";
import { transferSearchWrapClass } from "./transfer.tokens";

export function TransferSearch({
  value,
  onChange,
  placeholder = "请搜索",
  disabled,
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
}) {
  return (
    <div className={transferSearchWrapClass()}>
      <div className="flex h-8 items-center gap-2 rounded-[var(--transfer-border-radius,8px)] border border-[color:var(--transfer-color-border,#f0f0f0)] bg-[var(--transfer-color-search-bg,#fff)] px-2">
        <Search className="size-3.5 shrink-0 text-[color:var(--transfer-color-text-secondary,#86909c)]" />
        <input
          type="text"
          value={value}
          disabled={disabled}
          placeholder={placeholder}
          onChange={(event) => onChange(event.target.value)}
          className="min-w-0 flex-1 border-0 bg-transparent p-0 text-[13px] outline-none placeholder:text-[color:var(--transfer-color-text-secondary,#86909c)] disabled:cursor-not-allowed"
          aria-label={placeholder}
        />
      </div>
    </div>
  );
}

export function filterTransferItems<T extends { key: string; title: string; description?: string }>(
  items: T[],
  keyword: string
) {
  const q = keyword.trim().toLowerCase();
  if (!q) return items;
  return items.filter(
    (item) =>
      item.title.toLowerCase().includes(q) ||
      (item.description ? item.description.toLowerCase().includes(q) : false)
  );
}
