export const STORE_TRANSFER_DATA = [
  { key: "wanda-plaza", title: "万达广场店" },
  { key: "global-harbor", title: "环球港店" },
  { key: "community-market", title: "社区超市" },
  { key: "mixc", title: "万象城店" },
  { key: "ifs", title: "IFS店" },
] as const;

export const INSPECTOR_TRANSFER_DATA = [
  { key: "zhangwei", title: "张伟" },
  { key: "lina", title: "李娜" },
  { key: "wanglei", title: "王磊" },
  { key: "chenjing", title: "陈静" },
  { key: "zhaoming", title: "赵明" },
] as const;

export const PERMISSION_TRANSFER_DATA = [
  { key: "inspection-manage", title: "巡检管理" },
  { key: "workorder-manage", title: "工单管理" },
  { key: "report-view", title: "报表查看" },
] as const;

export const STORE_TRANSFER_DISABLED_KEYS = ["community-market"];

export const INSPECTOR_TRANSFER_DISABLED_KEYS = ["zhaoming"];
