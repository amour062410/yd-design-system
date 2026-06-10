"use client";

import { useMemo, useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@yd-ds/ui/button";
import { OverviewCard, StoreInspectionCard } from "@yd-ds/ui/card";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
} from "@yd-ds/ui/drawer";
import { Input } from "@yd-ds/ui/input";
import { Select } from "@yd-ds/ui/select";
import { StoreTree } from "@yd-ds/ui/tree";
import { FilterBar, FilterExtra, FilterField, FilterTextButton } from "@yd-ds/ui/business/filter-bar";
import { Table } from "@yd-ds/ui/table";
import {
  STORE_MANAGEMENT_ROWS,
  STORE_TREE_KEY_TO_REGION,
  type StoreManagementRow,
} from "@/lib/data/treeMock";

const STATUS_OPTIONS = [
  { label: "全部状态", value: "all" },
  { label: "正常", value: "正常" },
  { label: "整改中", value: "整改中" },
  { label: "待巡检", value: "待巡检" },
];

function filterRowsByTreeKey(rows: StoreManagementRow[], treeKey: string | null) {
  if (!treeKey || treeKey === "nation") return rows;
  const region = STORE_TREE_KEY_TO_REGION[treeKey];
  if (region) return rows.filter((row) => row.region === region);
  return rows.filter((row) => row.treeKey === treeKey);
}

export function StoreManagementShowcaseView() {
  const [selectedKeys, setSelectedKeys] = useState<string[]>(["chengdu"]);
  const [keyword, setKeyword] = useState("");
  const [status, setStatus] = useState("all");
  const [detailRow, setDetailRow] = useState<StoreManagementRow | null>(null);

  const selectedKey = selectedKeys[0] ?? "nation";

  const filteredRows = useMemo(() => {
    let rows = filterRowsByTreeKey(STORE_MANAGEMENT_ROWS, selectedKey);
    if (status !== "all") rows = rows.filter((row) => row.status === status);
    if (keyword.trim()) {
      const q = keyword.trim().toLowerCase();
      rows = rows.filter(
        (row) =>
          row.storeName.toLowerCase().includes(q) ||
          row.manager.includes(keyword.trim()) ||
          row.region.includes(keyword.trim())
      );
    }
    return rows;
  }, [keyword, selectedKey, status]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2 border-b border-border pb-6">
        <h1 className="text-[24px] font-semibold tracking-tight text-foreground">区域门店管理</h1>
        <p className="text-[14px] text-muted-foreground">
          Showcase 页面：PageHeader + FilterBar + Tree + Table + Drawer + Card 组合，还原云盯后台布局。
        </p>
      </div>

      <FilterBar
        variant="business"
        title="筛选条件"
        onSearch={() => undefined}
        onReset={() => {
          setKeyword("");
          setStatus("all");
        }}
        extra={
          <FilterExtra>
            <FilterTextButton type="button">导出</FilterTextButton>
            <FilterTextButton type="button">批量操作</FilterTextButton>
          </FilterExtra>
        }
      >
        <FilterField label="关键词" priority="primary">
          <Input
            placeholder="门店 / 负责人"
            value={keyword}
            onChange={(event) => setKeyword(event.target.value)}
            allowClear
            className="max-w-none"
          />
        </FilterField>
        <FilterField label="状态" priority="secondary">
          <Select
            options={STATUS_OPTIONS}
            value={status}
            onChange={(value) => setStatus(Array.isArray(value) ? value[0] ?? "all" : value)}
          />
        </FilterField>
      </FilterBar>

      <div className="grid gap-4 xl:grid-cols-[280px_minmax(0,1fr)_280px]">
        <div className="rounded-[8px] border border-[color:var(--tree-color-border,#f0f0f0)] bg-card">
          <div className="border-b border-[color:var(--tree-color-border,#f0f0f0)] px-4 py-3 text-[14px] font-medium">
            区域门店
          </div>
          <StoreTree
            searchable
            selectedKeys={selectedKeys}
            onSelect={(keys) => setSelectedKeys(keys.length ? keys : ["nation"])}
            defaultExpandedKeys={["nation", "chengdu", "chongqing"]}
          />
        </div>

        <div className="min-w-0 rounded-[8px] border border-border bg-card">
          <div className="flex items-center justify-between border-b border-border px-4 py-3">
            <div>
              <div className="text-[14px] font-medium">门店列表</div>
              <div className="mt-0.5 text-[12px] text-muted-foreground">共 {filteredRows.length} 家</div>
            </div>
            <Button size="sm">
              <Plus className="size-4" />
              新增门店
            </Button>
          </div>
          <Table<StoreManagementRow & Record<string, unknown>>
            columns={[
              {
                key: "storeName",
                title: "门店",
                dataIndex: "storeName",
                render: (value, record) => (
                  <button
                    type="button"
                    className="text-left text-[color:var(--color-brand,#165dff)] hover:underline"
                    onClick={() => setDetailRow(record as StoreManagementRow)}
                  >
                    {String(value ?? "")}
                  </button>
                ),
              },
              { key: "region", title: "区域", dataIndex: "region" },
              { key: "manager", title: "负责人", dataIndex: "manager" },
              { key: "status", title: "状态", dataIndex: "status" },
              { key: "lastInspection", title: "最近巡检", dataIndex: "lastInspection" },
            ]}
            dataSource={filteredRows as (StoreManagementRow & Record<string, unknown>)[]}
            rowKey="key"
            size="sm"
          />
        </div>

        <div className="space-y-3">
          <OverviewCard
            title={detailRow?.storeName ?? "请选择门店"}
            status={detailRow?.status ?? "—"}
            items={
              detailRow
                ? [
                    { label: "区域", value: detailRow.region },
                    { label: "负责人", value: detailRow.manager },
                    { label: "最近巡检", value: detailRow.lastInspection },
                  ]
                : [{ label: "提示", value: "点击列表行查看详情" }]
            }
          />
          {detailRow ? (
            <StoreInspectionCard
              storeName={detailRow.storeName}
              score={92}
              inspector={detailRow.manager}
              inspectionTime={detailRow.lastInspection}
            />
          ) : null}
        </div>
      </div>

      <Drawer open={Boolean(detailRow)} onClose={() => setDetailRow(null)} size="md">
        <DrawerHeader title={detailRow?.storeName ?? "门店详情"} onClose={() => setDetailRow(null)} />
        <DrawerBody>
          {detailRow ? (
            <div className="space-y-4">
              <OverviewCard
                title="基础信息"
                items={[
                  { label: "区域", value: detailRow.region },
                  { label: "负责人", value: detailRow.manager },
                  { label: "状态", value: detailRow.status },
                ]}
              />
              <StoreInspectionCard
                storeName={detailRow.storeName}
                score={88}
                inspector={detailRow.manager}
                inspectionTime={detailRow.lastInspection}
              />
            </div>
          ) : null}
        </DrawerBody>
        <DrawerFooter>
          <Button variant="outline" onClick={() => setDetailRow(null)}>
            关闭
          </Button>
          <Button>进入巡店</Button>
        </DrawerFooter>
      </Drawer>
    </div>
  );
}
