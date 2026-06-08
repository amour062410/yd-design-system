import type { ReactNode } from "react";

export type EmptyType =
  | "default"
  | "search"
  | "filter"
  | "document"
  | "folder"
  | "inspection"
  | "rectification"
  | "risk"
  | "store"
  | "device"
  | "permission"
  | "offline"
  | "error"
  | "communication"
  | "task"
  | "network";

export interface EmptyPreset {
  title: string;
  description: string;
}

export interface EmptyProps {
  /** 预设类型，自动匹配标题、描述与插画 */
  type?: EmptyType;
  title?: ReactNode;
  description?: ReactNode;
  /** 自定义插画，覆盖 type 默认插画 */
  image?: ReactNode;
  /** 底部操作区，如按钮 */
  children?: ReactNode;
  className?: string;
}
