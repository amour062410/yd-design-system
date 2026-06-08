"use client";

import { forwardRef } from "react";
import { cn } from "../../lib/utils";
import {
  EMPTY_TYPE_ILLUSTRATIONS,
  EMPTY_TYPE_PRESETS,
} from "./empty-presets";
import {
  emptyDescriptionStyle,
  emptyRootStyle,
  emptyTitleStyle,
} from "./empty-styles";
import type { EmptyProps } from "./empty.types";

export const Empty = forwardRef<HTMLDivElement, EmptyProps>(function Empty(
  {
    type = "default",
    title,
    description,
    image,
    children,
    className,
  },
  ref
) {
  const preset = EMPTY_TYPE_PRESETS[type];
  const Illustration = EMPTY_TYPE_ILLUSTRATIONS[type];
  const resolvedTitle = title ?? preset.title;
  const resolvedDescription = description ?? preset.description;
  const resolvedImage = image ?? <Illustration />;

  return (
    <div
      ref={ref}
      role="status"
      aria-live="polite"
      className={cn(
        "flex flex-col items-center justify-center text-center",
        className
      )}
      style={emptyRootStyle}
      data-empty-type={type}
    >
      <div
        className="mb-4 flex items-center justify-center"
        style={{
          width: "var(--empty-illustration-size, 160px)",
          height: "var(--empty-illustration-size, 160px)",
        }}
      >
        {resolvedImage}
      </div>
      {resolvedTitle != null ? (
        <p className="mb-1" style={emptyTitleStyle}>
          {resolvedTitle}
        </p>
      ) : null}
      {resolvedDescription != null ? (
        <p style={emptyDescriptionStyle}>{resolvedDescription}</p>
      ) : null}
      {children ? <div className="mt-4">{children}</div> : null}
    </div>
  );
});
