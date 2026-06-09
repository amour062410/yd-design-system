import { cn } from "../../lib/utils";
import type { FilterBarLayout, FilterBarVariant, FilterFieldPriority } from "./filter-bar.types";

export const filterBarCssVars = {
  gap: "--filterbar-gap",
  rowGap: "--filterbar-row-gap",
  labelWidth: "--filterbar-label-width",
  maxVisibleFields: "--filterbar-max-visible-fields",
  actionGap: "--filterbar-action-gap",
  padding: "--filterbar-padding",
  controlHeight: "--filterbar-control-height",
  labelGap: "--filterbar-label-gap",
  primaryControlWidth: "--filterbar-primary-control-width",
} as const;

export const filterBarContainerClass = ({
  sticky,
  className,
  variant = "default",
}: {
  sticky?: boolean;
  className?: string;
  variant?: FilterBarVariant;
}) =>
  cn(
    variant === "business"
      ? "rounded-lg border-0 bg-[color:var(--card,#ffffff)] shadow-[var(--filterbar-business-shadow,0_1px_2px_rgba(0,0,0,0.04))]"
      : "rounded-lg border border-[color:var(--color-border,#e5e6eb)] bg-[color:var(--card,#ffffff)] text-card-foreground shadow-sm",
    "p-[var(--filterbar-padding,16px)]",
    sticky && "sticky top-0 z-20 bg-[color:var(--card,#ffffff)]/95 backdrop-blur-sm",
    className
  );

export const filterBarGridClass = (layout: FilterBarLayout = "responsive") =>
  cn(
    "grid w-full items-center",
    "gap-x-[var(--filterbar-gap,16px)] gap-y-[var(--filterbar-row-gap,12px)]",
    layout === "responsive" &&
      "grid-cols-1 sm:grid-cols-2 xl:grid-cols-[repeat(var(--filterbar-max-visible-fields,4),minmax(0,1fr))]",
    layout === "fixed" &&
      "grid-cols-[repeat(var(--filterbar-max-visible-fields,4),minmax(180px,1fr))]",
    layout === "auto" && "grid-cols-[repeat(auto-fit,minmax(220px,1fr))]"
  );

export const filterBarBusinessBodyClass = () =>
  cn("flex flex-col gap-[var(--filterbar-row-gap,16px)]");

export const filterBarBusinessPrimaryRowClass = () =>
  cn("flex min-h-[var(--filterbar-control-height,40px)] flex-wrap items-center");

export const filterBarBusinessSecondaryRowClass = () =>
  cn(
    "flex min-h-[var(--filterbar-control-height,40px)] flex-wrap items-center",
    "gap-x-[var(--filterbar-gap,16px)] gap-y-3"
  );

export const filterBarToolbarClass = () =>
  cn(
    "mb-[var(--filterbar-row-gap,16px)] flex flex-wrap items-center justify-between gap-3"
  );

export const filterBarTitleClass = () =>
  cn(
    "text-base font-semibold leading-6 text-[color:var(--color-text-primary,#1d2129)]"
  );

export const filterBarExtraClass = () =>
  cn("ml-auto flex flex-wrap items-center gap-2");

export const filterBarTextButtonClass = () =>
  cn("h-8 px-[7px] text-[13px] font-normal leading-[22px]");

export const filterBarOperationsRowClass = () =>
  cn(
    "mt-[var(--filterbar-row-gap,16px)] flex w-full items-center justify-end",
    "gap-[var(--filterbar-action-gap,8px)]"
  );

export const filterFieldClass = ({
  hidden,
  className,
  priority,
  variant = "default",
}: {
  hidden?: boolean;
  className?: string;
  priority?: FilterFieldPriority;
  variant?: FilterBarVariant;
}) =>
  cn(
    "flex min-w-0 items-center gap-[var(--filterbar-label-gap,8px)]",
    variant === "business" && priority === "secondary" && "shrink-0",
    hidden && "hidden",
    className
  );

export const filterFieldLabelClass = () =>
  cn(
    "w-[var(--filterbar-label-width,72px)] shrink-0 self-center text-right",
    "text-[length:var(--filterbar-label-font-size,13px)] font-medium",
    "leading-[var(--filterbar-control-height,40px)]",
    "text-[color:var(--color-text-secondary,#86909c)]"
  );

export const filterFieldControlClass = ({
  priority,
  variant = "default",
  className,
}: {
  priority?: FilterFieldPriority;
  variant?: FilterBarVariant;
  className?: string;
} = {}) =>
  cn(
    "flex min-w-0 items-center",
    variant === "business" && priority === "primary"
      ? cn(
          "flex-none",
          "w-[var(--filterbar-primary-control-width,460px)]",
          "min-w-[var(--filterbar-primary-control-min-width,420px)]",
          "max-w-[var(--filterbar-primary-control-max-width,500px)]"
        )
      : variant === "business" && priority === "secondary"
        ? "w-[var(--filterbar-secondary-control-width,180px)] flex-none"
        : "flex-1",
    "[&>*]:w-full [&>*]:max-w-none",
    "[&_input:not([type=hidden])]:h-[var(--filterbar-control-height,40px)]",
    "[&_input:not([type=hidden])]:min-h-[var(--filterbar-control-height,40px)]",
    "[&_[role=combobox]]:!h-[var(--filterbar-control-height,40px)]",
    "[&_[role=combobox]]:!min-h-[var(--filterbar-control-height,40px)]",
    className
  );

export const filterActionsClass = (className?: string, _variant: FilterBarVariant = "default") =>
  cn(
    "flex shrink-0 flex-wrap items-center justify-end",
    "gap-[var(--filterbar-action-gap,8px)]",
    className
  );

export const filterCollapseButtonClass = () => filterBarTextButtonClass();

export const filterSummaryClass = (className?: string) =>
  cn(
    "mt-3 flex flex-wrap items-center gap-2 text-[13px] leading-5",
    "text-[color:var(--color-text-secondary,#86909c)]",
    className
  );

export const filterCountClass = (className?: string) =>
  cn("text-[13px] text-[color:var(--color-text-secondary,#86909c)]", className);
