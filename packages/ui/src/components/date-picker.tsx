"use client";

import {
  useCallback,
  useEffect,
  useId,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Clock,
  X,
} from "lucide-react";
import { datePickerSizeSpecs, type DatePickerSizeKey } from "@yd-ds/tokens";
import {
  DATE_PICKER_MONTH_LABELS,
  DATE_PICKER_QUARTER_LABELS,
  DATE_PICKER_SHORTCUTS,
  DATE_PICKER_WEEKDAY_LABELS,
} from "./date-picker-data";
import {
  addMonths,
  formatDate,
  getCalendarDays,
  isBetween,
  isSameDay,
} from "../lib/date-utils";
import { cn } from "../lib/utils";

export type DatePickerMode = "date" | "month" | "year" | "quarter" | "datetime";
export type DatePickerSize = DatePickerSizeKey;
export type DatePickerShowcaseState =
  | "default"
  | "hover"
  | "focus"
  | "selected"
  | "disabled";

type RangeValue = [Date | null, Date | null];
type SingleValue = Date | null;
export type DatePickerValue = SingleValue | RangeValue;

export interface DatePickerProps {
  value?: DatePickerValue;
  defaultValue?: DatePickerValue;
  onChange?: (value: DatePickerValue) => void;
  mode?: DatePickerMode;
  size?: DatePickerSize;
  range?: boolean;
  showTime?: boolean;
  shortcuts?: boolean;
  allowClear?: boolean;
  disabled?: boolean;
  placeholder?: string | [string, string];
  className?: string;
  /** Showcase-only: force visual state */
  showcaseState?: "default" | "hover" | "focus" | "selected" | "disabled";
}

const SIZE_GAP: Record<DatePickerSize, string> = {
  sm: "gap-1.5 text-xs",
  md: "gap-2 text-sm",
  lg: "gap-2 text-sm",
};

const NAV_BTN =
  "rounded-button p-1.5 text-text-tertiary transition-all duration-fast hover:bg-brand-hover hover:text-text-secondary";
const CELL_BASE =
  "relative mx-auto flex h-9 w-9 items-center justify-center rounded-cell text-[13px] transition-all duration-base ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-[1.06] hover:bg-brand-hover active:scale-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/30";
const PRIMARY_BTN =
  "btn-primary rounded-button px-4 py-1.5 text-sm font-medium";

function isRangeValue(v: DatePickerValue): v is RangeValue {
  return Array.isArray(v);
}

function normalizeRange(v: DatePickerValue): RangeValue {
  if (isRangeValue(v)) return v;
  return [v, null];
}

function getShortcutRange(key: string): RangeValue {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const end = new Date(today);
  const start = new Date(today);
  switch (key) {
    case "yesterday":
      start.setDate(start.getDate() - 1);
      end.setDate(end.getDate() - 1);
      break;
    case "lastWeek":
      start.setDate(start.getDate() - 7);
      end.setDate(end.getDate() - 1);
      break;
    case "lastMonth":
      start.setMonth(start.getMonth() - 1);
      start.setDate(1);
      end.setDate(0);
      break;
    case "past7":
      start.setDate(start.getDate() - 6);
      break;
    case "past14":
      start.setDate(start.getDate() - 13);
      break;
    case "past30":
      start.setDate(start.getDate() - 29);
      break;
    default:
      break;
  }
  return [start, end];
}

const DATE_PICKER_PANEL_GAP = 6;

function computeDatePickerPanelPosition(
  triggerRect: DOMRect,
  panelSize: { width: number; height: number },
  viewport: { width: number; height: number }
) {
  const margin = 8;
  let x = triggerRect.left;
  let y = triggerRect.bottom + DATE_PICKER_PANEL_GAP;

  if (y + panelSize.height > viewport.height - margin) {
    const above = triggerRect.top - panelSize.height - DATE_PICKER_PANEL_GAP;
    if (above >= margin) {
      y = above;
    }
  }

  if (x + panelSize.width > viewport.width - margin) {
    x = Math.max(margin, viewport.width - panelSize.width - margin);
  }
  if (x < margin) x = margin;

  return { x, y };
}

interface PanelProps {
  open: boolean;
  closing: boolean;
  children: ReactNode;
  className?: string;
  panelRef?: React.RefObject<HTMLDivElement | null>;
  style?: CSSProperties;
}

function Panel({ open, closing, children, className, panelRef, style }: PanelProps) {
  if (!open && !closing) return null;
  return (
    <div
      ref={panelRef}
      role="dialog"
      className={cn(
        "fixed z-[var(--datepicker-z-index,1050)] min-w-[300px] overflow-hidden bg-surface-card",
        open && !closing && "animate-panel-in",
        closing && "animate-panel-out",
        className
      )}
      style={{
        borderRadius: "var(--datepicker-radius)",
        boxShadow: "var(--datepicker-panel-shadow)",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

interface CalendarGridProps {
  viewDate: Date;
  selected?: Date | null;
  rangeStart?: Date | null;
  rangeEnd?: Date | null;
  onSelect: (date: Date) => void;
  onViewChange: (date: Date) => void;
  animateKey: number;
}

function CalendarGrid({
  viewDate,
  selected,
  rangeStart,
  rangeEnd,
  onSelect,
  onViewChange,
  animateKey,
}: CalendarGridProps) {
  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const days = useMemo(() => getCalendarDays(year, month), [year, month]);
  const today = new Date();

  return (
    <div key={animateKey} className="animate-calendar-slide px-5 py-4">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-0.5">
          <button
            type="button"
            className={NAV_BTN}
            onClick={() => onViewChange(new Date(year - 1, month, 1))}
            aria-label="上一年"
          >
            <ChevronsLeft size={15} />
          </button>
          <button
            type="button"
            className={NAV_BTN}
            onClick={() => onViewChange(addMonths(viewDate, -1))}
            aria-label="上个月"
          >
            <ChevronLeft size={15} />
          </button>
        </div>
        <span className="text-[13px] font-semibold tracking-tight text-text-primary">
          {year} 年 {month + 1} 月
        </span>
        <div className="flex items-center gap-0.5">
          <button
            type="button"
            className={NAV_BTN}
            onClick={() => onViewChange(addMonths(viewDate, 1))}
            aria-label="下个月"
          >
            <ChevronRight size={15} />
          </button>
          <button
            type="button"
            className={NAV_BTN}
            onClick={() => onViewChange(new Date(year + 1, month, 1))}
            aria-label="下一年"
          >
            <ChevronsRight size={15} />
          </button>
        </div>
      </div>
      <div className="mb-2 grid grid-cols-7 gap-1">
        {DATE_PICKER_WEEKDAY_LABELS.map((w) => (
          <div
            key={w}
            className="flex h-9 items-center justify-center text-[11px] font-medium uppercase tracking-wider text-text-tertiary"
          >
            {w}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {days.map((day, i) => {
          if (!day) return <div key={`empty-${i}`} className="h-9" />;
          const isSelected = selected && isSameDay(day, selected);
          const inRange =
            rangeStart &&
            rangeEnd &&
            isBetween(day, rangeStart, rangeEnd);
          const isStart = rangeStart && isSameDay(day, rangeStart);
          const isEnd = rangeEnd && isSameDay(day, rangeEnd);
          const isToday = isSameDay(day, today);
          const isEndpoint = isSelected || isStart || isEnd;
          return (
            <button
              key={day.toISOString()}
              type="button"
              onClick={() => onSelect(day)}
              className={cn(
                CELL_BASE,
                isEndpoint &&
                  "scale-100 bg-brand font-medium text-white shadow-selected hover:scale-100 hover:bg-brand",
                inRange &&
                  !isEndpoint &&
                  "scale-100 rounded-none bg-brand-muted text-brand hover:scale-100",
                isToday &&
                  !isEndpoint &&
                  !inRange &&
                  "font-semibold text-brand",
                !isEndpoint && !inRange && "text-text-primary"
              )}
            >
              {day.getDate()}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function MonthGrid({
  year,
  selectedMonth,
  onSelect,
}: {
  year: number;
  selectedMonth: number | null;
  onSelect: (month: number) => void;
}) {
  return (
    <div className="grid grid-cols-3 gap-2 p-5">
      {DATE_PICKER_MONTH_LABELS.map((label, i) => (
        <button
          key={label}
          type="button"
          onClick={() => onSelect(i)}
          className={cn(
            "h-10 rounded-cell text-sm transition-all duration-base hover:scale-[1.02] hover:bg-brand-hover active:scale-100",
            selectedMonth === i
              ? "bg-brand font-medium text-white shadow-selected hover:scale-100 hover:bg-brand"
              : "text-text-primary"
          )}
        >
          {label}
        </button>
      ))}
    </div>
  );
}

function YearGrid({
  startYear,
  selectedYear,
  onSelect,
  onRangeChange,
}: {
  startYear: number;
  selectedYear: number | null;
  onSelect: (y: number) => void;
  onRangeChange: (start: number) => void;
}) {
  const years = Array.from({ length: 12 }, (_, i) => startYear + i);
  return (
    <div className="p-5">
      <div className="mb-4 flex items-center justify-between">
        <button
          type="button"
          className={NAV_BTN}
          onClick={() => onRangeChange(startYear - 12)}
        >
          <ChevronLeft size={15} />
        </button>
        <span className="text-[13px] font-semibold tracking-tight text-text-primary">
          {startYear} – {startYear + 11}
        </span>
        <button
          type="button"
          className={NAV_BTN}
          onClick={() => onRangeChange(startYear + 12)}
        >
          <ChevronRight size={15} />
        </button>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {years.map((y) => (
          <button
            key={y}
            type="button"
            onClick={() => onSelect(y)}
            className={cn(
              "h-10 rounded-cell text-sm transition-all duration-base hover:scale-[1.02] hover:bg-brand-hover active:scale-100",
              selectedYear === y
                ? "bg-brand font-medium text-white shadow-selected hover:scale-100 hover:bg-brand"
                : "text-text-primary"
            )}
          >
            {y}
          </button>
        ))}
      </div>
    </div>
  );
}

function QuarterGrid({
  year,
  selectedQuarter,
  onSelect,
}: {
  year: number;
  selectedQuarter: number | null;
  onSelect: (q: number) => void;
}) {
  return (
    <div className="grid grid-cols-2 gap-2 p-5">
      {DATE_PICKER_QUARTER_LABELS.map((q, i) => (
        <button
          key={q}
          type="button"
          onClick={() => onSelect(i)}
          className={cn(
            "h-11 rounded-cell text-sm font-medium transition-all duration-base hover:scale-[1.02] hover:bg-brand-hover active:scale-100",
            selectedQuarter === i
              ? "bg-brand text-white shadow-selected hover:scale-100 hover:bg-brand"
              : "text-text-primary"
          )}
        >
          {q}
        </button>
      ))}
    </div>
  );
}

function TimeSelector({
  value,
  onChange,
}: {
  value: Date;
  onChange: (d: Date) => void;
}) {
  const pad = (n: number) => String(n).padStart(2, "0");
  const update = (h: number, m: number, s: number) => {
    const next = new Date(value);
    next.setHours(h, m, s);
    onChange(next);
  };
  return (
    <div className="flex items-center gap-2 border-t border-border/80 px-5 py-3">
      <Clock size={14} className="text-text-tertiary" />
      <input
        type="number"
        min={0}
        max={23}
        value={value.getHours()}
        onChange={(e) =>
          update(Number(e.target.value), value.getMinutes(), value.getSeconds())
        }
        className="w-11 rounded-input border border-border/80 bg-surface-input px-1 text-center text-sm shadow-input transition-colors duration-base focus:border-border-focus focus:outline-none focus:ring-2 focus:ring-brand/20"
      />
      <span className="text-text-tertiary">:</span>
      <input
        type="number"
        min={0}
        max={59}
        value={value.getMinutes()}
        onChange={(e) =>
          update(value.getHours(), Number(e.target.value), value.getSeconds())
        }
        className="w-11 rounded-input border border-border/80 bg-surface-input px-1 text-center text-sm shadow-input transition-colors duration-base focus:border-border-focus focus:outline-none focus:ring-2 focus:ring-brand/20"
      />
      <span className="text-text-tertiary">:</span>
      <input
        type="number"
        min={0}
        max={59}
        value={value.getSeconds()}
        onChange={(e) =>
          update(value.getHours(), value.getMinutes(), Number(e.target.value))
        }
        className="w-11 rounded-input border border-border/80 bg-surface-input px-1 text-center text-sm shadow-input transition-colors duration-base focus:border-border-focus focus:outline-none focus:ring-2 focus:ring-brand/20"
      />
      <span className="ml-1 text-xs text-text-tertiary">
        {pad(value.getHours())}:{pad(value.getMinutes())}:{pad(value.getSeconds())}
      </span>
    </div>
  );
}

export function DatePicker({
  value: controlledValue,
  defaultValue = null,
  onChange,
  mode = "date",
  size = "md",
  range = false,
  showTime = false,
  shortcuts = false,
  allowClear = true,
  disabled = false,
  placeholder = "请选择日期",
  className,
  showcaseState,
}: DatePickerProps) {
  const id = useId();
  const isShowcase = showcaseState !== undefined;
  const containerRef = useRef<HTMLDivElement>(null);
  const sizeSpec = datePickerSizeSpecs[size];
  const panelRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [panelPos, setPanelPos] = useState<{ x: number; y: number } | null>(null);
  const [uncontrolled, setUncontrolled] = useState<DatePickerValue>(defaultValue);
  const value = controlledValue !== undefined ? controlledValue : uncontrolled;

  const [open, setOpen] = useState(false);
  const [closing, setClosing] = useState(false);
  const [focused, setFocused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [viewDate, setViewDate] = useState(new Date());
  const [yearRangeStart, setYearRangeStart] = useState(
    () => Math.floor(new Date().getFullYear() / 12) * 12
  );
  const [activeShortcut, setActiveShortcut] = useState<string | null>(null);
  const [calendarKey, setCalendarKey] = useState(0);
  const [pickingEnd, setPickingEnd] = useState(false);

  const setValue = useCallback(
    (next: DatePickerValue) => {
      if (controlledValue === undefined) setUncontrolled(next);
      onChange?.(next);
    },
    [controlledValue, onChange]
  );

  const closePanel = useCallback(() => {
    setClosing(true);
    setTimeout(() => {
      setOpen(false);
      setClosing(false);
    }, 180);
  }, []);

  const openPanel = useCallback(() => {
    if (disabled || showcaseState === "disabled" || isShowcase) return;
    setOpen(true);
    setCalendarKey((k) => k + 1);
  }, [disabled, showcaseState, isShowcase]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useLayoutEffect(() => {
    if (!open && !closing) return;

    const updatePosition = () => {
      const triggerEl = containerRef.current;
      const panelEl = panelRef.current;
      if (!triggerEl || !panelEl) return;

      const triggerRect = triggerEl.getBoundingClientRect();
      setPanelPos(
        computeDatePickerPanelPosition(
          triggerRect,
          { width: panelEl.offsetWidth, height: panelEl.offsetHeight },
          { width: window.innerWidth, height: window.innerHeight }
        )
      );
    };

    updatePosition();
    requestAnimationFrame(updatePosition);
    window.addEventListener("scroll", updatePosition, true);
    window.addEventListener("resize", updatePosition);
    return () => {
      window.removeEventListener("scroll", updatePosition, true);
      window.removeEventListener("resize", updatePosition);
    };
  }, [open, closing, calendarKey, mode, range, shortcuts, showTime]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const target = e.target as Node;
      if (containerRef.current?.contains(target)) return;
      if (panelRef.current?.contains(target)) return;
      if (open) closePanel();
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open, closePanel]);

  const singleVal = !range && !isRangeValue(value) ? value : null;
  const rangeVal = range ? normalizeRange(value) : null;

  const displayText = useMemo(() => {
    if (range && rangeVal) {
      const [s, e] = rangeVal;
      if (!s && !e) return ["", ""];
      return [s ? formatDate(s, showTime) : "", e ? formatDate(e, showTime) : ""];
    }
    if (singleVal) return formatDate(singleVal, showTime || mode === "datetime");
    return "";
  }, [range, rangeVal, singleVal, showTime, mode]);

  const hasValue = range
    ? !!(rangeVal?.[0] || rangeVal?.[1])
    : !!singleVal;

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isShowcase) return;
    if (range) setValue([null, null]);
    else setValue(null);
    setActiveShortcut(null);
    setPickingEnd(false);
  };

  const handleDaySelect = (day: Date) => {
    if (range && rangeVal) {
      if (!pickingEnd || !rangeVal[0]) {
        setValue([day, null]);
        setPickingEnd(true);
        return;
      }
      const start = rangeVal[0]!;
      const sorted: RangeValue =
        day < start ? [day, start] : [start, day];
      setValue(sorted);
      setPickingEnd(false);
      if (!showTime) closePanel();
      return;
    }
    let next = day;
    if (showTime || mode === "datetime") {
      const base = singleVal ?? new Date();
      next = new Date(day);
      next.setHours(base.getHours(), base.getMinutes(), base.getSeconds());
    }
    setValue(next);
    if (!showTime && mode !== "datetime") closePanel();
  };

  const handleMonthSelect = (m: number) => {
    const d = new Date(viewDate.getFullYear(), m, 1);
    setValue(d);
    closePanel();
  };

  const handleYearSelect = (y: number) => {
    const d = new Date(y, 0, 1);
    setValue(d);
    closePanel();
  };

  const handleQuarterSelect = (q: number) => {
    const d = new Date(viewDate.getFullYear(), q * 3, 1);
    setValue(d);
    closePanel();
  };

  const handleToday = () => {
    const t = new Date();
    if (range) {
      setValue([t, t]);
    } else {
      setValue(t);
    }
    setViewDate(t);
    closePanel();
  };

  const handleShortcut = (key: string) => {
    const r = getShortcutRange(key);
    setValue(r);
    setActiveShortcut(key);
    if (r[0]) setViewDate(r[0]);
    closePanel();
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (disabled) return;
    if (e.key === "Escape") {
      closePanel();
      return;
    }
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      if (!open) openPanel();
      return;
    }
    if (!open) return;
    const step = e.shiftKey ? 7 : 1;
    let base = viewDate;
    if (singleVal) base = singleVal;
    else if (rangeVal?.[0]) base = rangeVal[0];
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      const d = new Date(base);
      d.setDate(d.getDate() - step);
      setViewDate(d);
      if (e.ctrlKey || e.metaKey) handleDaySelect(d);
    }
    if (e.key === "ArrowRight") {
      e.preventDefault();
      const d = new Date(base);
      d.setDate(d.getDate() + step);
      setViewDate(d);
      if (e.ctrlKey || e.metaKey) handleDaySelect(d);
    }
  };

  const isDisabled = disabled || showcaseState === "disabled";
  const forceFocus = showcaseState === "focus" || focused;
  const forceHover = showcaseState === "hover" || hovered;
  const forceSelected = showcaseState === "selected" || hasValue;

  const placeholders = Array.isArray(placeholder)
    ? placeholder
    : [placeholder, placeholder];

  const inputClasses = cn(
    "flex w-full items-center border bg-surface-input shadow-input transition-all duration-base ease-out",
    SIZE_GAP[size],
    isDisabled &&
      "cursor-not-allowed border-transparent bg-surface-card-soft text-text-disabled shadow-none",
    !isDisabled && forceFocus && "focus-ring border-[color:var(--datepicker-border-focus)]",
    !isDisabled &&
      !forceFocus &&
      forceHover &&
      "border-[color:var(--datepicker-border-focus)] shadow-input-hover",
    !isDisabled &&
      !forceFocus &&
      !forceHover &&
      "border-[color:var(--datepicker-border-default)]",
    !isDisabled && forceSelected && !forceFocus && "text-text-primary"
  );

  const inputStyle = {
    minHeight: sizeSpec.height,
    paddingLeft: sizeSpec.paddingX,
    paddingRight: sizeSpec.paddingX,
    borderRadius: "var(--datepicker-radius)",
  };

  const iconSize = sizeSpec.iconSize;

  const renderTrigger = () => {
    if (range) {
      const texts = displayText as string[];
      return (
        <div
          className={cn(inputClasses, "cursor-pointer", className)}
          style={inputStyle}
          onClick={() => !isDisabled && !isShowcase && (open ? closePanel() : openPanel())}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          tabIndex={isDisabled ? -1 : 0}
          role="combobox"
          aria-expanded={open}
          aria-haspopup="dialog"
          aria-disabled={isDisabled}
          onKeyDown={handleKeyDown}
        >
          <input
            readOnly
            disabled={isDisabled}
            value={texts[0]}
            placeholder={placeholders[0]}
            className="min-w-0 flex-1 cursor-pointer bg-transparent outline-none placeholder:text-text-placeholder disabled:cursor-not-allowed"
          />
          <span className="px-0.5 text-[11px] text-text-tertiary">→</span>
          <input
            readOnly
            disabled={isDisabled}
            value={texts[1]}
            placeholder={placeholders[1]}
            className="min-w-0 flex-1 cursor-pointer bg-transparent outline-none placeholder:text-text-placeholder disabled:cursor-not-allowed"
          />
          <div className="flex shrink-0 items-center gap-0.5">
            {allowClear && hasValue && !isDisabled && (
              <button
                type="button"
                onClick={handleClear}
                className="rounded-input p-0.5 text-text-tertiary transition-all duration-fast hover:bg-brand-hover hover:text-text-secondary"
                aria-label="清空"
              >
                <X size={iconSize} />
              </button>
            )}
            <Calendar size={iconSize} className="shrink-0 text-text-tertiary transition-colors duration-base" />
          </div>
        </div>
      );
    }

    return (
        <div
          className={cn(inputClasses, "cursor-pointer", className)}
          style={inputStyle}
          onClick={() => !isDisabled && !isShowcase && (open ? closePanel() : openPanel())}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <input
            id={id}
            readOnly
            disabled={isDisabled}
            value={displayText as string}
            placeholder={
              typeof placeholder === "string" ? placeholder : placeholders[0]
            }
            className="min-w-0 flex-1 cursor-pointer bg-transparent outline-none placeholder:text-text-placeholder disabled:cursor-not-allowed"
            onFocus={() => {
              setFocused(true);
              if (!isShowcase) openPanel();
            }}
            onBlur={() => setFocused(false)}
            tabIndex={isDisabled ? -1 : 0}
            role="combobox"
            aria-expanded={open}
            aria-haspopup="dialog"
            aria-disabled={isDisabled}
            onKeyDown={handleKeyDown}
          />
          <div className="flex shrink-0 items-center gap-0.5">
            {allowClear && hasValue && !isDisabled && (
              <button
                type="button"
                onClick={handleClear}
                className="rounded-input p-0.5 text-text-tertiary transition-all duration-fast hover:bg-brand-hover hover:text-text-secondary"
                aria-label="清空"
              >
                <X size={iconSize} />
              </button>
            )}
            <Calendar size={iconSize} className="shrink-0 text-text-tertiary transition-colors duration-base" />
          </div>
        </div>
    );
  };

  const panelContent = () => {
    if (mode === "month") {
      return (
        <MonthGrid
          year={viewDate.getFullYear()}
          selectedMonth={singleVal?.getMonth() ?? null}
          onSelect={handleMonthSelect}
        />
      );
    }
    if (mode === "year") {
      return (
        <YearGrid
          startYear={yearRangeStart}
          selectedYear={singleVal?.getFullYear() ?? null}
          onSelect={handleYearSelect}
          onRangeChange={setYearRangeStart}
        />
      );
    }
    if (mode === "quarter") {
      return (
        <QuarterGrid
          year={viewDate.getFullYear()}
          selectedQuarter={
            singleVal ? Math.floor(singleVal.getMonth() / 3) : null
          }
          onSelect={handleQuarterSelect}
        />
      );
    }

    if (range && shortcuts) {
      return (
        <div className="flex">
          <div className="w-[132px] shrink-0 border-r border-border/80 py-3 pl-2 pr-1">
            {DATE_PICKER_SHORTCUTS.map((s) => (
              <button
                key={s.key}
                type="button"
                onClick={() => handleShortcut(s.key)}
                className={cn(
                  "mb-0.5 w-full rounded-button px-3 py-2 text-left text-[13px] transition-all duration-base",
                  activeShortcut === s.key
                    ? "bg-brand-muted font-medium text-brand"
                    : "text-text-secondary hover:bg-brand-hover hover:text-text-primary"
                )}
              >
                {s.label}
              </button>
            ))}
          </div>
          <div className="flex-1">
            <CalendarGrid
              viewDate={viewDate}
              rangeStart={rangeVal?.[0]}
              rangeEnd={rangeVal?.[1]}
              onSelect={handleDaySelect}
              onViewChange={(d) => {
                setViewDate(d);
                setCalendarKey((k) => k + 1);
              }}
              animateKey={calendarKey}
            />
          </div>
        </div>
      );
    }

    if (range) {
      return (
        <div className="flex items-stretch gap-1 p-2">
          <CalendarGrid
            viewDate={viewDate}
            rangeStart={rangeVal?.[0]}
            rangeEnd={rangeVal?.[1]}
            onSelect={handleDaySelect}
            onViewChange={(d) => {
              setViewDate(d);
              setCalendarKey((k) => k + 1);
            }}
            animateKey={calendarKey}
          />
          <div className="my-5 w-px shrink-0 bg-border/60" aria-hidden />
          <CalendarGrid
            viewDate={addMonths(viewDate, 1)}
            rangeStart={rangeVal?.[0]}
            rangeEnd={rangeVal?.[1]}
            onSelect={handleDaySelect}
            onViewChange={(d) => {
              setViewDate(d);
              setCalendarKey((k) => k + 1);
            }}
            animateKey={calendarKey + 1}
          />
        </div>
      );
    }

    return (
      <>
        <CalendarGrid
          viewDate={viewDate}
          selected={singleVal}
          onSelect={handleDaySelect}
          onViewChange={(d) => {
            setViewDate(d);
            setCalendarKey((k) => k + 1);
          }}
          animateKey={calendarKey}
        />
        {(showTime || mode === "datetime") && singleVal && (
          <TimeSelector
            value={singleVal}
            onChange={(d) => setValue(d)}
          />
        )}
      </>
    );
  };

  const panelStyle: CSSProperties = {
    left: panelPos?.x ?? -9999,
    top: panelPos?.y ?? -9999,
    visibility: panelPos ? "visible" : "hidden",
  };

  const panelNode =
    open || closing ? (
      range ? (
        <Panel
          open={open}
          closing={closing}
          panelRef={panelRef}
          style={panelStyle}
          className={cn(shortcuts ? "min-w-[440px]" : "min-w-[620px]")}
        >
          {panelContent()}
          <div className="flex items-center justify-between border-t border-border/80 px-5 py-3">
            <button
              type="button"
              className="text-[13px] font-medium text-brand transition-colors duration-base hover:text-brand/80"
              onClick={() => setValue([new Date(), new Date()])}
            >
              此刻
            </button>
            <button type="button" className={PRIMARY_BTN} onClick={closePanel}>
              确定
            </button>
          </div>
        </Panel>
      ) : (
        <Panel
          open={open}
          closing={closing}
          panelRef={panelRef}
          style={panelStyle}
          className={mode === "month" || mode === "year" ? "min-w-[280px]" : ""}
        >
          {panelContent()}
          {mode === "date" && !showTime && (
            <div className="border-t border-border/80 py-3 text-center">
              <button
                type="button"
                className="text-[13px] font-medium text-brand transition-colors duration-base hover:text-brand/80"
                onClick={handleToday}
              >
                今天
              </button>
            </div>
          )}
          {(showTime || mode === "datetime") && (
            <div className="flex items-center justify-between border-t border-border/80 px-5 py-3">
              <button
                type="button"
                className="text-[13px] font-medium text-brand transition-colors duration-base hover:text-brand/80"
                onClick={() => {
                  const n = new Date();
                  setValue(n);
                }}
              >
                此刻
              </button>
              <button type="button" className={PRIMARY_BTN} onClick={closePanel}>
                确定
              </button>
            </div>
          )}
        </Panel>
      )
    ) : null;

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative inline-block w-full",
        range && shortcuts ? "max-w-[400px]" : range ? "max-w-[420px]" : "max-w-[320px]"
      )}
    >
      {renderTrigger()}
      {mounted && panelNode ? createPortal(panelNode, document.body) : null}
    </div>
  );
}

/** Static showcase row — displays state without full popover interaction */
export function DatePickerShowcase({
  size = "md",
  range = false,
  state,
  value,
  placeholder,
}: {
  size?: DatePickerSize;
  range?: boolean;
  state: "default" | "hover" | "focus" | "selected" | "disabled";
  value?: DatePickerValue;
  placeholder?: string | [string, string];
}) {
  const demoValue =
    value ??
    (state === "selected"
      ? range
        ? ([new Date(2026, 4, 1), new Date(2026, 4, 20)] as RangeValue)
        : new Date(2026, 4, 15)
      : range
        ? ([null, null] as RangeValue)
        : null);

  return (
    <DatePicker
      size={size}
      range={range}
      value={demoValue}
      showcaseState={state}
      disabled={state === "disabled"}
      placeholder={placeholder}
      allowClear={state === "selected"}
    />
  );
}
