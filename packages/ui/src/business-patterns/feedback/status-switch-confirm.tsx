"use client";

import type { ReactNode } from "react";
import { Popconfirm, type PopconfirmProps } from "../../components/popconfirm";

export type StatusSwitchAction = "enable" | "disable" | "freeze" | "unfreeze";

const STATUS_COPY: Record<
  StatusSwitchAction,
  { title: string; description: string; danger?: boolean }
> = {
  enable: {
    title: "确认启用？",
    description: "启用后该对象将恢复正常使用",
  },
  disable: {
    title: "确认禁用？",
    description: "禁用后该对象将无法继续使用",
    danger: true,
  },
  freeze: {
    title: "确认冻结？",
    description: "冻结后该对象将被限制操作",
    danger: true,
  },
  unfreeze: {
    title: "确认解冻？",
    description: "解冻后该对象将恢复可操作状态",
  },
};

export type StatusSwitchConfirmProps = Omit<
  PopconfirmProps,
  "title" | "description" | "danger"
> & {
  action: StatusSwitchAction;
  title?: ReactNode;
  description?: ReactNode;
};

/** 状态切换确认 —— 启用 / 禁用 / 冻结 / 解冻 */
export function StatusSwitchConfirm({
  action,
  title,
  description,
  children,
  ...props
}: StatusSwitchConfirmProps) {
  const copy = STATUS_COPY[action];
  return (
    <Popconfirm
      title={title ?? copy.title}
      description={description ?? copy.description}
      danger={copy.danger}
      {...props}
    >
      {children}
    </Popconfirm>
  );
}
