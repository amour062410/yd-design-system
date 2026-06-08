"use client";

import { Download } from "lucide-react";
import { useCallback, useMemo, useState } from "react";
import { Button } from "../../components/button";
import { Card, CardContent } from "../../components/card";
import type { StatusTabItem } from "./table-business-patterns";
import { InspectionBusinessFilter } from "./inspection-business-filter";
import { InspectionOverviewCards } from "./inspection-overview-cards";
import type {
  InspectionOverviewCardItem,
  InspectionRiskRecord,
  RectificationStatus,
  StoreRiskLevel,
} from "./inspection-risk.types";
import { InspectionRiskTable } from "./inspection-risk-table";

const REGIONS = ["华东", "华北", "华南", "西南", "华中"] as const;
const STORE_TYPES = ["直营店", "旗舰店", "加盟店"] as const;
const TEMPLATES = ["标准店巡检", "旗舰店巡检", "食品安全专项", "陈列合规专项"] as const;
const INSPECTION_TYPES = ["现场巡检", "视频巡检", "AI 巡检"] as const;

const RECTIFICATION_STATUSES: RectificationStatus[] = [
  "abnormal",
  "pending_rectification",
  "rectifying",
  "completed",
];

const STATUS_TAB_LABELS: Record<RectificationStatus | "all", string> = {
  all: "全部",
  abnormal: "异常",
  pending_rectification: "待整改",
  rectifying: "整改中",
  completed: "已完成",
};

function pickRiskLevel(score: number, abnormal: number): StoreRiskLevel {
  if (score < 70 || abnormal >= 5) return "high";
  if (score < 85 || abnormal >= 2) return "medium";
  return "low";
}

function generateRiskInspectionData(): InspectionRiskRecord[] {
  const rows: InspectionRiskRecord[] = [];
  const statusPool: RectificationStatus[] = [
    ...Array(6).fill("abnormal"),
    ...Array(8).fill("pending_rectification"),
    ...Array(5).fill("rectifying"),
    ...Array(11).fill("completed"),
  ] as RectificationStatus[];

  for (let i = 1; i <= 30; i++) {
    const region = REGIONS[i % REGIONS.length];
    const score = [95, 92, 88, 82, 76, 67, 58, 91, 84, 73][i % 10];
    const abnormalCount = score >= 90 ? 0 : score >= 80 ? 1 : score >= 70 ? 3 : 6;
    const rectificationStatus = statusPool[i % statusPool.length];
    const rectificationRate =
      rectificationStatus === "completed"
        ? 100
        : rectificationStatus === "rectifying"
          ? 45 + (i % 4) * 10
          : rectificationStatus === "pending_rectification"
            ? 0
            : 20 + (i % 3) * 15;

    rows.push({
      key: String(i),
      storeName: `${region}·云盯门店 ${String(i).padStart(2, "0")}`,
      storeType: STORE_TYPES[i % STORE_TYPES.length],
      region,
      template: TEMPLATES[i % TEMPLATES.length],
      inspectionType: INSPECTION_TYPES[i % INSPECTION_TYPES.length],
      score,
      abnormalCount,
      riskLevel: pickRiskLevel(score, abnormalCount),
      lastInspectionAt: `2026-05-${String((i % 28) + 1).padStart(2, "0")}`,
      rectificationStatus,
      rectificationRate,
      statusFilterKey: rectificationStatus,
    });
  }

  return rows;
}

export const STORE_INSPECTION_RISK_DATA = generateRiskInspectionData();

export const STORE_INSPECTION_V3_OVERVIEW: InspectionOverviewCardItem[] = [
  {
    key: "abnormal-stores",
    title: "异常门店",
    value: 18,
    unit: "家",
    tone: "danger",
    metrics: ["较上周 +3 家", "华东区占比 44%", "需优先跟进"],
  },
  {
    key: "pending-items",
    title: "待整改项",
    value: 42,
    unit: "项",
    tone: "warning",
    metrics: ["红线项 6 项", "平均滞留 3.2 天", "本周需闭环 12 项"],
  },
  {
    key: "high-risk",
    title: "高风险门店",
    value: 7,
    unit: "家",
    tone: "danger",
    metrics: ["得分低于 70 分", "异常项 ≥ 5", "已推送督导"],
  },
  {
    key: "completion-rate",
    title: "巡检完成率",
    value: "86",
    unit: "%",
    tone: "brand",
    metrics: ["本月目标 90%", "未完成 4 家", "环比 +2.1%"],
  },
];

function buildFilterOptions(
  data: InspectionRiskRecord[],
  field: keyof Pick<InspectionRiskRecord, "storeName" | "region" | "template" | "inspectionType">,
  allLabel: string
) {
  const values = [...new Set(data.map((r) => r[field]))].sort();
  return [{ label: allLabel, value: "all" }, ...values.map((v) => ({ label: v, value: v }))];
}

function buildStatusTabs(data: InspectionRiskRecord[]): StatusTabItem[] {
  const counts: Record<string, number> = { all: data.length };
  for (const row of data) {
    counts[row.rectificationStatus] = (counts[row.rectificationStatus] ?? 0) + 1;
  }

  const keys: (RectificationStatus | "all")[] = [
    "all",
    "abnormal",
    "pending_rectification",
    "rectifying",
    "completed",
  ];

  return keys.map((key) => ({
    key,
    label: STATUS_TAB_LABELS[key],
    count: counts[key] ?? 0,
    tone:
      key === "abnormal"
        ? "danger"
        : key === "pending_rectification"
          ? "warning"
          : undefined,
  }));
}


/** 门店巡检总览 V3 — 风险管理驾驶舱 */
export function StoreInspectionDemo({ className }: { className?: string }) {
  const [data] = useState(STORE_INSPECTION_RISK_DATA);
  const [loading, setLoading] = useState(false);
  const [statusFilter, setStatusFilter] = useState("all");
  const [storeFilter, setStoreFilter] = useState("all");
  const [regionFilter, setRegionFilter] = useState("all");
  const [templateFilter, setTemplateFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [keyword, setKeyword] = useState("");

  const storeOptions = useMemo(
    () => buildFilterOptions(data, "storeName", "全部门店"),
    [data]
  );
  const regionOptions = useMemo(
    () => buildFilterOptions(data, "region", "全部区域"),
    [data]
  );
  const templateOptions = useMemo(
    () => buildFilterOptions(data, "template", "全部模板"),
    [data]
  );
  const typeOptions = useMemo(
    () => buildFilterOptions(data, "inspectionType", "全部类型"),
    [data]
  );

  const businessFiltered = useMemo(() => {
    const q = keyword.trim().toLowerCase();
    return data.filter((row) => {
      if (storeFilter !== "all" && row.storeName !== storeFilter) return false;
      if (regionFilter !== "all" && row.region !== regionFilter) return false;
      if (templateFilter !== "all" && row.template !== templateFilter) return false;
      if (typeFilter !== "all" && row.inspectionType !== typeFilter) return false;
      if (q && !row.storeName.toLowerCase().includes(q)) return false;
      return true;
    });
  }, [data, storeFilter, regionFilter, templateFilter, typeFilter, keyword]);

  const statusTabs = useMemo(() => buildStatusTabs(businessFiltered), [businessFiltered]);

  const handleExport = useCallback(() => {
    console.info("[StoreInspectionDemo V3] export report");
  }, []);

  const handleRefresh = useCallback(async () => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 500));
    setLoading(false);
  }, []);

  return (
    <div className={className}>
      <div className="mb-5 flex flex-col gap-4 border-b border-[color:var(--table-border-color)] pb-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-semibold tracking-tight text-[color:var(--color-text-primary)]">
            门店巡检总览
          </h1>
          <p className="mt-1 text-sm text-[color:var(--color-text-tertiary)]">
            风险驾驶舱 — 聚焦异常门店、整改闭环与高风险预警
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <Button variant="outline" size="default" onClick={handleRefresh}>
            刷新
          </Button>
          <Button variant="outline" size="default" className="gap-1.5" onClick={handleExport}>
            <Download className="size-4" />
            导出报表
          </Button>
        </div>
      </div>

      <InspectionOverviewCards items={STORE_INSPECTION_V3_OVERVIEW} className="mb-5" />

      <Card className="rounded-[8px] border shadow-sm">
        <InspectionBusinessFilter
          storeValue={storeFilter}
          regionValue={regionFilter}
          templateValue={templateFilter}
          typeValue={typeFilter}
          keyword={keyword}
          onStoreChange={setStoreFilter}
          onRegionChange={setRegionFilter}
          onTemplateChange={setTemplateFilter}
          onTypeChange={setTypeFilter}
          onKeywordChange={setKeyword}
          storeOptions={storeOptions}
          regionOptions={regionOptions}
          templateOptions={templateOptions}
          typeOptions={typeOptions}
        />
        <CardContent className="p-4">
          <InspectionRiskTable
            dataSource={businessFiltered}
            statusTabItems={statusTabs}
            statusFilter={statusFilter}
            onStatusFilterChange={setStatusFilter}
            loading={loading}
            onView={(row) => console.info("[StoreInspectionDemo V3] view", row.key)}
            pagination={{
              total: businessFiltered.length,
              defaultPageSize: 10,
              showTotal: true,
              showQuickJumper: true,
            }}
          />
        </CardContent>
      </Card>
    </div>
  );
}
