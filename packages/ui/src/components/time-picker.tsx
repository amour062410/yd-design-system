"use client";

import {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";
import { Clock, X } from "lucide-react";
import { timePickerSizeSpecs, type TimePickerSizeKey } from "@yd-ds/tokens";
import {
  buildTime,
  formatTime,
  rangeValues,
} from "../lib/time-utils";
import { cn } from "../lib/utils";

export type TimePickerSize = TimePickerSizeKey;
export type TimePickerShowcaseState =
  | "default"
  | "hover"
  | "focus"
  | "selected"
  | "disabled";

type RangeValue = [Date | null, Date | null];
type SingleValue = Date | null;
export type TimePickerValue = SingleValue | RangeValue;

export interface TimePickerProps {
  value?: TimePickerValue;
  defaultValue?: TimePickerValue;
  onChange?: (value: TimePickerValue) => void;
  size?: TimePickerSize;
  range?: boolean;
  showSecond?: boolean;
  allowClear?: boolean;
  disabled?: boolean;
  minuteStep?: number;
  secondStep?: number;
  placeholder?: string | [string, string];
  className?: string;
  showcaseState?: TimePickerShowcaseState;
}

const SIZE_GAP: Record<TimePickerSize, string> = {
  sm: "gap-1.5 text-xs",
  md: "gap-2 text-sm",
  lg: "gap-2 text-sm",
};

const PRIMARY_BTN =
  "btn-primary rounded-button px-4 py-1.5 text-sm font-medium";

function isRangeValue(v: TimePickerValue): v is RangeValue {
  return Array.isArray(v);
}

function normalizeRange(v: TimePickerValue): RangeValue {
  if (isRangeValue(v)) return v;
  return [v, null];
}

function Panel({
  open,
  closing,
  children,
  className,
  panelRef,
}: {
  open: boolean;
  closing: boolean;
  children: React.ReactNode;
  className?: string;
  panelRef?: React.RefObject<HTMLDivElement | null>;
}) {
  if (!open && !closing) return null;
  return (
    <div
      ref={panelRef}
      role="dialog"
      className={cn(
        "absolute left-0 top-[calc(100%+6px)] z-50 overflow-hidden bg-surface-card",
        open && !closing && "animate-panel-in",
        closing && "animate-panel-out",
        className
      )}
      style={{
        borderRadius: "var(--timepicker-radius)",
        boxShadow: "var(--timepicker-panel-shadow)",
      }}
    >
      {children}
    </div>
  );
}

function TimeColumn({
  label,
  items,
  value,
  onSelect,
  disabled,
}: {
  label: string;
  items: number[];
  value: number;
  onSelect: (v: number) => void;
  disabled?: boolean;
}) {
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = listRef.current?.querySelector(`[data-value="${value}"]`);
    el?.scrollIntoView({ block: "center" });
  }, [value, items.length]);

  return (
    <div className="flex min-w-[72px] flex-1 flex-col">
      <div className="border-b border-border/80 py-2 text-center text-[11px] font-medium uppercase tracking-wider text-text-tertiary">
        {label}
      </div>
      <div
        ref={listRef}
        className="max-h-[200px] overflow-y-auto px-1 py-2"
      >
        {items.map((item) => {
          const selected = item === value;
          return (
            <button
              key={item}
              type="button"
              data-value={item}
              disabled={disabled}
              onClick={() => onSelect(item)}
              className={cn(
                "mx-auto mb-0.5 flex h-8 w-10 items-center justify-center rounded-cell text-[13px] transition-all duration-base",
                selected
                  ? "bg-brand font-medium text-white shadow-selected hover:bg-brand"
                  : "text-text-primary hover:bg-[color:var(--timepicker-cell-hover)]"
              )}
            >
              {String(item).padStart(2, "0")}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function TimePanelBody({
  value,
  showSecond,
  minuteStep,
  secondStep,
  onChange,
  disabled,
}: {
  value: Date;
  showSecond: boolean;
  minuteStep: number;
  secondStep: number;
  onChange: (d: Date) => void;
  disabled?: boolean;
}) {
  const hours = rangeValues(0, 23);
  const minutes = rangeValues(0, 59, minuteStep);
  const seconds = rangeValues(0, 59, secondStep);

  const update = (h: number, m: number, s: number) => {
    onChange(buildTime(h, m, s));
  };

  return (
    <div className="flex divide-x divide-border/80">
      <TimeColumn
        label="时"
        items={hours}
        value={value.getHours()}
        onSelect={(h) => update(h, value.getMinutes(), value.getSeconds())}
        disabled={disabled}
      />
      <TimeColumn
        label="分"
        items={minutes}
        value={value.getMinutes()}
        onSelect={(m) => update(value.getHours(), m, value.getSeconds())}
        disabled={disabled}
      />
      {showSecond && (
        <TimeColumn
          label="秒"
          items={seconds}
          value={value.getSeconds()}
          onSelect={(s) => update(value.getHours(), value.getMinutes(), s)}
          disabled={disabled}
        />
      )}
    </div>
  );
}

export function TimePicker({
  value: controlledValue,
  defaultValue = null,
  onChange,
  size = "md",
  range = false,
  showSecond = false,
  allowClear = true,
  disabled = false,
  minuteStep = 1,
  secondStep = 1,
  placeholder = "请选择时间",
  className,
  showcaseState,
}: TimePickerProps) {
  const id = useId();
  const isShowcase = showcaseState !== undefined;
  const containerRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const sizeSpec = timePickerSizeSpecs[size];

  const [uncontrolled, setUncontrolled] = useState<TimePickerValue>(defaultValue);
  const value = controlledValue !== undefined ? controlledValue : uncontrolled;

  const [open, setOpen] = useState(false);
  const [closing, setClosing] = useState(false);
  const [focused, setFocused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [activeRangeIndex, setActiveRangeIndex] = useState<0 | 1>(0);
  const [draftTime, setDraftTime] = useState<Date>(() => buildTime(9, 0, 0));

  const setValue = useCallback(
    (next: TimePickerValue) => {
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
  }, [disabled, showcaseState, isShowcase]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        if (open) closePanel();
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open, closePanel]);

  const singleVal = !range && !isRangeValue(value) ? value : null;
  const rangeVal = useMemo(() => (range ? normalizeRange(value) : null), [range, value]);

  const displayText = useMemo(() => {
    if (range && rangeVal) {
      const [s, e] = rangeVal;
      return [
        s ? formatTime(s, showSecond) : "",
        e ? formatTime(e, showSecond) : "",
      ];
    }
    if (singleVal) return formatTime(singleVal, showSecond);
    return "";
  }, [range, rangeVal, singleVal, showSecond]);

  const hasValue = range
    ? !!(rangeVal?.[0] || rangeVal?.[1])
    : !!singleVal;

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
    !isDisabled &&
      forceFocus &&
      "focus-ring border-[color:var(--timepicker-border-focus)]",
    !isDisabled &&
      !forceFocus &&
      forceHover &&
      "border-[color:var(--timepicker-border-focus)] shadow-input-hover",
    !isDisabled &&
      !forceFocus &&
      !forceHover &&
      "border-[color:var(--timepicker-border-default)]",
    !isDisabled && forceSelected && !forceFocus && "text-text-primary"
  );

  const inputStyle = {
    minHeight: sizeSpec.height,
    paddingLeft: sizeSpec.paddingX,
    paddingRight: sizeSpec.paddingX,
    borderRadius: "var(--timepicker-radius)",
  };

  const iconSize = sizeSpec.iconSize;

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isShowcase) return;
    if (range) setValue([null, null]);
    else setValue(null);
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (isDisabled) return;
    if (e.key === "Escape") {
      closePanel();
      return;
    }
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      if (!open) openPanel();
    }
  };

  const panelBaseTime = useMemo(() => {
    if (range && rangeVal) {
      const t = rangeVal[activeRangeIndex] ?? rangeVal[0] ?? buildTime(9, 0, 0);
      return t ?? buildTime(9, 0, 0);
    }
    return singleVal ?? buildTime(9, 0, 0);
  }, [range, rangeVal, activeRangeIndex, singleVal]);

  useEffect(() => {
    if (open) setDraftTime(panelBaseTime);
  }, [open, panelBaseTime]);

  const applyDraft = () => {
    if (range && rangeVal) {
      const next: RangeValue = [...rangeVal];
      next[activeRangeIndex] = draftTime;
      if (next[0] && next[1] && next[0] > next[1]) {
        next.sort((a, b) => (a!.getTime() > b!.getTime() ? 1 : -1));
      }
      setValue(next);
      if (activeRangeIndex === 0 && !rangeVal[1]) {
        setActiveRangeIndex(1);
        setDraftTime(rangeVal[1] ?? buildTime(18, 0, 0));
        return;
      }
      closePanel();
      return;
    }
    setValue(draftTime);
    closePanel();
  };

  const handleNow = () => {
    const now = new Date();
    now.setMilliseconds(0);
    setDraftTime(now);
    if (!range) {
      setValue(now);
      closePanel();
    }
  };

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
            onFocus={() => setActiveRangeIndex(0)}
            className="min-w-0 flex-1 cursor-pointer bg-transparent outline-none placeholder:text-text-placeholder disabled:cursor-not-allowed"
          />
          <span className="px-0.5 text-[11px] text-text-tertiary">→</span>
          <input
            readOnly
            disabled={isDisabled}
            value={texts[1]}
            placeholder={placeholders[1]}
            onFocus={() => setActiveRangeIndex(1)}
            className="min-w-0 flex-1 cursor-pointer bg-transparent outline-none placeholder:text-text-placeholder disabled:cursor-not-allowed"
          />
          <div className="flex shrink-0 items-center gap-0.5">
            {allowClear && hasValue && !isDisabled && !isShowcase && (
              <button
                type="button"
                onClick={handleClear}
                className="rounded-input p-0.5 text-text-tertiary transition-all duration-fast hover:bg-brand-hover hover:text-text-secondary"
                aria-label="清空"
              >
                <X size={iconSize} />
              </button>
            )}
            <Clock size={iconSize} className="shrink-0 text-text-tertiary" />
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
          {allowClear && hasValue && !isDisabled && !isShowcase && (
            <button
              type="button"
              onClick={handleClear}
              className="rounded-input p-0.5 text-text-tertiary transition-all duration-fast hover:bg-brand-hover hover:text-text-secondary"
              aria-label="清空"
            >
              <X size={iconSize} />
            </button>
          )}
          <Clock size={iconSize} className="shrink-0 text-text-tertiary" />
        </div>
      </div>
    );
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative inline-block w-full",
        range ? "max-w-[420px]" : "max-w-[320px]"
      )}
    >
      {renderTrigger()}
      <Panel
        open={open}
        closing={closing}
        panelRef={panelRef}
        className="min-w-[240px]"
      >
        {range && (
          <div className="flex border-b border-border/80 px-4 py-2 text-[12px]">
            <button
              type="button"
              className={cn(
                "mr-4 font-medium transition-colors",
                activeRangeIndex === 0 ? "text-brand" : "text-text-tertiary"
              )}
              onClick={() => {
                setActiveRangeIndex(0);
                setDraftTime(rangeVal?.[0] ?? buildTime(9, 0, 0));
              }}
            >
              开始时间
            </button>
            <button
              type="button"
              className={cn(
                "font-medium transition-colors",
                activeRangeIndex === 1 ? "text-brand" : "text-text-tertiary"
              )}
              onClick={() => {
                setActiveRangeIndex(1);
                setDraftTime(rangeVal?.[1] ?? buildTime(18, 0, 0));
              }}
            >
              结束时间
            </button>
          </div>
        )}
        <TimePanelBody
          value={draftTime}
          showSecond={showSecond}
          minuteStep={minuteStep}
          secondStep={secondStep}
          onChange={setDraftTime}
        />
        <div className="flex items-center justify-between border-t border-border/80 px-5 py-3">
          <button
            type="button"
            className="text-[13px] font-medium text-brand transition-colors duration-base hover:text-brand/80"
            onClick={handleNow}
          >
            此刻
          </button>
          <button type="button" className={PRIMARY_BTN} onClick={applyDraft}>
            确定
          </button>
        </div>
      </Panel>
    </div>
  );
}

export function TimePickerShowcase({
  size = "md",
  range = false,
  showSecond = false,
  state,
  value,
  placeholder,
}: {
  size?: TimePickerSize;
  range?: boolean;
  showSecond?: boolean;
  state: TimePickerShowcaseState;
  value?: TimePickerValue;
  placeholder?: string | [string, string];
}) {
  const demoValue =
    value ??
    (state === "selected"
      ? range
        ? ([buildTime(9, 0, 0), buildTime(18, 30, 0)] as RangeValue)
        : buildTime(14, 30, showSecond ? 45 : 0)
      : range
        ? ([null, null] as RangeValue)
        : null);

  return (
    <TimePicker
      size={size}
      range={range}
      showSecond={showSecond}
      value={demoValue}
      showcaseState={state}
      disabled={state === "disabled"}
      placeholder={placeholder}
      allowClear={state === "selected"}
    />
  );
}
