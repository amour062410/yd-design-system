"use client";

import type { ReactNode } from "react";
import { cn } from "../../lib/utils";
import type { FormItemStatus } from "./form.types";

export interface FormMessageProps {
  id?: string;
  /** 错误文字（优先） */
  error?: ReactNode;
  /** 帮助文字 */
  help?: ReactNode;
  status?: FormItemStatus;
  className?: string;
}

const STATUS_TEXT_CLASS: Record<FormItemStatus, string> = {
  default: "text-text-tertiary",
  success: "text-success",
  warning: "text-warning",
  error: "text-danger",
};

/**
 * 渲染规则：
 * - status=error 且有 error 文案 → 显示错误（danger）
 * - 否则若有 help → 显示帮助（按 status 着色，default 为 tertiary）
 */
export function FormMessage({
  id,
  error,
  help,
  status = "default",
  className,
}: FormMessageProps) {
  const showError = status === "error" && error != null && error !== "";
  const content = showError ? error : help;

  if (content == null || content === "") return null;

  const colorClass = showError
    ? STATUS_TEXT_CLASS.error
    : STATUS_TEXT_CLASS[status];

  return (
    <p
      id={id}
      className={cn("mt-1 text-[12px] leading-5", colorClass, className)}
    >
      {content}
    </p>
  );
}
