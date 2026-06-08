"use client";

import { ChevronDown, SlidersHorizontal } from "lucide-react";
import { cn } from "../../lib/utils";
import type { TableToolbarFilterOption } from "./inspection.types";

export interface InspectionAdvancedFilterValues {
  dateFrom: string;
  dateTo: string;
  owner: string;
  region: string;
  storeLevel: string;
}

export interface InspectionAdvancedFilterProps {
  expanded: boolean;
  onToggle?: () => void;
  values: InspectionAdvancedFilterValues;
  onChange: (patch: Partial<InspectionAdvancedFilterValues>) => void;
  ownerOptions?: TableToolbarFilterOption[];
  regionOptions?: TableToolbarFilterOption[];
  storeLevelOptions?: TableToolbarFilterOption[];
  /** panel：仅展开面板；inline：含折叠触发条（旧版） */
  variant?: "panel" | "inline";
  className?: string;
}

function CompactSelect({
  value,
  onChange,
  options,
  label,
  className,
}: {
  value: string;
  onChange: (v: string) => void;
  options: TableToolbarFilterOption[];
  label: string;
  className?: string;
}) {
  return (
    <label className={cn("flex flex-col gap-1", className)}>
      <span className="text-xs text-[color:var(--color-text-tertiary)]">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label={label}
        className="h-8 rounded-[var(--table-radius)] border border-[color:var(--table-border-color)] bg-[color:var(--table-bg)] px-2 text-sm outline-none focus:border-[color:var(--table-action-color)]"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </label>
  );
}

function DateInput({
  value,
  onChange,
  label,
}: {
  value: string;
  onChange: (v: string) => void;
  label: string;
}) {
  return (
    <label className="flex flex-col gap-1">
      <span className="text-xs text-[color:var(--color-text-tertiary)]">{label}</span>
      <input
        type="date"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label={label}
        className="h-8 rounded-[var(--table-radius)] border border-[color:var(--table-border-color)] bg-[color:var(--table-bg)] px-2 text-sm outline-none focus:border-[color:var(--table-action-color)]"
      />
    </label>
  );
}

function AdvancedFilterFields({
  values,
  onChange,
  ownerOptions,
  regionOptions,
  storeLevelOptions,
}: Pick<
  InspectionAdvancedFilterProps,
  "values" | "onChange" | "ownerOptions" | "regionOptions" | "storeLevelOptions"
>) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
      <DateInput
        label="开始日期"
        value={values.dateFrom}
        onChange={(dateFrom) => onChange({ dateFrom })}
      />
      <DateInput
        label="结束日期"
        value={values.dateTo}
        onChange={(dateTo) => onChange({ dateTo })}
      />
      <CompactSelect
        label="负责人"
        value={values.owner}
        onChange={(owner) => onChange({ owner })}
        options={ownerOptions ?? [{ label: "全部负责人", value: "all" }]}
      />
      <CompactSelect
        label="区域"
        value={values.region}
        onChange={(region) => onChange({ region })}
        options={regionOptions ?? [{ label: "全部区域", value: "all" }]}
      />
      <CompactSelect
        label="门店等级"
        value={values.storeLevel}
        onChange={(storeLevel) => onChange({ storeLevel })}
        options={storeLevelOptions ?? [{ label: "全部门店等级", value: "all" }]}
      />
    </div>
  );
}

/** 高级筛选 — 默认折叠，触发器在工具栏右侧 */
export function InspectionAdvancedFilter({
  expanded,
  onToggle,
  values,
  onChange,
  ownerOptions = [{ label: "全部负责人", value: "all" }],
  regionOptions = [{ label: "全部区域", value: "all" }],
  storeLevelOptions = [{ label: "全部门店等级", value: "all" }],
  variant = "inline",
  className,
}: InspectionAdvancedFilterProps) {
  const hasActive =
    values.dateFrom ||
    values.dateTo ||
    values.owner !== "all" ||
    values.region !== "all" ||
    values.storeLevel !== "all";

  if (variant === "panel") {
    if (!expanded) return null;
    return (
      <div
        className={cn(
          "border-t border-[color:var(--table-border-color)] px-3 pb-3 pt-3",
          className
        )}
      >
        <AdvancedFilterFields
          values={values}
          onChange={onChange}
          ownerOptions={ownerOptions}
          regionOptions={regionOptions}
          storeLevelOptions={storeLevelOptions}
        />
      </div>
    );
  }

  return (
    <div className={cn("border-b border-[color:var(--table-border-color)]", className)}>
      {onToggle ? (
        <button
          type="button"
          onClick={onToggle}
          className="flex h-9 w-full items-center gap-1.5 px-1 text-sm text-[color:var(--color-text-secondary)] hover:text-[color:var(--table-action-color)]"
          aria-expanded={expanded}
        >
          <SlidersHorizontal className="size-3.5" />
          <span>高级筛选</span>
          {hasActive ? (
            <span className="rounded-full bg-[color:var(--table-action-color)] px-1.5 text-[10px] text-white">
              已筛选
            </span>
          ) : null}
          <ChevronDown
            className={cn("ml-auto size-4 transition-transform", expanded && "rotate-180")}
          />
        </button>
      ) : null}
      {expanded ? (
        <div className="pb-3 pt-1">
          <AdvancedFilterFields
            values={values}
            onChange={onChange}
            ownerOptions={ownerOptions}
            regionOptions={regionOptions}
            storeLevelOptions={storeLevelOptions}
          />
        </div>
      ) : null}
    </div>
  );
}

export function isAdvancedFilterActive(values: InspectionAdvancedFilterValues) {
  return Boolean(
    values.dateFrom ||
      values.dateTo ||
      values.owner !== "all" ||
      values.region !== "all" ||
      values.storeLevel !== "all"
  );
}
