"use client";

import { X } from "lucide-react";
import { forwardRef } from "react";
import type { CSSProperties } from "react";
import { tagSizeSpecs } from "@yd-ds/tokens";
import { cn } from "../../lib/utils";
import { getTagSurfaceStyle } from "./tag-styles";
import type { TagProps } from "./tag.types";

export type { TagProps, TagStatus, TagVariant } from "./tag.types";

export const Tag = forwardRef<HTMLSpanElement, TagProps>(function Tag(
  {
    variant = "outline",
    status = "default",
    size = "md",
    icon,
    closable = false,
    onClose,
    disabled = false,
    className,
    style,
    children,
    ...props
  },
  ref
) {
  const spec = tagSizeSpecs[size];
  const surface = getTagSurfaceStyle(variant, status);

  const tagStyle: CSSProperties = {
    height: spec.height,
    paddingLeft: spec.paddingX,
    paddingRight: spec.paddingX,
    fontSize: spec.fontSize,
    fontWeight: 500,
    borderRadius: spec.radius,
    gap: "4px",
    opacity: disabled ? 0.5 : undefined,
    ...surface,
    ...style,
  };

  return (
    <span
      ref={ref}
      className={cn(
        "inline-flex max-w-full items-center whitespace-nowrap transition-colors",
        disabled && "pointer-events-none",
        className
      )}
      style={tagStyle}
      {...props}
    >
      {icon ? (
        <span
          className="inline-flex shrink-0 items-center [&_svg]:size-[var(--tag-icon-size)]"
          style={{ ["--tag-icon-size" as string]: spec.iconSize }}
        >
          {icon}
        </span>
      ) : null}
      <span className="truncate">{children}</span>
      {closable && onClose ? (
        <button
          type="button"
          className="inline-flex shrink-0 items-center justify-center rounded-sm opacity-70 hover:opacity-100"
          style={{ width: spec.iconSize, height: spec.iconSize }}
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          aria-label="移除标签"
        >
          <X style={{ width: spec.iconSize, height: spec.iconSize }} />
        </button>
      ) : null}
    </span>
  );
});
