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

/** Arco / Ant ribbon：右下 6px clip 切角 + 左下折线三角 */
const BODY_CLIP =
  "polygon(0 0, 100% 0, 100% calc(100% - 6px), calc(100% - 6px) 100%, 0 100%)";

export const RibbonIndicator = forwardRef<HTMLSpanElement, RibbonIndicatorProps>(
  function RibbonIndicator({ text, status = "danger", className }, ref) {
    const ribbon = getRibbonStyle(status);

    const bodyStyle: CSSProperties = {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: "fit-content",
      maxWidth: "fit-content",
      height: "var(--badge-ribbon-height, 22px)",
      padding: "0 var(--badge-ribbon-padding-x, 8px)",
      fontSize: "var(--badge-ribbon-font-size, 12px)",
      fontWeight: 500,
      lineHeight: "var(--badge-ribbon-height, 22px)",
      color: ribbon.text,
      backgroundColor: ribbon.bg,
      borderRadius: "var(--badge-ribbon-radius, 2px 0 0 2px)",
      clipPath: BODY_CLIP,
      boxShadow: "var(--badge-ribbon-shadow, 0 2px 8px rgba(0, 0, 0, 0.15))",
      boxSizing: "border-box",
    };

    const leftNotchStyle: CSSProperties = {
      position: "absolute",
      bottom: "-4px",
      left: 0,
      width: 0,
      height: 0,
      borderStyle: "solid",
      borderWidth: "2px",
      borderTopColor: ribbon.fold,
      borderRightColor: ribbon.fold,
      borderBottomColor: "transparent",
      borderLeftColor: "transparent",
      pointerEvents: "none",
    };

    return (
      <span
        ref={ref}
        role="status"
        aria-label={text}
        className={cn("absolute whitespace-nowrap", className)}
        style={{
          top: "var(--badge-ribbon-offset-y, -1px)",
          right: "var(--badge-ribbon-offset-x, -6px)",
          zIndex: "var(--badge-ribbon-z-index, 10)",
        }}
      >
        <span className="relative inline-block w-fit">
          <span style={bodyStyle}>{text}</span>
          <span aria-hidden data-ribbon-notch="left" style={leftNotchStyle} />
        </span>
      </span>
    );
  }
);
