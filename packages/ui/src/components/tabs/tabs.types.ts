import type { ReactNode } from "react";
import type { TabsSizeKey } from "./tabs-tokens";

export type TabsType = "line" | "card" | "segment";

export type TabsShowcaseState = "default" | "hover" | "active" | "disabled";

export type TabsItem = {
  key: string;
  label: ReactNode;
  icon?: ReactNode;
  disabled?: boolean;
  /** Per-tab close button (also respects global `closable`) */
  closable?: boolean;
};

export interface TabsProps {
  items: TabsItem[];
  activeKey?: string;
  defaultActiveKey?: string;
  disabled?: boolean;
  size?: TabsSizeKey;
  type?: TabsType;
  className?: string;
  onChange?: (key: string) => void;
  /** Show close icon on tabs (skips when only one tab remains) */
  closable?: boolean;
  /** Show add (+) control for editable tabs */
  editable?: boolean;
  onTabClose?: (key: string) => void;
  onTabAdd?: () => void;
  /** Horizontal scroll with prev/next when tabs overflow */
  overflow?: boolean;
}

export interface TabShowcaseProps {
  label: ReactNode;
  icon?: ReactNode;
  state: TabsShowcaseState;
  size?: TabsSizeKey;
  type?: TabsType;
  className?: string;
}

export interface TabPanelProps {
  activeKey: string;
  tabKey: string;
  children?: ReactNode;
  className?: string;
}
