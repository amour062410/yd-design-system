"use client";

import type { ReactNode } from "react";
import { Popconfirm, type PopconfirmProps } from "../../components/popconfirm";

export type BatchActionConfirmProps = Omit<
  PopconfirmProps,
  "title" | "description"
> & {
  count: number;
  title?: ReactNode;
  description?: ReactNode;
  actionLabel?: string;
};

/** 批量操作确认 —— 批量删除 / 归档 / 导出等 */
export function BatchActionConfirm({
  count,
  title,
  description,
  actionLabel = "操作",
  danger,
  children,
  ...props
}: BatchActionConfirmProps) {
  return (
    <Popconfirm
      title={title ?? `确认${actionLabel} ${count} 条数据？`}
      description={description ?? "请确认是否继续执行批量操作"}
      danger={danger}
      {...props}
    >
      {children}
    </Popconfirm>
  );
}
