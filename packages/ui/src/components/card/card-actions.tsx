"use client";

import { Children, Fragment, forwardRef, isValidElement, type ButtonHTMLAttributes, type ReactElement, type ReactNode } from "react";
import { cn } from "../../lib/utils";
import { cardActionButtonClass, cardActionDividerClass, cardActionItemWrapClass, cardActionsBarClass } from "./card.styles";

export type CardActionProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  icon?: ReactNode;
};

/** 底部操作栏单个按钮（图标居中，带 hover/active） */
export const CardAction = forwardRef<HTMLButtonElement, CardActionProps>(function CardAction(
  { icon, children, className, type = "button", ...props },
  ref
) {
  return (
    <button ref={ref} type={type} className={cn(cardActionButtonClass(), className)} {...props}>
      {icon ?? children}
    </button>
  );
});
CardAction.displayName = "CardAction";

export type CardActionsProps = {
  children: ReactNode;
  className?: string;
};

/** 卡片底部操作栏：等分布局 + 竖向分隔线，对齐设计规范 */
export function CardActions({ children, className }: CardActionsProps) {
  const items = Children.toArray(children).filter(
    (child): child is ReactElement => isValidElement(child)
  );

  return (
    <div className={cn(cardActionsBarClass(), className)} data-card="actions" role="group">
      {items.map((child, index) => (
        <Fragment key={child.key ?? index}>
          {index > 0 ? <div className={cardActionDividerClass()} aria-hidden /> : null}
          <div className={cardActionItemWrapClass()}>{child}</div>
        </Fragment>
      ))}
    </div>
  );
}

CardActions.displayName = "CardActions";
