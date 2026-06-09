import { computeTooltipPosition } from "../tooltip/tooltip-position";
import type { PopconfirmPlacement } from "./popconfirm.types";

const PLACEMENT_MAP: Record<
  PopconfirmPlacement,
  | "top"
  | "bottom"
  | "left"
  | "right"
  | "top-start"
  | "top-end"
  | "bottom-start"
  | "bottom-end"
> = {
  top: "top",
  bottom: "bottom",
  left: "left",
  right: "right",
  topLeft: "top-start",
  topRight: "top-end",
  bottomLeft: "bottom-start",
  bottomRight: "bottom-end",
};

export function computePopconfirmPosition(
  trigger: DOMRect,
  panel: { width: number; height: number },
  placement: PopconfirmPlacement,
  gap = 8
) {
  return computeTooltipPosition(
    trigger,
    panel,
    PLACEMENT_MAP[placement],
    gap,
    {
      width: window.innerWidth,
      height: window.innerHeight,
    }
  );
}
