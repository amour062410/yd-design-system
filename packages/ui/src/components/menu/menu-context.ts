"use client";

import { createContext, useContext } from "react";
import type {
  MenuExpandIconProps,
  MenuItemConfig,
  MenuMode,
  MenuTheme,
  SelectInfo,
} from "./menu.types";

export type MenuContextValue = {
  mode: MenuMode;
  theme: MenuTheme;
  selectedKeys: string[];
  openKeys: string[];
  collapsed: boolean;
  collapsedWidth: number;
  expandIcon?: React.ReactNode | ((props: MenuExpandIconProps) => React.ReactNode);
  onSelectItem: (item: MenuItemConfig, keyPath: string[]) => void;
  onToggleSubMenu: (key: string) => void;
  isSelected: (key: string) => boolean;
  isOpen: (key: string) => boolean;
};

export const MenuContext = createContext<MenuContextValue | null>(null);

export function useMenuContext() {
  const context = useContext(MenuContext);
  if (!context) {
    throw new Error("Menu compound components must be used within Menu");
  }
  return context;
}

export function createSelectInfo(
  item: MenuItemConfig,
  keyPath: string[],
  selectedKeys: string[]
): SelectInfo {
  return {
    key: item.key,
    keyPath,
    item,
    selectedKeys,
  };
}
