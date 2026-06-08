"use client";

import {
  createContext,
  useCallback,
  useContext,
  useId,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { radioSizeSpecs, resolveFontSize, type RadioSizeKey } from "@yd-ds/tokens";
import { cn } from "../lib/utils";

export type RadioShowcaseState =
  | "default"
  | "hover"
  | "selected"
  | "disabled"
  | "disabled-selected";
export type RadioDirection = "horizontal" | "vertical";
export type RadioOptionType = "default" | "button";
export type RadioButtonStyle = "outline" | "solid" | "segmented";

export interface RadioOption {
  label: ReactNode;
  value: string;
  disabled?: boolean;
}

export interface RadioGroupProps {
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  name?: string;
  direction?: RadioDirection;
  optionType?: RadioOptionType;
  buttonStyle?: RadioButtonStyle;
  disabled?: boolean;
  size?: RadioSizeKey;
  options?: RadioOption[];
  children?: ReactNode;
  className?: string;
}

export interface RadioProps {
  value?: string;
  children?: ReactNode;
  disabled?: boolean;
  size?: RadioSizeKey;
  className?: string;
  showcaseState?: RadioShowcaseState;
}

interface RadioGroupContextValue {
  name: string;
  value?: string;
  disabled?: boolean;
  size: RadioSizeKey;
  onSelect: (value: string) => void;
}

const RadioGroupContext = createContext<RadioGroupContextValue | null>(null);

function useRadioGroup() {
  return useContext(RadioGroupContext);
}

function isShowcaseChecked(state?: RadioShowcaseState) {
  return state === "selected" || state === "disabled-selected";
}

function getCircleStyles(
  checked: boolean,
  disabled: boolean,
  showcaseState?: RadioShowcaseState
) {
  if (showcaseState === "disabled" || (disabled && !checked)) {
    return cn(
      "border-[color:var(--radio-border-default)] bg-transparent",
      checked &&
        "border-[color:var(--radio-disabled)] bg-[color:var(--radio-disabled)] after:block after:h-1.5 after:w-1.5 after:rounded-full after:bg-white"
    );
  }
  if (showcaseState === "disabled-selected") {
    return cn(
      "border-[color:var(--radio-disabled)] bg-[color:var(--radio-disabled)]",
      "after:block after:h-1.5 after:w-1.5 after:rounded-full after:bg-white"
    );
  }
  if (showcaseState === "hover" && !checked) {
    return "border-[color:var(--radio-border-selected)] bg-transparent";
  }
  if (checked || showcaseState === "selected") {
    return cn(
      "border-[color:var(--radio-border-selected)] bg-[color:var(--radio-bg-selected)]",
      "after:block after:h-1.5 after:w-1.5 after:rounded-full after:bg-white"
    );
  }
  return "border-[color:var(--radio-border-default)] bg-transparent hover:border-[color:var(--radio-border-selected)]";
}

function RadioCircle({
  checked,
  disabled,
  showcaseState,
  controlSize,
}: {
  checked: boolean;
  disabled: boolean;
  showcaseState?: RadioShowcaseState;
  controlSize: string;
}) {
  return (
    <span
      className={cn(
        "relative inline-flex shrink-0 items-center justify-center rounded-full border transition-colors duration-150",
        "after:hidden after:content-['']",
        getCircleStyles(checked, disabled, showcaseState)
      )}
      style={{ width: controlSize, height: controlSize }}
      aria-hidden
    />
  );
}

export function Radio({
  value = "radio",
  children,
  disabled: itemDisabled,
  size = "md",
  className,
  showcaseState,
}: RadioProps) {
  const group = useRadioGroup();
  const resolvedSize = group?.size ?? size;
  const spec = radioSizeSpecs[resolvedSize];
  const disabled = itemDisabled || group?.disabled;
  const checked = group && value ? group.value === value : false;
  const isShowcase = showcaseState !== undefined;
  const displayChecked = isShowcase ? isShowcaseChecked(showcaseState) : checked;

  const labelClass = cn(
    "inline-flex cursor-pointer select-none items-center transition-colors duration-150 text-foreground",
    (disabled || showcaseState === "disabled" || showcaseState === "disabled-selected") &&
      "cursor-not-allowed text-[color:var(--radio-disabled)]",
    className
  );

  const labelStyle = {
    gap: spec.gap,
    fontSize: resolveFontSize(
      resolvedSize === "sm" ? "xs" : resolvedSize === "lg" ? "base" : "sm"
    ).fontSize,
  };

  if (isShowcase || !group) {
    return (
      <span className={labelClass} style={labelStyle} data-showcase>
        <RadioCircle
          checked={displayChecked}
          disabled={Boolean(
            disabled ||
              showcaseState === "disabled" ||
              showcaseState === "disabled-selected"
          )}
          showcaseState={showcaseState}
          controlSize={spec.control}
        />
        {children != null && <span>{children}</span>}
      </span>
    );
  }

  return (
    <label className={labelClass} style={labelStyle}>
      <input
        type="radio"
        name={group.name}
        value={value}
        checked={checked}
        disabled={disabled}
        onChange={() => group.onSelect(value)}
        className="sr-only"
      />
      <RadioCircle
        checked={checked}
        disabled={Boolean(disabled)}
        controlSize={spec.control}
      />
      {children != null && <span>{children}</span>}
    </label>
  );
}

function RadioButtonSegment({
  option,
  index,
  total,
  checked,
  disabled,
  buttonStyle,
  onSelect,
}: {
  option: RadioOption;
  index: number;
  total: number;
  checked: boolean;
  disabled: boolean;
  buttonStyle: RadioButtonStyle;
  onSelect: () => void;
}) {
  const isFirst = index === 0;
  const isLast = index === total - 1;
  const itemDisabled = disabled || option.disabled;

  const segmentClass = cn(
    "relative inline-flex min-h-8 items-center justify-center px-4 text-sm font-medium transition-colors duration-150",
    buttonStyle !== "segmented" && "border border-border bg-card",
    buttonStyle !== "segmented" && !isFirst && "-ml-px",
    buttonStyle !== "segmented" && isFirst && "rounded-l-md",
    buttonStyle !== "segmented" && isLast && "rounded-r-md",
    buttonStyle === "segmented" && "rounded-sm px-5 py-1.5",
    itemDisabled && "cursor-not-allowed opacity-60"
  );

  const stateClass =
    buttonStyle === "solid"
      ? checked
        ? "z-[1] border-[color:var(--radio-border-selected)] bg-[color:var(--radio-bg-selected)] text-white"
        : "text-foreground hover:text-[color:var(--radio-border-selected)]"
      : buttonStyle === "segmented"
        ? checked
          ? "bg-card text-[color:var(--radio-border-selected)] shadow-sm"
          : "text-foreground hover:text-[color:var(--radio-border-selected)]"
        : checked
          ? "z-[1] border-[color:var(--radio-border-selected)] text-[color:var(--radio-border-selected)]"
          : "text-foreground hover:text-[color:var(--radio-border-selected)]";

  return (
    <button
      type="button"
      role="radio"
      aria-checked={checked}
      disabled={itemDisabled}
      onClick={onSelect}
      className={cn(segmentClass, stateClass)}
    >
      {option.label}
    </button>
  );
}

function RadioButtonGroupShowcase({
  options,
  value,
  buttonStyle,
}: {
  options: RadioOption[];
  value: string;
  buttonStyle: RadioButtonStyle;
}) {
  const wrapperClass =
    buttonStyle === "segmented"
      ? "inline-flex rounded-md bg-[color:var(--radio-segmented-track)] p-1"
      : "inline-flex";

  return (
    <div className={wrapperClass} role="radiogroup">
      {options.map((option, index) => (
        <RadioButtonSegment
          key={option.value}
          option={option}
          index={index}
          total={options.length}
          checked={option.value === value}
          disabled={Boolean(option.disabled)}
          buttonStyle={buttonStyle}
          onSelect={() => {}}
        />
      ))}
    </div>
  );
}

export function RadioGroup({
  value: controlledValue,
  defaultValue = "",
  onChange,
  name,
  direction = "horizontal",
  optionType = "default",
  buttonStyle = "outline",
  disabled,
  size = "md",
  options,
  children,
  className,
}: RadioGroupProps) {
  const autoName = useId();
  const groupName = name ?? autoName.replace(/:/g, "");
  const [innerValue, setInnerValue] = useState(defaultValue);
  const isControlled = controlledValue !== undefined;
  const value = isControlled ? controlledValue : innerValue;

  const handleSelect = useCallback(
    (next: string) => {
      if (!isControlled) setInnerValue(next);
      onChange?.(next);
    },
    [isControlled, onChange]
  );

  const ctx = useMemo<RadioGroupContextValue>(
    () => ({
      name: groupName,
      value,
      disabled,
      size,
      onSelect: handleSelect,
    }),
    [groupName, value, disabled, size, handleSelect]
  );

  if (optionType === "button" && options?.length) {
    const wrapperClass =
      buttonStyle === "segmented"
        ? "inline-flex rounded-md bg-[color:var(--radio-segmented-track)] p-1"
        : "inline-flex";

    return (
      <div className={cn(wrapperClass, className)} role="radiogroup">
        {options.map((option, index) => (
          <RadioButtonSegment
            key={option.value}
            option={option}
            index={index}
            total={options.length}
            checked={value === option.value}
            disabled={Boolean(disabled)}
            buttonStyle={buttonStyle}
            onSelect={() => !option.disabled && handleSelect(option.value)}
          />
        ))}
      </div>
    );
  }

  const layoutClass =
    direction === "vertical"
      ? "flex flex-col items-start gap-3"
      : "flex flex-wrap items-center gap-6";

  return (
    <RadioGroupContext.Provider value={ctx}>
      <div className={cn(layoutClass, className)} role="radiogroup">
        {options
          ? options.map((option) => (
              <Radio
                key={option.value}
                value={option.value}
                disabled={option.disabled}
                size={size}
              >
                {option.label}
              </Radio>
            ))
          : children}
      </div>
    </RadioGroupContext.Provider>
  );
}

Radio.Group = RadioGroup;

export function RadioShowcase({
  state,
  label = "选项一",
  size = "md",
}: {
  state: RadioShowcaseState;
  label?: string;
  size?: RadioSizeKey;
}) {
  return (
    <Radio value="showcase" showcaseState={state} size={size}>
      {label}
    </Radio>
  );
}

export function RadioGroupShowcase({
  buttonStyle = "outline",
  value = "1",
  options = DEFAULT_RADIO_OPTIONS,
}: {
  buttonStyle?: RadioButtonStyle;
  value?: string;
  options?: RadioOption[];
}) {
  return (
    <RadioButtonGroupShowcase
      options={options}
      value={value}
      buttonStyle={buttonStyle}
    />
  );
}

export const DEFAULT_RADIO_OPTIONS: RadioOption[] = [
  { label: "选项一", value: "1" },
  { label: "选项二", value: "2" },
  { label: "选项三", value: "3" },
];
