"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
  type ReactNode,
} from "react";
import { Check, ChevronDown, ChevronRight, Loader2, X } from "lucide-react";
import {
  cascaderSizeSpecs,
  resolveFontSize,
  type CascaderSizeKey,
} from "@yd-ds/tokens";
import { cn } from "../../lib/utils";
import type {
  CascaderOption,
  CascaderPanelFocus,
  CascaderProps,
  CascaderShowcaseState,
  NormalizedCascaderOption,
} from "./cascader.types";
import {
  findOptionPath,
  focusToActiveValues,
  formatPathLabels,
  getColumnsFromPath,
  getFocusFromActiveValues,
  isSelectableNode,
  movePanelFocus,
  normalizeCascaderOptions,
  pathKey,
  pathsEqual,
  searchCascaderOptions,
} from "./cascader-utils";

function getFieldStateClass(
  state: CascaderShowcaseState,
  hasError: boolean
) {
  if (state === "disabled") {
    return "border-[color:var(--cascader-border-default,var(--select-border-default))] bg-muted/40 text-[color:var(--select-color-disabled)] shadow-none";
  }
  if (hasError || state === "error") {
    return "border-[color:var(--cascader-border-error,var(--select-border-error))] bg-background text-foreground shadow-sm";
  }
  if (state === "hover") {
    return "border-[color:var(--cascader-border-focus,var(--select-border-focus))] bg-background text-foreground shadow-[0_0_0_1px_rgba(22,93,255,0.16)]";
  }
  if (state === "focus") {
    return "border-[color:var(--cascader-border-focus,var(--select-border-focus))] bg-background text-foreground shadow-[0_0_0_2px_var(--color-brand-ring)]";
  }
  return "border-[color:var(--cascader-border-default,var(--select-border-default))] bg-background text-foreground shadow-sm";
}

function highlightMatch(text: string, query: string): ReactNode {
  const q = query.trim();
  if (!q) return text;
  const idx = text.toLowerCase().indexOf(q.toLowerCase());
  if (idx === -1) return text;
  return (
    <>
      {text.slice(0, idx)}
      <span className="font-medium text-primary">{text.slice(idx, idx + q.length)}</span>
      {text.slice(idx + q.length)}
    </>
  );
}

function optionRowClass({
  disabled,
  highlighted,
  expanded,
  isShowcase,
}: {
  disabled?: boolean;
  highlighted: boolean;
  expanded: boolean;
  isShowcase: boolean;
}) {
  return cn(
    "mb-0.5 flex cursor-pointer items-center gap-2 rounded-md border-0 px-3 py-2 outline-none ring-0 transition-colors focus:outline-none focus-visible:outline-none",
    disabled && "cursor-not-allowed opacity-50",
    highlighted
      ? "bg-[color:var(--cascader-option-selected,var(--select-option-selected))] text-foreground"
      : "text-muted-foreground hover:bg-[color:var(--cascader-option-hover,var(--select-option-hover))] hover:text-foreground",
    expanded && "font-medium",
    isShowcase && "pointer-events-none"
  );
}

function MultipleCheckbox({ checked }: { checked: boolean }) {
  return (
    <span
      className={cn(
        "inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-[2px]",
        checked
          ? "bg-primary text-primary-foreground"
          : "bg-[color:var(--cascader-option-hover,var(--select-option-hover))]"
      )}
      aria-hidden
    >
      {checked ? <Check size={10} strokeWidth={3} /> : null}
    </span>
  );
}

function renderSearchHighlight(labels: string, query: string) {
  return labels.split(" / ").map((part, index, arr) => (
    <span key={`${part}-${index}`}>
      {highlightMatch(part, query)}
      {index < arr.length - 1 ? " / " : null}
    </span>
  ));
}

function ColumnOption({
  item,
  columnIndex,
  optionIndex,
  activeValues,
  selectedSingle,
  selectedMultipleKeys,
  multiple,
  isKeyboardFocused,
  spec,
  expandTrigger,
  isShowcase,
  normalized,
  onClickOption,
  onHoverExpand,
  onToggleMultiple,
}: {
  item: NormalizedCascaderOption;
  columnIndex: number;
  optionIndex: number;
  activeValues: string[];
  selectedSingle: string[];
  selectedMultipleKeys: Set<string>;
  multiple: boolean;
  isKeyboardFocused: boolean;
  spec: (typeof cascaderSizeSpecs)[CascaderSizeKey];
  expandTrigger: CascaderProps["expandTrigger"];
  isShowcase: boolean;
  normalized: NormalizedCascaderOption[];
  onClickOption: (columnIndex: number, option: NormalizedCascaderOption) => void;
  onHoverExpand: (columnIndex: number, option: NormalizedCascaderOption) => void;
  onToggleMultiple: (path: CascaderOption[]) => void;
}) {
  const isExpanded = activeValues[columnIndex] === item.value;
  const hasChildren = Boolean(item.children?.length) && !item.isLeaf;
  const selectable = isSelectableNode(item);
  const pathValues = [...activeValues.slice(0, columnIndex), item.value];
  const path = findOptionPath(normalized, pathValues);
  const isLeafSelected =
    !multiple && selectable && pathsEqual(selectedSingle, pathValues);
  const isChecked =
    multiple && selectable && selectedMultipleKeys.has(pathKey(pathValues));
  const highlighted = isExpanded || isLeafSelected || isChecked || isKeyboardFocused;

  return (
    <li
      role="option"
      aria-selected={highlighted}
      aria-disabled={item.disabled}
      className={optionRowClass({
        disabled: item.disabled,
        highlighted,
        expanded: isExpanded,
        isShowcase,
      })}
      style={{
        fontSize: resolveFontSize(spec.optionFontSizeKey).fontSize,
      }}
      onClick={() => {
        if (item.disabled || item.loading || isShowcase) return;
        if (multiple) {
          if (selectable) {
            onToggleMultiple(path);
          } else {
            onClickOption(columnIndex, item);
          }
          return;
        }
        onClickOption(columnIndex, item);
      }}
      onMouseEnter={() => {
        if (
          expandTrigger !== "hover" ||
          item.disabled ||
          item.loading ||
          isShowcase ||
          !hasChildren
        )
          return;
        onHoverExpand(columnIndex, item);
      }}
    >
      {multiple && selectable ? <MultipleCheckbox checked={isChecked} /> : null}
      <span className="min-w-0 flex-1 truncate">{item.label}</span>
      {item.loading ? (
        <Loader2 size={14} className="shrink-0 animate-spin text-muted-foreground" />
      ) : hasChildren ? (
        <ChevronRight size={14} className="shrink-0 text-muted-foreground" />
      ) : !multiple && isLeafSelected ? (
        <Check size={14} className="shrink-0 text-primary" />
      ) : null}
    </li>
  );
}

export function Cascader({
  options = [],
  value: controlledValue,
  defaultValue,
  placeholder = "请选择",
  disabled: itemDisabled,
  status,
  size = "md",
  allowClear = false,
  showSearch = false,
  searchPlaceholder = "请搜索",
  filter,
  onSearch,
  changeOnSelect = false,
  expandTrigger = "click",
  expandDelay = 150,
  fieldNames,
  separator = " / ",
  displayRender,
  multiple = false,
  showCheckedStrategy = "SHOW_CHILD",
  maxTagCount,
  popupMatchSelectWidth = true,
  notFoundContent = "无匹配项",
  className,
  onChange,
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
  showcaseState,
}: CascaderProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const hoverTimer = useRef<number | undefined>(undefined);
  const triggerWidthRef = useRef<number>(0);
  const isShowcase = showcaseState !== undefined;
  const disabled = itemDisabled || showcaseState === "disabled";

  const normalized = useMemo(
    () => normalizeCascaderOptions(options, fieldNames),
    [options, fieldNames]
  );

  const defaultSingle = Array.isArray(defaultValue?.[0])
    ? []
    : ((defaultValue as string[] | undefined) ?? []);
  const defaultMulti = Array.isArray(defaultValue?.[0])
    ? (defaultValue as string[][])
    : [];

  const [innerOpen, setInnerOpen] = useState(defaultOpen);
  const [query, setQuery] = useState("");
  const [innerSingle, setInnerSingle] = useState<string[]>(defaultSingle);
  const [innerMulti, setInnerMulti] = useState<string[][]>(defaultMulti);
  const [activeValues, setActiveValues] = useState<string[]>(defaultSingle);
  const [panelFocus, setPanelFocus] = useState<CascaderPanelFocus>({
    column: 0,
    index: 0,
  });

  const isValueControlled = controlledValue !== undefined;
  const isOpenControlled = controlledOpen !== undefined && !isShowcase;

  const currentSingle = isValueControlled && !multiple
    ? ((controlledValue as string[] | undefined) ?? [])
    : innerSingle;
  const currentMulti = isValueControlled && multiple
    ? ((controlledValue as string[][] | undefined) ?? [])
    : innerMulti;

  const panelOpen = isShowcase
    ? (controlledOpen ?? false)
    : isOpenControlled
      ? controlledOpen!
      : innerOpen;

  const fieldState: CascaderShowcaseState = isShowcase
    ? showcaseState!
    : panelOpen
      ? "focus"
      : "default";

  const spec = cascaderSizeSpecs[size];
  const hasError = status === "error";

  const selectedPath = useMemo(
    () => findOptionPath(normalized, currentSingle),
    [normalized, currentSingle]
  );

  const selectedMultipleKeys = useMemo(
    () => new Set(currentMulti.map(pathKey)),
    [currentMulti]
  );

  const searchResults = useMemo(
    () =>
      showSearch && query.trim()
        ? searchCascaderOptions(normalized, query, filter)
        : [],
    [normalized, query, showSearch, filter]
  );

  const columns = useMemo(() => {
    if (showSearch && query.trim()) return [];
    return getColumnsFromPath(normalized, activeValues);
  }, [normalized, activeValues, showSearch, query]);

  const hasValue = multiple ? currentMulti.length > 0 : currentSingle.length > 0;

  const setPanelOpen = useCallback(
    (next: boolean) => {
      if (!isShowcase && !isOpenControlled) setInnerOpen(next);
      onOpenChange?.(next);
    },
    [isShowcase, isOpenControlled, onOpenChange]
  );

  useEffect(() => {
    if (isShowcase) return;
    const handleClickOutside = (event: MouseEvent) => {
      if (!wrapRef.current?.contains(event.target as Node)) {
        setPanelOpen(false);
        setQuery("");
        setActiveValues(multiple ? [] : currentSingle);
      }
    };
    window.addEventListener("mousedown", handleClickOutside);
    return () => window.removeEventListener("mousedown", handleClickOutside);
  }, [isShowcase, setPanelOpen, multiple, currentSingle]);

  useEffect(() => {
    if (panelOpen) {
      triggerWidthRef.current = wrapRef.current?.offsetWidth ?? 0;
      const seed = multiple ? currentMulti[0] ?? [] : currentSingle;
      setActiveValues(seed.length ? seed : []);
      setPanelFocus(getFocusFromActiveValues(getColumnsFromPath(normalized, seed), seed));
      if (showSearch && !isShowcase) {
        window.setTimeout(() => searchRef.current?.focus(), 0);
      }
    }
  }, [panelOpen, currentSingle, currentMulti, multiple, normalized, showSearch, isShowcase]);

  useEffect(() => {
    return () => window.clearTimeout(hoverTimer.current);
  }, []);

  const emitSingleChange = (path: CascaderOption[]) => {
    const nextValue = path.map((item) => item.value);
    if (!isValueControlled) setInnerSingle(nextValue);
    onChange?.(nextValue, path);
  };

  const emitMultiChange = (nextMulti: string[][], paths: CascaderOption[][]) => {
    if (!isValueControlled) setInnerMulti(nextMulti);
    onChange?.(nextMulti, paths);
  };

  const toggleOpen = () => {
    if (disabled || isShowcase) return;
    setPanelOpen(!panelOpen);
  };

  const clearValue = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (disabled || isShowcase) return;
    if (multiple) {
      emitMultiChange([], []);
    } else {
      if (!isValueControlled) setInnerSingle([]);
      onChange?.([], []);
    }
    setActiveValues([]);
  };

  const handleExpand = (
    columnIndex: number,
    option: NormalizedCascaderOption,
    select = true
  ) => {
    const nextActive = [...activeValues.slice(0, columnIndex), option.value];
    setActiveValues(nextActive);
    setPanelFocus({
      column: columnIndex,
      index: Math.max(
        0,
        (columns[columnIndex] ?? []).findIndex((o) => o.value === option.value)
      ),
    });

    if (!select) return;

    const path = findOptionPath(normalized, nextActive);
    const leaf = isSelectableNode(option);
    const shouldEmit = leaf || changeOnSelect;

    if (shouldEmit && !multiple) {
      emitSingleChange(path);
      if (leaf && !isShowcase) {
        setPanelOpen(false);
        setQuery("");
      }
    }
  };

  const handleHoverExpand = (
    columnIndex: number,
    option: NormalizedCascaderOption
  ) => {
    window.clearTimeout(hoverTimer.current);
    hoverTimer.current = window.setTimeout(() => {
      handleExpand(columnIndex, option, changeOnSelect);
    }, expandDelay);
  };

  const handleSearchSelect = (path: CascaderOption[]) => {
    if (disabled || isShowcase) return;
    const nextActive = path.map((item) => item.value);
    setActiveValues(nextActive);
    if (multiple) {
      const key = pathKey(nextActive);
      const exists = selectedMultipleKeys.has(key);
      const nextMulti = exists
        ? currentMulti.filter((p) => pathKey(p) !== key)
        : [...currentMulti, nextActive];
      const nextPaths = nextMulti.map((p) => findOptionPath(normalized, p));
      emitMultiChange(nextMulti, nextPaths);
    } else {
      emitSingleChange(path);
      if (!isShowcase) {
        setPanelOpen(false);
        setQuery("");
      }
    }
  };

  const handleToggleMultiple = (path: CascaderOption[]) => {
    const values = path.map((item) => item.value);
    const key = pathKey(values);
    const exists = selectedMultipleKeys.has(key);
    const nextMulti = exists
      ? currentMulti.filter((p) => pathKey(p) !== key)
      : [...currentMulti, values];
    const nextPaths = nextMulti.map((p) => findOptionPath(normalized, p));
    emitMultiChange(nextMulti, nextPaths);
  };

  const removeTag = (tagKey: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const nextMulti = currentMulti.filter((p) => pathKey(p) !== tagKey);
    const nextPaths = nextMulti.map((p) => findOptionPath(normalized, p));
    emitMultiChange(nextMulti, nextPaths);
  };

  const renderDisplay = () => {
    if (multiple) {
      const tags = currentMulti.map((pathValues) => {
        const path = findOptionPath(normalized, pathValues);
        const labels = path.map((item) => item.label);
        const label =
          showCheckedStrategy === "SHOW_CHILD" || path.length <= 1
            ? formatPathLabels(path, separator)
            : labels[0] ?? pathValues.join(separator);
        return { key: pathKey(pathValues), label, path };
      });
      const visible =
        maxTagCount != null ? tags.slice(0, maxTagCount) : tags;
      const hidden = tags.length - visible.length;

      if (!tags.length) return placeholder;

      return (
        <div className="flex min-h-6 flex-1 flex-wrap items-center gap-1 py-0.5">
          {visible.map((tag) => (
            <span
              key={tag.key}
              className="inline-flex h-6 max-w-full items-center gap-1 rounded-sm bg-primary/10 px-2 text-[12px] text-foreground"
            >
              <span className="truncate">{tag.label}</span>
              {!disabled && !isShowcase && (
                <button
                  type="button"
                  onClick={(e) => removeTag(tag.key, e)}
                  className="inline-flex shrink-0 text-muted-foreground hover:text-foreground"
                  aria-label={`移除 ${tag.label}`}
                >
                  <X size={10} />
                </button>
              )}
            </span>
          ))}
          {hidden > 0 ? (
            <span className="text-[12px] text-muted-foreground">+{hidden}</span>
          ) : null}
        </div>
      );
    }

    if (selectedPath.length === 0) return placeholder;
    const labels = selectedPath.map((item) => item.label);
    return displayRender
      ? displayRender(labels, selectedPath)
      : formatPathLabels(selectedPath, separator);
  };

  const handlePanelKeyDown = (e: KeyboardEvent) => {
    if (!panelOpen || isShowcase || (showSearch && query.trim())) return;

    if (e.key === "ArrowUp" || e.key === "ArrowDown" || e.key === "ArrowLeft" || e.key === "ArrowRight") {
      e.preventDefault();
      const nextFocus = movePanelFocus(columns, panelFocus, e.key);
      setPanelFocus(nextFocus);
      setActiveValues(focusToActiveValues(columns, nextFocus));
      return;
    }

    if (e.key === "Enter") {
      e.preventDefault();
      const column = columns[panelFocus.column] ?? [];
      const option = column[panelFocus.index];
      if (!option) return;
      if (multiple) {
        if (isSelectableNode(option)) {
          handleToggleMultiple(
            findOptionPath(
              normalized,
              focusToActiveValues(columns, panelFocus)
            )
          );
        } else {
          handleExpand(panelFocus.column, option, false);
        }
        return;
      }
      handleExpand(panelFocus.column, option, true);
    }
  };

  const panelMinWidth = popupMatchSelectWidth
    ? Math.max(triggerWidthRef.current, 180)
    : undefined;

  return (
    <div
      ref={wrapRef}
      className={cn("relative w-full min-w-[200px] max-w-[360px]", className)}
      onKeyDown={handlePanelKeyDown}
    >
      <div
        role="combobox"
        aria-expanded={panelOpen}
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
            setPanelOpen(false);
            setQuery("");
          }
          if (panelOpen) handlePanelKeyDown(e);
        }}
        className={cn(
          "flex items-center justify-between gap-2 border transition-all duration-150",
          !disabled &&
            !isShowcase &&
            "cursor-pointer hover:border-[color:var(--cascader-border-focus,var(--select-border-focus))] hover:shadow-md",
          getFieldStateClass(fieldState, hasError),
          multiple && hasValue && "py-1"
        )}
        style={{
          minHeight: spec.height,
          paddingLeft: spec.paddingX,
          paddingRight: spec.paddingX,
          borderRadius: "var(--cascader-radius,var(--select-radius))",
          fontSize: resolveFontSize(spec.fontSizeKey).fontSize,
        }}
      >
        <span
          className={cn(
            "min-w-0 flex-1",
            !multiple && "truncate",
            hasValue && !disabled
              ? "text-foreground"
              : !disabled
                ? "text-muted-foreground"
                : "text-[color:var(--select-color-disabled)]"
          )}
        >
          {renderDisplay()}
        </span>
        <div className="flex shrink-0 items-center gap-1">
          {allowClear && hasValue && !disabled && !isShowcase && (
            <button
              type="button"
              onClick={clearValue}
              className="inline-flex text-muted-foreground hover:text-foreground"
              aria-label="清空"
            >
              <X size={14} />
            </button>
          )}
          <ChevronDown
            size={14}
            className={cn(
              "shrink-0 transition-transform duration-150",
              panelOpen && "rotate-180",
              disabled
                ? "text-[color:var(--select-color-disabled)]"
                : "text-muted-foreground"
            )}
            aria-hidden
          />
        </div>
      </div>

      {panelOpen && !disabled && (
        <div
          className="absolute left-0 top-[calc(100%+6px)] z-30 overflow-hidden rounded-md bg-background [&_[role=option]]:border-0 [&_[role=option]]:outline-none [&_[role=option]]:ring-0"
          style={{
            boxShadow: "var(--cascader-panel-shadow,var(--select-panel-shadow))",
            minWidth: panelMinWidth,
          }}
        >
          {showSearch && (
            <div className="border-b border-border/70 px-2.5 py-2">
              <input
                ref={searchRef}
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  onSearch?.(e.target.value);
                }}
                placeholder={searchPlaceholder}
                aria-label={searchPlaceholder}
                className="h-7 w-full rounded-sm border border-[color:var(--cascader-border-default,var(--select-border-default))] bg-background px-2 text-xs text-foreground outline-none focus:border-[color:var(--cascader-border-focus,var(--select-border-focus))]"
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          )}

          {showSearch && query.trim() ? (
            <ul
              role="listbox"
              className="max-h-[var(--cascader-column-max-height,200px)] overflow-auto p-1.5"
              style={{ minWidth: panelMinWidth ?? "var(--cascader-column-width,180px)" }}
            >
              {searchResults.length === 0 ? (
                <li className="px-3 py-6 text-center text-xs text-muted-foreground">
                  {notFoundContent}
                </li>
              ) : (
                searchResults.map((result) => {
                  const pathValues = result.path.map((item) => item.value);
                  const checked =
                    multiple && selectedMultipleKeys.has(pathKey(pathValues));
                  return (
                    <li
                      key={result.labels}
                      role="option"
                      aria-selected={checked}
                      className={optionRowClass({
                        highlighted: checked,
                        expanded: false,
                        isShowcase,
                      })}
                      style={{
                        fontSize: resolveFontSize(spec.optionFontSizeKey).fontSize,
                      }}
                      onClick={() => handleSearchSelect(result.path)}
                    >
                      {multiple ? <MultipleCheckbox checked={checked} /> : null}
                      <span className="min-w-0 flex-1">
                        {renderSearchHighlight(result.labels, query)}
                      </span>
                    </li>
                  );
                })
              )}
            </ul>
          ) : (
            <div className="flex">
              {columns.map((column, columnIndex) => (
                <ul
                  key={columnIndex}
                  role="listbox"
                  className={cn(
                    "max-h-[var(--cascader-column-max-height,200px)] w-[var(--cascader-column-width,180px)] shrink-0 overflow-auto p-1.5",
                    columnIndex > 0 && "border-l border-border/70"
                  )}
                >
                  {column.map((item, optionIndex) => (
                    <ColumnOption
                      key={`${columnIndex}-${item.value}`}
                      item={item}
                      columnIndex={columnIndex}
                      optionIndex={optionIndex}
                      activeValues={activeValues}
                      selectedSingle={currentSingle}
                      selectedMultipleKeys={selectedMultipleKeys}
                      multiple={multiple}
                      isKeyboardFocused={
                        panelFocus.column === columnIndex &&
                        panelFocus.index === optionIndex
                      }
                      spec={spec}
                      expandTrigger={expandTrigger}
                      isShowcase={isShowcase}
                      normalized={normalized}
                      onClickOption={(col, opt) =>
                        handleExpand(col, opt, !multiple)
                      }
                      onHoverExpand={handleHoverExpand}
                      onToggleMultiple={handleToggleMultiple}
                    />
                  ))}
                </ul>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

/** Static field preview for documentation matrices */
export function CascaderShowcase({
  state = "default",
  open = false,
  showSearch = false,
  allowClear = false,
  changeOnSelect = false,
  multiple = false,
  status,
  size = "md",
  options,
  placeholder,
  className,
}: {
  state?: CascaderShowcaseState;
  open?: boolean;
  showSearch?: boolean;
  allowClear?: boolean;
  changeOnSelect?: boolean;
  multiple?: boolean;
  status?: "error";
  size?: CascaderSizeKey;
  options?: CascaderOption[];
  placeholder?: string;
  className?: string;
}) {
  return (
    <Cascader
      showcaseState={state}
      open={open}
      showSearch={showSearch}
      allowClear={allowClear}
      changeOnSelect={changeOnSelect}
      multiple={multiple}
      status={status}
      size={size}
      options={options}
      placeholder={placeholder}
      className={className}
    />
  );
}

export const DEFAULT_CASCADER_OPTIONS: CascaderOption[] = [
  {
    label: "浙江省",
    value: "zhejiang",
    children: [
      {
        label: "杭州市",
        value: "hangzhou",
        children: [
          { label: "西湖区", value: "xihu" },
          { label: "滨江区", value: "binjiang" },
        ],
      },
      {
        label: "宁波市",
        value: "ningbo",
        children: [{ label: "海曙区", value: "haishu" }],
      },
    ],
  },
  {
    label: "江苏省",
    value: "jiangsu",
    children: [
      {
        label: "南京市",
        value: "nanjing",
        children: [
          { label: "鼓楼区", value: "gulou" },
          { label: "玄武区", value: "xuanwu" },
        ],
      },
    ],
  },
];
