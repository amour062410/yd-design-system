"use client";

import { Children, Fragment, type ReactNode } from "react";
import { cn } from "../../lib/utils";
import { filterBarExtraClass } from "./filter-bar.styles";
import type { FilterExtraProps } from "./filter-bar.types";

export function FilterExtra({ children, className }: FilterExtraProps) {
  const items = Children.toArray(children).filter(Boolean);

  return (
    <div className={cn(filterBarExtraClass(), className)} data-filter-bar="extra">
      {items.map((child, index) => (
        <Fragment key={index}>
          {index > 0 ? (
            <span
              className="select-none text-[color:var(--color-border,#e5e6eb)]"
              aria-hidden
            >
              |
            </span>
          ) : null}
          {child}
        </Fragment>
      ))}
    </div>
  );
}

FilterExtra.displayName = "FilterExtra";

export function isFilterExtraElement(
  child: unknown
): child is React.ReactElement<FilterExtraProps> {
  return (
    typeof child === "object" &&
    child !== null &&
    "type" in child &&
    (child.type as { displayName?: string }).displayName === "FilterExtra"
  );
}
