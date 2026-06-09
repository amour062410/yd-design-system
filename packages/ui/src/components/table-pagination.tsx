"use client";

import { Pagination, type PaginationProps } from "./pagination";

/** Table 分页配置 —— 与 Pagination 对齐，供 Table pagination prop 使用 */
export type TablePaginationConfig = PaginationProps;

export function TablePagination({
  className,
  showTotal = true,
  showSizeChanger = true,
  showQuickJumper = true,
  ...props
}: TablePaginationConfig & { className?: string }) {
  return (
    <Pagination
      {...props}
      showTotal={showTotal}
      showSizeChanger={showSizeChanger}
      showQuickJumper={showQuickJumper}
      className={className ?? "pt-4"}
    />
  );
}
