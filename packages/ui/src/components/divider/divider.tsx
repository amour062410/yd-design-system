"use client";

import type { CSSProperties } from "react";
import { cn } from "../../lib/utils";
import { DividerText } from "./divider-text";
import {
  dividerHorizontalRootClass,
  dividerLineClass,
  dividerVerticalClass,
  resolveDividerMarginStyle,
} from "./divider.styles";
import type { DividerOrientation, DividerProps } from "./divider.types";

function showLeadingLine(orientation: DividerOrientation) {
  return orientation === "center" || orientation === "right";
}

function showTrailingLine(orientation: DividerOrientation) {
  return orientation === "center" || orientation === "left";
}

export function Divider({
  type = "horizontal",
  orientation = "center",
  dashed = false,
  plain = false,
  margin,
  children,
  className,
  style,
  "aria-label": ariaLabel,
}: DividerProps) {
  const marginStyle = resolveDividerMarginStyle(margin, type);
  const mergedStyle: CSSProperties = { ...marginStyle, ...style };

  if (type === "vertical") {
    return (
      <span
        role="separator"
        aria-orientation="vertical"
        aria-label={ariaLabel}
        className={dividerVerticalClass({ dashed, className })}
        style={mergedStyle}
      />
    );
  }

  const hasText = children != null && children !== false && children !== "";

  if (!hasText) {
    return (
      <div
        role="separator"
        aria-orientation="horizontal"
        aria-label={ariaLabel}
        className={dividerHorizontalRootClass({ dashed, hasText: false, className })}
        style={mergedStyle}
      />
    );
  }

  return (
    <div
      role="separator"
      aria-orientation="horizontal"
      aria-label={ariaLabel}
      className={dividerHorizontalRootClass({ dashed, hasText: true, className })}
      style={mergedStyle}
    >
      {showLeadingLine(orientation) ? (
        <span className={dividerLineClass(dashed)} aria-hidden />
      ) : null}
      <DividerText plain={plain} orientation={orientation}>
        {children}
      </DividerText>
      {showTrailingLine(orientation) ? (
        <span className={dividerLineClass(dashed)} aria-hidden />
      ) : null}
    </div>
  );
}
