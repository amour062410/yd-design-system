import type { CSSProperties, ReactNode } from "react";

export type DividerType = "horizontal" | "vertical";
export type DividerOrientation = "left" | "center" | "right";

export type DividerProps = {
  /** 分割线方向 */
  type?: DividerType;
  /** 带标题时的对齐方式 */
  orientation?: DividerOrientation;
  /** 虚线样式 */
  dashed?: boolean;
  /** 弱化标题样式 */
  plain?: boolean;
  /** 自定义间距（水平：上下；垂直：左右） */
  margin?: number | string;
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
  "aria-label"?: string;
};

export type DividerTextProps = {
  plain?: boolean;
  orientation?: DividerOrientation;
  className?: string;
  children?: ReactNode;
};
