"use client";

import { useState } from "react";
import { Button } from "@yd-ds/ui/button";
import { OverviewCard } from "@yd-ds/ui/card";
import { Form } from "@yd-ds/ui/form";
import {
  AlertThresholdInput,
  InspectionScoreInput,
  RectificationDeadlineInput,
} from "@yd-ds/ui/input-number";
import { Select } from "@yd-ds/ui/select";
import { INSPECTION_LEVEL_OPTIONS, INSPECTION_RULE_PRESETS } from "@/lib/data/inputNumberMock";

export function InspectionRuleConfigShowcaseView() {
  const [preset, setPreset] = useState("standard");
  const [passScore, setPassScore] = useState<number | null>(85);
  const [threshold, setThreshold] = useState<number | null>(80);
  const [deadline, setDeadline] = useState<number | null>(7);
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
        <h1 className="text-[24px] font-semibold tracking-tight text-foreground">巡检规则配置</h1>
        <p className="text-[14px] text-muted-foreground">
          Showcase 页面：PageHeader + Form + InputNumber + Card + Button，还原云盯巡检规则后台配置页。
        </p>
      </div>

      <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_280px]">
        <div className="rounded-[8px] border border-border bg-card">
          <div className="border-b border-border px-6 py-4">
            <div className="text-[16px] font-medium">评分规则</div>
            <div className="mt-1 text-[13px] text-muted-foreground">配置合格分、告警阈值与整改时限</div>
          </div>
          <div className="p-6">
            <Form
              layout="vertical"
              onSubmit={(event) => event.preventDefault()}
              className="max-w-[480px]"
            >
              <Form.Item label="规则模板" required>
                <Select
                  options={INSPECTION_RULE_PRESETS.map((item) => ({
                    label: item.label,
                    value: item.value,
                  }))}
                  value={preset}
                  onChange={applyPreset}
                />
              </Form.Item>

              <Form.Item label="适用等级">
                <Select
                  options={INSPECTION_LEVEL_OPTIONS}
                  value={level}
                  onChange={(value) => setLevel(Array.isArray(value) ? value[0] ?? "all" : value)}
                />
              </Form.Item>

              <Form.Item label="合格分数" required>
                <InspectionScoreInput value={passScore} onChange={setPassScore} className="w-full max-w-[200px]" />
              </Form.Item>

              <Form.Item label="告警阈值" required help="低于该分数将推送预警">
                <AlertThresholdInput value={threshold} onChange={setThreshold} className="w-full max-w-[200px]" />
              </Form.Item>

              <Form.Item label="整改时限">
                <RectificationDeadlineInput value={deadline} onChange={setDeadline} className="w-full max-w-[200px]" />
              </Form.Item>

              <div className="flex gap-2 pt-2">
                <Button type="submit">保存并生效</Button>
                <Button variant="secondary" type="button">
                  取消
                </Button>
              </div>
            </Form>
          </div>
        </div>

        <div className="space-y-4">
          <OverviewCard
            title="当前规则摘要"
            items={[
              { label: "模板", value: INSPECTION_RULE_PRESETS.find((p) => p.value === preset)?.label ?? "-" },
              { label: "合格分", value: passScore !== null ? `${passScore} 分` : "-" },
              { label: "告警阈值", value: threshold !== null ? `${threshold}` : "-" },
              { label: "整改时限", value: deadline !== null ? `${deadline} 天` : "-" },
            ]}
          />
          <div className="rounded-[8px] border border-border bg-card p-4 text-[13px] leading-6 text-muted-foreground">
            规则变更后将在下次巡检任务生成时生效。重点门店建议将合格分设为 90 分以上，并缩短整改时限。
          </div>
        </div>
      </div>
    </div>
  );
}
