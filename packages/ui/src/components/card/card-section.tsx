"use client";

import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "../../lib/utils";
import { cardSectionBodyClass, cardSectionClass, cardSectionTitleClass } from "./card.styles";

export type CardSectionProps = HTMLAttributes<HTMLDivElement> & {
  title?: ReactNode;
};

/** 卡片内嵌子项区块（灰色底，用于分组展示） */
export const CardSection = forwardRef<HTMLDivElement, CardSectionProps>(function CardSection(
  { title, className, children, ...props },
  ref
) {
  return (
    <div ref={ref} className={cn(cardSectionClass(), className)} data-card="section" {...props}>
      {title ? <div className={cardSectionTitleClass()}>{title}</div> : null}
      {children ? <div className={cardSectionBodyClass()}>{children}</div> : null}
    </div>
  );
});
CardSection.displayName = "CardSection";
