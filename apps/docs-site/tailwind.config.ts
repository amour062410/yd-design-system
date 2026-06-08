import type { Config } from "tailwindcss";
import tokensPreset from "@yd-ds/tokens/tailwind";

const config: Config = {
  presets: [tokensPreset as Config],
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "../../packages/ui/src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "var(--color-brand)",
          hover: "var(--color-brand-hover)",
          active: "var(--color-brand-active)",
          muted: "var(--color-brand-muted)",
          ring: "var(--color-brand-ring)",
        },
        surface: {
          page: "var(--color-surface-page)",
          card: "var(--color-surface-card)",
          "card-soft": "var(--color-surface-card-soft)",
          elevated: "var(--color-surface-elevated)",
          input: "var(--color-surface-input)",
        },
        text: {
          primary: "var(--color-text-primary)",
          secondary: "var(--color-text-secondary)",
          tertiary: "var(--color-text-tertiary)",
          disabled: "var(--color-text-disabled)",
          placeholder: "var(--color-text-placeholder)",
        },
        warning: {
          DEFAULT: "var(--color-warning)",
          hover: "var(--color-warning-hover)",
          active: "var(--color-warning-active)",
          muted: "var(--color-warning-muted)",
        },
        danger: {
          DEFAULT: "var(--color-danger)",
          hover: "var(--color-danger-hover)",
          active: "var(--color-danger-active)",
          muted: "var(--color-danger-muted)",
        },
      },
      borderRadius: {
        ds: "var(--radius-ds)",
        button: "var(--radius-button)",
        input: "var(--radius-input)",
        cell: "var(--radius-cell)",
      },
      boxShadow: {
        ds: "var(--shadow-ds)",
        "ds-lg": "var(--shadow-ds-lg)",
        panel: "var(--shadow-panel)",
        input: "var(--shadow-input)",
        "input-hover": "var(--shadow-input-hover)",
        selected: "var(--shadow-selected)",
      },
      transitionDuration: {
        fast: "var(--transition-fast)",
        base: "var(--transition-base)",
        slow: "var(--transition-slow)",
      },
      borderColor: {
        DEFAULT: "var(--color-border)",
        hover: "var(--color-border-hover)",
        focus: "var(--color-border-focus)",
      },
      keyframes: {
        "panel-in": {
          "0%": { opacity: "0", transform: "translateY(-6px) scale(0.98)" },
          "100%": { opacity: "1", transform: "translateY(0) scale(1)" },
        },
        "panel-out": {
          "0%": { opacity: "1", transform: "translateY(0) scale(1)" },
          "100%": { opacity: "0", transform: "translateY(-4px) scale(0.98)" },
        },
        "calendar-slide": {
          "0%": { opacity: "0", transform: "translateX(6px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
      },
      animation: {
        "panel-in":
          "panel-in var(--transition-slow) cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "panel-out": "panel-out var(--transition-fast) ease-in forwards",
        "calendar-slide":
          "calendar-slide var(--transition-base) cubic-bezier(0.16, 1, 0.3, 1) forwards",
      },
    },
  },
};

export default config;
