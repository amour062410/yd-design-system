import type { ReactNode } from "react";
import type { DrawerSizeKey } from "./drawer-tokens";

export type DrawerSize = DrawerSizeKey;
export type DrawerPlacement = "right" | "left" | "top" | "bottom";
export type DrawerShowcaseState =
  | "default"
  | "loading"
  | "empty"
  | "disabled"
  | "error";

export type DrawerStatusTone = "default" | "success" | "warning" | "error" | "info";

export interface DrawerHeaderProps {
  title?: ReactNode;
  titleId?: string;
  description?: ReactNode;
  status?: ReactNode;
  statusTone?: DrawerStatusTone;
  showClose?: boolean;
  onClose?: () => void;
  className?: string;
  children?: ReactNode;
}

export interface DrawerBodyProps {
  children?: ReactNode;
  className?: string;
  /** @deprecated 文档不再使用 Slot 占位 */
  slotPlaceholder?: boolean;
  empty?: boolean;
  error?: boolean;
  onRetry?: () => void;
}

export interface DrawerFooterProps {
  children?: ReactNode;
  className?: string;
  cancelText?: string;
  okText?: string;
  showCancel?: boolean;
  loading?: boolean;
  disabled?: boolean;
  onCancel?: () => void;
  onOk?: () => void;
}

export interface DrawerProps {
  open?: boolean;
  onClose?: () => void;
  size?: DrawerSize;
  placement?: DrawerPlacement;
  title?: ReactNode;
  /** 完全自定义 Header（替代默认 DrawerHeader） */
  header?: ReactNode;
  description?: ReactNode;
  status?: ReactNode;
  statusTone?: DrawerStatusTone;
  children?: ReactNode;
  footer?: ReactNode;
  showFooter?: boolean;
  showClose?: boolean;
  maskClosable?: boolean;
  /** 按 Esc 关闭，默认 true（与 Modal 一致） */
  keyboard?: boolean;
  /** 关闭后销毁子节点，默认 true */
  destroyOnClose?: boolean;
  /** Push 模式：推开 DrawerPushContainer 内主内容 */
  push?: boolean;
  /** @deprecated */
  slotPlaceholder?: boolean;
  empty?: boolean;
  error?: boolean;
  onRetry?: () => void;
  /** 内容区 Loading 遮罩 + Footer loading */
  loading?: boolean;
  disabled?: boolean;
  /** 嵌套层级，影响 z-index 与内缩偏移 */
  level?: number;
  className?: string;
  inline?: boolean;
  embedded?: boolean;
  previewHeight?: string;
}

export interface UserDetailDrawerProps {
  open?: boolean;
  onClose?: () => void;
  onEdit?: () => void;
  inline?: boolean;
  previewHeight?: string;
}

export interface OrderDetailDrawerProps {
  open?: boolean;
  onClose?: () => void;
  inline?: boolean;
  previewHeight?: string;
}

export interface SystemConfigDrawerProps {
  open?: boolean;
  onClose?: () => void;
  onSave?: () => void;
  loading?: boolean;
  inline?: boolean;
  previewHeight?: string;
}

export interface ApprovalDrawerProps {
  open?: boolean;
  onClose?: () => void;
  inline?: boolean;
  previewHeight?: string;
}

export interface EditUserFormDrawerProps {
  open?: boolean;
  onClose?: () => void;
  onSave?: () => void;
}

export interface MultiLevelDrawerProps {
  /** @deprecated 请使用 NestedUserDrawerFlow */
  inline?: boolean;
  previewHeight?: string;
}
