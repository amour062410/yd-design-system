import type { CSSProperties } from "react";
import type { TagStatus, TagVariant } from "./tag.types";

type StatusPalette = {
  main: string;
  light: string;
  onSolid: string;
};

const PALETTE: Record<TagStatus, StatusPalette> = {
  primary: {
    main: "var(--tag-primary, #165DFF)",
    light: "var(--tag-primary-light, #E8F0FF)",
    onSolid: "#FFFFFF",
  },
  success: {
    main: "var(--tag-success, #00B42A)",
    light: "var(--tag-success-light, #E8FFEA)",
    onSolid: "#FFFFFF",
  },
  warning: {
    main: "var(--tag-warning, #FF7D00)",
    light: "var(--tag-warning-light, #FFF7E8)",
    onSolid: "#FFFFFF",
  },
  danger: {
    main: "var(--tag-danger, #F53F3F)",
    light: "var(--tag-danger-light, #FFECE8)",
    onSolid: "#FFFFFF",
  },
  info: {
    main: "var(--tag-info, #3491FA)",
    light: "var(--tag-info-light, #E8F4FF)",
    onSolid: "#FFFFFF",
  },
  default: {
    main: "var(--tag-text-default, rgba(0,0,0,0.65))",
    light: "var(--tag-bg-default-light, #F7F8FA)",
    onSolid: "var(--tag-text-default, rgba(0,0,0,0.65))",
  },
};

export function getTagSurfaceStyle(
  variant: TagVariant,
  status: TagStatus
): CSSProperties {
  const p = PALETTE[status];

  if (variant === "solid") {
    return {
      backgroundColor: status === "default" ? "var(--tag-border-default, #E5E6EB)" : p.main,
      color: status === "default" ? p.main : p.onSolid,
      border: "1px solid transparent",
    };
  }

  if (variant === "light") {
    return {
      backgroundColor: p.light,
      color: p.main,
      border: "1px solid transparent",
    };
  }

  return {
    backgroundColor: "transparent",
    color: status === "default" ? p.main : p.main,
    border: `1px solid ${status === "default" ? "var(--tag-border-default, #E5E6EB)" : p.main}`,
  };
}
