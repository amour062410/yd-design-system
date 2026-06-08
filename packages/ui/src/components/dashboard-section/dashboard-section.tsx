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
    description,
    extra,
    actions,
    variant = "card",
    padding = "middle",
    className,
    children,
    ...props
  },
  ref
) {
  const hasHeader =
    title != null || description != null || extra != null;
  const hasContent = children != null;
  const hasActions = actions != null;

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
            "flex items-start justify-between gap-4",
            zonePadding,
            (hasContent || hasActions) && "border-b border-border"
          )}
        >
          {title != null || description != null ? (
            <div className={cn("flex min-w-0 flex-col", TITLE_GAP[padding])}>
              {title != null ? (
                <div className="truncate text-base font-semibold leading-tight tracking-tight">
                  {title}
                </div>
              ) : null}
              {description != null ? (
                <div className="text-sm text-muted-foreground">
                  {description}
                </div>
              ) : null}
            </div>
          ) : null}
          {extra != null ? (
            <div className="flex shrink-0 items-center gap-2">{extra}</div>
          ) : null}
        </header>
      ) : null}

      {hasContent ? (
        <div className={cn("min-w-0 flex-1", zonePadding)}>{children}</div>
      ) : null}

      {hasActions ? (
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
