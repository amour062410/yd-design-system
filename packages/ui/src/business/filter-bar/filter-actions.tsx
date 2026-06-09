"use client";

import { Button } from "../../components/button";
import { cn } from "../../lib/utils";
import { useFilterBarContext } from "./filter-bar-context";
import { FilterCollapse } from "./filter-collapse";
import { filterActionsClass } from "./filter-bar.styles";
import type { FilterActionsProps } from "./filter-bar.types";

export function FilterActions({
  onSearch,
  onReset,
  searchText = "查询",
  resetText = "重置",
  className,
  children,
}: FilterActionsProps) {
  const ctx = useFilterBarContext();
  const variant = ctx?.variant ?? "default";
  const buttonSize = variant === "business" ? "default" : "sm";

  if (children) {
    return (
      <div className={cn(filterActionsClass(className, variant))} data-filter-actions>
        {children}
      </div>
    );
  }

  const handleSearch = onSearch ?? ctx?.onSearch;
  const handleReset = onReset ?? ctx?.onReset;
  const expandable = ctx?.expandable ?? false;
  const expanded = ctx?.expanded ?? false;
  const hiddenCount = ctx?.hiddenCount ?? 0;

  return (
    <div className={cn(filterActionsClass(className, variant))} data-filter-actions>
      {expandable ? (
        <FilterCollapse
          expanded={expanded}
          onToggle={() => ctx?.setExpanded(!expanded)}
          hiddenCount={hiddenCount}
        />
      ) : null}
      <Button type="button" size={buttonSize} variant="outline" onClick={handleReset}>
        {resetText}
      </Button>
      <Button type="button" size={buttonSize} variant="default" onClick={handleSearch}>
        {searchText}
      </Button>
    </div>
  );
}

FilterActions.displayName = "FilterActions";

export function isFilterActionsElement(
  child: unknown
): child is React.ReactElement<FilterActionsProps> {
  return (
    typeof child === "object" &&
    child !== null &&
    "type" in child &&
    (child.type as { displayName?: string }).displayName === "FilterActions"
  );
}
