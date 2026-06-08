"use client";

import { Check, Minus } from "lucide-react";
import {
  createContext,
  useCallback,
  useContext,
  useId,
  useMemo,
  useState,
  type InputHTMLAttributes,
  type ReactNode,
} from "react";
import {
  checkboxSizeSpecs,
  resolveFontSize,
  type CheckboxSizeKey,
} from "@yd-ds/tokens";
import { cn } from "../lib/utils";

export type CheckboxShowcaseState =
  | "default"
  | "hover"
  | "checked"
  | "indeterminate"
  | "disabled"
  | "disabled-checked";

export type CheckboxDirection = "horizontal" | "vertical";

export interface CheckboxOption {
  label: ReactNode;
  value: string;
  disabled?: boolean;
}

export interface CheckboxGroupProps {
  value?: string[];
  defaultValue?: string[];
  onChange?: (value: string[]) => void;
  direction?: CheckboxDirection;
  disabled?: boolean;
  size?: CheckboxSizeKey;
  options?: CheckboxOption[];
  children?: ReactNode;
  className?: string;
}

export interface CheckboxProps
  extends Omit<
    InputHTMLAttributes<HTMLInputElement>,
    "size" | "type" | "onChange" | "value"
  > {
  checked?: boolean;
  defaultChecked?: boolean;
  indeterminate?: boolean;
  size?: CheckboxSizeKey;
  /** Option id when used inside Checkbox.Group */
  value?: string;
  children?: ReactNode;
  showcaseState?: CheckboxShowcaseState;
  onChange?: (checked: boolean) => void;
}

interface CheckboxGroupContextValue {
  value: string[];
  disabled?: boolean;
  size: CheckboxSizeKey;
  toggle: (optionValue: string, checked: boolean) => void;
}

const CheckboxGroupContext = createContext<CheckboxGroupContextValue | null>(null);

function useCheckboxGroup() {
  return useContext(CheckboxGroupContext);
}

function isShowcaseChecked(state?: CheckboxShowcaseState) {
  return state === "checked" || state === "disabled-checked";
}

function isShowcaseIndeterminate(state?: CheckboxShowcaseState) {
  return state === "indeterminate";
}

function getBoxClassName(
  checked: boolean,
  indeterminate: boolean,
  disabled: boolean,
  showcaseState?: CheckboxShowcaseState
) {
  const isChecked = checked || isShowcaseChecked(showcaseState);
  const isIndeterminate = indeterminate || isShowcaseIndeterminate(showcaseState);
  const isDisabled =
    disabled || showcaseState === "disabled" || showcaseState === "disabled-checked";

  if (isDisabled && !isChecked && !isIndeterminate) {
    return "border-[color:var(--checkbox-color-border-disabled)] bg-[color:var(--checkbox-color-bg-disabled)]";
  }
  if (isDisabled && (isChecked || isIndeterminate)) {
    return cn(
      "border-[color:var(--checkbox-color-border-disabled)] bg-[color:var(--checkbox-color-bg-disabled)]",
      "text-[color:var(--checkbox-color-icon-disabled)] [&_svg]:opacity-90"
    );
  }
  if (showcaseState === "hover" && !isChecked && !isIndeterminate) {
    return "border-[color:var(--checkbox-color-border-hover)] bg-background";
  }
  if (isChecked || isIndeterminate) {
    return "border-[color:var(--checkbox-color-bg-checked)] bg-[color:var(--checkbox-color-bg-checked)] text-white";
  }
  return "border-[color:var(--checkbox-color-border)] bg-background hover:border-[color:var(--checkbox-color-border-hover)]";
}

function CheckboxControl({
  checked,
  indeterminate,
  disabled,
  showcaseState,
  controlSize,
  iconSize,
}: {
  checked: boolean;
  indeterminate: boolean;
  disabled: boolean;
  showcaseState?: CheckboxShowcaseState;
  controlSize: string;
  iconSize: number;
}) {
  const showMinus = indeterminate || isShowcaseIndeterminate(showcaseState);
  const showCheck = !showMinus && (checked || isShowcaseChecked(showcaseState));

  return (
    <span
      className={cn(
        "relative inline-flex shrink-0 items-center justify-center border transition-colors duration-150",
        getBoxClassName(checked, indeterminate, disabled, showcaseState)
      )}
      style={{
        width: controlSize,
        height: controlSize,
        borderRadius: "var(--checkbox-border-radius)",
      }}
      aria-hidden
    >
      {showMinus ? (
        <Minus size={iconSize} strokeWidth={2.5} />
      ) : showCheck ? (
        <Check size={iconSize} strokeWidth={2.5} />
      ) : null}
    </span>
  );
}

export function Checkbox({
  checked: controlledChecked,
  defaultChecked = false,
  indeterminate = false,
  disabled: itemDisabled,
  size = "md",
  children,
  className,
  showcaseState,
  onChange,
  value,
  ...rest
}: CheckboxProps) {
  const group = useCheckboxGroup();
  const resolvedSize = group?.size ?? size;
  const spec = checkboxSizeSpecs[resolvedSize];
  const disabled = itemDisabled || group?.disabled;
  const isShowcase = showcaseState !== undefined;

  const inGroup = group && value !== undefined;
  const groupChecked = inGroup ? group.value.includes(value) : false;

  const [uncontrolledChecked, setUncontrolledChecked] = useState(defaultChecked);
  const isControlled = controlledChecked !== undefined;
  const checked = inGroup ? groupChecked : isControlled ? controlledChecked : uncontrolledChecked;

  const isDisabledVisual =
    Boolean(disabled) ||
    showcaseState === "disabled" ||
    showcaseState === "disabled-checked";

  const labelClass = cn(
    "inline-flex select-none items-center transition-colors duration-150",
    isDisabledVisual
      ? "cursor-not-allowed text-[color:var(--checkbox-color-icon-disabled)]"
      : "cursor-pointer text-foreground",
    className
  );

  const labelStyle = {
    gap: spec.gap,
    fontSize: resolveFontSize(spec.fontSizeKey).fontSize,
  };

  const handleToggle = (next: boolean) => {
    if (disabled) return;
    if (inGroup && value !== undefined) {
      group.toggle(value, next);
      return;
    }
    if (!isControlled) setUncontrolledChecked(next);
    onChange?.(next);
  };

  if (isShowcase) {
    return (
      <span className={labelClass} style={labelStyle} data-showcase>
        <CheckboxControl
          checked={isShowcaseChecked(showcaseState)}
          indeterminate={isShowcaseIndeterminate(showcaseState)}
          disabled={Boolean(
            disabled ||
              showcaseState === "disabled" ||
              showcaseState === "disabled-checked"
          )}
          showcaseState={showcaseState}
          controlSize={spec.control}
          iconSize={spec.icon}
        />
        {children != null && <span>{children}</span>}
      </span>
    );
  }

  return (
    <label className={labelClass} style={labelStyle}>
      <input
        type="checkbox"
        className="sr-only"
        checked={checked}
        disabled={disabled}
        onChange={(e) => handleToggle(e.target.checked)}
        {...rest}
      />
      <CheckboxControl
        checked={checked}
        indeterminate={indeterminate}
        disabled={Boolean(disabled)}
        controlSize={spec.control}
        iconSize={spec.icon}
      />
      {children != null && <span>{children}</span>}
    </label>
  );
}

export function CheckboxGroup({
  value: controlledValue,
  defaultValue = [],
  onChange,
  direction = "horizontal",
  disabled,
  size = "md",
  options,
  children,
  className,
}: CheckboxGroupProps) {
  const [innerValue, setInnerValue] = useState(defaultValue);
  const isControlled = controlledValue !== undefined;
  const value = isControlled ? controlledValue : innerValue;

  const toggle = useCallback(
    (optionValue: string, nextChecked: boolean) => {
      const next = nextChecked
        ? [...value, optionValue]
        : value.filter((v) => v !== optionValue);
      const unique = Array.from(new Set(next));
      if (!isControlled) setInnerValue(unique);
      onChange?.(unique);
    },
    [isControlled, onChange, value]
  );

  const ctx = useMemo<CheckboxGroupContextValue>(
    () => ({
      value,
      disabled,
      size,
      toggle,
    }),
    [value, disabled, size, toggle]
  );

  const layoutClass =
    direction === "vertical"
      ? "flex flex-col items-start gap-3"
      : "flex flex-wrap items-center gap-6";

  return (
    <CheckboxGroupContext.Provider value={ctx}>
      <div className={cn(layoutClass, className)} role="group">
        {options
          ? options.map((option) => (
              <Checkbox
                key={option.value}
                value={option.value}
                disabled={option.disabled}
                size={size}
              >
                {option.label}
              </Checkbox>
            ))
          : children}
      </div>
    </CheckboxGroupContext.Provider>
  );
}

Checkbox.Group = CheckboxGroup;

export function CheckboxShowcase({
  state,
  label = "选项一",
  size = "md",
}: {
  state: CheckboxShowcaseState;
  label?: string;
  size?: CheckboxSizeKey;
}) {
  return (
    <Checkbox showcaseState={state} size={size} value="showcase">
      {label}
    </Checkbox>
  );
}

export const DEFAULT_CHECKBOX_OPTIONS: CheckboxOption[] = [
  { label: "选项一", value: "1" },
  { label: "选项二", value: "2" },
  { label: "选项三", value: "3" },
];
