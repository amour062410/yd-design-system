"use client";

import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "../../lib/utils";
import { cardCoverClass } from "./card.styles";

export type CardCoverProps = HTMLAttributes<HTMLDivElement> & {
  src?: string;
  alt?: string;
};

/** 卡片封面区：通栏图片或自定义内容 */
export const CardCover = forwardRef<HTMLDivElement, CardCoverProps>(function CardCover(
  { src, alt = "", className, children, ...props },
  ref
) {
  return (
    <div ref={ref} className={cn(cardCoverClass(), className)} data-card="cover" {...props}>
      {src ? <img src={src} alt={alt} className="size-full object-cover" /> : children}
    </div>
  );
});
CardCover.displayName = "CardCover";
