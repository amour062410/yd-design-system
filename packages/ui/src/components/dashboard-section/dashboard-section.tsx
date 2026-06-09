import * as React from "react";
import { cva } from "class-variance-authority";
import { cn } from "../../lib/utils";
import type {
  DashboardSectionPadding,
  DashboardSectionProps,
  DashboardSectionVariant,
} from "./dashboard-section.types";

const sectionVariants = cva("flex min-w-0 flex-col", {
  variants: {
    variant: {
      card: "rounded-lg border border-border bg-card text-card-foreground shadow-sm",
      plain: "text-foreground",
    },
  },
  defaultVariants: {
    variant: "card",
  },
});

const ZONE_PADDING: Record<
  DashboardSectionVariant,
  Record<DashboardSectionPadding, string>
> = {
  card: {
    small: "px-4 py-3",
    middle: "px-5 py-4",
    large: "px-6 py-5",
  },
  plain: {
    small: "py-3",
    middle: "py-4",
    large: "py-5",
  },
};

const TITLE_GAP: Record<DashboardSectionPadding, string> = {
  small: "gap-0.5",
  middle: "gap-1",
  large: "gap-1.5",
};

export const DashboardSection = React.forwardRef<
  HTMLElement,
  DashboardSectionProps
>(function DashboardSection(
  {
    title,
    subtitle,
    description,
    filters,
    extra,
    actions,
    actionsPlacement = "footer",
    variant = "card",
    padding = "middle",
    className,
    children,
    ...props
  },
  ref
) {
  const actionsInHeader = actionsPlacement === "header" && actions != null;
  const actionsInFooter = actionsPlacement === "footer" && actions != null;

  const hasTitleBlock =
    title != null || subtitle != null || description != null;
  const hasHeaderControls =
    filters != null || extra != null || actionsInHeader;
  const hasHeader = hasTitleBlock || hasHeaderControls;
  const hasContent = children != null;

  const zonePadding = ZONE_PADDING[variant][padding];

  return (
    <section
      ref={ref}
      className={cn(sectionVariants({ variant }), className)}
      {...props}
    >
      {hasHeader ? (
        <header
          className={cn(
            "flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-4",
            zonePadding,
            (hasContent || actionsInFooter) && "border-b border-border"
          )}
        >
          {hasTitleBlock ? (
            <div className={cn("flex min-w-0 flex-col", TITLE_GAP[padding])}>
              {title != null || subtitle != null ? (
                <div className="flex min-w-0 flex-wrap items-baseline gap-x-2 gap-y-0.5">
                  {title != null ? (
                    <span className="truncate text-base font-semibold leading-tight tracking-tight">
                      {title}
                    </span>
                  ) : null}
                  {subtitle != null ? (
                    <span className="truncate text-sm font-normal text-muted-foreground">
                      {subtitle}
                    </span>
                  ) : null}
                </div>
              ) : null}
              {description != null ? (
                <div className="text-sm text-muted-foreground">
                  {description}
                </div>
              ) : null}
            </div>
          ) : null}

          {hasHeaderControls ? (
            <div className="flex flex-wrap items-center gap-2 sm:shrink-0 sm:justify-end">
              {filters != null ? (
                <div className="flex flex-wrap items-center gap-2">
                  {filters}
                </div>
              ) : null}
              {extra != null ? (
                <div className="flex flex-wrap items-center gap-2">{extra}</div>
              ) : null}
              {actionsInHeader ? (
                <div className="flex flex-wrap items-center gap-2">
                  {actions}
                </div>
              ) : null}
            </div>
          ) : null}
        </header>
      ) : null}

      {hasContent ? (
        <div className={cn("min-w-0 flex-1", zonePadding)}>{children}</div>
      ) : null}

      {actionsInFooter ? (
        <footer
          className={cn(
            "flex flex-wrap items-center gap-2",
            zonePadding,
            (hasHeader || hasContent) && "border-t border-border"
          )}
        >
          {actions}
        </footer>
      ) : null}
    </section>
  );
});

DashboardSection.displayName = "DashboardSection";
