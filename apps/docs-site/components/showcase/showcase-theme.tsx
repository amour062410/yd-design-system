"use client";

import { createContext, useContext } from "react";

export type ShowcaseThemeContextValue = {
  dark: boolean;
  toggleDark: () => void;
};

export const ShowcaseThemeContext =
  createContext<ShowcaseThemeContextValue | null>(null);

export function useShowcaseTheme() {
  const ctx = useContext(ShowcaseThemeContext);
  if (!ctx) {
    throw new Error("useShowcaseTheme must be used within InputShowcaseFrame");
  }
  return ctx;
}
