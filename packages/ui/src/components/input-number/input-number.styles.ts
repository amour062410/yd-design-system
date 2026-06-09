import { inputNumberTokens } from "@yd-ds/tokens";
import { cn } from "../../lib/utils";
import type { InputNumberSize, InputNumberStatus } from "./input-number.types";

export const inputNumberCssVars: Record<string, string> = {
  "--input-number-height-sm": inputNumberTokens["input-number-height-sm"],
  "--input-number-height-md": inputNumberTokens["input-number-height-md"],
  "--input-number-height-lg": inputNumberTokens["input-number-height-lg"],
  "--input-number-border-default": inputNumberTokens["input-number-border-default"],
  "--input-number-border-focus": inputNumberTokens["input-number-border-focus"],
  "--input-number-border-error": inputNumberTokens["input-number-border-error"],
  "--input-number-border-warning": inputNumberTokens["input-number-border-warning"],
  "--input-number-bg": inputNumberTokens["input-number-bg"],
  "--input-number-bg-disabled": inputNumberTokens["input-number-bg-disabled"],
  "--input-number-text": inputNumberTokens["input-number-text"],
  "--input-number-text-error": inputNumberTokens["input-number-text-error"],
  "--input-number-text-warning": inputNumberTokens["input-number-text-warning"],
  "--input-number-text-disabled": inputNumberTokens["input-number-text-disabled"],
  "--input-number-control-bg-hover": inputNumberTokens["input-number-control-bg-hover"],
  "--input-number-control-bg-disabled": inputNumberTokens["input-number-control-bg-disabled"],
  "--input-number-control-width-sm": inputNumberTokens["input-number-control-width-sm"],
  "--input-number-control-width-md": inputNumberTokens["input-number-control-width-md"],
  "--input-number-control-width-lg": inputNumberTokens["input-number-control-width-lg"],
  "--input-number-radius": inputNumberTokens["input-number-radius"],
  "--input-number-font-size-sm": inputNumberTokens["input-number-font-size-sm"],
  "--input-number-font-size-md": inputNumberTokens["input-number-font-size-md"],
  "--input-number-font-size-lg": inputNumberTokens["input-number-font-size-lg"],
  "--input-number-unit-color": inputNumberTokens["input-number-unit-color"],
  "--input-number-unit-font-size": inputNumberTokens["input-number-unit-font-size"],
  "--input-number-unit-gap": inputNumberTokens["input-number-unit-gap"],
};

const sizeClassMap: Record<InputNumberSize, string> = {
  small:
    "h-[var(--input-number-height-sm,28px)] text-[length:var(--input-number-font-size-sm,13px)]",
  default:
    "h-[var(--input-number-height-md,32px)] text-[length:var(--input-number-font-size-md,14px)]",
  large:
    "h-[var(--input-number-height-lg,36px)] text-[length:var(--input-number-font-size-lg,16px)]",
};

const controlWidthMap: Record<InputNumberSize, string> = {
  small: "w-[var(--input-number-control-width-sm,24px)]",
  default: "w-[var(--input-number-control-width-md,28px)]",
  large: "w-[var(--input-number-control-width-lg,32px)]",
};

function getTextColorClass(status?: InputNumberStatus, disabled?: boolean) {
  if (disabled) return "text-[color:var(--input-number-text-disabled,rgba(0,0,0,0.25))]";
  if (status === "error") return "text-[color:var(--input-number-text-error,#ff4d4f)]";
  if (status === "warning") return "text-[color:var(--input-number-text-warning,#faad14)]";
  return "text-[color:var(--input-number-text,#181818)]";
}

export function getInputNumberRootClass({
  size = "default",
  status,
  disabled,
  focused,
  className,
}: {
  size?: InputNumberSize;
  status?: InputNumberStatus;
  disabled?: boolean;
  focused?: boolean;
  className?: string;
}) {
  return cn(
    "inline-flex w-full max-w-[200px] overflow-hidden rounded-[var(--input-number-radius,8px)] border bg-[var(--input-number-bg,#fff)] transition-colors",
    sizeClassMap[size],
    getTextColorClass(status, disabled),
    disabled
      ? "cursor-not-allowed border-[color:var(--input-number-border-default,#d9d9d9)] bg-[var(--input-number-bg-disabled,#f5f5f5)]"
      : status === "error"
        ? "border-[color:var(--input-number-border-error,#ff4d4f)]"
        : status === "warning"
          ? "border-[color:var(--input-number-border-warning,#faad14)]"
          : focused
            ? "border-[color:var(--input-number-border-focus,#165dff)]"
            : "border-[color:var(--input-number-border-default,#d9d9d9)]",
    className
  );
}

export function getInputNumberControlClass(size: InputNumberSize = "default") {
  return cn(
    "flex shrink-0 flex-col self-stretch border-l border-[color:var(--input-number-border-default,#d9d9d9)]",
    controlWidthMap[size]
  );
}

export function getStepButtonClass(stepDisabled?: boolean, fieldDisabled?: boolean) {
  const disabled = stepDisabled || fieldDisabled;
  return cn(
    "flex flex-1 items-center justify-center transition-colors",
    disabled
      ? "cursor-not-allowed bg-[var(--input-number-control-bg-disabled,#d9d9d9)] text-[color:var(--input-number-text-disabled,rgba(0,0,0,0.25))]"
      : "text-[color:var(--input-number-text,#181818)] hover:bg-[var(--input-number-control-bg-hover,#f5f5f5)] active:bg-[#ebebeb]"
  );
}

export function getInputNumberUnitClass() {
  return "shrink-0 pl-[var(--input-number-unit-gap,8px)] text-[length:var(--input-number-unit-font-size,14px)] text-[color:var(--input-number-unit-color,rgba(0,0,0,0.45))]";
}
