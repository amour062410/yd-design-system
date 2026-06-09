import type { HTMLAttributes, ReactNode } from "react";

export type DashboardSectionVariant = "card" | "plain";

export type DashboardSectionPadding = "small" | "middle" | "large";

export type DashboardSectionActionsPlacement = "header" | "footer";

export interface DashboardSectionProps
  extends Omit<HTMLAttributes<HTMLElement>, "title"> {
  /** 顶部标题栏主标题 */
  title?: ReactNode;
  /** 标题旁的副标题（次级标题，与 title 同排展示） */
  subtitle?: ReactNode;
  /** 标题下方的辅助描述 */
  description?: ReactNode;
  /** 标题栏右侧筛选区（时间范围、下拉、分段控件等） */
  filters?: ReactNode;
  /** 标题栏右侧扩展区（链接、补充信息、次要控件等） */
  extra?: ReactNode;
  /** 操作区（按钮组等），位置由 actionsPlacement 决定 */
  actions?: ReactNode;
  /**
   * actions 渲染位置。
   * - "footer"（默认）：底部操作区，保持既有行为
   * - "header"：并入标题栏右侧（filters → extra → actions）
   */
  actionsPlacement?: DashboardSectionActionsPlacement;
  /** 外观：card 带容器边框背景，plain 仅提供结构与间距 */
  variant?: DashboardSectionVariant;
  /** 内边距档位 */
  padding?: DashboardSectionPadding;
  /** 内容区 */
  children?: ReactNode;
}
