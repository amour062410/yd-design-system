"use client";

import { Pagination, type PaginationProps } from "../../components/pagination";

export type StandardTablePaginationProps = Omit<
  PaginationProps,
  "showTotal" | "showSizeChanger" | "showQuickJumper"
> & {
  showTotal?: boolean;
  showSizeChanger?: boolean;
  showQuickJumper?: boolean;
};

/** 标准表格分页 —— 员工 / 项目 / 客户 / 订单 / 任务管理等后台列表 */
export function StandardTablePagination({
  showTotal = true,
  showSizeChanger = true,
  showQuickJumper = true,
  pageSizeOptions = [10, 20, 50, 100],
  defaultPageSize = 20,
  ...props
}: StandardTablePaginationProps) {
  return (
    <Pagination
      {...props}
      showTotal={showTotal}
      showSizeChanger={showSizeChanger}
      showQuickJumper={showQuickJumper}
      pageSizeOptions={pageSizeOptions}
      defaultPageSize={defaultPageSize}
    />
  );
}
