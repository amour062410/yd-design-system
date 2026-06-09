import type {
  TooltipPlacement,
  TooltipPosition,
  TooltipSide,
} from "./tooltip.types";

const OPPOSITE: Record<TooltipSide, TooltipSide> = {
  top: "bottom",
  bottom: "top",
  left: "right",
  right: "left",
};

function clamp(value: number, min: number, max: number) {
  if (max < min) return min;
  return Math.min(Math.max(value, min), max);
}

/**
 * 轻量定位：基于触发元素与浮层的 viewport rect 计算 fixed 坐标，
 * 视口溢出时翻转到反向，并把坐标 / 箭头夹在视口内。无第三方依赖。
 */
export function computeTooltipPosition(
  trigger: DOMRect,
  tip: { width: number; height: number },
  placement: TooltipPlacement,
  gap: number,
  viewport: { width: number; height: number },
  edge = 8
): TooltipPosition {
  const [rawSide, align = "center"] = placement.split("-") as [
    TooltipSide,
    "start" | "end" | "center" | undefined,
  ];

  const space: Record<TooltipSide, number> = {
    top: trigger.top,
    bottom: viewport.height - trigger.bottom,
    left: trigger.left,
    right: viewport.width - trigger.right,
  };

  const vertical = rawSide === "top" || rawSide === "bottom";
  const need = (vertical ? tip.height : tip.width) + gap;

  let side = rawSide;
  if (space[rawSide] < need && space[OPPOSITE[rawSide]] > space[rawSide]) {
    side = OPPOSITE[rawSide];
  }

  let x = 0;
  let y = 0;

  if (side === "top") y = trigger.top - tip.height - gap;
  if (side === "bottom") y = trigger.bottom + gap;
  if (side === "left") x = trigger.left - tip.width - gap;
  if (side === "right") x = trigger.right + gap;

  if (side === "top" || side === "bottom") {
    if (align === "start") x = trigger.left;
    else if (align === "end") x = trigger.right - tip.width;
    else x = trigger.left + trigger.width / 2 - tip.width / 2;
  } else {
    if (align === "start") y = trigger.top;
    else if (align === "end") y = trigger.bottom - tip.height;
    else y = trigger.top + trigger.height / 2 - tip.height / 2;
  }

  x = clamp(x, edge, viewport.width - tip.width - edge);
  y = clamp(y, edge, viewport.height - tip.height - edge);

  let arrowOffset: number;
  if (side === "top" || side === "bottom") {
    arrowOffset = clamp(
      trigger.left + trigger.width / 2 - x,
      edge,
      tip.width - edge
    );
  } else {
    arrowOffset = clamp(
      trigger.top + trigger.height / 2 - y,
      edge,
      tip.height - edge
    );
  }

  return { x, y, side, arrowOffset };
}
