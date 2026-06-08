"use client";

import { useState } from "react";
import { Select, SelectShowcase } from "@yd-ds/ui/select";
import {
  SELECT_GROUPED_DEMO_OPTIONS,
  SELECT_MULTI_DEMO_OPTIONS,
  SELECT_SIZE_LABELS,
  SELECT_STATE_LABELS,
  SELECT_TYPE_LABELS,
} from "@/lib/data/selectMock";

export function SelectStatesShowcase() {
  const [value, setValue] = useState<string>("");

  return (
    <div className="rounded-md border bg-card px-6 py-8 md:px-8">
      <p className="mb-4 text-xs text-muted-foreground">静态规格</p>
      <div className="flex flex-wrap items-start gap-8 md:gap-10">
        {SELECT_STATE_LABELS.map(({ state, label, open }) => (
          <div key={state} className="flex flex-col items-center gap-2">
            <SelectShowcase
              state={state}
              open={open}
              status={state === "error" ? "error" : undefined}
            />
            <span className="text-[11px] text-muted-foreground">{label}</span>
          </div>
        ))}
      </div>

      <div className="mt-8 border-t border-border/50 pt-8">
        <p className="mb-4 text-xs text-muted-foreground">
          可交互 · 单选（点击同一组件查看默认 / Hover / Focus / 下拉状态）
        </p>
        <Select
          options={[
            { label: "选项一", value: "1" },
            { label: "选项二", value: "2" },
            { label: "选项三", value: "3" },
          ]}
          value={value || undefined}
          onChange={(v) => setValue(typeof v === "string" ? v : "")}
          placeholder="请选择"
          className="max-w-[280px]"
        />
        <p className="mt-3 text-xs text-muted-foreground">
          当前选中：{value || "—"}
        </p>
      </div>
    </div>
  );
}

export function SelectTypesShowcase() {
  const [single, setSingle] = useState<string>("");
  const [multi, setMulti] = useState<string[]>([]);
  const [search, setSearch] = useState<string>("");
  const [clearable, setClearable] = useState<string>("1");
  const [multiCreate, setMultiCreate] = useState<string[]>([]);

  return (
    <div className="space-y-6">
      <div className="rounded-md border bg-card px-6 py-6 md:px-8">
        <div className="mb-4">
          <h3 className="text-[13px] font-semibold text-foreground">
            {SELECT_TYPE_LABELS[0].label}
          </h3>
          <p className="text-xs text-muted-foreground">
            {SELECT_TYPE_LABELS[0].description}
          </p>
        </div>
        <Select
          value={single || undefined}
          onChange={(v) => setSingle(typeof v === "string" ? v : "")}
          placeholder="请选择"
          className="max-w-[280px]"
        />
      </div>

      <div className="rounded-md border bg-card px-6 py-6 md:px-8">
        <div className="mb-4">
          <h3 className="text-[13px] font-semibold text-foreground">
            {SELECT_TYPE_LABELS[1].label}
          </h3>
          <p className="text-xs text-muted-foreground">
            {SELECT_TYPE_LABELS[1].description}
          </p>
        </div>
        <p className="mb-3 text-xs text-muted-foreground">
          交互演示（点击展开、可删标签）
        </p>
        <Select
          mode="multiple"
          allowClear
          options={SELECT_MULTI_DEMO_OPTIONS}
          value={multi}
          onChange={(v) => setMulti(Array.isArray(v) ? v : [])}
          placeholder="请选择"
          className="max-w-[320px]"
        />
        {multi.length > 0 && (
          <p className="mt-3 text-xs text-muted-foreground">
            已选 {multi.length} 项 · 点击右侧 × 或展开面板「全部清空」
          </p>
        )}
      </div>

      <div className="rounded-md border bg-card px-6 py-6 md:px-8">
        <div className="mb-4">
          <h3 className="text-[13px] font-semibold text-foreground">
            {SELECT_TYPE_LABELS[2].label}
          </h3>
          <p className="text-xs text-muted-foreground">
            {SELECT_TYPE_LABELS[2].description}
          </p>
        </div>
        <Select
          showSearch
          value={search || undefined}
          onChange={(v) => setSearch(typeof v === "string" ? v : "")}
          placeholder="请选择"
          className="max-w-[280px]"
        />
      </div>

      <div className="rounded-md border bg-card px-6 py-6 md:px-8">
        <div className="mb-4">
          <h3 className="text-[13px] font-semibold text-foreground">
            {SELECT_TYPE_LABELS[3].label}
          </h3>
          <p className="text-xs text-muted-foreground">
            {SELECT_TYPE_LABELS[3].description}
          </p>
        </div>
        <Select
          allowClear
          value={clearable}
          onChange={(v) => setClearable(typeof v === "string" ? v : "")}
          className="max-w-[280px]"
        />
      </div>

      <div className="rounded-md border bg-card px-6 py-6 md:px-8">
        <div className="mb-4">
          <h3 className="text-[13px] font-semibold text-foreground">
            {SELECT_TYPE_LABELS[4].label}
          </h3>
          <p className="text-xs text-muted-foreground">
            {SELECT_TYPE_LABELS[4].description}
          </p>
        </div>
        <Select
          showSearch
          allowClear
          options={SELECT_GROUPED_DEMO_OPTIONS}
          placeholder="请选择城市"
          className="max-w-[320px]"
        />
      </div>

      <div className="rounded-md border bg-card px-6 py-6 md:px-8">
        <p className="mb-3 text-xs text-muted-foreground">
          多选 · 搜索与「添加新项」（点击展开，可搜索、添加新项、全部清空）
        </p>
        <Select
          mode="multiple"
          showSearch
          withCreate
          allowClear
          options={SELECT_MULTI_DEMO_OPTIONS}
          value={multiCreate}
          onChange={(v) => setMultiCreate(Array.isArray(v) ? v : [])}
          placeholder="请选择"
          className="max-w-[320px]"
        />
        {multiCreate.length > 0 && (
          <p className="mt-3 text-xs text-muted-foreground">
            已选：{multiCreate.join("、")}
          </p>
        )}
      </div>
    </div>
  );
}

export function SelectSizesShowcase() {
  const [sm, setSm] = useState<string>("");
  const [md, setMd] = useState<string>("");
  const [lg, setLg] = useState<string>("");

  const sizeState: { size: "sm" | "md" | "lg"; label: string; height: string; value: string; onChange: (v: string) => void }[] =
    SELECT_SIZE_LABELS.map(({ size, label, height }) => {
      if (size === "sm") return { size, label, height, value: sm, onChange: setSm };
      if (size === "md") return { size, label, height, value: md, onChange: setMd };
      return { size, label, height, value: lg, onChange: setLg };
    });

  return (
    <div className="rounded-md border bg-card px-6 py-8 md:px-8">
      <p className="mb-4 text-xs text-muted-foreground">
        默认收起，点击各尺寸 Select 展开下拉
      </p>
      <div className="flex flex-wrap items-end gap-8 md:gap-12">
        {sizeState.map(({ size, label, height, value, onChange }) => (
          <div key={size} className="flex flex-col items-center gap-2">
            <Select
              size={size}
              value={value || undefined}
              onChange={(v) => onChange(typeof v === "string" ? v : "")}
              placeholder="请选择"
            />
            <span className="text-[11px] text-muted-foreground">{label}</span>
            <span className="font-mono text-[10px] text-muted-foreground/80">
              {height}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function SelectLegacyRowShowcase() {
  const [interactive, setInteractive] = useState<string>("");
  const [searchable, setSearchable] = useState<string>("");

  return (
    <div className="rounded-md border bg-card px-6 py-8 md:px-8">
      <h3 className="mb-6 text-sm font-semibold text-primary">单选状态</h3>
      <div className="grid gap-6 lg:grid-cols-[minmax(280px,420px)_220px_260px]">
        <div className="flex flex-col">
          <p className="mb-2 min-h-[44px] text-xs leading-5 text-muted-foreground">
            交互演示（点击同一组件查看默认 / Hover / 点击 / 下拉状态）
          </p>
          <Select
            value={interactive || undefined}
            onChange={(v) => setInteractive(typeof v === "string" ? v : "")}
            placeholder="请选择"
            className="max-w-[280px]"
          />
          <p className="mt-2 text-xs text-muted-foreground">
            当前选中：{interactive || "—"}
          </p>
        </div>
        <div className="flex flex-col">
          <p className="mb-2 min-h-[44px] text-xs leading-5 text-muted-foreground">
            禁用
          </p>
          <SelectShowcase state="disabled" />
        </div>
        <div className="flex flex-col">
          <p className="mb-2 min-h-[44px] text-xs leading-5 text-muted-foreground">
            搜索下拉
          </p>
          <Select
            showSearch
            value={searchable || undefined}
            onChange={(v) => setSearchable(typeof v === "string" ? v : "")}
            placeholder="请选择"
            className="max-w-[280px]"
          />
          <p className="mt-2 text-xs text-muted-foreground">
            当前选中：{searchable || "—"}
          </p>
        </div>
      </div>
    </div>
  );
}
