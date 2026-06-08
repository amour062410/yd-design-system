"use client";

import { Check, X } from "lucide-react";
import {
  useState,
  type ButtonHTMLAttributes,
  type ReactNode,
} from "react";
import {
  switchSizeSpecs,
  switchVariantSpecs,
  resolveFontSize,
  type SwitchSizeKey,
  type SwitchVariantKey,
} from "@yd-ds/tokens";
import { cn } from "../lib/utils";

export type SwitchShowcaseState =
  | "off"
  | "hover-off"
  | "on"
  | "hover-on"
  | "disabled-off"
  | "disabled-on";

export type SwitchVariant = "default" | SwitchVariantKey;

type SwitchDimensionSpec = {
  height: string;
  width: string;
  thumb: string;
  padding: string;
  trackRadius: string;
  thumbRadius: string;
};

export interface SwitchProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "onChange" | "size"> {
  checked?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
  size?: SwitchSizeKey;
  variant?: SwitchVariant;
  label?: ReactNode;
  children?: ReactNode;
  showcaseState?: SwitchShowcaseState;
  onChange?: (checked: boolean) => void;
}

function isShowcaseOn(state?: SwitchShowcaseState) {
  return state === "on" || state === "hover-on" || state === "disabled-on";
}

function getTrackColor(
  checked: boolean,
  disabled: boolean,
  showcaseState?: SwitchShowcaseState
) {
  const on = checked || isShowcaseOn(showcaseState);
  const isDisabled =
    disabled || showcaseState === "disabled-off" || showcaseState === "disabled-on";

  if (isDisabled) {
    return "var(--switch-color-disabled)";
  }
  if (on) {
    if (showcaseState === "hover-on") {
      return "var(--switch-color-on-hover)";
    }
    return "var(--switch-color-on)";
  }
  if (showcaseState === "hover-off") {
    return "var(--switch-color-off-hover)";
  }
  return "var(--switch-color-off)";
}

function resolveDimensionSpec(
  variant: SwitchVariant,
  size: SwitchSizeKey
): SwitchDimensionSpec {
  if (variant === "default") {
    const spec = switchSizeSpecs[size];
    return {
      ...spec,
      trackRadius: switchVariantSpecs.icon.trackRadius,
      thumbRadius: switchVariantSpecs.icon.thumbRadius,
    };
  }
  return switchVariantSpecs[variant];
}

function SwitchInnerContent({
  variant,
  on,
  disabled,
}: {
  variant: SwitchVariant;
  on: boolean;
  disabled: boolean;
}) {
  const iconClass = cn(
    "pointer-events-none absolute top-1/2 -translate-y-1/2",
    disabled ? "text-[color:var(--switch-color-icon-muted)]" : "text-white/90"
  );

  if (variant === "icon") {
    return on ? (
      <Check size={10} strokeWidth={2.5} className={cn(iconClass, "left-1.5")} />
    ) : (
      <X size={10} strokeWidth={2.5} className={cn(iconClass, "right-1.5")} />
    );
  }

  if (variant === "text") {
    const textClass = cn(
      "pointer-events-none absolute top-1/2 -translate-y-1/2 text-[10px] font-semibold leading-none tracking-wide",
      disabled
        ? "text-[color:var(--switch-color-icon-muted)]"
        : on
          ? "text-white"
          : "text-white/85"
    );
    return on ? (
      <span className={cn(textClass, "left-2")}>ON</span>
    ) : (
      <span className={cn(textClass, "right-1.5")}>OFF</span>
    );
  }

  return null;
}

function SwitchControl({
  checked,
  disabled,
  size,
  variant = "default",
  showcaseState,
}: {
  checked: boolean;
  disabled: boolean;
  size: SwitchSizeKey;
  variant?: SwitchVariant;
  showcaseState?: SwitchShowcaseState;
}) {
  const spec = resolveDimensionSpec(variant, size);
  const on = checked || isShowcaseOn(showcaseState);
  const thumbRounded =
    spec.thumbRadius === "9999px" ||
    spec.thumbRadius === switchVariantSpecs.icon.thumbRadius;

  return (
    <span
      className={cn(
        "relative inline-flex shrink-0 transition-colors duration-150",
        disabled && "opacity-90"
      )}
      style={{
        width: spec.width,
        height: spec.height,
        padding: spec.padding,
        borderRadius: spec.trackRadius,
        backgroundColor: getTrackColor(checked, disabled, showcaseState),
      }}
      aria-hidden
    >
      <SwitchInnerContent variant={variant} on={on} disabled={disabled} />
      <span
        className={cn(
          "relative z-[1] flex h-full w-full items-center transition-[justify-content] duration-150",
          on ? "justify-end" : "justify-start"
        )}
      >
        <span
          className={cn(
            "block shrink-0 bg-[color:var(--switch-thumb-size)] shadow-sm",
            thumbRounded ? "rounded-full" : "rounded-sm"
          )}
          style={{
            width: spec.thumb,
            height: spec.thumb,
            borderRadius: thumbRounded ? undefined : spec.thumbRadius,
          }}
        />
      </span>
    </span>
  );
}

export function Switch({
  checked: controlledChecked,
  defaultChecked = false,
  disabled: itemDisabled,
  size = "md",
  variant = "default",
  label,
  children,
  className,
  showcaseState,
  onChange,
  onClick,
  ...rest
}: SwitchProps) {
  const [uncontrolledChecked, setUncontrolledChecked] = useState(defaultChecked);
  const isControlled = controlledChecked !== undefined;
  const checked = isControlled ? controlledChecked : uncontrolledChecked;
  const isShowcase = showcaseState !== undefined;
  const disabled =
    itemDisabled ||
    showcaseState === "disabled-off" ||
    showcaseState === "disabled-on";

  const labelContent = label ?? children;

  const wrapperClass = cn(
    "inline-flex items-center gap-2",
    disabled ? "cursor-not-allowed" : "cursor-pointer",
    className
  );

  const labelStyle = {
    fontSize: resolveFontSize(size === "sm" ? "xs" : size === "lg" ? "base" : "sm")
      .fontSize,
  };

  const control = (
    <SwitchControl
      checked={checked}
      disabled={Boolean(disabled)}
      size={size}
      variant={variant}
      showcaseState={showcaseState}
    />
  );

  if (isShowcase) {
    return (
      <span className={wrapperClass} data-showcase style={labelStyle}>
        {control}
        {labelContent != null ? (
          <span
            className={cn(disabled && "text-[color:var(--switch-color-disabled)]")}
          >
            {labelContent}
          </span>
        ) : null}
      </span>
    );
  }

  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      className={cn(wrapperClass, "border-0 bg-transparent p-0 outline-none")}
      style={labelStyle}
      onClick={(e) => {
        if (disabled) return;
        const next = !checked;
        if (!isControlled) setUncontrolledChecked(next);
        onChange?.(next);
        onClick?.(e);
      }}
      {...rest}
    >
      {control}
      {labelContent != null ? (
        <span className={cn(disabled && "text-muted-foreground")}>{labelContent}</span>
      ) : null}
    </button>
  );
}

export function SwitchShowcase({
  state,
  size = "md",
  variant = "default",
}: {
  state: SwitchShowcaseState;
  size?: SwitchSizeKey;
  variant?: SwitchVariant;
}) {
  return <Switch showcaseState={state} size={size} variant={variant} />;
}

export function getSwitchTrackHeight(size: SwitchSizeKey) {
  return switchSizeSpecs[size].height;
}
