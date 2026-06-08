import type { ReactNode } from "react";
import type { ModalSizeKey } from "./modal-tokens";

export type ModalSize = ModalSizeKey;
export type ModalType = "default" | "info" | "success" | "warning" | "error";
export type ModalShowcaseState = "default" | "hover" | "loading" | "disabled";

export interface ModalHeaderProps {
  title?: ReactNode;
  titleId?: string;
  type?: ModalType;
  showClose?: boolean;
  onClose?: () => void;
  className?: string;
  children?: ReactNode;
}

export interface ModalBodyProps {
  children?: ReactNode;
  className?: string;
  slotPlaceholder?: boolean;
  scrollable?: boolean;
  compact?: boolean;
}

export interface ModalFooterProps {
  children?: ReactNode;
  className?: string;
  cancelText?: string;
  okText?: string;
  showCancel?: boolean;
  danger?: boolean;
  loading?: boolean;
  disabled?: boolean;
  showcaseState?: ModalShowcaseState;
  onCancel?: () => void;
  onOk?: () => void;
}

export interface ModalProps {
  open?: boolean;
  onClose?: () => void;
  size?: ModalSize;
  type?: ModalType;
  title?: ReactNode;
  /** 完全自定义 Header 区域（替代默认 ModalHeader） */
  header?: ReactNode;
  children?: ReactNode;
  footer?: ReactNode;
  showClose?: boolean;
  /** 点击遮罩关闭，默认 true */
  maskClosable?: boolean;
  /** 按 Esc 关闭，默认 true */
  keyboard?: boolean;
  /** 关闭后销毁子节点，默认 true */
  destroyOnClose?: boolean;
  /** 内容区 Loading 遮罩 */
  loading?: boolean;
  slotPlaceholder?: boolean;
  className?: string;
  inline?: boolean;
  previewHeight?: string;
  fullWidth?: boolean;
}

export interface ConfirmModalProps {
  open?: boolean;
  onClose?: () => void;
  type?: Exclude<ModalType, "default">;
  title?: ReactNode;
  content?: ReactNode;
  okText?: string;
  cancelText?: string;
  showCancel?: boolean;
  danger?: boolean;
  loading?: boolean;
  disabled?: boolean;
  onOk?: () => void;
  maskClosable?: boolean;
  keyboard?: boolean;
  inline?: boolean;
}

export interface FormModalProps {
  open?: boolean;
  onClose?: () => void;
  title?: ReactNode;
  onSubmit?: () => void;
  loading?: boolean;
  inline?: boolean;
  okText?: string;
  children?: ReactNode;
}

export interface DetailModalProps {
  open?: boolean;
  onClose?: () => void;
  title?: ReactNode;
  inline?: boolean;
  items?: { label: string; value: string }[];
}

export interface UploadModalProps {
  open?: boolean;
  onClose?: () => void;
  title?: ReactNode;
  onUpload?: () => void;
  loading?: boolean;
  inline?: boolean;
}

export interface ApprovalModalProps {
  open?: boolean;
  onClose?: () => void;
  title?: ReactNode;
  applicant?: string;
  amount?: string;
  onApprove?: () => void;
  onReject?: () => void;
  inline?: boolean;
}

export interface FullscreenModalProps {
  open?: boolean;
  onClose?: () => void;
  title?: ReactNode;
  onSave?: () => void;
  loading?: boolean;
  inline?: boolean;
  previewHeight?: string;
}
