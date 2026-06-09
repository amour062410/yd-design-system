import type {
  TransferProInspector,
  TransferProMode,
  TransferProPanelMode,
  TransferProRecord,
  TransferProRule,
  TransferProTreeNode,
} from "./transfer-pro.types";

export const TRANSFER_PRO_INSPECTORS: TransferProInspector[] = [
  { key: "zhang", name: "张巡检", region: "华东", load: 12 },
  { key: "li", name: "李巡检", region: "华南", load: 8 },
  { key: "wang", name: "王主管", region: "华北", load: 15 },
  { key: "chen", name: "陈巡检", region: "华东", load: 6 },
  { key: "zhao", name: "赵巡检", region: "华南", load: 10 },
];

export const TRANSFER_PRO_STORE_TREE: TransferProTreeNode[] = [
  {
    key: "region-east",
    title: "华东区域",
    children: [
      {
        key: "mall-east-wanda",
        title: "万达广场",
        children: [
          { key: "store-nj-wanda", title: "南京万达店", isLeaf: true, meta: { region: "华东", mall: "万达广场", storeLevel: "A", inspectionStatus: "正常", lastInspection: "2026-06-08", inspectionFrequency: "high" } },
          { key: "store-sh-wanda", title: "上海万达店", isLeaf: true, meta: { region: "华东", mall: "万达广场", storeLevel: "A", inspectionStatus: "整改中", lastInspection: "2026-06-07", inspectionFrequency: "high" } },
        ],
      },
      {
        key: "mall-east-longfor",
        title: "龙湖天街",
        children: [
          { key: "store-hz-longfor", title: "杭州龙湖店", isLeaf: true, meta: { region: "华东", mall: "龙湖天街", storeLevel: "B", inspectionStatus: "正常", lastInspection: "2026-06-06", inspectionFrequency: "medium" } },
        ],
      },
      {
        key: "mall-east-mixc",
        title: "万象城",
        children: [
          { key: "store-cd-mixc", title: "成都万象城店", isLeaf: true, meta: { region: "华东", mall: "万象城", storeLevel: "A", inspectionStatus: "待巡检", lastInspection: "2026-06-05", inspectionFrequency: "high" } },
        ],
      },
    ],
  },
  {
    key: "region-south",
    title: "华南区域",
    children: [
      {
        key: "mall-south-wanda",
        title: "万达广场",
        children: [
          { key: "store-gz-wanda", title: "广州万达店", isLeaf: true, meta: { region: "华南", mall: "万达广场", storeLevel: "A", inspectionStatus: "正常", lastInspection: "2026-06-08", inspectionFrequency: "high" } },
        ],
      },
      {
        key: "mall-south-mixc",
        title: "万象城",
        children: [
          { key: "store-sz-mixc", title: "深圳万象城店", isLeaf: true, meta: { region: "华南", mall: "万象城", storeLevel: "A", inspectionStatus: "正常", lastInspection: "2026-06-04", inspectionFrequency: "medium" } },
        ],
      },
    ],
  },
  {
    key: "region-north",
    title: "华北区域",
    children: [
      {
        key: "mall-north-wanda",
        title: "万达广场",
        children: [
          { key: "store-bj-wanda", title: "北京万达店", isLeaf: true, meta: { region: "华北", mall: "万达广场", storeLevel: "B", inspectionStatus: "正常", lastInspection: "2026-06-03", inspectionFrequency: "low" } },
        ],
      },
      {
        key: "mall-north-longfor",
        title: "龙湖天街",
        children: [
          { key: "store-tj-longfor", title: "天津龙湖店", isLeaf: true, meta: { region: "华北", mall: "龙湖天街", storeLevel: "C", inspectionStatus: "整改中", lastInspection: "2026-06-02", inspectionFrequency: "medium", disabled: true } },
        ],
      },
    ],
  },
];

export const TRANSFER_PRO_LIST_DATA: TransferProRecord[] = [
  { key: "store-nj-wanda", title: "南京万达店", region: "华东", mall: "万达广场", storeLevel: "A", inspectionStatus: "正常", lastInspection: "2026-06-08", inspector: "张巡检", inspectionFrequency: "high" },
  { key: "store-sh-wanda", title: "上海万达店", region: "华东", mall: "万达广场", storeLevel: "A", inspectionStatus: "整改中", lastInspection: "2026-06-07", inspector: "陈巡检", inspectionFrequency: "high" },
  { key: "store-hz-longfor", title: "杭州龙湖店", region: "华东", mall: "龙湖天街", storeLevel: "B", inspectionStatus: "正常", lastInspection: "2026-06-06", inspector: "张巡检", inspectionFrequency: "medium" },
  { key: "store-gz-wanda", title: "广州万达店", region: "华南", mall: "万达广场", storeLevel: "A", inspectionStatus: "正常", lastInspection: "2026-06-08", inspector: "李巡检", inspectionFrequency: "high" },
  { key: "store-sz-mixc", title: "深圳万象城店", region: "华南", mall: "万象城", storeLevel: "A", inspectionStatus: "正常", lastInspection: "2026-06-04", inspector: "赵巡检", inspectionFrequency: "medium" },
  { key: "store-bj-wanda", title: "北京万达店", region: "华北", mall: "万达广场", storeLevel: "B", inspectionStatus: "正常", lastInspection: "2026-06-03", inspector: "王主管", inspectionFrequency: "low" },
];

export const TRANSFER_PRO_PERMISSION_DATA: TransferProRecord[] = [
  { key: "perm-inspection", title: "巡检管理", region: "总部" },
  { key: "perm-workorder", title: "工单管理", region: "总部" },
  { key: "perm-report", title: "报表查看", region: "总部" },
  { key: "perm-store", title: "门店管理", region: "区域" },
  { key: "perm-schedule", title: "调度中心", region: "区域" },
];

export const TRANSFER_PRO_RULE_LABELS: Record<TransferProRule, string> = {
  "by-region": "按区域自动分配",
  "by-store-level": "按门店等级分配",
  "by-inspection-frequency": "按巡检频率分配",
  "by-inspector-load": "按人员负载均衡",
};

export function flattenTreeToRecords(nodes: TransferProTreeNode[]): TransferProRecord[] {
  const records: TransferProRecord[] = [];
  const walk = (list: TransferProTreeNode[]) => {
    list.forEach((node) => {
      if (node.isLeaf || !node.children?.length) {
        records.push({
          key: node.key,
          title: typeof node.title === "string" ? node.title : node.key,
          ...node.meta,
          disabled: node.disabled,
        });
      }
      if (node.children?.length) walk(node.children);
    });
  };
  walk(nodes);
  return records;
}

export function resolvePanelMode(mode: TransferProPanelMode | undefined, side: "left" | "right"): TransferProMode {
  if (!mode || typeof mode === "string") return mode ?? "list";
  return side === "left" ? mode.left ?? "list" : mode.right ?? "list";
}
