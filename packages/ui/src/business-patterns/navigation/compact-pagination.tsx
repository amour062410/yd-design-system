"use client";

import { Pagination, type PaginationProps } from "../../components/pagination";

export type CompactPaginationProps = Omit<
  PaginationProps,
  "showQuickJumper" | "showSizeChanger"
> & {
  showQuickJumper?: boolean;
  showSizeChanger?: boolean;
};

/** Dashboard 紧凑分页 —— 隐藏跳转，可选页容量 */
export function CompactPagination({
  size = "small",
  showQuickJumper = false,
  showSizeChanger = false,
  showTotal = true,
  ...props
}: CompactPaginationProps) {
  return (
    <Pagination
      {...props}
      size={size}
      showQuickJumper={showQuickJumper}
      showSizeChanger={showSizeChanger}
      showTotal={showTotal}
    />
  );
}
