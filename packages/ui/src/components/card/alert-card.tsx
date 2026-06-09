"use client";

import { forwardRef } from "react";
import { cn } from "../../lib/utils";
import { CardSkeleton } from "./card-skeleton";
import {
  cardMetaLabelClass,
  cardMetaRowClass,
  cardMetaValueClass,
  cardPaddingClass,
  cardPriorityBadgeClass,
  cardRootClass,
  cardSmallClass,
  cardTitleClass,
  getPriorityLabel,
} from "./card.styles";
import type { AlertCardProps } from "./card.types";

export const AlertCard = forwardRef<HTMLDivElement, AlertCardProps>(
  function AlertCard(
    {
      alertName,
      level = "high",
      levelText,
      occurredAt,
      processStatus,
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
        data-card="alert"
        role={isInteractive ? "button" : undefined}
        tabIndex={isInteractive ? 0 : undefined}
        onClick={onClick}
      >
        {loading ? (
          <CardSkeleton variant="compact" />
        ) : (
          <>
            <div className="flex items-start justify-between gap-2">
              <div className={cn(cardTitleClass(), "text-[14px]")} data-card="title">
                {alertName}
              </div>
              <span className={cardPriorityBadgeClass(level)} data-card="level">
                {levelText ?? `${getPriorityLabel(level)}级告警`}
              </span>
            </div>

            <div className="mt-2 space-y-0.5" data-card="meta">
              <div className={cardMetaRowClass(true)}>
                <span className={cardMetaLabelClass()}>发生时间</span>
                <span className={cardMetaValueClass(true)}>{occurredAt}</span>
              </div>
              <div className={cardMetaRowClass(true)}>
                <span className={cardMetaLabelClass()}>处理状态</span>
                <span className={cardMetaValueClass(true)}>{processStatus}</span>
              </div>
            </div>
          </>
        )}
      </div>
    );
  }
);

AlertCard.displayName = "AlertCard";
