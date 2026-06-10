import type { Metadata } from "next";
import { InspectionRuleConfigShowcaseView } from "./inspection-rule-config-showcase-view";

export const metadata: Metadata = {
  title: "巡检规则配置 | Showcase",
  description: "PageHeader + Form + InputNumber + Card + Button 组合展示",
};

export default function InspectionRuleConfigPage() {
  return <InspectionRuleConfigShowcaseView />;
}
