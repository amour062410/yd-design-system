"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Check, ChevronDown, Plus, X } from "lucide-react";
import {
  resolveFontSize,
  selectSizeSpecs,
  type SelectSizeKey,
} from "@yd-ds/tokens";
import { cn } from "../lib/utils";

export type SelectShowcaseState =
  | "default"
  | "hover"
  | "focus"
  | "disabled"
  | "error";

export type SelectMode = "single" | "multiple";

export type SelectOption = {
  label: string;
  value: string;
  disabled?: boolean;
};

export type SelectOptionGroup = {
  label: string;
  options: SelectOption[];
};

export type SelectOptionsInput = SelectOption | SelectOptionGroup | string;

export interface SelectProps {
  options?: SelectOptionsInput[];
  value?: string | string[];
  defaultValue?: string | string[];
  mode?: SelectMode;
  showSearch?: boolean;
  allowClear?: boolean;
  size?: SelectSizeKey;
  placeholder?: string;
  disabled?: boolean;
  status?: "error";
  showcaseState?: SelectShowcaseState;
  open?: boolean;
  withCreate?: boolean;
  className?: string;
  onChange?: (value: string | string[]) => void;
}

export function parseSelectOptions(
  inputs: SelectOptionsInput[] = []
): { groups: SelectOptionGroup[]; flat: SelectOption[] } {
  const groups: SelectOptionGroup[] = [];
  const flat: SelectOption[] = [];

  for (const item of inputs) {
    if (typeof item === "string") {
      flat.push({ label: item, value: item });
      continue;
    }
    if ("options" in item && Array.isArray(item.options)) {
      groups.push(item as SelectOptionGroup);
      flat.push(...item.options);
      continue;
    }
    flat.push(item as SelectOption);
  }

  return { groups, flat };
}

function getFieldStateClass(
  state: SelectShowcaseState,
  hasError: boolean
) {
  if (state === "disabled") {
    return "border-[color:var(--select-border-default)] bg-muted/40 text-[color:var(--select-color-disabled)] shadow-none";
  }
  if (hasError || state === "error") {
    return "border-[color:var(--select-border-error)] bg-background text-foreground shadow-sm";
  }
  if (state === "hover") {
    return "border-[color:var(--select-border-focus)] bg-background text-foreground shadow-[0_0_0_1px_rgba(22,93,255,0.16)]";
  }
  if (state === "focus") {
    return "border-[color:var(--select-border-focus)] bg-background text-foreground shadow-[0_0_0_2px_var(--color-brand-ring)]";
  }
  return "border-[color:var(--select-border-default)] bg-background text-foreground shadow-sm";
}

function renderOptionRow({
  item,
  selected,
  spec,
  isShowcase,
  onSelect,
}: {
  item: SelectOption;
  selected: boolean;
  spec: (typeof selectSizeSpecs)[SelectSizeKey];
  isShowcase: boolean;
  onSelect: (option: SelectOption) => void;
}) {
  return (
    <li
      key={item.value}
      role="option"
      aria-selected={selected}
      aria-disabled={item.disabled}
      className={cn(
        "mb-0.5 flex cursor-pointer items-center justify-between rounded-md px-3 py-2 transition-colors",
        item.disabled && "cursor-not-allowed opacity-50",
        selected
          ? "bg-[color:var(--select-option-selected)] font-medium text-foreground"
          : "text-muted-foreground hover:bg-[color:var(--select-option-hover)] hover:text-foreground",
        isShowcase && "pointer-events-none"
      )}
      style={{
        fontSize: resolveFontSize(spec.optionFontSizeKey).fontSize,
      }}
      onClick={() => onSelect(item)}
    >
      <span>{item.label}</span>
      {selected && <Check size={13} className="text-primary" aria-hidden />}
    </li>
  );
}

export function Select({
  options = [
    { label: "选项一", value: "1" },
    { label: "选项二", value: "2" },
    { label: "选项三", value: "3" },
  ],
  value: controlledValue,
  defaultValue,
  mode = "single",
  showSearch = false,
  allowClear = false,
  size = "md",
  placeholder = "请选择",
  disabled: itemDisabled,
  status,
  showcaseState,
  open: showcaseOpen = false,
  withCreate = false,
  className,
  onChange,
}: SelectProps) {
  const multiple = mode === "multiple";
  const { groups, flat: normalized } = useMemo(
    () => parseSelectOptions(options),
    [options]
  );
  const wrapRef = useRef<HTMLDivElement>(null);
  const isShowcase = showcaseState !== undefined;
  const disabled = itemDisabled || showcaseState === "disabled";

  const [innerOpen, setInnerOpen] = useState(showcaseOpen);
  const [query, setQuery] = useState("");
  const [createdOptions, setCreatedOptions] = useState<SelectOption[]>([]);
  const [singleValue, setSingleValue] = useState<string | null>(
    multiple
      ? null
      : typeof defaultValue === "string"
        ? defaultValue
        : null
  );
  const [multiValue, setMultiValue] = useState<string[]>(() => {
    if (!multiple) return [];
    if (Array.isArray(defaultValue)) return defaultValue;
    return normalized.slice(0, 2).map((o) => o.value);
  });

  const isControlled = controlledValue !== undefined;
  const currentSingle = isControlled && !multiple
    ? (controlledValue as string | undefined) ?? null
    : singleValue;
  const currentMulti = isControlled && multiple
    ? (controlledValue as string[]) ?? []
    : multiValue;

  const isOpen = isShowcase ? showcaseOpen : innerOpen;
  const fieldState: SelectShowcaseState = isShowcase
    ? showcaseState!
    : isOpen
      ? "focus"
      : "default";

  const spec = selectSizeSpecs[size];
  const hasError = status === "error";

  const allOptions = useMemo(() => {
    const seen = new Set<string>();
    return [...normalized, ...createdOptions].filter((item) => {
      if (seen.has(item.value)) return false;
      seen.add(item.value);
      return true;
    });
  }, [normalized, createdOptions]);

  const filteredOptions = useMemo(() => {
    if (!query.trim()) return allOptions;
    const q = query.toLowerCase();
    return allOptions.filter(
      (item) =>
        item.label.toLowerCase().includes(q) ||
        item.value.toLowerCase().includes(q)
    );
  }, [allOptions, query]);

  const filteredGroups = useMemo(() => {
    if (!groups.length) return [];
    const allowed = new Set(filteredOptions.map((o) => o.value));
    return groups
      .map((group) => ({
        ...group,
        options: group.options.filter((o) => allowed.has(o.value)),
      }))
      .filter((g) => g.options.length > 0);
  }, [groups, filteredOptions]);

  const showGroupedList = groups.length > 0 && !query.trim();

  useEffect(() => {
    if (isShowcase) return;
    const handleClickOutside = (event: MouseEvent) => {
      if (!wrapRef.current?.contains(event.target as Node)) {
        setInnerOpen(false);
        setQuery("");
      }
    };
    window.addEventListener("mousedown", handleClickOutside);
    return () => window.removeEventListener("mousedown", handleClickOutside);
  }, [isShowcase]);

  const emitChange = (next: string | string[]) => {
    onChange?.(next);
  };

  const toggleOpen = () => {
    if (disabled || isShowcase) return;
    setInnerOpen((prev) => !prev);
  };

  const selectOption = (option: SelectOption) => {
    if (disabled || isShowcase || option.disabled) return;
    if (multiple) {
      const next = currentMulti.includes(option.value)
        ? currentMulti.filter((v) => v !== option.value)
        : [...currentMulti, option.value];
      if (!isControlled) setMultiValue(next);
      emitChange(next);
      return;
    }
    if (!isControlled) setSingleValue(option.value);
    emitChange(option.value);
    setInnerOpen(false);
  };

  const removeTag = (tag: string) => {
    if (disabled || isShowcase) return;
    const next = currentMulti.filter((item) => item !== tag);
    if (!isControlled) setMultiValue(next);
    emitChange(next);
  };

  const clearAll = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (disabled || isShowcase) return;
    if (multiple) {
      if (!isControlled) setMultiValue([]);
      emitChange([]);
      return;
    }
    if (!isControlled) setSingleValue(null);
    emitChange("");
  };

  const selectedLabel =
    allOptions.find((o) => o.value === currentSingle)?.label ?? currentSingle;

  const hasValue = multiple ? currentMulti.length > 0 : Boolean(currentSingle);

  const renderOptionsList = () => {
    if (showGroupedList) {
      return filteredGroups.map((group) => (
        <li key={group.label} role="presentation" className="list-none">
          <ul className="list-none p-0">
            <li
              role="presentation"
              className="pointer-events-none px-3 pb-1 pt-2 text-[11px] font-medium text-muted-foreground"
            >
              {group.label}
            </li>
            {group.options.map((item) =>
              renderOptionRow({
                item,
                selected: multiple
                  ? currentMulti.includes(item.value)
                  : currentSingle === item.value,
                spec,
                isShowcase,
                onSelect: selectOption,
              })
            )}
          </ul>
        </li>
      ));
    }

    return filteredOptions.map((item) =>
      renderOptionRow({
        item,
        selected: multiple
          ? currentMulti.includes(item.value)
          : currentSingle === item.value,
        spec,
        isShowcase,
        onSelect: selectOption,
      })
    );
  };

  return (
    <div
      ref={wrapRef}
      className={cn("relative w-full min-w-[170px] max-w-[280px]", className)}
    >
      <div
        role="combobox"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-disabled={disabled}
        tabIndex={disabled ? -1 : 0}
        onClick={toggleOpen}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            toggleOpen();
          }
          if (e.key === "Escape" && !isShowcase) {
            setInnerOpen(false);
            setQuery("");
          }
        }}
        className={cn(
          "flex items-center justify-between gap-2 border transition-all duration-150",
          !disabled &&
            !isShowcase &&
            "cursor-pointer hover:border-[color:var(--select-border-focus)] hover:shadow-md",
          getFieldStateClass(fieldState, hasError)
        )}
        style={{
          minHeight: spec.height,
          paddingLeft: spec.paddingX,
          paddingRight: spec.paddingX,
          borderRadius: "var(--select-radius)",
          fontSize: resolveFontSize(spec.fontSizeKey).fontSize,
        }}
      >
        {!multiple && (
          <span
            className={cn(
              "min-w-0 flex-1 truncate",
              hasValue && !disabled
                ? "text-foreground"
                : !disabled
                  ? "text-muted-foreground"
                  : "text-[color:var(--select-color-disabled)]"
            )}
          >
            {selectedLabel ?? placeholder}
          </span>
        )}
        {multiple && (
          <div className="flex min-h-7 flex-1 flex-wrap items-center gap-1 py-0.5">
            {currentMulti.map((tag) => {
              const label =
                allOptions.find((o) => o.value === tag)?.label ?? tag;
              return (
                <span
                  key={tag}
                  className="inline-flex h-6 max-w-full items-center gap-1 rounded-sm bg-primary/10 px-2 text-[11px] text-foreground"
                >
                  <span className="truncate">{label}</span>
                  {!disabled && !isShowcase && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeTag(tag);
                      }}
                      className="inline-flex shrink-0 text-muted-foreground hover:text-foreground"
                      aria-label={`移除 ${label}`}
                    >
                      <X size={10} />
                    </button>
                  )}
                </span>
              );
            })}
            {!hasValue && (
              <span
                className={cn(
                  !disabled ? "text-muted-foreground" : "text-[color:var(--select-color-disabled)]"
                )}
              >
                {placeholder}
              </span>
            )}
          </div>
        )}
        <div className="flex shrink-0 items-center gap-1">
          {allowClear && hasValue && !disabled && !isShowcase && (
            <button
              type="button"
              onClick={clearAll}
              className="inline-flex text-muted-foreground hover:text-foreground"
              aria-label={multiple ? "全部清空" : "清空"}
            >
              <X size={14} />
            </button>
          )}
          <ChevronDown
            size={14}
            className={cn(
              "shrink-0 transition-transform duration-150",
              isOpen && "rotate-180",
              disabled ? "text-[color:var(--select-color-disabled)]" : "text-muted-foreground"
            )}
            aria-hidden
          />
        </div>
      </div>

      {isOpen && !disabled && (
        <div
          className="absolute left-0 right-0 top-[calc(100%+6px)] z-30 overflow-hidden rounded-md bg-background"
          style={{ boxShadow: "var(--select-panel-shadow)" }}
        >
          {showSearch && (
            <div className="border-b border-border/70 px-2.5 py-2">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="请搜索"
                aria-label="请搜索"
                className="h-7 w-full rounded-sm border border-[color:var(--select-border-default)] bg-background px-2 text-xs text-foreground outline-none focus:border-[color:var(--select-border-focus)]"
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          )}
          <ul
            role="listbox"
            className="max-h-[200px] overflow-auto p-1.5"
          >
            {filteredOptions.length === 0 ? (
              <li className="px-3 py-6 text-center text-xs text-muted-foreground">
                无匹配项
              </li>
            ) : (
              renderOptionsList()
            )}
          </ul>
          {(withCreate || (multiple && allowClear && hasValue && !isShowcase)) && (
            <div className="border-t border-border/70 px-2.5 py-2">
              {withCreate && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    const label = query.trim();
                    if (!label) return;
                    const val = label;
                    const option = { label, value: val };
                    if (!allOptions.some((o) => o.value === val)) {
                      setCreatedOptions((prev) => [...prev, option]);
                    }
                    if (!currentMulti.includes(val)) {
                      const next = [...currentMulti, val];
                      if (!isControlled) setMultiValue(next);
                      emitChange(next);
                    }
                    setQuery("");
                  }}
                  className="inline-flex items-center gap-1 text-xs text-primary"
                >
                  <Plus size={11} />
                  添加新项
                </button>
              )}
              {multiple && allowClear && hasValue && !isShowcase && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    clearAll();
                  }}
                  className={cn(
                    "text-xs text-primary hover:underline",
                    withCreate && "mt-2"
                  )}
                >
                  全部清空
                </button>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

/** Static field preview for documentation matrices */
export function SelectShowcase({
  state = "default",
  multiple = false,
  open = false,
  showSearch = false,
  searchable,
  withCreate = false,
  allowClear = false,
  status,
  size = "md",
  options,
  placeholder,
  className,
}: {
  state?: SelectShowcaseState;
  multiple?: boolean;
  open?: boolean;
  showSearch?: boolean;
  /** @deprecated use showSearch */
  searchable?: boolean;
  withCreate?: boolean;
  allowClear?: boolean;
  status?: "error";
  size?: SelectSizeKey;
  options?: SelectOptionsInput[];
  placeholder?: string;
  className?: string;
}) {
  const searchEnabled = showSearch || searchable;
  return (
    <Select
      showcaseState={state}
      open={open}
      mode={multiple ? "multiple" : "single"}
      showSearch={searchEnabled}
      withCreate={withCreate}
      allowClear={allowClear}
      status={status}
      size={size}
      options={options}
      placeholder={placeholder}
      className={className}
    />
  );
}

export const DEFAULT_SELECT_OPTIONS: SelectOption[] = [
  { label: "选项一", value: "1" },
  { label: "选项二", value: "2" },
  { label: "选项三", value: "3" },
  { label: "选项四", value: "4" },
];
