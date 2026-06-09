import type { CSSProperties } from "react";
import { cn } from "../../lib/utils";
import type {
  DescriptionsColumn,
  DescriptionsColumnConfig,
  DescriptionsLayout,
  DescriptionsSize,
} from "./descriptions.types";

export const descriptionsRootClass = (className?: string) =>
  cn("w-full text-[color:var(--descriptions-text-primary,#1d2129)]", className);

export const descriptionsHeaderClass = () =>
  cn(
    "mb-[var(--descriptions-title-margin-bottom,16px)] flex items-center justify-between gap-4"
  );

export const descriptionsTitleClass = () =>
  cn(
    "text-[length:var(--descriptions-title-size,14px)] font-semibold leading-[22px] text-[color:var(--descriptions-text-primary,#1d2129)]"
  );

export const descriptionsExtraClass = () =>
  cn("ml-[var(--descriptions-extra-margin-start,0px)] shrink-0");

const GRID_COLS: Record<DescriptionsColumn, string> = {
  1: "grid-cols-1",
  2: "grid-cols-2",
  3: "grid-cols-3",
  4: "grid-cols-4",
};

const BP_PREFIX: Record<"xs" | "sm" | "md" | "lg" | "xl", string> = {
  xs: "",
  sm: "sm:",
  md: "md:",
  lg: "lg:",
  xl: "xl:",
};

const responsiveColumnClass = (column: DescriptionsColumn) => {
  if (column === 1) return "grid-cols-1";
  if (column === 2) return "grid-cols-1 md:grid-cols-2";
  if (column === 3) return "grid-cols-1 md:grid-cols-2 xl:grid-cols-3";
  return "grid-cols-1 md:grid-cols-2 xl:grid-cols-4";
};

export function resolveResponsiveColumnClass(column: DescriptionsColumnConfig) {
  if (typeof column === "number") return responsiveColumnClass(column);

  const order = ["xs", "sm", "md", "lg", "xl"] as const;
  let last = column.xs ?? 1;
  const classes: string[] = [];

  for (const bp of order) {
    const value = column[bp];
    if (value === undefined && bp !== "xs") continue;
    const col = value ?? last;
    last = col;
    classes.push(`${BP_PREFIX[bp]}${GRID_COLS[col]}`);
  }

  return cn(...classes);
}

export function resolveMaxColumn(column: DescriptionsColumnConfig): DescriptionsColumn {
  if (typeof column === "number") return column;
  return column.xl ?? column.lg ?? column.md ?? column.sm ?? column.xs ?? 3;
}

export const descriptionsGridClass = ({
  column,
  bordered,
  layout = "horizontal",
}: {
  column: DescriptionsColumnConfig;
  bordered?: boolean;
  layout?: DescriptionsLayout;
}) =>
  cn(
    "grid w-full",
    resolveResponsiveColumnClass(column),
    bordered && layout !== "horizontal"
      ? "overflow-hidden rounded-[var(--descriptions-border-radius,var(--descriptions-radius,8px))] border border-[color:var(--descriptions-border,#e5e6eb)]"
      : !bordered
        ? cn(
            "gap-y-[var(--descriptions-row-gap,24px)]",
            layout === "vertical"
              ? "gap-x-[var(--descriptions-column-gap,32px)]"
              : "gap-x-[var(--descriptions-column-gap,40px)]"
          )
        : null
  );

export const descriptionsTableClass = () =>
  cn(
    "w-full border-collapse text-[length:var(--descriptions-content-size,13px)]",
    "rounded-[var(--descriptions-border-radius,var(--descriptions-radius,8px))] overflow-hidden",
    "border border-[color:var(--descriptions-border,#e5e6eb)]",
    "bg-[color:var(--descriptions-bg,#ffffff)]"
  );

export const descriptionsTableLabelClass = (size: DescriptionsSize = "default") =>
  cn(
    "box-border w-[var(--descriptions-label-width,120px)] min-w-[var(--descriptions-label-width,120px)]",
    "border border-[color:var(--descriptions-border,#e5e6eb)]",
    "bg-[color:var(--descriptions-label-bg,#f7f8fa)]",
    "p-[var(--descriptions-item-padding,12px)]",
    "font-normal leading-5 text-[color:var(--descriptions-text-secondary,#4e5969)]",
    "text-left align-top",
    size === "small" && "text-xs"
  );

export const descriptionsTableContentClass = (size: DescriptionsSize = "default") =>
  cn(
    "box-border border border-[color:var(--descriptions-border,#e5e6eb)]",
    "bg-[color:var(--descriptions-bg,#ffffff)]",
    "p-[var(--descriptions-item-padding,12px)]",
    "font-normal leading-5 text-[color:var(--descriptions-text-primary,#1d2129)]",
    "align-top break-words",
    size === "small" && "text-xs"
  );

export const descriptionsItemClass = ({
  bordered,
  layout,
  size = "default",
}: {
  bordered?: boolean;
  layout: DescriptionsLayout;
  size?: DescriptionsSize;
}) =>
  cn(
    "min-w-0 text-left",
    bordered && layout === "vertical" && "flex flex-col",
    bordered && layout === "vertical" && "border border-[color:var(--descriptions-border,#e5e6eb)]",
    !bordered && layout === "horizontal" && "inline-flex flex-wrap items-baseline gap-x-1",
    !bordered && layout === "vertical" && "flex flex-col gap-1.5",
    size === "small" &&
      "pb-[var(--descriptions-item-padding-bottom,8px)] pe-[var(--descriptions-item-padding-end,8px)] text-xs",
    (size === "default" || size === "middle" || size === "large") &&
      "pb-[var(--descriptions-item-padding-bottom,12px)] pe-[var(--descriptions-item-padding-end,12px)] text-[length:var(--descriptions-content-size,13px)]",
    size === "middle" && "leading-6",
    size === "large" && "text-sm"
  );

export const descriptionsLabelClass = ({
  bordered,
  layout,
  labelWidth,
}: {
  bordered?: boolean;
  layout: DescriptionsLayout;
  labelWidth?: number | string;
}) =>
  cn(
    "shrink-0 font-normal text-[color:var(--descriptions-text-secondary,#86909c)]",
    !bordered && "text-[length:var(--descriptions-label-size,12px)]",
    !bordered && layout === "horizontal" && "leading-5",
    !bordered && layout === "vertical" && "leading-4",
    layout === "horizontal" &&
      !bordered &&
      labelWidth !== undefined &&
      "w-[var(--descriptions-label-width)]",
    bordered &&
      layout === "horizontal" &&
      "border-r border-[color:var(--descriptions-border,#e5e6eb)] bg-[color:var(--descriptions-label-bg,#f7f8fa)]",
    bordered && "p-[var(--descriptions-item-padding,12px)]"
  );

export const descriptionsValueClass = ({
  bordered,
  layout = "horizontal",
}: {
  bordered?: boolean;
  layout?: DescriptionsLayout;
}) =>
  cn(
    "min-w-0 flex-1 break-words text-[color:var(--descriptions-text-primary,#1d2129)]",
    !bordered &&
      "text-[length:var(--descriptions-content-size,14px)] leading-[22px]",
    !bordered && layout === "vertical" && "font-medium",
    bordered && "p-[var(--descriptions-item-padding,12px)]"
  );

export const descriptionsGroupClass = (className?: string) =>
  cn("space-y-3", className);

export const descriptionsGroupTitleClass = () =>
  cn(
    "text-[13px] font-semibold text-[color:var(--descriptions-text-primary,#1d2129)]"
  );

export function resolveLabelWidthStyle(
  labelWidth?: number | string
): CSSProperties | undefined {
  if (labelWidth === undefined) return undefined;
  return {
    width: typeof labelWidth === "number" ? `${labelWidth}px` : labelWidth,
    ["--descriptions-label-width" as string]:
      typeof labelWidth === "number" ? `${labelWidth}px` : labelWidth,
  };
}

export function resolveItemGridColumn(
  span: number | "filled" | undefined,
  maxColumn: DescriptionsColumn
) {
  if (span === "filled") return "1 / -1";
  const next = span ?? 1;
  return `span ${Math.min(next, maxColumn)}`;
}
