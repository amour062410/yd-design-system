"use client";

import { useState } from "react";
import {
  Checkbox,
  CheckboxGroup,
  CheckboxShowcase,
  DEFAULT_CHECKBOX_OPTIONS,
} from "@yd-ds/ui/checkbox";
import {
  CHECKBOX_SIZE_LABELS,
  CHECKBOX_STATE_LABELS,
} from "@/lib/data/checkboxMock";

export function CheckboxStatesShowcase() {
  return (
    <div className="rounded-md border bg-card px-6 py-8 md:px-8">
      <div className="overflow-x-auto pb-1">
        <div className="flex min-w-[640px] items-end justify-between gap-4 pr-2">
          {CHECKBOX_STATE_LABELS.map(({ state, label }) => (
            <div key={state} className="flex shrink-0 flex-col items-start gap-2">
              <CheckboxShowcase state={state} />
              <span className="whitespace-nowrap text-[11px] text-muted-foreground">
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function CheckboxDisabledInteractiveShowcase() {
  return (
    <div className="rounded-md border bg-card px-6 py-8 md:px-8">
      <p className="mb-6 text-sm text-muted-foreground">
        可交互的禁用态：不可点击，保留禁用未选中与禁用已选中的视觉区分。
      </p>
      <div className="flex flex-wrap items-center gap-10">
        <Checkbox disabled>选项一</Checkbox>
        <Checkbox disabled defaultChecked>
          选项一
        </Checkbox>
        <Checkbox.Group defaultValue={["2"]} disabled>
          <Checkbox value="1">选项一</Checkbox>
          <Checkbox value="2">选项二</Checkbox>
          <Checkbox value="3">选项三</Checkbox>
        </Checkbox.Group>
      </div>
    </div>
  );
}

export function CheckboxGroupShowcaseSection() {
  const [horizontal, setHorizontal] = useState<string[]>(["2"]);
  const [vertical, setVertical] = useState<string[]>(["3"]);

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="rounded-md border bg-card px-6 py-8 md:px-8">
        <h3 className="mb-6 text-[13px] font-semibold text-foreground">横向排列</h3>
        <CheckboxGroup value={horizontal} onChange={setHorizontal} options={DEFAULT_CHECKBOX_OPTIONS} />
      </div>
      <div className="rounded-md border bg-card px-6 py-8 md:px-8">
        <h3 className="mb-6 text-[13px] font-semibold text-foreground">纵向排列</h3>
        <CheckboxGroup
          direction="vertical"
          value={vertical}
          onChange={setVertical}
          options={DEFAULT_CHECKBOX_OPTIONS}
        />
      </div>
    </div>
  );
}

export function CheckboxSizesShowcase() {
  return (
    <div className="rounded-md border bg-card px-6 py-8 md:px-8">
      <div className="flex flex-wrap items-end gap-10">
        {CHECKBOX_SIZE_LABELS.map(({ size, label }) => (
          <div key={size} className="flex flex-col items-start gap-2">
            <CheckboxShowcase state="checked" size={size} />
            <span className="text-[11px] text-muted-foreground">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
