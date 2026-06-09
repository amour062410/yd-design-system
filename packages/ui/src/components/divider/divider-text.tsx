"use client";

import { cn } from "../../lib/utils";
import { dividerTextClass } from "./divider.styles";
import type { DividerTextProps } from "./divider.types";

export function DividerText({
  plain,
  orientation = "center",
  className,
  children,
}: DividerTextProps) {
  return (
    <span className={cn(dividerTextClass({ plain, orientation }), className)}>
      {children}
    </span>
  );
}
