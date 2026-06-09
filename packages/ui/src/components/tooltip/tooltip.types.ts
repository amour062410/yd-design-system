import type { ReactNode } from "react";

export type TooltipPlacement =
  | "top"
  | "top-start"
  | "top-end"
  | "bottom"
  | "bottom-start"
  | "bottom-end"
  | "left"
  | "left-start"
  | "left-end"
  | "right"
  | "right-start"
  | "right-end";

export type TooltipTrigger = "hover" | "focus" | "click";

/** 预设语义色，或任意自定义颜色字符串（hex / rgb / css 变量） */
export type TooltipColor =
  | "default"
  | "primary"
  | "success"
  | "warning"
  | "danger"
  | "info"
  | (string & {});

export interface TooltipProps {
  /** 浮层内容；为空时不展示 */
  content: ReactNode;
  /** 触发节点（单个元素或文本） */
  children: ReactNode;
  /** 弹出位置，默认 top */
  placement?: TooltipPlacement;
  /** 触发方式，默认 ["hover","focus"] */
  trigger?: TooltipTrigger | TooltipTrigger[];
  /** 背景色：预设语义色或自定义颜色，默认 default（深色） */
  color?: TooltipColor;
  /** 受控显隐 */
  open?: boolean;
  /** 非受控默认显隐 */
  defaultOpen?: boolean;
  /** 显隐变化回调 */
  onOpenChange?: (open: boolean) => void;
  /** hover 进入延迟（ms），默认 100 */
  mouseEnterDelay?: number;
  /** hover 离开延迟（ms），默认 100 */
  mouseLeaveDelay?: number;
  /** 禁用浮层 */
  disabled?: boolean;
  /** 是否显示箭头，默认 true */
  arrow?: boolean;
  /** 最大宽度 */
  maxWidth?: number | string;
  /** 浮层内容类名 */
  className?: string;
  /** 层级，默认 1070 */
  zIndex?: number;
}

export type TooltipSide = "top" | "bottom" | "left" | "right";

export interface TooltipPosition {
  x: number;
  y: number;
  side: TooltipSide;
  /** 箭头沿浮层边的偏移量（px） */
  arrowOffset: number;
}
