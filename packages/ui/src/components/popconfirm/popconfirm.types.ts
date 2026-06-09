import type { ReactNode, RefObject } from "react";

export type PopconfirmPlacement =
  | "top"
  | "bottom"
  | "left"
  | "right"
  | "topLeft"
  | "topRight"
  | "bottomLeft"
  | "bottomRight";

export type PopconfirmTrigger = "click";

export type PopconfirmProps = {
  /** 确认标题 */
  title: ReactNode;
  /** 补充说明 */
  description?: ReactNode;
  /** 触发节点 */
  children?: ReactNode;
  onConfirm?: () => void | Promise<void>;
  onCancel?: () => void;
  confirmText?: string;
  cancelText?: string;
  placement?: PopconfirmPlacement;
  trigger?: PopconfirmTrigger;
  disabled?: boolean;
  /** 确认按钮 loading（可与 async onConfirm 叠加） */
  loading?: boolean;
  /** 危险确认：确认按钮使用 danger 风格 + 危险图标 */
  danger?: boolean;
  icon?: ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  className?: string;
  overlayClassName?: string;
  zIndex?: number;
};

export type PopconfirmContentProps = {
  title: ReactNode;
  description?: ReactNode;
  icon?: ReactNode;
  danger?: boolean;
  confirmText: string;
  cancelText: string;
  loading: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  id: string;
  cancelButtonRef?: RefObject<HTMLButtonElement | null>;
};
