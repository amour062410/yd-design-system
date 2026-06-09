import type { CSSProperties, ReactNode } from "react";

export type TransferProMode = "list" | "tree" | "table";

export type TransferProPanelMode =
  | TransferProMode
  | {
      left?: TransferProMode;
      right?: TransferProMode;
    };

export type TransferProDirection = "left" | "right";

export type TransferProBatchStrategy = "manual" | "recommend" | "full";

export type TransferProRule =
  | "by-region"
  | "by-store-level"
  | "by-inspection-frequency"
  | "by-inspector-load";

export interface TransferProRecord {
  key: string;
  title: string;
  region?: string;
  mall?: string;
  storeLevel?: "A" | "B" | "C";
  inspectionStatus?: string;
  lastInspection?: string;
  inspector?: string;
  inspectionFrequency?: "high" | "medium" | "low";
  disabled?: boolean;
  children?: TransferProRecord[];
}

export interface TransferProTreeNode {
  key: string;
  title: ReactNode;
  children?: TransferProTreeNode[];
  disabled?: boolean;
  isLeaf?: boolean;
  meta?: Partial<TransferProRecord>;
}

export interface TransferProInspector {
  key: string;
  name: string;
  region: string;
  load: number;
  disabled?: boolean;
}

export interface TransferProChangeInfo {
  direction: TransferProDirection;
  moveKeys: string[];
  batchStrategy?: TransferProBatchStrategy;
  rule?: TransferProRule;
}

export interface TransferProDiffResult {
  added: string[];
  removed: string[];
  unchanged: string[];
}

export interface TransferProTableColumn<T extends TransferProRecord = TransferProRecord> {
  key: string;
  title: string;
  dataIndex?: keyof T;
  width?: number | string;
  render?: (value: unknown, record: T) => ReactNode;
}

export interface TransferProProps {
  mode?: TransferProPanelMode;
  dataSource?: TransferProRecord[];
  treeData?: TransferProTreeNode[];
  targetKeys?: string[];
  baselineKeys?: string[];
  defaultTargetKeys?: string[];
  onChange?: (targetKeys: string[], info: TransferProChangeInfo) => void;
  titles?: [ReactNode, ReactNode];
  showSearch?: boolean;
  showDiff?: boolean;
  showBatchToolbar?: boolean;
  batchStrategy?: TransferProBatchStrategy;
  onBatchStrategyChange?: (strategy: TransferProBatchStrategy) => void;
  activeRule?: TransferProRule;
  onRuleApply?: (rule: TransferProRule, keys: string[]) => void;
  disabledKeys?: string[];
  disabled?: boolean;
  checkStrictly?: boolean;
  tableColumns?: TransferProTableColumn[];
  oneWay?: boolean;
  panelWidth?: number;
  tablePanelWidth?: number;
  resizable?: boolean;
  className?: string;
  style?: CSSProperties;
}

export interface TransferProPanelBaseProps {
  direction: TransferProDirection;
  title?: ReactNode;
  selectedKeys: string[];
  onSelectChange: (keys: string[], event?: { append?: boolean }) => void;
  searchValue: string;
  onSearchChange: (value: string) => void;
  showSearch?: boolean;
  disabled?: boolean;
  disabledKeys?: string[];
  diffKeys?: { added: Set<string>; removed: Set<string> };
  onItemDoubleClick?: (key: string) => void;
  panelWidth?: number;
}

export interface TransferProListPanelProps extends TransferProPanelBaseProps {
  items: TransferProRecord[];
}

export interface TransferProTreePanelProps extends TransferProPanelBaseProps {
  treeData: TransferProTreeNode[];
  expandedKeys: string[];
  onExpandChange: (keys: string[]) => void;
  checkStrictly?: boolean;
  transferableKeys: Set<string>;
}

export interface TransferProTablePanelProps extends TransferProPanelBaseProps {
  items: TransferProRecord[];
  columns: TransferProTableColumn[];
}
