"use client";

import { forwardRef } from "react";
import type { CSSProperties } from "react";
import { cn } from "../../lib/utils";
import { getRibbonStyle } from "./badge-styles";
import type { BadgeStatus } from "./badge.types";

export type RibbonIndicatorProps = {
  text: string;
  status?: BadgeStatus;
  className?: string;
};

/** Ant Design Ribbon 风格：直角矩形 + border 折角 + filter 阴影 */
export const RibbonIndicator = forwardRef<HTMLSpanElement, RibbonIndicatorProps>(
  function RibbonIndicator({ text, status = "danger", className }, ref) {
    const ribbon = getRibbonStyle(status);

    const ribbonBodyStyle: CSSProperties = {
      position: "absolute",
      top: "var(--badge-ribbon-offset-y, 6px)",
      right: "var(--badge-ribbon-offset-x, -6px)",
      zIndex: "var(--badge-ribbon-z-index, 10)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      height: "var(--badge-ribbon-height, 22px)",
      padding: "0 var(--badge-ribbon-padding-x, 8px)",
      fontSize: "var(--badge-ribbon-font-size, 12px)",
      fontWeight: 500,
      lineHeight: "var(--badge-ribbon-height, 22px)",
      color: ribbon.text,
      backgroundColor: ribbon.bg,
      borderRadius: "var(--badge-ribbon-radius, 2px)",
      borderEndEndRadius: 0,
      whiteSpace: "nowrap",
      filter: "var(--badge-ribbon-shadow, drop-shadow(0 2px 4px rgba(0, 0, 0, 0.12)))",
    };

    const cornerStyle: CSSProperties = {
      position: "absolute",
      top: "100%",
      right: 0,
      width: "var(--badge-ribbon-corner-size, 6px)",
      height: "var(--badge-ribbon-corner-size, 6px)",
      color: ribbon.fold,
      border: "3px solid",
      borderRightColor: "transparent",
      borderBottomColor: "transparent",
      transform: "scaleY(0.75)",
      transformOrigin: "top",
      pointerEvents: "none",
    };

    return (
      <span
        ref={ref}
        role="status"
        aria-label={text}
        className={cn("whitespace-nowrap", className)}
        style={ribbonBodyStyle}
      >
        <span>{text}</span>
        <span aria-hidden data-ribbon-corner style={cornerStyle} />
      </span>
    );
  }
);
