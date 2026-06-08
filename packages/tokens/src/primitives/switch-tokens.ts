import { brandPrimary, neutralGray } from "./colors";
import { radius } from "./radius";

/** Switch semantic tokens — documentation & component theming */
export const switchTokens = {
  "switch-size-sm": "18px",
  "switch-size-md": "22px",
  "switch-size-lg": "26px",
  "switch-color-on": brandPrimary[6],
  "switch-color-off": neutralGray[5],
  "switch-color-disabled": neutralGray[4],
  "switch-thumb-size": neutralGray[1],
  "switch-track-radius": radius.full,
} as const;

export type SwitchTokenKey = keyof typeof switchTokens;

export const switchSizeSpecs = {
  sm: {
    height: switchTokens["switch-size-sm"],
    width: "32px",
    thumb: "14px",
    padding: "2px",
  },
  md: {
    height: switchTokens["switch-size-md"],
    width: "44px",
    thumb: "18px",
    padding: "2px",
  },
  lg: {
    height: switchTokens["switch-size-lg"],
    width: "52px",
    thumb: "22px",
    padding: "2px",
  },
} as const;

export type SwitchSizeKey = keyof typeof switchSizeSpecs;

/** Visual variants — icon / text / compact / block rectangles */
export const switchVariantSpecs = {
  icon: {
    height: switchTokens["switch-size-md"],
    width: "44px",
    thumb: "18px",
    padding: "2px",
    trackRadius: radius.full,
    thumbRadius: radius.full,
  },
  text: {
    height: "24px",
    width: "56px",
    thumb: "18px",
    padding: "2px",
    trackRadius: radius.sm,
    thumbRadius: radius.sm,
  },
  compact: {
    height: "20px",
    width: "36px",
    thumb: "16px",
    padding: "2px",
    trackRadius: radius.sm,
    thumbRadius: radius.sm,
  },
  block: {
    height: "28px",
    width: "64px",
    thumb: "24px",
    padding: "2px",
    trackRadius: radius.sm,
    thumbRadius: radius.sm,
  },
} as const;

export type SwitchVariantKey = keyof typeof switchVariantSpecs;

export const switchTokenRows = [
  {
    token: "switch-size-sm",
    value: switchTokens["switch-size-sm"],
    description: "Small 轨道高度",
  },
  {
    token: "switch-size-md",
    value: switchTokens["switch-size-md"],
    description: "Medium 轨道高度（默认）",
  },
  {
    token: "switch-size-lg",
    value: switchTokens["switch-size-lg"],
    description: "Large 轨道高度",
  },
  {
    token: "switch-color-on",
    value: switchTokens["switch-color-on"],
    description: "开启态轨道色",
  },
  {
    token: "switch-color-off",
    value: switchTokens["switch-color-off"],
    description: "关闭态轨道色",
  },
  {
    token: "switch-color-disabled",
    value: switchTokens["switch-color-disabled"],
    description: "禁用态轨道色",
  },
  {
    token: "switch-thumb-size",
    value: switchTokens["switch-thumb-size"],
    description: "滑块填充色（默认白色）",
  },
  {
    token: "switch-track-radius",
    value: switchTokens["switch-track-radius"],
    description: "轨道圆角（胶囊形）",
  },
] as const;
