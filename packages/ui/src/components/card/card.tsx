"use client";

import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "../../lib/utils";
import { CardSkeleton } from "./card-skeleton";
import { renderCardAction } from "./card-text-button";
import {
  cardBodyClass,
  cardContentPaddingClass,
  cardFooterClass,
  cardFooterActionsClass,
  cardExtraClass,
  cardHeaderClass,
  cardPaddingClass,
  cardPriorityBadgeClass,
  cardRootClass,
  cardStatusBadgeClass,
  cardSubTitleClass,
  cardTitleClass,
  getPriorityLabel,
  getStatusLabel,
} from "./card.styles";
import type { CardProps } from "./card.types";

export const Card = forwardRef<HTMLDivElement, CardProps>(function Card(
  {
    title,
    subTitle,
    extra,
    footer,
    cover,
    actions,
    children,
    variant = "default",
    hoverable = false,
    loading = false,
    clickable = false,
    status,
    priority,
    className,
    style,
    onClick,
  },
  ref
) {
  const isInteractive = clickable || !!onClick;
  const showHover = hoverable || isInteractive;
  const hasMediaLayout = Boolean(cover || actions);

  return (
    <div
      ref={ref}
      className={cardRootClass({
        variant,
        hoverable: showHover,
        clickable: isInteractive,
        loading,
        className: cn(
          hasMediaLayout ? "p-0" : cardPaddingClass(variant),
          className
        ),
      })}
      style={style}
      data-card="root"
      data-variant={variant}
      role={isInteractive ? "button" : undefined}
      tabIndex={isInteractive ? 0 : undefined}
      onClick={onClick}
      onKeyDown={
        isInteractive
          ? (event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                onClick?.();
              }
            }
          : undefined
      }
    >
      {(status || priority) && !loading ? (
        <div className="mb-2 flex flex-wrap items-center gap-2">
          {status ? (
            <span className={cardStatusBadgeClass(status)} data-card="status">
              {getStatusLabel(status)}
            </span>
          ) : null}
          {priority ? (
            <span className={cardPriorityBadgeClass(priority)} data-card="priority">
              {getPriorityLabel(priority)}优先级
            </span>
          ) : null}
        </div>
      ) : null}

      {loading ? (
        <CardSkeleton variant={variant} />
      ) : (
        <>
          {(title || extra) && (
            <div
              className={cn(cardHeaderClass(), hasMediaLayout && cardContentPaddingClass(variant))}
              data-card="header"
            >
              <div className="min-w-0 flex-1">
                {title ? (
                  <div className={cardTitleClass()} data-card="title">
                    {title}
                  </div>
                ) : null}
                {subTitle ? (
                  <div className={cardSubTitleClass()} data-card="subtitle">
                    {subTitle}
                  </div>
                ) : null}
              </div>
              {extra ? (
                <div className={cardExtraClass()} data-card="extra">
                  {renderCardAction(extra)}
                </div>
              ) : null}
            </div>
          )}

          {cover ? cover : null}

          {children ? (
            <div
              className={cn(
                cardBodyClass(variant),
                hasMediaLayout
                  ? cn(cardContentPaddingClass(variant), !(title || extra) && "pt-4")
                  : (title || extra) && "mt-3",
                !footer && !actions && hasMediaLayout && (variant === "compact" ? "pb-3" : "pb-4")
              )}
              data-card="body"
            >
              {children}
            </div>
          ) : null}

          {footer ? (
            <div
              className={cn(
                cardFooterClass(),
                cardFooterActionsClass(),
                hasMediaLayout && "mx-4 mb-3 mt-0 border-t pt-3"
              )}
              data-card="footer"
            >
              {renderCardAction(footer)}
            </div>
          ) : null}

          {actions ? actions : null}
        </>
      )}
    </div>
  );
});

Card.displayName = "Card";

/** 兼容旧版 compound API */
export const CardHeader = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  function CardHeader({ className, ...props }, ref) {
    return <div ref={ref} className={cn(cardHeaderClass(), className)} data-card="header" {...props} />;
  }
);
CardHeader.displayName = "CardHeader";

export const CardTitle = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  function CardTitle({ className, ...props }, ref) {
    return <div ref={ref} className={cn(cardTitleClass(), className)} data-card="title" {...props} />;
  }
);
CardTitle.displayName = "CardTitle";

export const CardDescription = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  function CardDescription({ className, ...props }, ref) {
    return (
      <div ref={ref} className={cn(cardSubTitleClass(), className)} data-card="subtitle" {...props} />
    );
  }
);
CardDescription.displayName = "CardDescription";

export const CardContent = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  function CardContent({ className, ...props }, ref) {
    return <div ref={ref} className={cn(cardBodyClass(), "mt-3", className)} data-card="body" {...props} />;
  }
);
CardContent.displayName = "CardContent";

export const CardFooter = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  function CardFooter({ className, ...props }, ref) {
    return <div ref={ref} className={cn(cardFooterClass(), className)} data-card="footer" {...props} />;
  }
);
CardFooter.displayName = "CardFooter";
