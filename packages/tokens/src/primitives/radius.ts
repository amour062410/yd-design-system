export const radius = {
  none: "0px",
  sm: "4px",
  md: "6px",
  lg: "8px",
  xl: "0.75rem",
  "2xl": "1rem",
  full: "9999px",
} as const;

export type Radius = typeof radius;
