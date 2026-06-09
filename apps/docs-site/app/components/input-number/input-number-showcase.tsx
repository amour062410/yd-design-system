"use client";

import type { ReactNode } from "react";
import {
  BusinessHoursInput,
  DeviceCountInput,
  InputNumber,
  InspectionScoreInput,
  RectificationDeadlineInput,
} from "@yd-ds/ui/input-number";
import { ComponentDemoBlock } from "@/components/docs/component-demo-block";
import { INPUT_NUMBER_DEMO_CODES } from "@/lib/data/inputNumberMock";

function DemoLabel({ children }: { children: ReactNode }) {
  return <span className="mb-2 block text-[13px] text-[rgba(0,0,0,0.45)]">{children}</span>;
}

export function InputNumberRegularShowcase() {
  return (
    <div className="flex flex-col gap-12">
      <ComponentDemoBlock title="基本用法" description="默认数字输入框与右侧步进按钮。" code={INPUT_NUMBER_DEMO_CODES.basic}>
        <div className="w-[160px]">
          <InputNumber defaultValue={92} />
        </div>
      </ComponentDemoBlock>

      <ComponentDemoBlock title="三种尺寸" description="Small 28px · Default 32px · Large 36px。" code={INPUT_NUMBER_DEMO_CODES.sizes}>
        <div className="flex flex-wrap items-end gap-4">
          <div>
            <DemoLabel>Small</DemoLabel>
            <InputNumber size="small" defaultValue={92} className="w-[140px]" />
          </div>
          <div>
            <DemoLabel>Default</DemoLabel>
            <InputNumber size="default" defaultValue={92} className="w-[140px]" />
          </div>
          <div>
            <DemoLabel>Large</DemoLabel>
            <InputNumber size="large" defaultValue={92} className="w-[140px]" />
          </div>
        </div>
      </ComponentDemoBlock>

      <ComponentDemoBlock title="禁用状态" description="整体禁用，背景 #F5F5F5，步进按钮不可点击。" code={INPUT_NUMBER_DEMO_CODES.disabled}>
        <div className="w-[160px]">
          <InputNumber defaultValue={92} disabled />
        </div>
      </ComponentDemoBlock>

      <ComponentDemoBlock title="校验状态" description="Error / Warning 边框与文字色。" code={INPUT_NUMBER_DEMO_CODES.status}>
        <div className="flex flex-wrap gap-4">
          <div className="w-[160px]">
            <DemoLabel>错误</DemoLabel>
            <InputNumber defaultValue={92} status="error" />
          </div>
          <div className="w-[160px]">
            <DemoLabel>警告</DemoLabel>
            <InputNumber defaultValue={92} status="warning" />
          </div>
        </div>
      </ComponentDemoBlock>
    </div>
  );
}

export function InputNumberAdvancedShowcase() {
  return (
    <div className="flex flex-col gap-12">
      <ComponentDemoBlock title="范围限制" description="整改时限 1–30 天，到达边界时步进按钮禁用。" code={INPUT_NUMBER_DEMO_CODES.minMax}>
        <div className="w-[160px]">
          <InputNumber defaultValue={7} min={1} max={30} step={1} unit="天" />
        </div>
      </ComponentDemoBlock>

      <ComponentDemoBlock title="精度控制" description="告警阈值支持一位小数。" code={INPUT_NUMBER_DEMO_CODES.precision}>
        <div className="w-[160px]">
          <InputNumber defaultValue={85.5} min={0} max={100} step={0.1} precision={1} />
        </div>
      </ComponentDemoBlock>

      <ComponentDemoBlock title="格式化显示" description="千分位展示与解析。" code={INPUT_NUMBER_DEMO_CODES.formatter}>
        <div className="w-[180px]">
          <InputNumber
            defaultValue={12800}
            formatter={(v) => (v === undefined ? "" : `${v}`.replace(/\B(?=(\d{3})+(?!\d))/g, ","))}
            parser={(v) => {
              const parsed = Number(String(v).replace(/,/g, ""));
              return Number.isNaN(parsed) ? undefined : parsed;
            }}
          />
        </div>
      </ComponentDemoBlock>

      <ComponentDemoBlock
        title="带单位后缀"
        description="云盯业务场景：巡检得分、整改时限、设备数量、营业时长。"
        code={INPUT_NUMBER_DEMO_CODES.withUnit}
      >
        <div className="flex flex-wrap items-center gap-4">
          <InspectionScoreInput defaultValue={92} className="w-[120px]" />
          <RectificationDeadlineInput defaultValue={7} className="w-[120px]" />
          <DeviceCountInput defaultValue={35} className="w-[120px]" />
          <BusinessHoursInput defaultValue={24} className="w-[130px]" />
        </div>
      </ComponentDemoBlock>
    </div>
  );
}
