"use client";

import { Search } from "lucide-react";
import { transferProPanelSearchClass } from "../transfer-pro.tokens";

export function SearchBar({
  value,
  onChange,
  placeholder = "搜索门店 / 区域 / 人员",
  disabled,
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
}) {
  return (
    <div className={transferProPanelSearchClass()}>
      <div className="flex h-8 items-center gap-2 rounded-[var(--transfer-pro-border-radius,8px)] border border-[color:var(--transfer-pro-color-border,#f0f0f0)] bg-[var(--transfer-pro-color-search-bg,var(--transfer-pro-color-bg,#fff))] px-2">
        <Search className="size-3.5 shrink-0 text-[color:var(--transfer-pro-color-text-secondary,#86909c)]" />
        <input
          type="text"
          value={value}
          disabled={disabled}
          placeholder={placeholder}
          onChange={(event) => onChange(event.target.value)}
          className="min-w-0 flex-1 border-0 bg-transparent p-0 text-[13px] outline-none placeholder:text-[color:var(--transfer-pro-color-text-secondary,#86909c)] disabled:cursor-not-allowed"
        />
      </div>
    </div>
  );
}
