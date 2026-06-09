"use client";

import { createContext, useContext } from "react";
import type { FilterBarVariant } from "./filter-bar.types";

export type FilterBarContextValue = {
  onSearch?: () => void;
  onReset?: () => void;
  expanded: boolean;
  setExpanded: (value: boolean) => void;
  expandable: boolean;
  hiddenCount: number;
  maxVisibleFields: number;
  variant: FilterBarVariant;
};

export const FilterBarContext = createContext<FilterBarContextValue | null>(null);

export function useFilterBarContext() {
  return useContext(FilterBarContext);
}
