"use client";

import { useState } from "react";
import {
  DEFAULT_RADIO_OPTIONS,
  RadioGroup,
  RadioGroupShowcase,
  RadioShowcase,
} from "@yd-ds/ui/radio";
import {
  RADIO_BUTTON_STYLES,
  RADIO_SIZE_LABELS,
  RADIO_STATE_LABELS,
  RADIO_USAGE_TEXT,
} from "@/lib/data/radioMock";

export function RadioStatesShowcase() {
  return (
    <div className="rounded-md border bg-card">
      <div className="border-b border-border/60 bg-muted/30 px-6 py-4 md:px-8">
        <p className="text-sm text-muted-foreground">{RADIO_USAGE_TEXT}</p>
        <div className="mt-3 flex flex-wrap items-center gap-2">
          {RADIO_STATE_LABELS.map(({ label }) => (
            <span
              key={label}
              className="rounded-full border border-border/70 bg-background px-3 py-1 text-[11px] text-muted-foreground"
            >
              {label}
            </span>
          ))}
        </div>
      </div>

      <div className="px-6 py-8 md:px-8">
        <h3 className="mb-6 text-[13px] font-semibold text-foreground">Radio States</h3>
        <div className="flex flex-wrap items-end gap-8">
          {RADIO_STATE_LABELS.map(({ state, label }) => (
            <div key={state} className="flex flex-col items-start gap-2">
              <RadioShowcase state={state} />
              <span className="text-[10px] text-muted-foreground">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function RadioGroupShowcaseSection() {
  return (
    <div className="rounded-md border bg-card px-6 py-8 md:px-8">
      <h3 className="mb-6 text-[13px] font-semibold text-foreground">Radio Group</h3>
      <div className="grid gap-10 lg:grid-cols-2">
        <div>
          <p className="mb-4 text-[12px] font-medium text-muted-foreground">Horizontal</p>
          <RadioGroup defaultValue="1" options={DEFAULT_RADIO_OPTIONS} />
        </div>
        <div>
          <p className="mb-4 text-[12px] font-medium text-muted-foreground">Vertical</p>
          <RadioGroup
            direction="vertical"
            defaultValue="1"
            options={DEFAULT_RADIO_OPTIONS}
          />
        </div>
      </div>
    </div>
  );
}

export function RadioSizesShowcase() {
  return (
    <div className="rounded-md border bg-card px-6 py-8 md:px-8">
      <h3 className="mb-6 text-[13px] font-semibold text-foreground">Radio Sizes</h3>
      <div className="flex flex-wrap gap-10">
        {RADIO_SIZE_LABELS.map(({ size, label }) => (
          <div key={size} className="flex flex-col items-start gap-2">
            <RadioShowcase state="selected" size={size} label="选项一" />
            <span className="text-[10px] text-muted-foreground">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function RadioButtonStylesShowcase() {
  return (
    <div className="rounded-md border bg-card px-6 py-8 md:px-8">
      <h3 className="mb-2 text-[13px] font-semibold text-foreground">按钮样式组</h3>
      <p className="mb-6 text-[12px] text-muted-foreground">
        描边连接、实心填充、浅灰底分段切换
      </p>
      <div className="flex flex-wrap gap-10 lg:gap-14">
        {RADIO_BUTTON_STYLES.map(({ style, label }) => (
          <div key={style} className="space-y-3">
            <p className="text-[12px] font-medium text-muted-foreground">{label}</p>
            <RadioGroupShowcase buttonStyle={style} value="1" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function RadioInteractiveShowcase() {
  const [basic, setBasic] = useState("1");
  const [outlineBtn, setOutlineBtn] = useState("1");
  const [solidBtn, setSolidBtn] = useState("1");
  const [segmented, setSegmented] = useState("1");

  return (
    <div className="rounded-md border bg-card px-6 py-8 md:px-8">
      <h3 className="mb-6 text-[13px] font-semibold text-foreground">Interactive</h3>
      <div className="grid gap-10 lg:grid-cols-2">
        <div>
          <p className="mb-3 text-xs font-medium text-muted-foreground">圆形单选 · 横向</p>
          <RadioGroup value={basic} onChange={setBasic} options={DEFAULT_RADIO_OPTIONS} />
        </div>
        <div>
          <p className="mb-3 text-xs font-medium text-muted-foreground">圆形单选 · 纵向</p>
          <RadioGroup
            direction="vertical"
            value={basic}
            onChange={setBasic}
            options={DEFAULT_RADIO_OPTIONS}
          />
        </div>
        <div>
          <p className="mb-3 text-xs font-medium text-muted-foreground">描边按钮组</p>
          <RadioGroup
            optionType="button"
            buttonStyle="outline"
            value={outlineBtn}
            onChange={setOutlineBtn}
            options={DEFAULT_RADIO_OPTIONS}
          />
        </div>
        <div>
          <p className="mb-3 text-xs font-medium text-muted-foreground">填充按钮组</p>
          <RadioGroup
            optionType="button"
            buttonStyle="solid"
            value={solidBtn}
            onChange={setSolidBtn}
            options={DEFAULT_RADIO_OPTIONS}
          />
        </div>
        <div className="lg:col-span-2">
          <p className="mb-3 text-xs font-medium text-muted-foreground">分段背景组</p>
          <RadioGroup
            optionType="button"
            buttonStyle="segmented"
            value={segmented}
            onChange={setSegmented}
            options={DEFAULT_RADIO_OPTIONS}
          />
        </div>
        <div>
          <p className="mb-3 text-xs font-medium text-muted-foreground">禁用组</p>
          <RadioGroup defaultValue="1" disabled options={DEFAULT_RADIO_OPTIONS} />
        </div>
      </div>
    </div>
  );
}
