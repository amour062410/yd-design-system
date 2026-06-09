"use client";

import { Button, type ButtonProps } from "../button";
import { cn } from "../../lib/utils";
import { cardTextButtonClass } from "./card.styles";
import type { ReactNode } from "react";

export type CardTextButtonProps = ButtonProps;

/** 卡片内文字操作按钮，交互对齐 Ant Design Button type="text" color="primary" */
export function CardTextButton({ className, size = "sm", ...props }: CardTextButtonProps) {
  return (
    <Button
      variant="textBrand"
      size={size}
      className={cn(cardTextButtonClass(), className)}
      {...props}
    />
  );
}

CardTextButton.displayName = "CardTextButton";

/** 字符串 extra/footer 自动包装为可点击文字按钮 */
export function renderCardAction(node: ReactNode) {
  if (typeof node === "string") {
    return (
      <CardTextButton type="button" onClick={(event) => event.stopPropagation()}>
        {node}
      </CardTextButton>
    );
  }
  return node;
}
