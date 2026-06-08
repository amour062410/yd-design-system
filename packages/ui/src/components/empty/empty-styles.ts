import type { CSSProperties } from "react";

export const emptyRootStyle: CSSProperties = {
  padding: "var(--empty-padding-y, 32px) var(--empty-padding-x, 24px)",
};

export const emptyTitleStyle: CSSProperties = {
  color: "var(--empty-title-color, rgba(0,0,0,0.88))",
  fontSize: "var(--empty-title-font-size, 16px)",
  lineHeight: "var(--empty-title-line-height, 24px)",
  fontWeight: 500,
};

export const emptyDescriptionStyle: CSSProperties = {
  color: "var(--empty-description-color, rgba(0,0,0,0.45))",
  fontSize: "var(--empty-description-font-size, 14px)",
  lineHeight: "var(--empty-description-line-height, 22px)",
};
