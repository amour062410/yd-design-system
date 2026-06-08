import { createContext, useContext } from "react";
import type { CollapseContextValue } from "./collapse.types";

export const CollapseContext = createContext<CollapseContextValue | null>(null);

export function useCollapseContext() {
  const context = useContext(CollapseContext);
  if (!context) {
    throw new Error("CollapseItem must be used within Collapse");
  }
  return context;
}
