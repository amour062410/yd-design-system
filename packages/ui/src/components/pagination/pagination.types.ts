import type { ReactNode } from "react";

export type PaginationSize = "small" | "default";

export type PaginationProps = {
  /** 当前页（受控） */
  current?: number;
  /** 默认当前页 */
  defaultCurrent?: number;
  /** 每页条数（受控） */
  pageSize?: number;
  /** 默认每页条数 */
  defaultPageSize?: number;
  /** 数据总数 */
  total?: number;
  /** 禁用 */
  disabled?: boolean;
  /** 尺寸 */
  size?: PaginationSize;
  /** 简洁模式 `< 1 / 50 >` */
  simple?: boolean;
  /** 展示总数 */
  showTotal?: boolean;
  /** 快速跳转 */
  showQuickJumper?: boolean;
  /** 页容量切换 */
  showSizeChanger?: boolean;
  /** 仅一页时隐藏 */
  hideOnSinglePage?: boolean;
  /** 页容量选项 */
  pageSizeOptions?: number[];
  /** 页码或页容量变化 */
  onChange?: (page: number, pageSize: number) => void;
  /** 页容量变化 */
  onShowSizeChange?: (current: number, size: number) => void;
  className?: string;
};

export type PaginationItemProps = {
  page: number;
  active?: boolean;
  disabled?: boolean;
  size?: PaginationSize;
  onClick?: (page: number) => void;
};

export type PaginationNavButtonProps = {
  direction: "prev" | "next";
  disabled?: boolean;
  size?: PaginationSize;
  onClick?: () => void;
  simple?: boolean;
};

export type PaginationJumperProps = {
  value: string;
  disabled?: boolean;
  size?: PaginationSize;
  onChange: (value: string) => void;
  onJump: () => void;
};

export type PaginationSizeChangerProps = {
  value: number;
  options: number[];
  disabled?: boolean;
  size?: PaginationSize;
  onChange: (pageSize: number) => void;
};

export type PaginationTotalProps = {
  total: number;
  size?: PaginationSize;
};
