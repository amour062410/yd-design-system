export type BusinessShowcaseNavItem = {
  href: string;
  label: string;
  labelZh: string;
  ready?: boolean;
  group: "patterns" | "demos";
};

export const businessShowcaseNavigation: BusinessShowcaseNavItem[] = [
  // 业务模式
  {
    href: "/business-showcase/patterns/certificate-management",
    label: "Certificate Management",
    labelZh: "证照管理",
    ready: true,
    group: "patterns",
  },
  {
    href: "/business-showcase/patterns/store-management",
    label: "Store Management",
    labelZh: "门店管理",
    ready: true,
    group: "patterns",
  },
  {
    href: "/business-showcase/patterns/inspection-config",
    label: "Inspection Config",
    labelZh: "巡检配置",
    ready: true,
    group: "patterns",
  },
  // 案例展示
  {
    href: "/business-showcase/demos/store-management",
    label: "Store Management",
    labelZh: "区域门店管理",
    ready: true,
    group: "demos",
  },
  {
    href: "/business-showcase/demos/inspection-rule-config",
    label: "Inspection Rule Config",
    labelZh: "巡检规则配置",
    ready: true,
    group: "demos",
  },
];

export const businessShowcaseEntryHref =
  "/business-showcase/patterns/certificate-management";

export function formatBusinessShowcaseNavLabel(item: BusinessShowcaseNavItem) {
  return `${item.label} ${item.labelZh}`;
}
