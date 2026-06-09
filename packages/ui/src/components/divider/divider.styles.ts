import type { CSSProperties } from "react";
import { cn } from "../../lib/utils";
import type { DividerOrientation, DividerType } from "./divider.types";

export const dividerCssVars = {
  color: "--divider-color",
  margin: "--divider-margin",
  marginSm: "--divider-margin-sm",
  textGap: "--divider-text-gap",
  verticalHeight: "--divider-vertical-height",
  verticalMargin: "--divider-vertical-margin",
  dashedGap: "--divider-dashed-gap",
  textSize: "--divider-text-size",
  textSizeSm: "--divider-text-size-sm",
  textColor: "--color-text-secondary",
} as const;

export function resolveDividerMarginStyle(
  margin: number | string | undefined,
  type: DividerType
): CSSProperties | undefined {
  if (margin === undefined) return undefined;
  const value = typeof margin === "number" ? `${margin}px` : margin;
  if (type === "vertical") {
    return { marginLeft: value, marginRight: value };
  }
  return { marginTop: value, marginBottom: value };
}

export const dividerHorizontalRootClass = ({
  dashed,
  hasText,
  className,
}: {
  dashed?: boolean;
  hasText?: boolean;
  className?: string;
}) =>
  cn(
    "box-border w-full border-0",
    !hasText && "h-px shrink-0",
    hasText && "flex items-center",
    !hasText &&
      (dashed
        ? "border-t border-dashed border-[color:var(--divider-color,#e5e6eb)]"
        : "bg-[color:var(--divider-color,#e5e6eb)]"),
    !hasText &&
      "my-[var(--divider-margin,24px)] max-md:my-[var(--divider-margin-sm,16px)]",
    hasText &&
      "my-[var(--divider-margin,24px)] max-md:my-[var(--divider-margin-sm,16px)]",
    className
  );

export const dividerLineClass = (dashed?: boolean) =>
  cn(
    "min-w-0 flex-1",
    dashed
      ? "border-0 border-t border-dashed border-[color:var(--divider-color,#e5e6eb)]"
      : "h-px bg-[color:var(--divider-color,#e5e6eb)]"
  );

export const dividerTextClass = ({
  plain,
  orientation = "center",
  className,
}: {
  plain?: boolean;
  orientation?: DividerOrientation;
  className?: string;
}) =>
  cn(
    "shrink-0 whitespace-nowrap px-[var(--divider-text-gap,16px)]",
    "text-[length:var(--divider-text-size,14px)] max-md:text-[13px] max-sm:text-[length:var(--divider-text-size-sm,12px)]",
    "leading-[22px] [font-family:'PingFang_SC','PingFang_TC',-apple-system,sans-serif]",
    plain
      ? "font-normal text-[color:var(--color-text-secondary,#86909c)]"
      : "font-medium text-[color:var(--color-text-secondary,#86909c)]",
    orientation === "left" && "pl-0",
    orientation === "right" && "pr-0",
    className
  );

export const dividerVerticalClass = ({
  dashed,
  className,
}: {
  dashed?: boolean;
  className?: string;
}) =>
  cn(
    "inline-block align-middle",
    "mx-[var(--divider-vertical-margin,8px)]",
    "h-[var(--divider-vertical-height,16px)] w-px",
    dashed
      ? "border-0 border-l border-dashed border-[color:var(--divider-color,#e5e6eb)] bg-transparent"
      : "bg-[color:var(--divider-color,#e5e6eb)]",
    className
  );
