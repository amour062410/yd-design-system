import { Transfer } from "./transfer";
import {
  INSPECTOR_TRANSFER_DATA,
  INSPECTOR_TRANSFER_DISABLED_KEYS,
  PERMISSION_TRANSFER_DATA,
  STORE_TRANSFER_DATA,
  STORE_TRANSFER_DISABLED_KEYS,
} from "./transfer-data";
import type {
  InspectorTransferProps,
  PermissionTransferProps,
  StoreTransferProps,
} from "./transfer.types";

export function StoreTransfer({
  titles = ["待分配门店", "已分配门店"],
  disabledKeys = STORE_TRANSFER_DISABLED_KEYS,
  dataSource = [...STORE_TRANSFER_DATA],
  ...props
}: StoreTransferProps) {
  return (
    <Transfer
      dataSource={dataSource}
      titles={titles}
      disabledKeys={disabledKeys}
      {...props}
    />
  );
}

export function InspectorTransfer({
  titles = ["待分配巡检员", "已分配巡检员"],
  disabledKeys = INSPECTOR_TRANSFER_DISABLED_KEYS,
  dataSource = [...INSPECTOR_TRANSFER_DATA],
  ...props
}: InspectorTransferProps) {
  return (
    <Transfer
      dataSource={dataSource}
      titles={titles}
      disabledKeys={disabledKeys}
      {...props}
    />
  );
}

export function PermissionTransfer({
  titles = ["可选权限", "已授权权限"],
  dataSource = [...PERMISSION_TRANSFER_DATA],
  ...props
}: PermissionTransferProps) {
  return (
    <Transfer
      dataSource={dataSource}
      titles={titles}
      {...props}
    />
  );
}
