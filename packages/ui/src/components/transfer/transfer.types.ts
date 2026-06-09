import type { CSSProperties, ReactNode } from "react";

export interface TransferItem {
  key: string;
  title: string;
  description?: string;
  disabled?: boolean;
}

export type TransferDirection = "left" | "right";

export interface TransferChangeInfo {
  targetKeys: string[];
  direction: TransferDirection;
  moveKeys: string[];
}

export interface TransferFooterRenderProps {
  direction: TransferDirection;
  selectedCount: number;
  totalCount: number;
}

export type TransferSearchConfig = boolean | { left?: boolean; right?: boolean };

export type TransferSearchPlaceholder = string | [string, string];

export interface TransferPanelProps {
  direction: TransferDirection;
  title?: ReactNode;
  items: TransferItem[];
  selectedKeys: string[];
  onSelectChange: (keys: string[]) => void;
  showSearch?: boolean;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  searchPlaceholder?: string;
  disabledKeys?: string[];
  disabled?: boolean;
  render?: (item: TransferItem) => ReactNode;
  footer?: ReactNode | ((props: TransferFooterRenderProps) => ReactNode);
  listStyle?: CSSProperties;
  onItemDoubleClick?: (item: TransferItem) => void;
}

export interface TransferProps {
  dataSource: TransferItem[];
  targetKeys?: string[];
  defaultTargetKeys?: string[];
  onChange?: (targetKeys: string[], direction: TransferDirection, moveKeys: string[]) => void;
  render?: (item: TransferItem) => ReactNode;
  titles?: [ReactNode, ReactNode];
  showSearch?: TransferSearchConfig;
  searchPlaceholder?: TransferSearchPlaceholder;
  oneWay?: boolean;
  disabledKeys?: string[];
  disabled?: boolean;
  footer?: ReactNode | ((props: TransferFooterRenderProps) => ReactNode);
  listStyle?: CSSProperties | [CSSProperties?, CSSProperties?];
  className?: string;
  style?: CSSProperties;
}

export type StoreTransferProps = Omit<TransferProps, "titles" | "dataSource"> & {
  titles?: [ReactNode, ReactNode];
  dataSource?: TransferItem[];
};

export type InspectorTransferProps = StoreTransferProps;
export type PermissionTransferProps = StoreTransferProps;
