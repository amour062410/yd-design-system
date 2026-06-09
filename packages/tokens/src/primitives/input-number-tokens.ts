import { brandPrimary } from "./colors";
import { radius } from "./radius";

export const inputNumberTokens = {
  "input-number-height-sm": "28px",
  "input-number-height-md": "32px",
  "input-number-height-lg": "36px",
  "input-number-border-default": "#D9D9D9",
  "input-number-border-focus": brandPrimary[6],
  "input-number-border-error": "#FF4D4F",
  "input-number-border-warning": "#FAAD14",
  "input-number-bg": "#FFFFFF",
  "input-number-bg-disabled": "#F5F5F5",
  "input-number-text": "#181818",
  "input-number-text-error": "#FF4D4F",
  "input-number-text-warning": "#FAAD14",
  "input-number-text-disabled": "rgba(0, 0, 0, 0.25)",
  "input-number-text-placeholder": "rgba(0, 0, 0, 0.25)",
  "input-number-control-bg-hover": "#F5F5F5",
  "input-number-control-bg-disabled": "#D9D9D9",
  "input-number-control-width-sm": "24px",
  "input-number-control-width-md": "28px",
  "input-number-control-width-lg": "32px",
  "input-number-radius": radius.md,
  "input-number-font-size-sm": "13px",
  "input-number-font-size-md": "14px",
  "input-number-font-size-lg": "16px",
  "input-number-unit-color": "rgba(0, 0, 0, 0.45)",
  "input-number-unit-font-size": "14px",
  "input-number-unit-gap": "8px",
} as const;

export type InputNumberTokenKey = keyof typeof inputNumberTokens;

export const inputNumberSizeSpecs = {
  small: {
    height: inputNumberTokens["input-number-height-sm"],
    fontSize: inputNumberTokens["input-number-font-size-sm"],
    paddingX: "8px",
    controlWidth: inputNumberTokens["input-number-control-width-sm"],
  },
  default: {
    height: inputNumberTokens["input-number-height-md"],
    fontSize: inputNumberTokens["input-number-font-size-md"],
    paddingX: "10px",
    controlWidth: inputNumberTokens["input-number-control-width-md"],
  },
  large: {
    height: inputNumberTokens["input-number-height-lg"],
    fontSize: inputNumberTokens["input-number-font-size-lg"],
    paddingX: "12px",
    controlWidth: inputNumberTokens["input-number-control-width-lg"],
  },
} as const;

export type InputNumberSizeKey = keyof typeof inputNumberSizeSpecs;

export const inputNumberTokenRows = [
  {
    token: "input-number-border-default" as const,
    value: inputNumberTokens["input-number-border-default"],
    description: "默认边框 #D9D9D9",
  },
  {
    token: "input-number-border-focus" as const,
    value: inputNumberTokens["input-number-border-focus"],
    description: "聚焦边框 #165DFF",
  },
  {
    token: "input-number-border-error" as const,
    value: inputNumberTokens["input-number-border-error"],
    description: "错误边框 #FF4D4F",
  },
  {
    token: "input-number-radius" as const,
    value: inputNumberTokens["input-number-radius"],
    description: "圆角 8px",
  },
  {
    token: "input-number-height-md" as const,
    value: inputNumberTokens["input-number-height-md"],
    description: "默认高度 32px",
  },
] as const;
