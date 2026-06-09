"use client";

import { useState } from "react";
import { Button } from "@yd-ds/ui/button";
import { Form } from "@yd-ds/ui/form";
import {
  AlertThresholdInput,
  BusinessHoursInput,
  DeviceCountInput,
  InspectionScoreInput,
  RectificationDeadlineInput,
} from "@yd-ds/ui/input-number";
import { Select } from "@yd-ds/ui/select";
import { INSPECTION_LEVEL_OPTIONS, INSPECTION_RULE_PRESETS } from "@/lib/data/inputNumberMock";

export function InspectionConfigView() {
  const [preset, setPreset] = useState("standard");
  const [passScore, setPassScore] = useState<number | null>(85);
  const [threshold, setThreshold] = useState<number | null>(80);
  const [deadline, setDeadline] = useState<number | null>(7);
  const [deviceCount, setDeviceCount] = useState<number | null>(35);
  const [businessHours, setBusinessHours] = useState<number | null>(12);
  const [level, setLevel] = useState("all");

  const applyPreset = (value: string | string[]) => {
    const key = Array.isArray(value) ? value[0] ?? "standard" : value;
    setPreset(key);
    const found = INSPECTION_RULE_PRESETS.find((item) => item.value === key);
    if (found) {
      setPassScore(found.passScore);
      setThreshold(found.threshold);
      setDeadline(found.deadline);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2 border-b border-border pb-6">
        <h1 className="text-[24px] font-semibold tracking-tight text-foreground">巡检配置</h1>
        <p className="text-[14px] text-muted-foreground">
          模拟云盯巡检评分规则配置：合格分、告警阈值、整改时限与门店参数，Form + InputNumber + Select 组合。
        </p>
      </div>

      <div className="rounded-[8px] border border-border bg-card p-6">
        <Form
          layout="horizontal"
          labelAlign="right"
          labelWidth={120}
          onSubmit={(event) => event.preventDefault()}
          className="max-w-[640px]"
        >
          <Form.Item label="规则模板" required>
            <Select
              options={INSPECTION_RULE_PRESETS.map((item) => ({
                label: item.label,
                value: item.value,
              }))}
              value={preset}
              onChange={applyPreset}
              className="max-w-[240px]"
            />
          </Form.Item>

          <Form.Item label="适用等级">
            <Select
              options={INSPECTION_LEVEL_OPTIONS}
              value={level}
              onChange={(value) => setLevel(Array.isArray(value) ? value[0] ?? "all" : value)}
              className="max-w-[240px]"
            />
          </Form.Item>

          <Form.Item label="合格分数" required tooltip="低于该分数判定为不合格">
            <InspectionScoreInput value={passScore} onChange={setPassScore} className="w-[160px]" />
          </Form.Item>

          <Form.Item label="告警阈值" required help="低于该分数触发预警通知">
            <AlertThresholdInput value={threshold} onChange={setThreshold} className="w-[160px]" />
          </Form.Item>

          <Form.Item label="整改时限" required>
            <RectificationDeadlineInput value={deadline} onChange={setDeadline} className="w-[160px]" />
          </Form.Item>

          <Form.Item label="监控设备数">
            <DeviceCountInput value={deviceCount} onChange={setDeviceCount} className="w-[160px]" />
          </Form.Item>

          <Form.Item label="营业时长">
            <BusinessHoursInput value={businessHours} onChange={setBusinessHours} className="w-[160px]" />
          </Form.Item>

          <div className="flex gap-2 pt-2">
            <Button type="submit">保存配置</Button>
            <Button variant="secondary" type="button">
              重置
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}
