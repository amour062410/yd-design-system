"use client";

import { forwardRef } from "react";
import { cn } from "../../lib/utils";
import { CardSkeleton } from "./card-skeleton";
import {
  cardBodyClass,
  cardFooterClass,
  cardFooterActionsClass,
  cardExtraClass,
  cardHeaderClass,
  cardPaddingClass,
  cardRootClass,
  cardTitleClass,
} from "./card.styles";
import type { DashboardCardProps } from "./card.types";
import { renderCardAction } from "./card-text-button";

export const DashboardCard = forwardRef<HTMLDivElement, DashboardCardProps>(
  function DashboardCard(
    {
      title,
      extra,
      header,
      content,
      chart,
      footer,
      loading = false,
      hoverable = false,
      clickable = false,
      className,
      style,
      onClick,
    },
    ref
  ) {
    const isInteractive = clickable || !!onClick;

    return (
      <div
        ref={ref}
        className={cardRootClass({
          variant: "dashboard",
          hoverable: hoverable || isInteractive,
          clickable: isInteractive,
          loading,
          className: cn(cardPaddingClass("dashboard"), className),
        })}
        style={style}
        data-card="dashboard"
        role={isInteractive ? "button" : undefined}
        tabIndex={isInteractive ? 0 : undefined}
        onClick={onClick}
      >
        {loading ? (
          <CardSkeleton variant="dashboard" />
        ) : (
          <>
            {header ?? (
              (title || extra) && (
                <div className={cardHeaderClass()} data-card="header">
                  {title ? (
                    <div className={cn(cardTitleClass(), "text-[16px]")} data-card="title">
                      {title}
                    </div>
                  ) : (
                    <span />
                  )}
                  {extra ? (
                    <div className={cardExtraClass()} data-card="extra">
                      {renderCardAction(extra)}
                    </div>
                  ) : null}
                </div>
              )
            )}

            {content ? (
              <div className={cn(cardBodyClass("dashboard"), "mt-3")} data-card="content">
                {content}
              </div>
            ) : null}

            {chart ? (
              <div
                className="mt-3 min-h-[120px] rounded-[6px] bg-[color:var(--color-surface-card-soft,#f7f8fa)] p-3"
                data-card="chart"
              >
                {chart}
              </div>
            ) : null}

            {footer ? (
              <div className={cn(cardFooterClass(), cardFooterActionsClass())} data-card="footer">
                {renderCardAction(footer)}
              </div>
            ) : null}
          </>
        )}
      </div>
    );
  }
);

DashboardCard.displayName = "DashboardCard";
