"use client";

import { ChevronDown, Download, RotateCcw, Search, Settings2, SlidersHorizontal } from "lucide-react";
import { Button } from "../button";
import { cn } from "../../lib/utils";
import type { TableToolbarProps } from "./table.types";

const DEFAULT_METHOD_OPTIONS = [
  { label: "全部方式", value: "all" },
  { label: "现场巡检", value: "onsite" },
  { label: "视频巡检", value: "video" },
  { label: "混合巡检", value: "hybrid" },
];

function ToolbarSelect({
  value,
  onChange,
  options,
  "aria-label": ariaLabel,
  compact,
}: {
  value: string;
  onChange: (v: string) => void;
  options: { label: string; value: string }[];
  "aria-label": string;
  compact?: boolean;
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      aria-label={ariaLabel}
      className={cn(
        "shrink-0 rounded-[var(--table-radius)] border border-[color:var(--table-border-color)] bg-[color:var(--table-bg)] text-sm text-[color:var(--color-text-primary)] outline-none focus:border-[color:var(--table-action-color)]",
        compact ? "h-8 min-w-[108px] px-2" : "h-9 min-w-[120px] px-3"
      )}
    >
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
}

/** 云盯业务表格工具栏 — compact 单行：左方式+搜索，右重置/导出/列设置/高级筛选 */
export function TableToolbar({
  searchable = true,
  exportable = true,
  refreshable,
  resettable = true,
  columnSetting = true,
  advancedFilterable = false,
  advancedFilterExpanded = false,
  advancedFilterActive = false,
  variant = "default",
  searchValue = "",
  onSearch,
  searchPlaceholder = "搜索门店 / 负责人",
  methodOptions = DEFAULT_METHOD_OPTIONS,
  methodValue = "all",
  onMethodChange,
  onRefresh,
  onReset,
  onToggleAdvancedFilter,
  onExport,
  onOpenColumnSetting,
  className,
  extra,
}: TableToolbarProps) {
  const compact = variant === "compact";
  const handleReset = onReset ?? onRefresh;
  const showReset = resettable && handleReset && !refreshable;
  const showRefresh = refreshable && onRefresh && !onReset;

  return (
    <div
      className={cn(
        "flex flex-nowrap items-center justify-between gap-2 overflow-hidden",
        compact
          ? "h-10"
          : "flex-wrap gap-3 rounded-[var(--table-radius)] border border-[color:var(--table-border-color)] bg-[color:var(--table-bg)] px-4 py-3",
        className
      )}
    >
      <div className="flex min-w-0 flex-1 flex-nowrap items-center gap-2 overflow-hidden">
        {onMethodChange ? (
          <ToolbarSelect
            value={methodValue}
            onChange={onMethodChange}
            options={methodOptions}
            aria-label="巡检方式"
            compact={compact}
          />
        ) : null}
        {searchable && onSearch ? (
          <label className="relative inline-flex min-w-0 shrink items-center">
            <Search className="pointer-events-none absolute left-2.5 size-3.5 text-[color:var(--color-text-tertiary)]" />
            <input
              type="search"
              value={searchValue}
              onChange={(e) => onSearch(e.target.value)}
              placeholder={searchPlaceholder}
              className={cn(
                "w-[200px] max-w-[40vw] rounded-[var(--table-radius)] border border-[color:var(--table-border-color)] bg-[color:var(--table-bg)] pl-8 pr-2 text-sm outline-none focus:border-[color:var(--table-action-color)]",
                compact ? "h-8" : "h-9"
              )}
              aria-label={searchPlaceholder}
            />
          </label>
        ) : null}
        {extra}
      </div>
      <div className="flex shrink-0 flex-nowrap items-center gap-1.5">
        {showReset ? (
          <Button
            variant="outline"
            size="sm"
            className={cn(compact && "h-8 px-2.5")}
            onClick={handleReset}
            aria-label="重置"
          >
            <RotateCcw className="size-3.5" />
            <span className={compact ? "hidden sm:inline" : undefined}>重置</span>
          </Button>
        ) : null}
        {showRefresh ? (
          <Button
            variant="outline"
            size="sm"
            className={cn(compact && "h-8 px-2.5")}
            onClick={onRefresh}
            aria-label="刷新"
          >
            <RotateCcw className="size-3.5" />
            <span className={compact ? "hidden sm:inline" : undefined}>刷新</span>
          </Button>
        ) : null}
        {exportable && onExport ? (
          <Button
            variant="outline"
            size="sm"
            className={cn(compact && "h-8 px-2.5")}
            onClick={onExport}
            aria-label="导出"
          >
            <Download className="size-3.5" />
            <span className={compact ? "hidden sm:inline" : undefined}>导出</span>
          </Button>
        ) : null}
        {columnSetting && onOpenColumnSetting ? (
          <Button
            variant="outline"
            size="sm"
            className={cn(compact && "h-8 px-2.5")}
            onClick={onOpenColumnSetting}
            aria-label="列设置"
          >
            <Settings2 className="size-3.5" />
            <span className={compact ? "hidden sm:inline" : undefined}>列设置</span>
          </Button>
        ) : null}
        {advancedFilterable && onToggleAdvancedFilter ? (
          <Button
            variant="outline"
            size="sm"
            className={cn(compact && "h-8 gap-1 px-2.5")}
            onClick={onToggleAdvancedFilter}
            aria-expanded={advancedFilterExpanded}
            aria-label="高级筛选"
          >
            <SlidersHorizontal className="size-3.5" />
            <span className={compact ? "hidden sm:inline" : undefined}>高级筛选</span>
            {advancedFilterActive ? (
              <span className="rounded-full bg-[color:var(--table-action-color)] px-1.5 text-[10px] text-white">
                已筛选
              </span>
            ) : null}
            <ChevronDown
              className={cn(
                "size-3.5 transition-transform",
                advancedFilterExpanded && "rotate-180"
              )}
            />
          </Button>
        ) : null}
      </div>
    </div>
  );
}
