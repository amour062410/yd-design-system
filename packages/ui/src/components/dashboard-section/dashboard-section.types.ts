import type { HTMLAttributes, ReactNode } from "react";

export type DashboardSectionVariant = "card" | "plain";

export type DashboardSectionPadding = "small" | "middle" | "large";

export interface DashboardSectionProps
  extends Omit<HTMLAttributes<HTMLElement>, "title"> {
  /** 顶部标题栏主标题 */
  title?: ReactNode;
  /** 标题下方的辅助描述 */
  description?: ReactNode;
  /** 标题栏右侧操作区（筛选、时间范围、查看更多等） */
  extra?: ReactNode;
  /** 底部操作区（按钮组等） */
  actions?: ReactNode;
  /** 外观：card 带容器边框背景，plain 仅提供结构与间距 */
  variant?: DashboardSectionVariant;
  /** 内边距档位 */
  padding?: DashboardSectionPadding;
  /** 内容区 */
  children?: ReactNode;
}
