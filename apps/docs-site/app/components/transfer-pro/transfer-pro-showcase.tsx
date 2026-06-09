"use client";

import { useState } from "react";
import {
  InspectorTransferPro,
  StoreTransferPro,
  TransferPro,
  TRANSFER_PRO_LIST_DATA,
} from "@yd-ds/ui/transfer-pro";
import type { TransferProBatchStrategy, TransferProRule } from "@yd-ds/ui/transfer-pro";
import { ComponentDemoBlock } from "@/components/docs/component-demo-block";
import { TRANSFER_PRO_DEMO_CODES } from "@/lib/data/transferProMock";

export function TransferProListShowcase() {
  const [keys, setKeys] = useState<string[]>(["store-gz-wanda"]);

  return (
    <ComponentDemoBlock title="基础列表模式" description="List Transfer，Checkbox + 双击移动 + Ctrl 多选。" code={TRANSFER_PRO_DEMO_CODES.list}>
      <TransferPro
        mode="list"
        dataSource={TRANSFER_PRO_LIST_DATA}
        showBatchToolbar={false}
        targetKeys={keys}
        onChange={(next) => setKeys(next)}
        titles={["待分配门店", "已分配门店"]}
      />
    </ComponentDemoBlock>
  );
}

export function TransferProTreeShowcase() {
  const [keys, setKeys] = useState<string[]>(["store-sh-wanda", "store-cd-mixc"]);

  return (
    <ComponentDemoBlock title="Tree 模式" description="华东/华南/华北 → 万达/龙湖/万象城 → 门店，父子联动选中。" code={TRANSFER_PRO_DEMO_CODES.tree}>
      <StoreTransferPro
        showSearch
        showBatchToolbar={false}
        targetKeys={keys}
        onChange={(next) => setKeys(next)}
      />
    </ComponentDemoBlock>
  );
}

export function TransferProTableShowcase() {
  const [keys, setKeys] = useState<string[]>(["store-nj-wanda"]);

  return (
    <ComponentDemoBlock
      title="Table 模式"
      description="左侧 Tree 层级，右侧 Table 运营字段视图。"
      code={TRANSFER_PRO_DEMO_CODES.table}
    >
      <div className="-mx-6 overflow-x-auto px-6">
        <TransferPro
          mode={{ left: "tree", right: "table" }}
          showSearch
          showBatchToolbar={false}
          targetKeys={keys}
          onChange={(next) => setKeys(next)}
          titles={["门店层级", "已分配门店"]}
        />
      </div>
    </ComponentDemoBlock>
  );
}

export function TransferProRuleShowcase() {
  const [keys, setKeys] = useState<string[]>([]);
  const [batchStrategy, setBatchStrategy] = useState<TransferProBatchStrategy>("manual");
  const [activeRule, setActiveRule] = useState<TransferProRule | undefined>();

  return (
    <ComponentDemoBlock title="Rule Engine" description="按区域/等级/频率/负载规则自动分配。" code={TRANSFER_PRO_DEMO_CODES.rule}>
      <StoreTransferPro
        showSearch
        showBatchToolbar
        batchStrategy={batchStrategy}
        onBatchStrategyChange={setBatchStrategy}
        activeRule={activeRule}
        onRuleApply={(rule) => setActiveRule(rule)}
        targetKeys={keys}
        onChange={(next) => setKeys(next)}
      />
    </ComponentDemoBlock>
  );
}

export function TransferProDiffShowcase() {
  const baseline = ["store-sh-wanda"];
  const [keys, setKeys] = useState<string[]>(["store-sh-wanda", "store-gz-wanda", "store-sz-mixc"]);

  return (
    <ComponentDemoBlock title="Diff View" description="对比 baseline 与当前分配，红/绿高亮变更。" code={TRANSFER_PRO_DEMO_CODES.diff}>
      <StoreTransferPro
        showSearch
        showDiff
        showBatchToolbar={false}
        baselineKeys={baseline}
        targetKeys={keys}
        onChange={(next) => setKeys(next)}
      />
    </ComponentDemoBlock>
  );
}

export function TransferProInspectorShowcase() {
  const [keys, setKeys] = useState<string[]>(["zhang", "li"]);

  return (
    <ComponentDemoBlock title="巡检员调度" description="张巡检 / 李巡检 / 王主管 / 陈巡检 / 赵巡检。" code={TRANSFER_PRO_DEMO_CODES.inspector}>
      <InspectorTransferPro showSearch targetKeys={keys} onChange={(next) => setKeys(next)} />
    </ComponentDemoBlock>
  );
}
