"use client";

import { Steps } from "../../components/steps/steps";
import type { ReportGenerateStepsProps } from "../../components/steps/steps.types";

const REPORT_GENERATE_ITEMS = [
  { title: "选择范围", description: "选定门店、时间与报告类型" },
  { title: "数据汇总", description: "聚合巡检、整改与 KPI 数据" },
  { title: "生成报告", description: "渲染图表与结论摘要" },
  { title: "导出分享", description: "导出 PDF 或分享链接" },
] as const;

export function ReportGenerateSteps({
  current = 0,
  ...props
}: ReportGenerateStepsProps) {
  return (
    <Steps
      current={current}
      items={[...REPORT_GENERATE_ITEMS]}
      {...props}
    />
  );
}

export { REPORT_GENERATE_ITEMS };
