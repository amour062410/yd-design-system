"use client";

import { Children, isValidElement, useMemo, type ReactElement } from "react";
import { cn } from "../../lib/utils";
import { StepContent, StepIcon } from "./step";
import { getTailColor, resolveStepStatus } from "./steps-styles";
import type {
  StepItem,
  StepProps,
  StepsProps,
  StepStatus,
} from "./steps.types";

function normalizeItems(
  items?: StepItem[],
  children?: React.ReactNode
): StepItem[] {
  if (items?.length) return items;
  if (!children) return [];

  return Children.toArray(children)
    .filter(isValidElement)
    .map((child) => {
      const props = (child as ReactElement<StepProps>).props;
      return {
        title: props.title,
        description: props.description,
        subTitle: props.subTitle,
        icon: props.icon,
        status: props.status,
        disabled: props.disabled,
      };
    });
}

export function Steps({
  current = 0,
  status,
  direction = "horizontal",
  size = "middle",
  items,
  onChange,
  className,
  style,
  children,
}: StepsProps) {
  const stepItems = useMemo(
    () => normalizeItems(items, children),
    [items, children]
  );

  const isVertical = direction === "vertical";
  const ICON_PX: Record<NonNullable<StepsProps["size"]>, number> = {
    small: 24,
    middle: 32,
    large: 40,
  };
  const iconPx = ICON_PX[size ?? "middle"];
  const iconRadius = iconPx / 2;

  return (
    <div
      role="list"
      aria-label="步骤条"
      className={cn(
        "yd-steps w-full",
        isVertical ? "flex flex-col" : "flex items-start",
        className
      )}
      style={style}
      data-direction={direction}
      data-size={size}
    >
      {stepItems.map((item, index) => {
        const resolvedStatus = resolveStepStatus(
          index,
          current,
          item.status,
          status
        );
        const isLast = index === stepItems.length - 1;
        const tailSegmentStatus =
          index < current ? ("finish" as StepStatus) : ("wait" as StepStatus);
        const clickable = Boolean(onChange) && !item.disabled;

        const stepNode = (
          <div
            key={index}
            role="listitem"
            aria-current={index === current ? "step" : undefined}
            className={cn(
              "relative flex min-w-0",
              isVertical ? "gap-6 py-5" : "flex-1 flex-col items-center",
              clickable && "cursor-pointer",
              item.disabled && "cursor-not-allowed opacity-60"
            )}
            onClick={() => {
              if (clickable) onChange?.(index);
            }}
            onKeyDown={(e) => {
              if (clickable && (e.key === "Enter" || e.key === " ")) {
                e.preventDefault();
                onChange?.(index);
              }
            }}
            tabIndex={clickable ? 0 : undefined}
          >
            {isVertical ? (
              <>
                <div
                  className="relative flex shrink-0 flex-col items-center"
                  style={{ width: iconPx }}
                >
                  <StepIcon
                    status={resolvedStatus}
                    index={index}
                    icon={item.icon}
                    size={size}
                  />
                  {!isLast ? (
                    <div
                      className="absolute left-1/2 w-[2px] rounded-[1px]"
                      style={{
                        top: iconPx,
                        bottom: -20,
                        transform: "translateX(-50%)",
                        backgroundColor: getTailColor(tailSegmentStatus),
                      }}
                    />
                  ) : null}
                </div>
                <StepContent
                  title={item.title}
                  description={item.description}
                  subTitle={item.subTitle}
                  status={resolvedStatus}
                  size={size}
                  direction={direction}
                />
              </>
            ) : (
              <>
                {!isLast ? (
                  <div
                    className="absolute z-[0] rounded-[1px]"
                    style={{
                      top: iconPx / 2 - 1,
                      left: `calc(50% + ${iconRadius}px)`,
                      right: `calc(-50% + ${iconRadius}px)`,
                      height: 2,
                      backgroundColor: getTailColor(tailSegmentStatus),
                    }}
                  />
                ) : null}
                <StepIcon
                  status={resolvedStatus}
                  index={index}
                  icon={item.icon}
                  size={size}
                />
                <div className="w-full">
                  <StepContent
                    title={item.title}
                    description={item.description}
                    subTitle={item.subTitle}
                    status={resolvedStatus}
                    size={size}
                    direction={direction}
                  />
                </div>
              </>
            )}
          </div>
        );

        return stepNode;
      })}
    </div>
  );
}
