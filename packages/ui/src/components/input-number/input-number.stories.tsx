import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import {
  AlertThresholdInput,
  BusinessHoursInput,
  DeviceCountInput,
  InputNumber,
  InspectionScoreInput,
  RectificationDeadlineInput,
} from "./index";

const meta: Meta<typeof InputNumber> = {
  title: "Components/Data Entry/InputNumber",
  component: InputNumber,
  parameters: { layout: "padded" },
};

export default meta;

type Story = StoryObj<typeof InputNumber>;

export const Basic: Story = {
  render: function BasicDemo() {
    const [value, setValue] = useState<number | null>(92);
    return (
      <div className="w-[200px]">
        <InputNumber value={value} onChange={setValue} placeholder="请输入" />
      </div>
    );
  },
};

export const MinMax: Story = {
  render: () => (
    <div className="w-[200px]">
      <InputNumber defaultValue={7} min={1} max={30} step={1} unit="天" />
    </div>
  ),
};

export const Precision: Story = {
  render: () => (
    <div className="w-[200px]">
      <InputNumber defaultValue={85.5} min={0} max={100} step={0.1} precision={1} />
    </div>
  ),
};

export const Formatter: Story = {
  render: () => (
    <div className="w-[200px]">
      <InputNumber
        defaultValue={12800}
        formatter={(v) => (v === undefined ? "" : `${v}`.replace(/\B(?=(\d{3})+(?!\d))/g, ","))}
        parser={(v) => {
          const parsed = Number(String(v).replace(/,/g, ""));
          return Number.isNaN(parsed) ? undefined : parsed;
        }}
      />
    </div>
  ),
};

export const WithUnit: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <InspectionScoreInput defaultValue={92} />
      <RectificationDeadlineInput defaultValue={7} />
      <DeviceCountInput defaultValue={35} />
      <BusinessHoursInput defaultValue={12} />
    </div>
  ),
};

export const InspectionScore: Story = {
  render: function InspectionScoreDemo() {
    const [score, setScore] = useState<number | null>(92);
    return (
      <div className="flex items-center gap-2 text-[13px]">
        <span className="text-[#86909c]">巡检得分</span>
        <InspectionScoreInput value={score} onChange={setScore} className="w-[120px]" />
      </div>
    );
  },
};

export const AlertThreshold: Story = {
  render: function AlertThresholdDemo() {
    const [threshold, setThreshold] = useState<number | null>(85.5);
    return (
      <div className="flex flex-col gap-2">
        <div className="text-[13px] text-[#86909c]">告警阈值（低于该分数触发预警）</div>
        <AlertThresholdInput value={threshold} onChange={setThreshold} className="w-[160px]" />
      </div>
    );
  },
};
