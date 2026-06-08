"use client";

import type { CSSProperties, ReactNode } from "react";
import { cn } from "@yd-ds/ui";
import { brandPrimary } from "@yd-ds/tokens";

export const GRID_COLUMNS = 24;

type GridRowProps = {
  gutter?: number;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
};

type GridColProps = {
  span: number;
  className?: string;
  children?: ReactNode;
  label?: string;
  showSpanOnHover?: boolean;
  interactive?: boolean;
};

export function GridRow({ gutter = 16, className, style, children }: GridRowProps) {
  return (
    <div
      className={cn("grid w-full", className)}
      style={{
        gridTemplateColumns: `repeat(${GRID_COLUMNS}, minmax(0, 1fr))`,
        columnGap: gutter,
        rowGap: gutter,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

export function GridCol({
  span,
  className,
  children,
  label,
  showSpanOnHover = false,
  interactive = true,
}: GridColProps) {
  return (
    <div
      className={cn(
        "group relative flex min-h-10 items-center justify-center rounded-md border border-primary/20 bg-primary/10 text-xs font-medium text-primary transition-all duration-300",
        interactive && "hover:scale-[1.02] hover:border-primary/50 hover:bg-primary/20",
        className
      )}
      style={{ gridColumn: `span ${span} / span ${span}` }}
    >
      {children ?? label}
      {showSpanOnHover ? (
        <span className="pointer-events-none absolute -top-6 left-1/2 -translate-x-1/2 rounded bg-foreground px-1.5 py-0.5 text-[10px] font-mono text-background opacity-0 transition-opacity group-hover:opacity-100">
          span={span}
        </span>
      ) : null}
    </div>
  );
}

type GridColumnCellProps = {
  index: number;
  hoveredIndex?: number | null;
  onHover?: (index: number | null) => void;
};

export function GridColumnCell({ index, hoveredIndex, onHover }: GridColumnCellProps) {
  const active = hoveredIndex === index;
  return (
    <div
      className={cn(
        "flex aspect-[3/4] min-h-[48px] cursor-default flex-col items-center justify-center rounded-md border text-[10px] font-mono transition-all duration-300",
        active
          ? "scale-[1.02] border-primary bg-primary/15 text-primary shadow-sm"
          : "border-primary/15 bg-primary/[0.06] text-primary/70 hover:scale-[1.02] hover:border-primary/40 hover:bg-primary/12"
      )}
      onMouseEnter={() => onHover?.(index)}
      onMouseLeave={() => onHover?.(null)}
    >
      {index + 1}
    </div>
  );
}

export const gridBrandColor = brandPrimary[6];
