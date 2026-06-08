"use client";

import { useState } from "react";
import { TimePicker, TimePickerShowcase } from "@yd-ds/ui/time-picker";
import {
  TIME_PICKER_SIZE_LABELS,
  TIME_PICKER_SIZE_SPECS_TABLE,
  TIME_PICKER_STATE_LABELS,
  TIME_PICKER_TYPE_LABELS,
} from "@/lib/data/timePickerMock";

export function TimePickerStatesShowcase() {
  const [liveTime, setLiveTime] = useState<Date | null>(null);

  return (
    <div className="rounded-md border bg-card px-6 py-8 md:px-8">
      <p className="mb-4 text-xs text-muted-foreground">静态规格 · 单选 Regular</p>
      <div className="flex flex-wrap items-start gap-8 md:gap-10">
        {TIME_PICKER_STATE_LABELS.map(({ state, label }) => (
          <div key={state} className="flex w-[200px] flex-col gap-2">
            <span className="text-[11px] text-muted-foreground">{label}</span>
            <TimePickerShowcase
              size="md"
              state={state}
              placeholder="请选择时间"
            />
          </div>
        ))}
      </div>

      <div className="mt-10 border-t border-border/50 pt-8">
        <p className="mb-4 text-xs text-muted-foreground">静态规格 · 范围 Regular</p>
        <div className="flex flex-wrap items-start gap-8 md:gap-10">
          {TIME_PICKER_STATE_LABELS.map(({ state, label }) => (
            <div key={`range-${state}`} className="flex w-[280px] flex-col gap-2">
              <span className="text-[11px] text-muted-foreground">{label}</span>
              <TimePickerShowcase
                size="md"
                range
                state={state}
                placeholder={["开始时间", "结束时间"]}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="mt-10 border-t border-border/50 pt-8">
        <p className="mb-4 text-xs text-muted-foreground">可交互 · 单选</p>
        <TimePicker
          value={liveTime}
          onChange={(v) => !Array.isArray(v) && setLiveTime(v)}
          placeholder="请选择时间"
          className="max-w-[320px]"
        />
        <p className="mt-3 text-xs text-muted-foreground">
          当前选中：
          {liveTime
            ? liveTime.toLocaleTimeString("zh-CN", {
                hour: "2-digit",
                minute: "2-digit",
              })
            : "—"}
        </p>
      </div>
    </div>
  );
}

export function TimePickerTypesShowcase() {
  const [range, setRange] = useState<[Date | null, Date | null]>([null, null]);

  return (
    <div className="space-y-6">
      <div className="rounded-md border bg-card px-6 py-6 md:px-8">
        <div className="mb-4">
          <h3 className="text-[13px] font-semibold text-foreground">
            {TIME_PICKER_TYPE_LABELS[0].label}
          </h3>
          <p className="text-xs text-muted-foreground">
            {TIME_PICKER_TYPE_LABELS[0].description}
          </p>
        </div>
        <TimePicker placeholder="请选择时间" className="max-w-[320px]" />
      </div>

      <div className="rounded-md border bg-card px-6 py-6 md:px-8">
        <div className="mb-4">
          <h3 className="text-[13px] font-semibold text-foreground">
            {TIME_PICKER_TYPE_LABELS[1].label}
          </h3>
          <p className="text-xs text-muted-foreground">
            {TIME_PICKER_TYPE_LABELS[1].description}
          </p>
        </div>
        <TimePicker showSecond placeholder="请选择时间" className="max-w-[320px]" />
      </div>

      <div className="rounded-md border bg-card px-6 py-6 md:px-8">
        <div className="mb-4">
          <h3 className="text-[13px] font-semibold text-foreground">
            {TIME_PICKER_TYPE_LABELS[2].label}
          </h3>
          <p className="text-xs text-muted-foreground">
            {TIME_PICKER_TYPE_LABELS[2].description}
          </p>
        </div>
        <TimePicker
          range
          value={range}
          onChange={(v) => Array.isArray(v) && setRange(v)}
          placeholder={["开始时间", "结束时间"]}
        />
      </div>

      <div className="rounded-md border bg-card px-6 py-6 md:px-8">
        <div className="mb-4">
          <h3 className="text-[13px] font-semibold text-foreground">
            {TIME_PICKER_TYPE_LABELS[3].label}
          </h3>
          <p className="text-xs text-muted-foreground">
            {TIME_PICKER_TYPE_LABELS[3].description}
          </p>
        </div>
        <TimePicker
          range
          showSecond
          placeholder={["开始时间", "结束时间"]}
        />
      </div>
    </div>
  );
}

export function TimePickerSizesShowcase() {
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
            {TIME_PICKER_SIZE_SPECS_TABLE.map((row) => (
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
        默认收起，点击各尺寸 TimePicker 展开面板
      </p>
      <div className="grid gap-12 md:grid-cols-3">
        {TIME_PICKER_SIZE_LABELS.map(({ size, label, height }) => (
          <div key={size}>
            <p className="mb-2 text-[11px] text-muted-foreground">
              {label} · {height}
            </p>
            <TimePicker size={size} placeholder="请选择时间" />
            <div className="mt-4">
              <TimePicker
                size={size}
                range
                placeholder={["开始时间", "结束时间"]}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function TimePickerUsageShowcase() {
  const [liveTime, setLiveTime] = useState<Date | null>(null);
  const [liveRange, setLiveRange] = useState<[Date | null, Date | null]>([
    null,
    null,
  ]);

  return (
    <div className="rounded-md border bg-card px-6 py-8 md:px-8">
      <div className="flex flex-wrap gap-x-12 gap-y-10">
        <div className="w-full min-w-[240px] max-w-[300px] flex-1">
          <p className="mb-2 text-xs font-medium text-foreground">单选时间</p>
          <TimePicker
            value={liveTime}
            onChange={(v) => !Array.isArray(v) && setLiveTime(v)}
            placeholder="请选择时间"
          />
        </div>
        <div className="w-full min-w-[300px] max-w-[420px] flex-1">
          <p className="mb-2 text-xs font-medium text-foreground">时间范围</p>
          <TimePicker
            range
            value={liveRange}
            onChange={(v) => Array.isArray(v) && setLiveRange(v)}
            placeholder={["开始时间", "结束时间"]}
          />
        </div>
        <div className="w-full min-w-[240px] max-w-[300px] flex-1">
          <p className="mb-2 text-xs font-medium text-foreground">含秒精度</p>
          <TimePicker showSecond placeholder="请选择时间" />
        </div>
      </div>
    </div>
  );
}

export function TimePickerDarkModeShowcase() {
  return (
    <div className="dark rounded-md border bg-card px-6 py-8 md:px-8">
      <p className="mb-6 text-xs text-muted-foreground">Dark Mode 预览</p>
      <div className="flex flex-wrap gap-10">
        <div className="w-full max-w-[280px]">
          <p className="mb-2 text-xs font-medium text-foreground">单选</p>
          <TimePicker placeholder="请选择时间" />
        </div>
        <div className="w-full max-w-[420px]">
          <p className="mb-2 text-xs font-medium text-foreground">范围</p>
          <TimePicker range placeholder={["开始时间", "结束时间"]} />
        </div>
      </div>
    </div>
  );
}
