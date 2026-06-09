import type { ReactNode } from "react";
import type { CascaderSizeKey } from "@yd-ds/tokens";

export type CascaderShowcaseState =
  | "default"
  | "hover"
  | "focus"
  | "disabled"
  | "error";

export type CascaderExpandTrigger = "click" | "hover";

export type CascaderCheckedStrategy = "SHOW_PARENT" | "SHOW_CHILD";

export type CascaderOption = {
  label: string;
  value: string;
  disabled?: boolean;
  /** 标记为叶子节点（动态加载场景），即使暂无 children 也可选中 */
  isLeaf?: boolean;
  /** 子级加载中 */
  loading?: boolean;
  children?: CascaderOption[];
};

export type CascaderFieldNames = {
  label?: string;
  value?: string;
  children?: string;
  isLeaf?: string;
};

export interface CascaderProps {
  options?: CascaderOption[];
  /** 单选：路径 value 数组；多选：路径数组的数组 */
  value?: string[] | string[][];
  defaultValue?: string[] | string[][];
  placeholder?: string;
  disabled?: boolean;
  status?: "error";
  size?: CascaderSizeKey;
  allowClear?: boolean;
  showSearch?: boolean;
  searchPlaceholder?: string;
  /** 自定义搜索过滤，默认匹配路径 label / value */
  filter?: (inputValue: string, path: CascaderOption[]) => boolean;
  onSearch?: (value: string) => void;
  changeOnSelect?: boolean;
  expandTrigger?: CascaderExpandTrigger;
  /** hover 展开延迟（ms），默认 150，对齐 Ant hover 体验 */
  expandDelay?: number;
  fieldNames?: CascaderFieldNames;
  separator?: string;
  /** 自定义选中项展示，Ant displayRender */
  displayRender?: (
    labels: string[],
    selectedOptions: CascaderOption[]
  ) => ReactNode;
  /** 多选模式（Ant multiple） */
  multiple?: boolean;
  /** 多选展示策略，默认 SHOW_CHILD */
  showCheckedStrategy?: CascaderCheckedStrategy;
  maxTagCount?: number;
  /** 下拉面板最小宽度对齐触发器（Ant popupMatchSelectWidth），默认 true */
  popupMatchSelectWidth?: boolean;
  notFoundContent?: ReactNode;
  className?: string;
  /** 单选 onChange */
  onChange?: (
    value: string[] | string[][],
    selectedOptions: CascaderOption[] | CascaderOption[][]
  ) => void;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  /** 文档静态矩阵 */
  showcaseState?: CascaderShowcaseState;
}

export type NormalizedCascaderOption = CascaderOption;

export type CascaderSearchResult = {
  path: CascaderOption[];
  labels: string;
};

export type CascaderPanelFocus = {
  column: number;
  index: number;
};
