import { brandPrimary, neutralGray } from "./colors";

export const messageTokens = {
  "message-min-height": "48px",
  "message-max-width": "480px",
  "message-radius": "8px",
  "message-shadow": "0 4px 16px rgba(0, 0, 0, 0.08)",
  "message-padding-x": "16px",
  "message-padding-y": "12px",
  "message-gap": "12px",
  "message-icon-size": "20px",
  "message-duration": "3000ms",
  "message-animation-duration": "300ms",
  "message-bg": neutralGray[1],
  "message-border-color": neutralGray[4],
  "message-text-color": neutralGray[10],
  "message-desc-color": neutralGray[8],
  "message-close-color": neutralGray[6],
  "message-success-color": "#00B42A",
  "message-info-color": brandPrimary[6],
  "message-warning-color": "#FF7D00",
  "message-error-color": "#F53F3F",
  "message-z-index": "2050",
} as const;

export type MessageTokenKey = keyof typeof messageTokens;

export const messageUsageTokenNames = [
  "message-min-height",
  "message-max-width",
  "message-radius",
  "message-shadow",
  "message-padding-x",
  "message-padding-y",
  "message-icon-size",
  "message-duration",
  "message-success-color",
  "message-info-color",
  "message-warning-color",
  "message-error-color",
] as const;

export const messageDesignSpecRows = [
  { token: "message-min-height", value: messageTokens["message-min-height"], desc: "最小高度" },
  { token: "message-max-width", value: messageTokens["message-max-width"], desc: "最大宽度" },
  { token: "message-radius", value: messageTokens["message-radius"], desc: "圆角" },
  { token: "message-shadow", value: messageTokens["message-shadow"], desc: "阴影" },
  { token: "message-padding-x", value: messageTokens["message-padding-x"], desc: "水平内边距" },
  { token: "message-padding-y", value: messageTokens["message-padding-y"], desc: "垂直内边距" },
  { token: "message-icon-size", value: messageTokens["message-icon-size"], desc: "图标尺寸" },
  { token: "message-duration", value: messageTokens["message-duration"], desc: "默认展示时长" },
  { token: "message-animation-duration", value: messageTokens["message-animation-duration"], desc: "入场动画时长" },
] as const;
