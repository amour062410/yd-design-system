"use client";

import { Steps } from "../../components/steps/steps";
import type { RectificationStepsProps } from "../../components/steps/steps.types";

const RECTIFICATION_ITEMS = [
  { title: "待整改", description: "巡检发现问题，等待门店整改" },
  { title: "整改中", description: "门店上传整改凭证与说明" },
  { title: "待复检", description: "督导复核整改结果" },
  { title: "已完成", description: "问题闭环，记录归档" },
] as const;

export function RectificationSteps({
  current = 0,
  ...props
}: RectificationStepsProps) {
  return (
    <Steps
      current={current}
      items={[...RECTIFICATION_ITEMS]}
      {...props}
    />
  );
}

export { RECTIFICATION_ITEMS };
