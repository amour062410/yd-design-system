"use client";

import { forwardRef } from "react";
import { ArrowDown, ArrowUp, Minus } from "lucide-react";
import { cn } from "../../lib/utils";
import { CardSkeleton } from "./card-skeleton";
import {
  cardPaddingClass,
  cardRootClass,
  cardSubTitleClass,
  cardTitleClass,
  cardTrendClass,
  cardUnitClass,
  cardValueClass,
  inferTrendDirection,
} from "./card.styles";
import type { StatisticsCardProps } from "./card.types";

const TREND_ICON = {
  up: ArrowUp,
  down: ArrowDown,
  flat: Minus,
} as const;

export const StatisticsCard = forwardRef<HTMLDivElement, StatisticsCardProps>(
  function StatisticsCard(
    {
      title,
      value,
      unit,
      trend,
      trendDirection,
      loading = false,
      hoverable = true,
      clickable = false,
      className,
      style,
      onClick,
    },
    ref
  ) {
    const direction =
      trendDirection ?? inferTrendDirection(trend == null ? undefined : String(trend));
    const TrendIcon = TREND_ICON[direction];
    const isInteractive = clickable || !!onClick;

    return (
      <div
        ref={ref}
        className={cardRootClass({
          variant: "statistics",
          hoverable: hoverable || isInteractive,
          clickable: isInteractive,
          loading,
          className: cn(cardPaddingClass("statistics"), className),
        })}
        style={style}
        data-card="statistics"
        role={isInteractive ? "button" : undefined}
        tabIndex={isInteractive ? 0 : undefined}
        onClick={onClick}
      >
        {loading ? (
          <CardSkeleton variant="statistics" />
        ) : (
          <>
            <div className={cardTitleClass()} data-card="title">
              {title}
            </div>
            <div className="mt-3 flex flex-wrap items-end gap-x-2 gap-y-1">
              <span className={cardValueClass()} data-card="value">
                {value}
              </span>
              {unit ? (
                <span className={cardUnitClass()} data-card="unit">
                  {unit}
                </span>
              ) : null}
            </div>
            {trend ? (
              <div className={cn(cardTrendClass(direction), "mt-2")} data-card="trend">
                <TrendIcon className="size-3.5" aria-hidden />
                <span>{trend}</span>
              </div>
            ) : null}
          </>
        )}
      </div>
    );
  }
);

StatisticsCard.displayName = "StatisticsCard";
