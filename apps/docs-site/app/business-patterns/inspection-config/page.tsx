import type { Metadata } from "next";
import { InspectionConfigView } from "./inspection-config-view";

export const metadata: Metadata = {
  title: "巡检配置 | Business Patterns",
  description: "云盯巡检评分规则配置：Form + InputNumber + Select",
};

export default function InspectionConfigPage() {
  return <InspectionConfigView />;
}
