"use client";

import { useMemo, useState } from "react";
import { DatePicker } from "@yd-ds/ui/date-picker";
import { Input } from "@yd-ds/ui/input";
import { Select } from "@yd-ds/ui/select";
import {
  FilterBar,
  FilterExtra,
  FilterField,
  FilterTextButton,
  RealtimeStoreInspectionFilter,
} from "@yd-ds/ui/business/filter-bar";
import { ComponentDemoBlock } from "@/components/docs/component-demo-block";
import { FILTERBAR_DEMO_CODES } from "@/lib/data/filterBarMock";

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

const SAVED_PRESETS = [
  {
    label: "最近 7 天待处理",
    value: { keyword: "", status: "inactive" as const },
  },
  {
    label: "华东大区正常门店",
    value: { keyword: "华东", status: "active" as const },
  },
];

type DynamicField = { id: string; label: string; priority: "primary" | "secondary" };

function BasicFilterDemo() {
  return (
    <RealtimeStoreInspectionFilter onSearch={() => undefined} onReset={() => undefined} />
  );
}

function ResponsiveFilterDemo() {
  return (
    <FilterBar
      variant="business"
      title="业务筛选栏"
      onSearch={() => undefined}
      onReset={() => undefined}
    >
      <FilterField label="关键词" priority="primary">
        <Input placeholder="输入关键词" allowClear className="max-w-none" />
      </FilterField>
      <FilterField label="状态" priority="secondary">
        <Select size="md" value="all" options={STATUS_OPTIONS} />
      </FilterField>
      <FilterField label="负责人" priority="secondary">
        <Select size="md" value="all" options={OWNER_OPTIONS} />
      </FilterField>
      <FilterField label="创建时间" priority="secondary" controlClassName="!w-[240px]">
        <DatePicker range size="md" placeholder={["开始日期", "结束日期"]} />
      </FilterField>
    </FilterBar>
  );
}

function ExpandableFilterDemo() {
  return (
    <FilterBar
      variant="business"
      title="业务筛选栏"
      expandable
      maxVisibleFields={3}
      onSearch={() => undefined}
      onReset={() => undefined}
    >
      <FilterField label="关键词" priority="primary">
        <Input placeholder="输入关键词" allowClear className="max-w-none" />
      </FilterField>
      <FilterField label="状态" priority="secondary">
        <Select size="md" value="all" options={STATUS_OPTIONS} />
      </FilterField>
      <FilterField label="负责人" priority="secondary">
        <Select size="md" value="all" options={OWNER_OPTIONS} />
      </FilterField>
      <FilterField label="创建时间" priority="secondary" controlClassName="!w-[240px]">
        <DatePicker range size="md" placeholder={["开始", "结束"]} />
      </FilterField>
      <FilterField label="部门" priority="secondary">
        <Select
          size="md"
          value="all"
          options={[
            { label: "全部", value: "all" },
            { label: "产品部", value: "product" },
          ]}
        />
      </FilterField>
    </FilterBar>
  );
}

function DynamicFieldsDemo() {
  const [fields, setFields] = useState<DynamicField[]>([
    { id: "keyword", label: "关键词", priority: "primary" },
    { id: "status", label: "状态", priority: "secondary" },
  ]);

  return (
    <FilterBar
      variant="business"
      title="业务筛选栏"
      onSearch={() => undefined}
      onReset={() => undefined}
    >
      <FilterExtra>
        <FilterTextButton
          type="button"
          onClick={() =>
            setFields((prev) => [
              ...prev,
              {
                id: `field-${prev.length}`,
                label: `条件 ${prev.length + 1}`,
                priority: "secondary",
              },
            ])
          }
        >
          添加条件
        </FilterTextButton>
        {fields.length > 2 ? (
          <FilterTextButton
            type="button"
            onClick={() => setFields((prev) => prev.slice(0, -1))}
          >
            删除末项
          </FilterTextButton>
        ) : null}
      </FilterExtra>
      {fields.map((field) => (
        <FilterField key={field.id} label={field.label} priority={field.priority}>
          {field.id === "status" || field.id.startsWith("field-") ? (
            <Select size="md" value="all" options={STATUS_OPTIONS} />
          ) : (
            <Input placeholder={`请输入${field.label}`} className="max-w-none" />
          )}
        </FilterField>
      ))}
    </FilterBar>
  );
}

function PresetsFilterDemo() {
  const [keyword, setKeyword] = useState("");
  const [status, setStatus] = useState("all");
  const [preset, setPreset] = useState<string>("");

  const applyPreset = (label: string) => {
    const found = SAVED_PRESETS.find((item) => item.label === label);
    if (!found) return;
    setKeyword(String(found.value.keyword ?? ""));
    setStatus(found.value.status);
    setPreset(label);
  };

  return (
    <FilterBar
      variant="business"
      title="业务筛选栏"
      onSearch={() => undefined}
      onReset={() => {
        setKeyword("");
        setStatus("all");
        setPreset("");
      }}
    >
      <FilterField label="关键词" priority="primary">
        <Input
          placeholder="输入关键词"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          className="max-w-none"
        />
      </FilterField>
      <FilterField label="状态" priority="secondary">
        <Select
          size="md"
          value={status}
          onChange={(v) => setStatus(String(v))}
          options={STATUS_OPTIONS}
        />
      </FilterField>
      <FilterField label="筛选方案" priority="secondary" controlClassName="!w-[180px]">
        <Select
          size="md"
          placeholder="筛选方案"
          value={preset || undefined}
          onChange={(v) => applyPreset(String(v))}
          options={SAVED_PRESETS.map((item) => ({ label: item.label, value: item.label }))}
        />
      </FilterField>
    </FilterBar>
  );
}

function ExtraActionsDemo() {
  return (
    <FilterBar
      variant="business"
      title="业务筛选栏"
      onSearch={() => undefined}
      onReset={() => undefined}
    >
      <FilterExtra>
        <FilterTextButton type="button">批量操作</FilterTextButton>
        <FilterTextButton type="button">导出</FilterTextButton>
      </FilterExtra>
      <FilterField label="关键词" priority="primary">
        <Input placeholder="输入关键词" className="max-w-none" />
      </FilterField>
      <FilterField label="状态" priority="secondary">
        <Select size="md" value="all" options={STATUS_OPTIONS} />
      </FilterField>
    </FilterBar>
  );
}

function ControlledFilterDemo() {
  const [values, setValues] = useState({ keyword: "云盯", status: "active" });

  const summary = useMemo(
    () => `keyword=${values.keyword} · status=${values.status}`,
    [values]
  );

  return (
    <div className="space-y-3">
      <FilterBar
        variant="business"
        title="业务筛选栏"
        onSearch={() => undefined}
        onReset={() => setValues({ keyword: "", status: "all" })}
      >
        <FilterField label="关键词" priority="primary">
          <Input
            placeholder="输入关键词"
            value={values.keyword}
            onChange={(e) => setValues((prev) => ({ ...prev, keyword: e.target.value }))}
            className="max-w-none"
          />
        </FilterField>
        <FilterField label="状态" priority="secondary">
          <Select
            size="md"
            value={values.status}
            onChange={(v) => setValues((prev) => ({ ...prev, status: String(v) }))}
            options={STATUS_OPTIONS}
          />
        </FilterField>
      </FilterBar>
      <p className="text-[13px] text-muted-foreground">当前值：{summary}</p>
    </div>
  );
}

export function FilterBarDemosShowcase() {
  return (
    <div className="flex flex-col gap-12">
      <ComponentDemoBlock
        title="实时巡店筛选"
        description="关键词独占首行，次级条件横向排列；筛选操作（展开/重置/查询）固定右下角，业务功能放右上角。"
        version="1.1.0"
        code={FILTERBAR_DEMO_CODES.business}
      >
        <BasicFilterDemo />
      </ComponentDemoBlock>

      <ComponentDemoBlock
        title="响应式布局"
        description="business 两行布局：窄屏次级条件自动换行，筛选操作区固定右下角。"
        version="1.1.0"
        code={FILTERBAR_DEMO_CODES.responsive}
      >
        <ResponsiveFilterDemo />
      </ComponentDemoBlock>

      <ComponentDemoBlock
        title="展开/收起"
        description="次级条件过多时折叠；展开/收起与重置/查询同排，固定右下角。"
        version="1.1.0"
        code={FILTERBAR_DEMO_CODES.expandable}
      >
        <ExpandableFilterDemo />
      </ComponentDemoBlock>

      <ComponentDemoBlock
        title="条件组合"
        description="动态添加或删除次级筛选项；管理入口放右上角业务功能区。"
        version="1.1.0"
        code={FILTERBAR_DEMO_CODES.dynamic}
      >
        <DynamicFieldsDemo />
      </ComponentDemoBlock>

      <ComponentDemoBlock
        title="保存筛选方案"
        description="筛选方案作为次级字段，查询/重置固定右下角。"
        version="1.1.0"
        code={FILTERBAR_DEMO_CODES.presets}
      >
        <PresetsFilterDemo />
      </ComponentDemoBlock>

      <ComponentDemoBlock
        title="自定义操作区"
        description="FilterExtra 放置导出、批量操作等业务功能；FilterActions 默认渲染筛选操作。"
        code={FILTERBAR_DEMO_CODES.extra}
      >
        <ExtraActionsDemo />
      </ComponentDemoBlock>

      <ComponentDemoBlock
        title="受控模式"
        description="字段值受控，便于与 URL 或全局状态同步。"
        version="1.1.0"
        code={FILTERBAR_DEMO_CODES.controlled}
      >
        <ControlledFilterDemo />
      </ComponentDemoBlock>
    </div>
  );
}
