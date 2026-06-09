"use client";

import { useMemo, useState } from "react";
import { DatePicker } from "../../components/date-picker";
import { Input } from "../../components/input";
import { Select } from "../../components/select";
import { FilterBar } from "./filter-bar";
import { FilterField } from "./filter-field";
import { FilterSummary } from "./filter-summary";
import type { FilterSummaryProps } from "./filter-bar.types";

const STATUS_OPTIONS = [
  { label: "全部", value: "all" },
  { label: "正常", value: "active" },
  { label: "停用", value: "inactive" },
];

type PresetProps = {
  onSearch?: (values: Record<string, unknown>) => void;
  onReset?: () => void;
  className?: string;
  count?: number;
  summaryItems?: FilterSummaryProps["items"];
};

function usePresetHandlers(
  values: Record<string, unknown>,
  setValues: (next: Record<string, unknown>) => void,
  onSearch?: (values: Record<string, unknown>) => void,
  onReset?: () => void
) {
  return {
    handleSearch: () => onSearch?.(values),
    handleReset: () => {
      setValues({});
      onReset?.();
    },
  };
}

const VENUE_OPTIONS = [
  { label: "全部场所", value: "all" },
  { label: "华东大区", value: "east" },
  { label: "华南大区", value: "south" },
  { label: "华北大区", value: "north" },
];

const INSPECTION_MODE_OPTIONS = [
  { label: "全部方式", value: "all" },
  { label: "视频巡检", value: "video" },
  { label: "现场巡检", value: "onsite" },
  { label: "AI 巡检", value: "ai" },
];

const TASK_STATUS_OPTIONS = [
  { label: "全部状态", value: "all" },
  { label: "待执行", value: "pending" },
  { label: "执行中", value: "running" },
  { label: "已完成", value: "done" },
];

/** 云盯实时巡店标准筛选区 */
export function RealtimeStoreInspectionFilter({
  onSearch,
  onReset,
  className,
}: PresetProps) {
  const [values, setValues] = useState<Record<string, unknown>>({});
  const handlers = usePresetHandlers(values, setValues, onSearch, onReset);

  return (
    <FilterBar
      variant="business"
      className={className}
      onSearch={handlers.handleSearch}
      onReset={handlers.handleReset}
    >
      <FilterField label="关键词" priority="primary" fieldKey="keyword">
        <Input
          placeholder="请输入门店名称 / 任务编号"
          value={(values.keyword as string) ?? ""}
          onChange={(e) => setValues((prev) => ({ ...prev, keyword: e.target.value }))}
          allowClear
          className="max-w-none"
        />
      </FilterField>
      <FilterField label="场所选择" priority="secondary" fieldKey="venue">
        <Select
          size="md"
          placeholder="全部场所"
          value={(values.venue as string) ?? "all"}
          onChange={(v) => setValues((prev) => ({ ...prev, venue: v }))}
          options={VENUE_OPTIONS}
        />
      </FilterField>
      <FilterField label="巡检方式" priority="secondary" fieldKey="mode">
        <Select
          size="md"
          value={(values.mode as string) ?? "all"}
          onChange={(v) => setValues((prev) => ({ ...prev, mode: v }))}
          options={INSPECTION_MODE_OPTIONS}
        />
      </FilterField>
      <FilterField label="任务状态" priority="secondary" fieldKey="status">
        <Select
          size="md"
          value={(values.status as string) ?? "all"}
          onChange={(v) => setValues((prev) => ({ ...prev, status: v }))}
          options={TASK_STATUS_OPTIONS}
        />
      </FilterField>
      <FilterField
        label="巡检时间"
        priority="secondary"
        fieldKey="time"
        controlClassName="!w-[240px] !min-w-[240px] !max-w-[240px]"
      >
        <DatePicker
          range
          size="md"
          placeholder={["开始日期", "结束日期"]}
          value={(values.time as [Date | null, Date | null]) ?? [null, null]}
          onChange={(v) =>
            setValues((prev) => ({ ...prev, time: Array.isArray(v) ? v : [null, null] }))
          }
        />
      </FilterField>
    </FilterBar>
  );
}

export function EmployeeFilterBar({
  onSearch,
  onReset,
  className,
  count,
  summaryItems,
}: PresetProps) {
  const [values, setValues] = useState<Record<string, unknown>>({});
  const handlers = usePresetHandlers(values, setValues, onSearch, onReset);

  return (
    <FilterBar
      className={className}
      onSearch={handlers.handleSearch}
      onReset={handlers.handleReset}
      count={count}
      summary={summaryItems?.length ? <FilterSummary items={summaryItems} /> : undefined}
    >
      <FilterField label="姓名">
        <Input
          placeholder="请输入姓名"
          value={(values.name as string) ?? ""}
          onChange={(e) => setValues((prev) => ({ ...prev, name: e.target.value }))}
        />
      </FilterField>
      <FilterField label="部门">
        <Select
          size="md"
          placeholder="全部"
          value={(values.department as string) ?? "all"}
          onChange={(v) => setValues((prev) => ({ ...prev, department: v }))}
          options={[
            { label: "全部", value: "all" },
            { label: "产品部", value: "product" },
            { label: "运营部", value: "ops" },
          ]}
        />
      </FilterField>
      <FilterField label="状态">
        <Select
          size="md"
          value={(values.status as string) ?? "all"}
          onChange={(v) => setValues((prev) => ({ ...prev, status: v }))}
          options={STATUS_OPTIONS}
        />
      </FilterField>
      <FilterField label="入职时间">
        <DatePicker
          range
          size="md"
          placeholder={["开始日期", "结束日期"]}
          value={(values.hireRange as [Date | null, Date | null]) ?? [null, null]}
          onChange={(v) =>
            setValues((prev) => ({
              ...prev,
              hireRange: Array.isArray(v) ? v : [null, null],
            }))
          }
        />
      </FilterField>
    </FilterBar>
  );
}

export function ProjectFilterBar({ onSearch, onReset, className, count }: PresetProps) {
  const [values, setValues] = useState<Record<string, unknown>>({});
  const handlers = usePresetHandlers(values, setValues, onSearch, onReset);

  return (
    <FilterBar className={className} onSearch={handlers.handleSearch} onReset={handlers.handleReset} count={count}>
      <FilterField label="项目名称">
        <Input
          placeholder="请输入项目名称"
          value={(values.name as string) ?? ""}
          onChange={(e) => setValues((prev) => ({ ...prev, name: e.target.value }))}
        />
      </FilterField>
      <FilterField label="负责人">
        <Select
          size="md"
          value={(values.owner as string) ?? "all"}
          onChange={(v) => setValues((prev) => ({ ...prev, owner: v }))}
          options={[
            { label: "全部", value: "all" },
            { label: "张三", value: "zhangsan" },
            { label: "李四", value: "lisi" },
          ]}
        />
      </FilterField>
      <FilterField label="项目状态">
        <Select
          size="md"
          value={(values.status as string) ?? "all"}
          onChange={(v) => setValues((prev) => ({ ...prev, status: v }))}
          options={[
            { label: "全部", value: "all" },
            { label: "进行中", value: "running" },
            { label: "已完成", value: "done" },
          ]}
        />
      </FilterField>
      <FilterField label="项目周期">
        <DatePicker
          range
          size="md"
          placeholder={["开始日期", "结束日期"]}
          value={(values.period as [Date | null, Date | null]) ?? [null, null]}
          onChange={(v) =>
            setValues((prev) => ({ ...prev, period: Array.isArray(v) ? v : [null, null] }))
          }
        />
      </FilterField>
    </FilterBar>
  );
}

export function CustomerFilterBar({ onSearch, onReset, className, count }: PresetProps) {
  const [values, setValues] = useState<Record<string, unknown>>({});
  const handlers = usePresetHandlers(values, setValues, onSearch, onReset);

  return (
    <FilterBar className={className} onSearch={handlers.handleSearch} onReset={handlers.handleReset} count={count}>
      <FilterField label="客户名称">
        <Input
          placeholder="请输入客户名称"
          value={(values.name as string) ?? ""}
          onChange={(e) => setValues((prev) => ({ ...prev, name: e.target.value }))}
        />
      </FilterField>
      <FilterField label="销售">
        <Select
          size="md"
          value={(values.sales as string) ?? "all"}
          onChange={(v) => setValues((prev) => ({ ...prev, sales: v }))}
          options={[
            { label: "全部", value: "all" },
            { label: "王销售", value: "wang" },
            { label: "赵销售", value: "zhao" },
          ]}
        />
      </FilterField>
      <FilterField label="客户等级">
        <Select
          size="md"
          value={(values.level as string) ?? "all"}
          onChange={(v) => setValues((prev) => ({ ...prev, level: v }))}
          options={[
            { label: "全部", value: "all" },
            { label: "A 级", value: "a" },
            { label: "B 级", value: "b" },
          ]}
        />
      </FilterField>
      <FilterField label="来源">
        <Select
          size="md"
          value={(values.source as string) ?? "all"}
          onChange={(v) => setValues((prev) => ({ ...prev, source: v }))}
          options={[
            { label: "全部", value: "all" },
            { label: "官网", value: "web" },
            { label: "渠道", value: "channel" },
          ]}
        />
      </FilterField>
    </FilterBar>
  );
}

export function OrderFilterBar({ onSearch, onReset, className, count }: PresetProps) {
  const [values, setValues] = useState<Record<string, unknown>>({});
  const handlers = usePresetHandlers(values, setValues, onSearch, onReset);

  return (
    <FilterBar className={className} onSearch={handlers.handleSearch} onReset={handlers.handleReset} count={count}>
      <FilterField label="订单号">
        <Input
          placeholder="请输入订单号"
          value={(values.orderNo as string) ?? ""}
          onChange={(e) => setValues((prev) => ({ ...prev, orderNo: e.target.value }))}
        />
      </FilterField>
      <FilterField label="状态">
        <Select
          size="md"
          value={(values.status as string) ?? "all"}
          onChange={(v) => setValues((prev) => ({ ...prev, status: v }))}
          options={[
            { label: "全部", value: "all" },
            { label: "待支付", value: "pending" },
            { label: "已支付", value: "paid" },
          ]}
        />
      </FilterField>
      <FilterField label="支付时间">
        <DatePicker
          range
          size="md"
          placeholder={["开始日期", "结束日期"]}
          value={(values.paidAt as [Date | null, Date | null]) ?? [null, null]}
          onChange={(v) =>
            setValues((prev) => ({ ...prev, paidAt: Array.isArray(v) ? v : [null, null] }))
          }
        />
      </FilterField>
      <FilterField label="负责人">
        <Select
          size="md"
          value={(values.owner as string) ?? "all"}
          onChange={(v) => setValues((prev) => ({ ...prev, owner: v }))}
          options={[
            { label: "全部", value: "all" },
            { label: "张明", value: "zhangming" },
          ]}
        />
      </FilterField>
    </FilterBar>
  );
}

export function CourseFilterBar({ onSearch, onReset, className, count }: PresetProps) {
  const [values, setValues] = useState<Record<string, unknown>>({});
  const handlers = usePresetHandlers(values, setValues, onSearch, onReset);

  return (
    <FilterBar className={className} onSearch={handlers.handleSearch} onReset={handlers.handleReset} count={count}>
      <FilterField label="课程名称">
        <Input
          placeholder="请输入课程名称"
          value={(values.name as string) ?? ""}
          onChange={(e) => setValues((prev) => ({ ...prev, name: e.target.value }))}
        />
      </FilterField>
      <FilterField label="讲师">
        <Select
          size="md"
          value={(values.teacher as string) ?? "all"}
          onChange={(v) => setValues((prev) => ({ ...prev, teacher: v }))}
          options={[
            { label: "全部", value: "all" },
            { label: "李老师", value: "li" },
            { label: "陈老师", value: "chen" },
          ]}
        />
      </FilterField>
      <FilterField label="分类">
        <Select
          size="md"
          value={(values.category as string) ?? "all"}
          onChange={(v) => setValues((prev) => ({ ...prev, category: v }))}
          options={[
            { label: "全部", value: "all" },
            { label: "门店运营", value: "ops" },
            { label: "食品安全", value: "food" },
          ]}
        />
      </FilterField>
      <FilterField label="状态">
        <Select
          size="md"
          value={(values.status as string) ?? "all"}
          onChange={(v) => setValues((prev) => ({ ...prev, status: v }))}
          options={STATUS_OPTIONS}
        />
      </FilterField>
    </FilterBar>
  );
}

export function DashboardFilterBar({ onSearch, onReset, className }: PresetProps) {
  const [values, setValues] = useState<Record<string, unknown>>({});
  const handlers = usePresetHandlers(values, setValues, onSearch, onReset);

  const summaryItems = useMemo(
    () =>
      [
        values.region && values.region !== "all"
          ? { key: "region", label: "区域", value: String(values.region) }
          : null,
        values.period
          ? { key: "period", label: "时间", value: "最近30天" }
          : null,
      ].filter(Boolean) as FilterSummaryProps["items"],
    [values]
  );

  return (
    <FilterBar
      className={className}
      layout="responsive"
      onSearch={handlers.handleSearch}
      onReset={handlers.handleReset}
      count={125}
      summary={<FilterSummary items={summaryItems} />}
    >
      <FilterField label="关键词">
        <Input
          placeholder="门店 / 任务"
          value={(values.keyword as string) ?? ""}
          onChange={(e) => setValues((prev) => ({ ...prev, keyword: e.target.value }))}
        />
      </FilterField>
      <FilterField label="区域">
        <Select
          size="md"
          value={(values.region as string) ?? "all"}
          onChange={(v) => setValues((prev) => ({ ...prev, region: v }))}
          options={[
            { label: "全部", value: "all" },
            { label: "华东", value: "east" },
            { label: "华南", value: "south" },
          ]}
        />
      </FilterField>
      <FilterField label="状态">
        <Select
          size="md"
          value={(values.status as string) ?? "all"}
          onChange={(v) => setValues((prev) => ({ ...prev, status: v }))}
          options={STATUS_OPTIONS}
        />
      </FilterField>
      <FilterField label="统计周期">
        <DatePicker
          range
          shortcuts
          size="md"
          placeholder={["开始日期", "结束日期"]}
          value={(values.period as [Date | null, Date | null]) ?? [null, null]}
          onChange={(v) =>
            setValues((prev) => ({ ...prev, period: Array.isArray(v) ? v : [null, null] }))
          }
        />
      </FilterField>
    </FilterBar>
  );
}
