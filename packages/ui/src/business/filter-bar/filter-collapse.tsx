"use client";

import { ChevronDown } from "lucide-react";
import { cn } from "../../lib/utils";
import { filterCollapseButtonClass } from "./filter-bar.styles";
import { FilterTextButton } from "./filter-text-button";
import type { FilterCollapseProps } from "./filter-bar.types";

export function FilterCollapse({
  expanded,
  onToggle,
  hiddenCount = 0,
  className,
}: FilterCollapseProps) {
  if (hiddenCount <= 0) return null;

  return (
    <FilterTextButton
      type="button"
      className={cn(filterCollapseButtonClass(), "gap-1", className)}
      onClick={onToggle}
      aria-expanded={expanded}
    >
      {expanded ? "收起" : "展开"}
      <ChevronDown
        className={cn("size-3.5 transition-transform duration-200", expanded && "rotate-180")}
        aria-hidden
      />
      {!expanded ? <span className="sr-only">，还有 {hiddenCount} 个筛选项</span> : null}
    </FilterTextButton>
  );
}
