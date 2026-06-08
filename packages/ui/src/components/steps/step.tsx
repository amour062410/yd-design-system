"use client";

import { AlertTriangle, Check, X } from "lucide-react";
import { cn } from "../../lib/utils";
import {
  descriptionStyle,
  getSizeSpec,
  getTitleColor,
  STEP_ICON_STYLES,
  subTitleStyle,
} from "./steps-styles";
import type { StepProps, StepStatus, StepsSize } from "./steps.types";

export interface StepInternalProps extends StepProps {
  index: number;
  size?: StepsSize;
  resolvedStatus: StepStatus;
  isLast?: boolean;
  showTail?: boolean;
  tailStatus?: StepStatus;
  direction?: "horizontal" | "vertical";
  onClick?: () => void;
}

const ICON_PX: Record<StepsSize, number> = {
  small: 24,
  middle: 32,
  large: 40,
};

export function StepIcon({
  status,
  index,
  icon,
  size = "middle",
}: {
  status: StepStatus;
  index: number;
  icon?: React.ReactNode;
  size?: StepsSize;
}) {
  const spec = getSizeSpec(size);
  const iconSize = spec.icon;
  const iconPx = ICON_PX[size];
  const palette = STEP_ICON_STYLES[status];

  return (
    <>
      <style>
        {`@keyframes yd-steps-pulse-ring {
  0% { box-shadow: 0 0 0 0 rgba(22,119,255,0.30); }
  100% { box-shadow: 0 0 0 6px rgba(22,119,255,0.00); }
}
@media (prefers-reduced-motion: reduce) {
  .yd-steps-pulse-ring { animation: none !important; }
}`}
      </style>
      <span
        className={cn(
          "relative z-[1] flex shrink-0 items-center justify-center rounded-full font-semibold",
          status === "process" && "yd-steps-pulse-ring"
        )}
        style={{
          width: iconSize,
          height: iconSize,
          backgroundColor: palette.bg,
          border: `2px solid ${palette.border}`,
          color: palette.numberColor,
          fontSize: "14px",
          animation:
            status === "process"
              ? "yd-steps-pulse-ring 2s ease-in-out infinite"
              : undefined,
        }}
      >
      {icon ? (
        icon
      ) : status === "finish" ? (
        <Check
          size={iconPx * 0.48}
          strokeWidth={3}
          color={palette.iconColor}
        />
      ) : status === "error" ? (
        <X size={iconPx * 0.48} strokeWidth={3} color={palette.iconColor} />
      ) : status === "warning" ? (
        <AlertTriangle
          size={iconPx * 0.48}
          strokeWidth={3}
          color={palette.iconColor}
        />
      ) : (
        <span
          style={{
            fontSize: "14px",
            fontWeight: 600,
            lineHeight: 1,
            transform: "translateY(1px)",
          }}
        >
          {index + 1}
        </span>
      )}
      </span>
    </>
  );
}

export function Step({
  title,
  description,
  subTitle,
  className,
  style,
}: StepProps) {
  return (
    <div className={cn("step-item", className)} style={style}>
      {title}
      {description}
      {subTitle}
    </div>
  );
}

export function StepContent({
  title,
  description,
  subTitle,
  status,
  size = "middle",
  direction = "horizontal",
}: {
  title?: React.ReactNode;
  description?: React.ReactNode;
  subTitle?: React.ReactNode;
  status: StepStatus;
  size?: StepsSize;
  direction?: "horizontal" | "vertical";
}) {
  const spec = getSizeSpec(size);

  if (direction === "horizontal") {
    return (
      <div className="min-w-0 w-full text-center">
        {title != null ? (
          <div
            className="mt-2 font-medium leading-snug"
            style={{
              color: getTitleColor(status),
              fontSize: spec.title,
              fontWeight: 500,
            }}
          >
            {title}
          </div>
        ) : null}
        {description != null ? (
          <p
            className="leading-snug"
            style={{
              ...descriptionStyle,
              fontSize: spec.description,
              marginTop: 4,
            }}
          >
            {description}
          </p>
        ) : null}
        {subTitle != null ? (
          <p
            className="leading-snug"
            style={{
              ...subTitleStyle,
              fontSize: spec.description,
              marginTop: 4,
            }}
          >
            {subTitle}
          </p>
        ) : null}
      </div>
    );
  }

  return (
    <div className="min-w-0 flex-1 text-left">
      {title != null ? (
        <div
          className="font-medium leading-snug"
          style={{
            color: getTitleColor(status),
            fontSize: spec.title,
            fontWeight: 500,
          }}
        >
          {title}
        </div>
      ) : null}
      {description != null ? (
        <p
          className="leading-snug"
          style={{ ...descriptionStyle, fontSize: spec.description, marginTop: 4 }}
        >
          {description}
        </p>
      ) : null}
      {subTitle != null ? (
        <p
          className="leading-snug"
          style={{ ...subTitleStyle, fontSize: spec.description, marginTop: 4 }}
        >
          {subTitle}
        </p>
      ) : null}
    </div>
  );
}
