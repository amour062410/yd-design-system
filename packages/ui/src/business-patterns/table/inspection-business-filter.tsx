"use client";

import { Search } from "lucide-react";
import { cn } from "../../lib/utils";
import type { InspectionBusinessFilterProps } from "./inspection-risk.types";

function FilterSelect({
  value,
  onChange,
  options,
  placeholder,
}: {
  value: string;
  onChange: (v: string) => void;
  options: { label: string; value: string }[];
  placeholder: string;
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      aria-label={placeholder}
      className="h-8 min-w-0 flex-1 truncate rounded-[var(--table-radius)] border border-[color:var(--table-border-color)] bg-[color:var(--table-bg)] px-2 text-sm text-[color:var(--color-text-primary)] outline-none focus:border-[color:var(--table-action-color)]"
    >
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
}

/** 业务筛选区 — 证照管理页同款单行布局 */
export function InspectionBusinessFilter({
  storeValue,
  regionValue,
  templateValue,
  typeValue,
  keyword,
  onStoreChange,
  onRegionChange,
  onTemplateChange,
  onTypeChange,
  onKeywordChange,
  storeOptions,
  regionOptions,
  templateOptions,
  typeOptions,
  className,
}: InspectionBusinessFilterProps) {
  return (
    <div
      className={cn(
        "flex h-14 flex-nowrap items-center gap-3 overflow-hidden border-b border-[color:var(--table-border-color)] px-4",
        className
      )}
    >
      <FilterSelect
        value={storeValue}
        onChange={onStoreChange}
        options={storeOptions}
        placeholder="门店"
      />
      <FilterSelect
        value={regionValue}
        onChange={onRegionChange}
        options={regionOptions}
        placeholder="区域"
      />
      <FilterSelect
        value={templateValue}
        onChange={onTemplateChange}
        options={templateOptions}
        placeholder="巡检模板"
      />
      <FilterSelect
        value={typeValue}
        onChange={onTypeChange}
        options={typeOptions}
        placeholder="巡检类型"
      />
      <div className="h-8 w-px shrink-0 bg-[color:var(--table-border-color)]" />
      <label className="relative inline-flex w-[200px] shrink-0 items-center">
        <Search className="pointer-events-none absolute left-2.5 size-3.5 text-[color:var(--color-text-tertiary)]" />
        <input
          type="search"
          value={keyword}
          onChange={(e) => onKeywordChange(e.target.value)}
          placeholder="搜索门店 / 关键词"
          aria-label="关键词搜索"
          className="h-8 w-full rounded-[var(--table-radius)] border border-[color:var(--table-border-color)] bg-[color:var(--table-bg)] pl-8 pr-2 text-sm outline-none focus:border-[color:var(--table-action-color)]"
        />
      </label>
    </div>
  );
}
