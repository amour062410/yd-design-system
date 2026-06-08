import type { CSSProperties, ReactNode } from "react";

export type CollapseSize = "sm" | "md" | "lg";

export type CollapseExpandIconPosition = "left" | "right";

export type CollapseActiveKey = string | string[];

export interface CollapseExpandIconProps {
  isActive: boolean;
  disabled?: boolean;
}

export interface CollapseProps {
  activeKey?: CollapseActiveKey;
  defaultActiveKey?: CollapseActiveKey;
  accordion?: boolean;
  onChange?: (activeKey: CollapseActiveKey) => void;
  disabled?: boolean;
  bordered?: boolean;
  ghost?: boolean;
  size?: CollapseSize;
  expandIcon?: (props: CollapseExpandIconProps) => ReactNode;
  expandIconPosition?: CollapseExpandIconPosition;
  destroyInactivePanel?: boolean;
  /** 嵌套折叠：缩进、较小标题字号 */
  nested?: boolean;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
}

export interface CollapseItemProps {
  /** 面板唯一标识，与 React `key` 二选一 */
  panelKey?: string;
  title?: ReactNode;
  subtitle?: ReactNode;
  extra?: ReactNode;
  disabled?: boolean;
  children?: ReactNode;
  className?: string;
}

export interface CollapseItemInternalProps extends CollapseItemProps {
  panelKey: string;
}

export interface CollapseContextValue {
  activeKeys: string[];
  togglePanel: (key: string) => void;
  registerHeader: (key: string, element: HTMLButtonElement | null) => void;
  focusHeader: (key: string) => void;
  getHeaderKeys: () => string[];
  disabled: boolean;
  bordered: boolean;
  ghost: boolean;
  size: CollapseSize;
  expandIcon?: (props: CollapseExpandIconProps) => ReactNode;
  expandIconPosition: CollapseExpandIconPosition;
  destroyInactivePanel: boolean;
  nested: boolean;
  collapseId: string;
}
