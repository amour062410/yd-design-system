import type { CSSProperties, ReactNode } from "react";

export type DescriptionsSize = "small" | "default" | "middle" | "large";
export type DescriptionsLayout = "horizontal" | "vertical";
export type DescriptionsColumn = 1 | 2 | 3 | 4;
export type DescriptionsBreakpoint = "xs" | "sm" | "md" | "lg" | "xl";
export type DescriptionsColumnConfig =
  | DescriptionsColumn
  | Partial<Record<DescriptionsBreakpoint, DescriptionsColumn>>;
export type DescriptionsItemSpan = number | "filled";
export type DescriptionsSemanticDOM =
  | "root"
  | "header"
  | "title"
  | "extra"
  | "label"
  | "content";

export type DescriptionsItemConfig = {
  key?: string;
  label: ReactNode;
  value?: ReactNode;
  children?: ReactNode;
  span?: DescriptionsItemSpan;
  tooltip?: ReactNode;
  copyable?: boolean;
};

export type DescriptionsContextValue = {
  column: DescriptionsColumnConfig;
  bordered: boolean;
  size: DescriptionsSize;
  layout: DescriptionsLayout;
  colon: boolean;
  labelWidth?: number | string;
  classNames?: Partial<Record<DescriptionsSemanticDOM, string>>;
  styles?: Partial<Record<DescriptionsSemanticDOM, CSSProperties>>;
};

export type DescriptionsProps = {
  title?: ReactNode;
  extra?: ReactNode;
  column?: DescriptionsColumnConfig;
  bordered?: boolean;
  size?: DescriptionsSize;
  layout?: DescriptionsLayout;
  labelWidth?: number | string;
  colon?: boolean;
  items?: DescriptionsItemConfig[];
  children?: ReactNode;
  className?: string;
  classNames?: Partial<Record<DescriptionsSemanticDOM, string>>;
  styles?: Partial<Record<DescriptionsSemanticDOM, CSSProperties>>;
};

export type DescriptionsItemProps = {
  label: ReactNode;
  children?: ReactNode;
  span?: DescriptionsItemSpan;
  tooltip?: ReactNode;
  copyable?: boolean;
  className?: string;
};

export type DescriptionsGroupProps = {
  title?: ReactNode;
  children?: ReactNode;
  className?: string;
};
