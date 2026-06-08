"use client";

import { useState } from "react";
import { Switch, SwitchShowcase } from "@yd-ds/ui/switch";
import {
  SWITCH_LABEL_EXAMPLES,
  SWITCH_SIZE_LABELS,
  SWITCH_STATE_LABELS,
  SWITCH_VARIANT_COLUMNS,
  SWITCH_VARIANT_ROWS,
} from "@/lib/data/switchMock";

export function SwitchStatesShowcase() {
  const [enabled, setEnabled] = useState(true);

  return (
    <div className="rounded-md border bg-card px-6 py-8 md:px-8">
      <div className="overflow-x-auto pb-1">
        <div className="flex min-w-[680px] items-end justify-between gap-4 pr-2">
          {SWITCH_STATE_LABELS.map(({ state, label }) => (
            <div key={state} className="flex shrink-0 flex-col items-center gap-2">
              <SwitchShowcase state={state} />
              <span className="whitespace-nowrap text-[11px] text-muted-foreground">
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 border-t border-border/50 pt-8">
        <p className="mb-4 text-xs text-muted-foreground">可交互 · 默认胶囊型</p>
        <div className="flex flex-wrap items-center gap-10">
          <Switch checked={enabled} onChange={setEnabled}>
            点击切换
          </Switch>
          <Switch disabled>禁用关闭</Switch>
          <Switch disabled defaultChecked>
            禁用开启
          </Switch>
        </div>
      </div>
    </div>
  );
}

export function SwitchVariantsShowcase() {
  const [iconOn, setIconOn] = useState(true);
  const [textOn, setTextOn] = useState(false);
  const [compactOn, setCompactOn] = useState(true);
  const [blockOn, setBlockOn] = useState(false);

  return (
    <div className="rounded-md border bg-card px-6 py-8 md:px-8">
      <p className="mb-4 text-xs text-muted-foreground">静态规格</p>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[520px] border-collapse text-sm">
          <thead>
            <tr>
              <th className="pb-4 pr-4 text-left text-xs font-medium text-muted-foreground">
                状态
              </th>
              {SWITCH_VARIANT_COLUMNS.map((col) => (
                <th
                  key={col.variant}
                  className="pb-4 text-center text-xs font-medium text-foreground"
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {SWITCH_VARIANT_ROWS.map((row) => (
              <tr key={row.state} className="border-t border-border/50">
                <td className="py-5 pr-4 align-middle text-xs text-muted-foreground">
                  {row.label}
                </td>
                {SWITCH_VARIANT_COLUMNS.map((col) => (
                  <td key={`${row.state}-${col.variant}`} className="py-5 text-center">
                    <div className="inline-flex justify-center">
                      <SwitchShowcase state={row.state} variant={col.variant} />
                    </div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-8 border-t border-border/50 pt-8">
        <p className="mb-4 text-xs text-muted-foreground">可交互 · 点击切换各变体</p>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-3">
            <p className="text-[12px] font-medium text-foreground">图标型</p>
            <Switch variant="icon" checked={iconOn} onChange={setIconOn}>
              消息推送
            </Switch>
            <Switch variant="icon" disabled defaultChecked>
              禁用开启
            </Switch>
          </div>
          <div className="space-y-3">
            <p className="text-[12px] font-medium text-foreground">文字型</p>
            <Switch variant="text" checked={textOn} onChange={setTextOn}>
              自动保存
            </Switch>
            <Switch variant="text" disabled>
              禁用关闭
            </Switch>
          </div>
          <div className="space-y-3">
            <p className="text-[12px] font-medium text-foreground">紧凑型</p>
            <Switch variant="compact" checked={compactOn} onChange={setCompactOn}>
              紧凑开关
            </Switch>
            <Switch variant="compact" disabled defaultChecked>
              禁用开启
            </Switch>
          </div>
          <div className="space-y-3">
            <p className="text-[12px] font-medium text-foreground">块型</p>
            <Switch variant="block" checked={blockOn} onChange={setBlockOn}>
              功能模块
            </Switch>
            <Switch variant="block" disabled>
              禁用关闭
            </Switch>
          </div>
        </div>
      </div>
    </div>
  );
}

export function SwitchSizesShowcase() {
  const [sm, setSm] = useState(false);
  const [md, setMd] = useState(true);
  const [lg, setLg] = useState(false);

  return (
    <div className="rounded-md border bg-card px-6 py-8 md:px-8">
      <div className="flex flex-wrap items-end gap-10">
        {SWITCH_SIZE_LABELS.map(({ size, label, height }) => (
          <div key={size} className="flex flex-col items-center gap-2">
            <SwitchShowcase state="on" size={size} />
            <span className="text-[11px] font-medium text-foreground">{label}</span>
            <span className="text-[10px] text-muted-foreground">高度 {height}</span>
          </div>
        ))}
      </div>

      <div className="mt-8 border-t border-border/50 pt-8">
        <p className="mb-4 text-xs text-muted-foreground">可交互</p>
        <div className="flex flex-wrap items-center gap-10">
          <Switch size="sm" checked={sm} onChange={setSm}>
            Small
          </Switch>
          <Switch size="md" checked={md} onChange={setMd}>
            Medium
          </Switch>
          <Switch size="lg" checked={lg} onChange={setLg}>
            Large
          </Switch>
        </div>
      </div>
    </div>
  );
}

export function SwitchWithLabelShowcase() {
  const [notify, setNotify] = useState(true);
  const [autosave, setAutosave] = useState(true);
  const [iconNotify, setIconNotify] = useState(true);
  const [compactFilter, setCompactFilter] = useState(false);

  return (
    <div className="rounded-md border bg-card px-6 py-8 md:px-8">
      <p className="mb-4 text-xs text-muted-foreground">静态展示</p>
      <div className="grid gap-6 sm:grid-cols-2">
        {SWITCH_LABEL_EXAMPLES.map((item) => (
          <Switch key={item.label} showcaseState={item.checked ? "on" : "off"}>
            {item.label}
          </Switch>
        ))}
      </div>
      <div className="mt-8 border-t border-border/50 pt-8">
        <p className="mb-4 text-xs text-muted-foreground">可交互</p>
        <div className="grid gap-6 sm:grid-cols-2">
          <Switch checked={notify} onChange={setNotify}>
            开启通知
          </Switch>
          <Switch variant="text" checked={autosave} onChange={setAutosave}>
            开启自动保存
          </Switch>
          <Switch variant="icon" checked={iconNotify} onChange={setIconNotify}>
            图标型通知
          </Switch>
          <Switch variant="compact" checked={compactFilter} onChange={setCompactFilter}>
            紧凑型筛选
          </Switch>
        </div>
      </div>
    </div>
  );
}
