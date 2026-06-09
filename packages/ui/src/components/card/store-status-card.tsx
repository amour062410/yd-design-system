"use client";

import { forwardRef } from "react";
import { cn } from "../../lib/utils";
import { CardSkeleton } from "./card-skeleton";
import {
  cardBodyClass,
  cardPaddingClass,
  cardRootClass,
  cardSmallClass,
  cardTitleClass,
  getStoreStatusColor,
  getStoreStatusLabel,
} from "./card.styles";
import type { StoreStatusCardProps } from "./card.types";

export const StoreStatusCard = forwardRef<HTMLDivElement, StoreStatusCardProps>(
  function StoreStatusCard(
    {
      storeName,
      status,
      statusText,
      description,
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
    const label = statusText ?? getStoreStatusLabel(status);
    const color = getStoreStatusColor(status);

    return (
      <div
        ref={ref}
        className={cardRootClass({
          variant: "compact",
          hoverable: hoverable || isInteractive,
          clickable: isInteractive,
          loading,
          className: cn(cardPaddingClass("compact"), cardSmallClass("small"), className),
        })}
        style={style}
        data-card="store-status"
        role={isInteractive ? "button" : undefined}
        tabIndex={isInteractive ? 0 : undefined}
        onClick={onClick}
      >
        {loading ? (
          <CardSkeleton variant="compact" />
        ) : (
          <>
            <div className={cardTitleClass()} data-card="title">
              {storeName}
            </div>
            <div
              className="mt-2 inline-flex items-center gap-1.5 text-[14px] font-medium leading-[22px]"
              style={{ color }}
              data-card="status"
            >
              <span
                className="size-2 rounded-full"
                style={{ backgroundColor: color }}
                aria-hidden
              />
              {label}
            </div>
            {description ? (
              <div className={cn(cardBodyClass("compact"), "mt-2")} data-card="description">
                {description}
              </div>
            ) : null}
          </>
        )}
      </div>
    );
  }
);

StoreStatusCard.displayName = "StoreStatusCard";
