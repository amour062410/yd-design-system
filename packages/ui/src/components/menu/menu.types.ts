import type { ReactNode } from "react";

export type MenuMode = "horizontal" | "vertical";
export type MenuTheme = "light" | "dark";
export type MenuItemType = "item" | "group" | "subMenu";

export type MenuItemConfig = {
  key: string;
  label: ReactNode;
  icon?: ReactNode;
  children?: MenuItemConfig[];
  disabled?: boolean;
  type?: MenuItemType;
};

export type SelectInfo = {
  key: string;
  keyPath: string[];
  item: MenuItemConfig;
  selectedKeys: string[];
};

export type MenuExpandIconProps = {
  isOpen: boolean;
  disabled?: boolean;
};

export type MenuProps = {
  mode?: MenuMode;
  items?: MenuItemConfig[];
  selectedKeys?: string[];
  defaultSelectedKeys?: string[];
  openKeys?: string[];
  defaultOpenKeys?: string[];
  onSelect?: (info: SelectInfo) => void;
  onOpenChange?: (openKeys: string[]) => void;
  collapsed?: boolean;
  onCollapse?: (collapsed: boolean) => void;
  collapsedWidth?: number;
  expandIcon?: ReactNode | ((props: MenuExpandIconProps) => ReactNode);
  overflowedIndicator?: ReactNode;
  theme?: MenuTheme;
  className?: string;
  style?: React.CSSProperties;
};

export type MenuItemProps = {
  itemKey: string;
  label: ReactNode;
  icon?: ReactNode;
  disabled?: boolean;
  level?: number;
  keyPath?: string[];
  className?: string;
};

export type MenuSubMenuProps = {
  itemKey: string;
  label: ReactNode;
  icon?: ReactNode;
  disabled?: boolean;
  children?: ReactNode;
  level?: number;
  className?: string;
};

export type MenuGroupProps = {
  title: ReactNode;
  className?: string;
};
