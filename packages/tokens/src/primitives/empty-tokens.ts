import { brandPrimary, neutralGray } from "./colors";

export const emptyTokens = {
  "empty-illustration-size": "160px",
  "empty-padding-x": "24px",
  "empty-padding-y": "32px",
  "empty-title-color": "rgba(0,0,0,0.88)",
  "empty-title-font-size": "16px",
  "empty-title-line-height": "24px",
  "empty-description-color": "rgba(0,0,0,0.45)",
  "empty-description-font-size": "14px",
  "empty-description-line-height": "22px",
  "empty-illustration-gray": neutralGray[4],
  "empty-illustration-blue": brandPrimary[6],
  "empty-illustration-green": "#00B42A",
} as const;

export type EmptyTokenKey = keyof typeof emptyTokens;

export const emptyUsageTokenNames = [
  "empty-illustration-size",
  "empty-title-color",
  "empty-description-color",
  "empty-illustration-gray",
  "empty-illustration-blue",
] as const;
