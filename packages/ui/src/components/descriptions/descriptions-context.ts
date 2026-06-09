"use client";

import { createContext, useContext } from "react";
import type { DescriptionsContextValue } from "./descriptions.types";

export const DescriptionsContext = createContext<DescriptionsContextValue | null>(
  null
);

export function useDescriptionsContext() {
  const ctx = useContext(DescriptionsContext);
  if (!ctx) {
    throw new Error("Descriptions.Item must be used within Descriptions");
  }
  return ctx;
}

export function useDescriptionsContextOptional() {
  return useContext(DescriptionsContext);
}
