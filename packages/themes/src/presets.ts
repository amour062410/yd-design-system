export type ThemeMode = "light" | "dark" | "system";

export const THEME_STORAGE_KEY = "yd-ds-theme";

export const themePresets = {
  light: {
    name: "light",
    className: "",
  },
  dark: {
    name: "dark",
    className: "dark",
  },
} as const;
