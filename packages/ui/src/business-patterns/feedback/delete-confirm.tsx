"use client";

import type { ReactNode } from "react";
import { Popconfirm, type PopconfirmProps } from "../../components/popconfirm";

export type DeleteConfirmProps = Omit<
  PopconfirmProps,
  "title" | "description" | "danger"
> & {
  title?: ReactNode;
  description?: ReactNode;
};

/** 删除确认 —— 员工 / 项目 / 任务 / 角色 / 部门等通用删除场景 */
export function DeleteConfirm({
  title = "确认删除该数据？",
  description = "删除后无法恢复",
  children,
  ...props
}: DeleteConfirmProps) {
  return (
    <Popconfirm title={title} description={description} danger {...props}>
      {children}
    </Popconfirm>
  );
}
