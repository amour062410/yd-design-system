"use client";

import { Pagination, type PaginationProps } from "../../components/pagination";

export type MobilePaginationProps = Omit<PaginationProps, "simple" | "size">;

/** 移动端分页 —— 自动使用 simple 简洁模式 */
export function MobilePagination(props: MobilePaginationProps) {
  return (
    <Pagination
      {...props}
      simple
      size="small"
      showQuickJumper={false}
      showSizeChanger={false}
      showTotal={props.showTotal ?? false}
    />
  );
}
