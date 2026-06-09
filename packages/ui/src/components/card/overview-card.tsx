"use client";

import { forwardRef } from "react";
import { cn } from "../../lib/utils";
import { CardSkeleton } from "./card-skeleton";
import {
  cardExtraClass,
  cardHeaderClass,
  cardMetaLabelClass,
  cardMetaRowClass,
  cardMetaValueClass,
  cardPaddingClass,
  cardRootClass,
  cardSmallClass,
  cardStatusBadgeClass,
  cardTitleClass,
} from "./card.styles";
import type { OverviewCardProps } from "./card.types";

export const OverviewCard = forwardRef<HTMLDivElement, OverviewCardProps>(
  function OverviewCard(
    {
      title,
      status,
      statusLabel = "营业状态",
      items = [],
      extra,
      size = "small",
      loading = false,
      hoverable = true,
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
          variant: "compact",
          hoverable: hoverable || isInteractive,
          clickable: isInteractive,
          loading,
          className: cn(cardPaddingClass("compact"), cardSmallClass(size), className),
        })}
        style={style}
        data-card="overview"
        role={isInteractive ? "button" : undefined}
        tabIndex={isInteractive ? 0 : undefined}
        onClick={onClick}
      >
        {loading ? (
          <CardSkeleton variant="compact" />
        ) : (
          <>
            <div className={cardHeaderClass()} data-card="header">
              <div className={cn(cardTitleClass(), "text-[15px] leading-[22px]")} data-card="title">
                {title}
              </div>
              {extra ? <div className={cardExtraClass()} data-card="extra">{extra}</div> : null}
            </div>

            {status ? (
              <div className={cardMetaRowClass(true)}>
                <span className={cardMetaLabelClass()}>{statusLabel}：</span>
                <span className={cardMetaValueClass(true)}>
                  <span className={cardStatusBadgeClass("success")}>{status}</span>
                </span>
              </div>
            ) : null}

            <div className="mt-1" data-card="body">
              {items.map((item, index) => (
                <div key={index} className={cardMetaRowClass(true)} data-card="item">
                  <span className={cardMetaLabelClass()}>{item.label}：</span>
                  <span className={cardMetaValueClass(true)}>{item.value}</span>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    );
  }
);

OverviewCard.displayName = "OverviewCard";
