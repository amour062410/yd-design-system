import { brandPrimary, neutralGray } from "./colors";
import { radius } from "./radius";

/** Radio semantic tokens — documentation & component theming */
export const radioTokens = {
  "radio-border-default": neutralGray[5],
  "radio-border-selected": brandPrimary[6],
  "radio-bg-selected": brandPrimary[6],
  "radio-disabled": neutralGray[5],
  "radio-size-sm": "14px",
  "radio-size-md": "16px",
  "radio-size-lg": "18px",
  "radio-control-radius": radius.full,
  "radio-button-radius": radius.md,
  "radio-segmented-track": neutralGray[3],
} as const;

export type RadioTokenKey = keyof typeof radioTokens;

export const radioSizeSpecs = {
  sm: {
    control: radioTokens["radio-size-sm"],
    fontSizeToken: "font-size-xs",
    gap: "6px",
  },
  md: {
    control: radioTokens["radio-size-md"],
    fontSizeToken: "font-size-sm",
    gap: "8px",
  },
  lg: {
    control: radioTokens["radio-size-lg"],
    fontSizeToken: "font-size-base",
    gap: "10px",
  },
} as const;

export type RadioSizeKey = keyof typeof radioSizeSpecs;
