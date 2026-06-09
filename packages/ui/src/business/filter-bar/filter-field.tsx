"use client";

import type { ReactElement } from "react";
import { cn } from "../../lib/utils";
import { useFilterBarContext } from "./filter-bar-context";
import {
  filterFieldClass,
  filterFieldControlClass,
  filterFieldLabelClass,
} from "./filter-bar.styles";
import type { FilterFieldProps } from "./filter-bar.types";

export function FilterField({
  label,
  children,
  className,
  hidden,
  priority,
  controlClassName,
}: FilterFieldProps) {
  const ctx = useFilterBarContext();
  const variant = ctx?.variant ?? "default";

  return (
    <div
      className={filterFieldClass({ hidden, className, priority, variant })}
      data-filter-field
      data-filter-bar="item"
      data-priority={priority}
    >
      <span className={filterFieldLabelClass()} data-filter-bar="label">
        {label}
      </span>
      <div
        className={filterFieldControlClass({ priority, variant, className: controlClassName })}
        data-filter-bar="component"
      >
        {children}
      </div>
    </div>
  );
}

FilterField.displayName = "FilterField";

export function FilterBarItem(props: FilterFieldProps) {
  return <FilterField {...props} />;
}

FilterBarItem.displayName = "FilterBar.Item";

export function isFilterFieldElement(
  child: unknown
): child is ReactElement<FilterFieldProps> {
  return (
    typeof child === "object" &&
    child !== null &&
    "type" in child &&
    ["FilterField", "FilterBar.Item"].includes(
      (child.type as { displayName?: string }).displayName ?? ""
    )
  );
}
