import type { CSSProperties, ReactNode } from "react";

export type FilterBarLayout = "auto" | "fixed" | "responsive";
export type FilterBarVariant = "default" | "business";
export type FilterFieldPriority = "primary" | "secondary";

export type FilterBarProps = {
  children?: ReactNode;
  /** default：栅格布局；business：云盯业务两行布局 */
  variant?: FilterBarVariant;
  /** 筛选栏标题，与 extra 同排展示 */
  title?: ReactNode;
  onSearch?: () => void;
  onReset?: () => void;
  expandable?: boolean;
  /** 折叠时可见字段数，默认 4 */
  maxVisibleFields?: number;
  layout?: FilterBarLayout;
  sticky?: boolean;
  /** 为 false 时不渲染默认操作区 */
  showActions?: boolean;
  searchText?: string;
  resetText?: string;
  className?: string;
  style?: CSSProperties;
  /** 顶部右侧业务功能区（导出、批量操作等） */
  extra?: ReactNode;
  /** 自定义筛选操作区，传入则替换默认 FilterActions */
  actions?: ReactNode;
  /** 底部摘要区 */
  summary?: ReactNode;
  /** 匹配条数 */
  count?: number;
};

export type FilterExtraProps = {
  children?: ReactNode;
  className?: string;
};

export type FilterFieldProps = {
  label: ReactNode;
  children?: ReactNode;
  className?: string;
  hidden?: boolean;
  /** primary 独占第一行；secondary 进入第二行（business 模式） */
  priority?: FilterFieldPriority;
  /** 字段标识，便于受控与 items 配置对齐 */
  fieldKey?: string;
  /** 覆盖控件区宽度（business 模式次级字段） */
  controlClassName?: string;
};

export type FilterActionsProps = {
  onSearch?: () => void;
  onReset?: () => void;
  searchText?: string;
  resetText?: string;
  className?: string;
  children?: ReactNode;
};

export type FilterCollapseProps = {
  expanded: boolean;
  onToggle: () => void;
  hiddenCount?: number;
  className?: string;
};

export type FilterSummaryProps = {
  items?: Array<{ key: string; label: string; value: string }>;
  className?: string;
  children?: ReactNode;
};

export type FilterCountProps = {
  count: number;
  className?: string;
  prefix?: string;
  suffix?: string;
};

export type StickyFilterBarProps = {
  children?: ReactNode;
  className?: string;
  offsetTop?: number | string;
};
