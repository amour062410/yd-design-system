"use client";

import { Steps } from "../../components/steps/steps";
import type { InspectionStepsProps } from "../../components/steps/steps.types";

const INSPECTION_ITEMS = [
  { title: "创建任务", description: "定义巡检范围、周期与执行人" },
  { title: "执行巡检", description: "门店现场执行检查项并拍照取证" },
  { title: "提交结果", description: "汇总得分、问题项并提交审核" },
  { title: "完成归档", description: "报告归档，数据进入驾驶舱统计" },
] as const;

export function InspectionSteps({
  current = 0,
  ...props
}: InspectionStepsProps) {
  return (
    <Steps
      current={current}
      items={[...INSPECTION_ITEMS]}
      {...props}
    />
  );
}

export { INSPECTION_ITEMS };
