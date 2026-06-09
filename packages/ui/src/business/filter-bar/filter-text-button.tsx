"use client";

import { Button, type ButtonProps } from "../../components/button";
import { cn } from "../../lib/utils";
import { filterBarTextButtonClass } from "./filter-bar.styles";

export type FilterTextButtonProps = ButtonProps;

/** FilterBar 业务文字按钮，交互对齐 Ant Design Button type="text" color="primary" */
export function FilterTextButton({ className, size = "sm", ...props }: FilterTextButtonProps) {
  return (
    <Button
      variant="textBrand"
      size={size}
      className={cn(filterBarTextButtonClass(), className)}
      {...props}
    />
  );
}

FilterTextButton.displayName = "FilterTextButton";
