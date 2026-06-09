"use client";

import { useState } from "react";
import { Button } from "../../components/button";
import { DatePicker } from "../../components/date-picker";
import { Input } from "../../components/input";
import { Select } from "../../components/select";
import {
  CourseFilterBar,
  CustomerFilterBar,
  DashboardFilterBar,
  EmployeeFilterBar,
  FilterActions,
  FilterBar,
  FilterCount,
  FilterField,
  FilterSummary,
  OrderFilterBar,
  ProjectFilterBar,
  RealtimeStoreInspectionFilter,
  StickyFilterBar,
} from "./index";

export default {
  title: "YD Design System/FilterBar",
  component: FilterBar,
  parameters: { layout: "padded" },
};

const STATUS_OPTIONS = [
  { label: "全部", value: "all" },
  { label: "正常", value: "active" },
  { label: "停用", value: "inactive" },
];

const OWNER_OPTIONS = [
  { label: "全部", value: "all" },
  { label: "张三", value: "zhangsan" },
  { label: "李四", value: "lisi" },
];

function BasicFilterDemo() {
  const [keyword, setKeyword] = useState("");
  const [status, setStatus] = useState("all");

  return (
    <FilterBar onSearch={() => undefined} onReset={() => { setKeyword(""); setStatus("all"); }}>
      <FilterField label="关键词">
        <Input placeholder="输入关键词" value={keyword} onChange={(e) => setKeyword(e.target.value)} />
      </FilterField>
      <FilterField label="状态">
        <Select size="md" value={status} onChange={(v) => setStatus(String(v))} options={STATUS_OPTIONS} />
      </FilterField>
    </FilterBar>
  );
}

function FourFieldsDemo() {
  return (
    <FilterBar>
      <FilterField label="关键词">
        <Input placeholder="输入关键词" />
      </FilterField>
      <FilterField label="状态">
        <Select size="md" value="all" options={STATUS_OPTIONS} />
      </FilterField>
      <FilterField label="负责人">
        <Select size="md" value="all" options={OWNER_OPTIONS} />
      </FilterField>
      <FilterField label="创建时间">
        <DatePicker range size="md" placeholder={["开始日期", "结束日期"]} />
      </FilterField>
    </FilterBar>
  );
}

export const RealtimeStoreInspectionFilterStory = {
  name: "Realtime Store Inspection",
  render: () => <RealtimeStoreInspectionFilter />,
};

export const Basic = { render: () => <BasicFilterDemo /> };

export const FourFields = { render: () => <FourFieldsDemo /> };

export const Responsive = {
  render: () => (
    <div className="max-w-[960px]">
      <FourFieldsDemo />
    </div>
  ),
  parameters: { viewport: { defaultViewport: "responsive" } },
};

export const Expandable = {
  render: () => (
    <FilterBar expandable>
      <FilterField label="关键词"><Input placeholder="输入关键词" /></FilterField>
      <FilterField label="状态"><Select size="md" value="all" options={STATUS_OPTIONS} /></FilterField>
      <FilterField label="负责人"><Select size="md" value="all" options={OWNER_OPTIONS} /></FilterField>
      <FilterField label="创建时间"><DatePicker range size="md" placeholder={["开始", "结束"]} /></FilterField>
      <FilterField label="部门"><Select size="md" value="all" options={[{ label: "全部", value: "all" }, { label: "产品部", value: "product" }]} /></FilterField>
      <FilterField label="城市"><Input placeholder="请输入城市" /></FilterField>
    </FilterBar>
  ),
};

export const CustomActions = {
  render: () => (
    <FilterBar>
      <FilterField label="关键词"><Input placeholder="输入关键词" /></FilterField>
      <FilterField label="状态"><Select size="md" value="all" options={STATUS_OPTIONS} /></FilterField>
      <FilterActions>
        <Button size="md">查询</Button>
        <Button size="md" variant="outline">重置</Button>
        <Button size="md" variant="outline">导出</Button>
      </FilterActions>
    </FilterBar>
  ),
};

export const EmployeeFilter = { render: () => <EmployeeFilterBar count={86} /> };
export const ProjectFilter = { render: () => <ProjectFilterBar count={42} /> };
export const CustomerFilter = { render: () => <CustomerFilterBar count={128} /> };
export const OrderFilter = { render: () => <OrderFilterBar count={256} /> };
export const CourseFilter = { render: () => <CourseFilterBar count={64} /> };

export const StickyMode = {
  render: () => (
    <div className="max-h-[420px] overflow-y-auto rounded-lg border">
      <StickyFilterBar className="border-b bg-card/95 backdrop-blur-sm">
        <FourFieldsDemo />
      </StickyFilterBar>
      <div className="space-y-3 p-4">
        {Array.from({ length: 12 }, (_, i) => (
          <div key={i} className="rounded-md border px-4 py-3 text-sm text-muted-foreground">
            表格行占位 {i + 1}
          </div>
        ))}
      </div>
    </div>
  ),
};

export const FilterSummaryStory = {
  name: "Filter Summary",
  render: () => (
    <FilterBar
      count={125}
      summary={
        <FilterSummary
          items={[
            { key: "status", label: "状态", value: "正常" },
            { key: "owner", label: "负责人", value: "张三" },
            { key: "time", label: "时间", value: "最近30天" },
          ]}
        />
      }
    >
      <FilterField label="关键词"><Input placeholder="输入关键词" /></FilterField>
      <FilterField label="状态"><Select size="md" value="active" options={STATUS_OPTIONS} /></FilterField>
      <FilterField label="负责人"><Select size="md" value="zhangsan" options={OWNER_OPTIONS} /></FilterField>
      <FilterField label="创建时间"><DatePicker range size="md" placeholder={["开始", "结束"]} /></FilterField>
    </FilterBar>
  ),
};

export const FilterCountStory = {
  name: "Filter Count",
  render: () => (
    <div className="space-y-3">
      <FourFieldsDemo />
      <FilterCount count={125} />
    </div>
  ),
};

export const DashboardFilter = { render: () => <DashboardFilterBar /> };
