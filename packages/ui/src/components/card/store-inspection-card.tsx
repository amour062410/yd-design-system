"use client";

import { forwardRef } from "react";
import { cn } from "../../lib/utils";
import { CardSkeleton } from "./card-skeleton";
import {
  cardMetaLabelClass,
  cardMetaRowClass,
  cardMetaValueClass,
  cardPaddingClass,
  cardRootClass,
  cardScoreUnitClass,
  cardScoreValueClass,
  cardSmallClass,
  cardTitleClass,
  getCardScoreColor,
  resolveCardScoreTone,
} from "./card.styles";
import type { StoreInspectionCardProps } from "./card.types";

export const StoreInspectionCard = forwardRef<HTMLDivElement, StoreInspectionCardProps>(
  function StoreInspectionCard(
    {
      storeName,
      score,
      inspector,
      inspectionTime,
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
    const scoreColor = getCardScoreColor(score);

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
        data-card="store-inspection"
        role={isInteractive ? "button" : undefined}
        tabIndex={isInteractive ? 0 : undefined}
        onClick={onClick}
      >
        {loading ? (
          <CardSkeleton variant="compact" />
        ) : (
          <>
            <div className={cn(cardTitleClass(), "text-[15px] leading-[22px]")} data-card="title">
              {storeName}
            </div>

            <div className="mt-3">
              <div className={cardMetaLabelClass()}>巡检得分</div>
              <div className="mt-1 flex items-end gap-1">
                <span
                  className={cardScoreValueClass()}
                  style={{ color: scoreColor }}
                  data-card="score"
                  data-score-tone={resolveCardScoreTone(score)}
                >
                  {score}
                </span>
                <span className={cardScoreUnitClass()} style={{ color: scoreColor }}>
                  分
                </span>
              </div>
            </div>

            <div className="mt-3 space-y-0.5" data-card="meta">
              <div className={cardMetaRowClass(true)}>
                <span className={cardMetaLabelClass()}>巡检人</span>
                <span className={cardMetaValueClass(true)}>{inspector}</span>
              </div>
              <div className={cardMetaRowClass(true)}>
                <span className={cardMetaLabelClass()}>巡检时间</span>
                <span className={cardMetaValueClass(true)}>{inspectionTime}</span>
              </div>
            </div>
          </>
        )}
      </div>
    );
  }
);

StoreInspectionCard.displayName = "StoreInspectionCard";
