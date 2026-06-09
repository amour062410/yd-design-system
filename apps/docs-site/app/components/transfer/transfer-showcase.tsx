"use client";

import { useState } from "react";
import {
  InspectorTransfer,
  PermissionTransfer,
  STORE_TRANSFER_DATA,
  StoreTransfer,
  Transfer,
} from "@yd-ds/ui/transfer";
import { ComponentDemoBlock } from "@/components/docs/component-demo-block";
import { TRANSFER_DEMO_CODES } from "@/lib/data/transferMock";

export function TransferBasicShowcase() {
  const [basicKeys, setBasicKeys] = useState<string[]>(["mixc"]);
  const [oneWayKeys, setOneWayKeys] = useState<string[]>(["inspection-manage"]);

  return (
    <div className="flex flex-col gap-12">
      <ComponentDemoBlock
        title="基本用法"
        description="左右两栏穿梭，Checkbox 勾选后点击中间箭头批量移动，双击单条可快速移动。"
        code={TRANSFER_DEMO_CODES.basic}
      >
        <Transfer
          dataSource={[...STORE_TRANSFER_DATA]}
          targetKeys={basicKeys}
          onChange={(keys) => setBasicKeys(keys)}
          titles={["待分配门店", "已分配门店"]}
        />
      </ComponentDemoBlock>

      <ComponentDemoBlock
        title="可勾选"
        description="头部全选/半选，支持批量勾选后移动。"
        code={TRANSFER_DEMO_CODES.checkable}
      >
        <Transfer
          dataSource={[...STORE_TRANSFER_DATA]}
          targetKeys={basicKeys}
          onChange={(keys) => setBasicKeys(keys)}
          titles={["待分配门店", "已分配门店"]}
        />
      </ComponentDemoBlock>

      <ComponentDemoBlock
        title="单向分配"
        description="仅允许从左侧移动到右侧，适用于权限授权场景。"
        code={TRANSFER_DEMO_CODES.oneWay}
      >
        <PermissionTransfer oneWay targetKeys={oneWayKeys} onChange={(keys) => setOneWayKeys(keys)} />
      </ComponentDemoBlock>
    </div>
  );
}

export function TransferBusinessShowcase() {
  const [storeKeys, setStoreKeys] = useState<string[]>(["wanda-plaza", "ifs"]);
  const [inspectorKeys, setInspectorKeys] = useState<string[]>(["zhangwei", "lina"]);
  const [permissionKeys, setPermissionKeys] = useState<string[]>(["inspection-manage"]);

  return (
    <div className="flex flex-col gap-12">
      <ComponentDemoBlock
        title="门店分配"
        description="巡检任务分配门店，社区超市为不可分配项。"
        code={TRANSFER_DEMO_CODES.store}
      >
        <StoreTransfer showSearch targetKeys={storeKeys} onChange={(keys) => setStoreKeys(keys)} />
      </ComponentDemoBlock>

      <ComponentDemoBlock
        title="巡检员分配"
        description="分配巡检员到区域，赵明为冻结人员不可选。"
        code={TRANSFER_DEMO_CODES.inspector}
      >
        <InspectorTransfer targetKeys={inspectorKeys} onChange={(keys) => setInspectorKeys(keys)} />
      </ComponentDemoBlock>

      <ComponentDemoBlock
        title="权限分配"
        description="角色权限配置，从可选权限授权到已授权列表。"
        code={TRANSFER_DEMO_CODES.permission}
      >
        <PermissionTransfer targetKeys={permissionKeys} onChange={(keys) => setPermissionKeys(keys)} />
      </ComponentDemoBlock>
    </div>
  );
}

export function TransferAdvancedShowcase() {
  const [targetKeys, setTargetKeys] = useState<string[]>(["global-harbor"]);

  return (
    <ComponentDemoBlock
      title="搜索过滤 + 禁用 + 统计"
      description="左右独立搜索，disabled 项不可分配，底部展示已选统计。"
      code={TRANSFER_DEMO_CODES.advanced}
    >
      <StoreTransfer
        showSearch
        targetKeys={targetKeys}
        onChange={(keys) => setTargetKeys(keys)}
        footer={({ direction, selectedCount }) =>
          direction === "right" ? `已选 ${selectedCount} 家门店` : `待分配 ${selectedCount} 项`
        }
      />
    </ComponentDemoBlock>
  );
}
