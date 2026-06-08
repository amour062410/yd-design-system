export type BusinessComponentNavItem = {
  href: string;
  label: string;
  labelZh: string;
  ready?: boolean;
};

export const businessComponentsNavigation: BusinessComponentNavItem[] = [
  {
    href: "/business-components/rectification-progress",
    label: "RectificationProgress",
    labelZh: "整改完成率",
    ready: true,
  },
  {
    href: "/business-components/store-health-progress",
    label: "StoreHealthProgress",
    labelZh: "门店健康度",
    ready: true,
  },
  {
    href: "/business-components/inspection-coverage-progress",
    label: "InspectionCoverageProgress",
    labelZh: "巡检覆盖率",
    ready: true,
  },
  {
    href: "/business-components/risk-handling-progress",
    label: "RiskHandlingProgress",
    labelZh: "风险处理率",
    ready: true,
  },
  {
    href: "/business-components/inspection-stage-progress",
    label: "InspectionStageProgress",
    labelZh: "巡检流程进度",
    ready: true,
  },
];

export const readyBusinessComponentsNavigation = businessComponentsNavigation.filter(
  (item) => item.ready
);

export function formatBusinessComponentNavLabel(item: BusinessComponentNavItem) {
  return `${item.labelZh}`;
}

export function matchesBusinessComponentSearch(
  item: BusinessComponentNavItem,
  query: string
) {
  const q = query.trim().toLowerCase();
  if (!q) return true;
  const slug = item.href.replace("/business-components/", "");
  return (
    item.label.toLowerCase().includes(q) ||
    item.labelZh.includes(query.trim()) ||
    slug.includes(q.replace(/\s+/g, "-"))
  );
}

export const businessComponentsEntryHref =
  "/business-components/rectification-progress";
