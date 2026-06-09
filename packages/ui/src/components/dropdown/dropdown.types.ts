import type { ReactNode } from "react";

export type DropdownPlacement =
  | "bottomLeft"
  | "bottomRight"
  | "topLeft"
  | "topRight";

export type DropdownTriggerEvent = "click" | "hover";

export type DropdownMenuDivider = {
  type: "divider";
  key?: string;
};

export type DropdownMenuItemConfig = {
  key: string;
  label: ReactNode;
  icon?: ReactNode;
  danger?: boolean;
  disabled?: boolean;
  onClick?: () => void;
};

export type DropdownMenuItem = DropdownMenuDivider | DropdownMenuItemConfig;

export function isDropdownDivider(
  item: DropdownMenuItem
): item is DropdownMenuDivider {
  return "type" in item && item.type === "divider";
}

export type DropdownProps = {
  /** 触发节点 */
  trigger: ReactNode;
  /** 菜单项配置 */
  menu: DropdownMenuItem[];
  /** 弹出位置，默认 bottomLeft */
  placement?: DropdownPlacement;
  /** 触发方式，默认 click */
  triggerEvent?: DropdownTriggerEvent;
  disabled?: boolean;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  /** 菜单项点击（divider 不触发） */
  onMenuClick?: (key: string, item: DropdownMenuItemConfig) => void;
  className?: string;
  menuClassName?: string;
  /** hover 进入延迟（ms） */
  mouseEnterDelay?: number;
  /** hover 离开延迟（ms） */
  mouseLeaveDelay?: number;
};

export type DropdownMenuProps = {
  items: DropdownMenuItem[];
  activeIndex: number;
  onActiveIndexChange: (index: number) => void;
  onSelect: (item: DropdownMenuItemConfig) => void;
  className?: string;
  id?: string;
};

export type DropdownItemProps = {
  item: DropdownMenuItemConfig;
  active: boolean;
  index: number;
  onSelect: (item: DropdownMenuItemConfig) => void;
  onHover: (index: number) => void;
  id?: string;
};
