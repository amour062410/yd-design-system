"use client";

import { useState } from "react";
import { DatePicker, DatePickerShowcase } from "@yd-ds/ui/date-picker";
import {
  DATE_PICKER_SIZE_LABELS,
  DATE_PICKER_SIZE_SPECS_TABLE,
  DATE_PICKER_STATE_LABELS,
  DATE_PICKER_TYPE_LABELS,
} from "@/lib/data/datePickerMock";

export function DatePickerStatesShowcase() {
  const [liveDate, setLiveDate] = useState<Date | null>(null);

  return (
    <div className="rounded-md border bg-card px-6 py-8 md:px-8">
      <p className="mb-4 text-xs text-muted-foreground">静态规格 · 单选 Regular</p>
      <div className="flex flex-wrap items-start gap-8 md:gap-10">
        {DATE_PICKER_STATE_LABELS.map(({ state, label }) => (
          <div key={state} className="flex w-[200px] flex-col gap-2">
            <span className="text-[11px] text-muted-foreground">{label}</span>
            <DatePickerShowcase
              size="md"
              state={state}
              placeholder="请选择日期"
            />
          </div>
        ))}
      </div>

      <div className="mt-10 border-t border-border/50 pt-8">
        <p className="mb-4 text-xs text-muted-foreground">静态规格 · 范围 Regular</p>
        <div className="flex flex-wrap items-start gap-8 md:gap-10">
          {DATE_PICKER_STATE_LABELS.map(({ state, label }) => (
            <div key={`range-${state}`} className="flex w-[280px] flex-col gap-2">
              <span className="text-[11px] text-muted-foreground">{label}</span>
              <DatePickerShowcase
                size="md"
                range
                state={state}
                placeholder={["开始日期", "结束日期"]}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="mt-10 border-t border-border/50 pt-8">
        <p className="mb-4 text-xs text-muted-foreground">可交互 · 单选</p>
        <DatePicker
          value={liveDate}
          onChange={(v) => !Array.isArray(v) && setLiveDate(v)}
          placeholder="请选择日期"
          className="max-w-[320px]"
        />
        <p className="mt-3 text-xs text-muted-foreground">
          当前选中：{liveDate ? liveDate.toLocaleDateString("zh-CN") : "—"}
        </p>
      </div>
    </div>
  );
}

export function DatePickerTypesShowcase() {
  const [range, setRange] = useState<[Date | null, Date | null]>([null, null]);

  return (
    <div className="space-y-6">
      <div className="rounded-md border bg-card px-6 py-6 md:px-8">
        <div className="mb-4">
          <h3 className="text-[13px] font-semibold text-foreground">
            {DATE_PICKER_TYPE_LABELS[0].label}
          </h3>
          <p className="text-xs text-muted-foreground">
            {DATE_PICKER_TYPE_LABELS[0].description}
          </p>
        </div>
        <DatePicker placeholder="请选择日期" className="max-w-[320px]" />
        <div className="mt-6 rounded-md border border-border/60 bg-surface-card-soft p-6">
          <p className="mb-4 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
            面板预览区
          </p>
          <DatePicker defaultValue={new Date(2026, 4, 15)} className="max-w-[320px]" />
        </div>
      </div>

      <div className="rounded-md border bg-card px-6 py-6 md:px-8">
        <div className="mb-4">
          <h3 className="text-[13px] font-semibold text-foreground">
            {DATE_PICKER_TYPE_LABELS[1].label}
          </h3>
          <p className="text-xs text-muted-foreground">
            {DATE_PICKER_TYPE_LABELS[1].description}
          </p>
        </div>
        <DatePicker
          range
          value={range}
          onChange={(v) => Array.isArray(v) && setRange(v)}
          placeholder={["开始日期", "结束日期"]}
        />
      </div>

      <div className="rounded-md border bg-card px-6 py-6 md:px-8">
        <div className="mb-4">
          <h3 className="text-[13px] font-semibold text-foreground">
            {DATE_PICKER_TYPE_LABELS[2].label}
          </h3>
          <p className="text-xs text-muted-foreground">
            {DATE_PICKER_TYPE_LABELS[2].description}
          </p>
        </div>
        <DatePicker range shortcuts placeholder={["开始日期", "结束日期"]} />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-md border bg-card px-6 py-6 md:px-8">
          <h3 className="mb-1 text-[13px] font-semibold text-foreground">
            {DATE_PICKER_TYPE_LABELS[3].label}
          </h3>
          <p className="mb-4 text-xs text-muted-foreground">
            {DATE_PICKER_TYPE_LABELS[3].description}
          </p>
          <DatePicker mode="month" placeholder="请选择月份" className="max-w-[320px]" />
        </div>
        <div className="rounded-md border bg-card px-6 py-6 md:px-8">
          <h3 className="mb-1 text-[13px] font-semibold text-foreground">
            {DATE_PICKER_TYPE_LABELS[4].label}
          </h3>
          <p className="mb-4 text-xs text-muted-foreground">
            {DATE_PICKER_TYPE_LABELS[4].description}
          </p>
          <DatePicker mode="year" placeholder="请选择年份" className="max-w-[320px]" />
        </div>
        <div className="rounded-md border bg-card px-6 py-6 md:px-8">
          <h3 className="mb-1 text-[13px] font-semibold text-foreground">
            {DATE_PICKER_TYPE_LABELS[5].label}
          </h3>
          <p className="mb-4 text-xs text-muted-foreground">
            {DATE_PICKER_TYPE_LABELS[5].description}
          </p>
          <DatePicker mode="quarter" placeholder="请选择季度" className="max-w-[320px]" />
        </div>
        <div className="rounded-md border bg-card px-6 py-6 md:px-8">
          <h3 className="mb-1 text-[13px] font-semibold text-foreground">
            {DATE_PICKER_TYPE_LABELS[6].label}
          </h3>
          <p className="mb-4 text-xs text-muted-foreground">
            {DATE_PICKER_TYPE_LABELS[6].description}
          </p>
          <DatePicker
            mode="datetime"
            showTime
            placeholder="请选择日期时间"
            className="max-w-[320px]"
          />
        </div>
      </div>
    </div>
  );
}

export function DatePickerSizesShowcase() {
  return (
    <div className="rounded-md border bg-card px-6 py-8 md:px-8">
      <div className="mb-8 overflow-x-auto rounded-sm border border-border/60">
        <table className="w-full min-w-[520px] text-left text-[13px]">
          <thead>
            <tr className="border-b border-border/80 bg-surface-card-soft">
              <th className="px-4 py-3 font-medium text-muted-foreground">Size</th>
              <th className="px-4 py-3 font-medium text-muted-foreground">Height</th>
              <th className="px-4 py-3 font-medium text-muted-foreground">Font</th>
              <th className="px-4 py-3 font-medium text-muted-foreground">Padding</th>
              <th className="px-4 py-3 font-medium text-muted-foreground">Icon</th>
              <th className="px-4 py-3 font-medium text-muted-foreground">Radius</th>
            </tr>
          </thead>
          <tbody>
            {DATE_PICKER_SIZE_SPECS_TABLE.map((row) => (
              <tr key={row.size} className="border-b border-border/50 last:border-0">
                <td className="px-4 py-3 font-medium uppercase tracking-wide text-foreground">
                  {row.size}
                </td>
                <td className="px-4 py-3 text-muted-foreground">{row.height}</td>
                <td className="px-4 py-3 text-muted-foreground">{row.fontSize}</td>
                <td className="px-4 py-3 text-muted-foreground">{row.padding}</td>
                <td className="px-4 py-3 text-muted-foreground">{row.icon}</td>
                <td className="px-4 py-3 text-muted-foreground">{row.radius}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="mb-4 text-xs text-muted-foreground">
        默认收起，点击各尺寸 DatePicker 展开面板
      </p>
      <div className="grid gap-12 md:grid-cols-3">
        {DATE_PICKER_SIZE_LABELS.map(({ size, label, height }) => (
          <div key={size}>
            <p className="mb-2 text-[11px] text-muted-foreground">
              {label} · {height}
            </p>
            <DatePicker size={size} placeholder="请选择日期" />
            <div className="mt-4">
              <DatePicker
                size={size}
                range
                placeholder={["开始日期", "结束日期"]}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function DatePickerUsageShowcase() {
  const [liveDate, setLiveDate] = useState<Date | null>(null);
  const [liveRange, setLiveRange] = useState<[Date | null, Date | null]>([
    null,
    null,
  ]);

  return (
    <div className="rounded-md border bg-card px-6 py-8 md:px-8">
      <div className="flex flex-wrap gap-x-12 gap-y-10">
        <div className="w-full min-w-[240px] max-w-[300px] flex-1">
          <p className="mb-2 text-xs font-medium text-foreground">单选日期</p>
          <DatePicker
            value={liveDate}
            onChange={(v) => !Array.isArray(v) && setLiveDate(v)}
            placeholder="请选择日期"
          />
        </div>
        <div className="w-full min-w-[300px] max-w-[400px] flex-1">
          <p className="mb-2 text-xs font-medium text-foreground">日期范围</p>
          <DatePicker
            range
            value={liveRange}
            onChange={(v) => Array.isArray(v) && setLiveRange(v)}
            placeholder={["开始日期", "结束日期"]}
          />
        </div>
        <div className="w-full min-w-[280px] max-w-[400px] flex-1">
          <p className="mb-2 text-xs font-medium text-foreground">带快捷筛选的范围</p>
          <DatePicker range shortcuts placeholder={["开始日期", "结束日期"]} />
        </div>
      </div>
    </div>
  );
}

export function DatePickerDarkModeShowcase() {
  return (
    <div className="dark rounded-md border bg-card px-6 py-8 md:px-8">
      <p className="mb-6 text-xs text-muted-foreground">Dark Mode 预览</p>
      <div className="flex flex-wrap gap-10">
        <div className="w-full max-w-[280px]">
          <p className="mb-2 text-xs font-medium text-foreground">单选</p>
          <DatePicker placeholder="请选择日期" />
        </div>
        <div className="w-full max-w-[400px]">
          <p className="mb-2 text-xs font-medium text-foreground">范围</p>
          <DatePicker range shortcuts placeholder={["开始日期", "结束日期"]} />
        </div>
      </div>
    </div>
  );
}
