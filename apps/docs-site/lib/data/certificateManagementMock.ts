import type { RiskLevel } from "@yd-ds/ui/table";

export type CertificateStatusFilterKey =
  | "all"
  | "expired"
  | "urgent"
  | "warning"
  | "valid";

export type CertificateAttachment = {
  name: string;
  size: string;
  uploadedAt: string;
};

export type CertificateOperationLog = {
  action: string;
  operator: string;
  time: string;
};

export type CertificateRecord = {
  key: string;
  storeName: string;
  storeType: "直营店" | "旗舰店" | "加盟店";
  storeCode: string;
  storeRegion: string;
  certificateName: string;
  certificateNo: string;
  riskLevel: RiskLevel;
  remainingDaysText: string;
  expiryDate: string;
  issueDate: string;
  category: string;
  tag: string;
  owner: string;
  ownerDept: string;
  statusFilterKey: CertificateStatusFilterKey;
  attachments: CertificateAttachment[];
  operationLogs: CertificateOperationLog[];
};

export type CertificateStatCardData = {
  key: string;
  title: string;
  count: number;
  countUnit: string;
  tone: "expired" | "warning" | "normal" | "brand";
  metrics: string[];
};

export const CERTIFICATE_STATS: CertificateStatCardData[] = [
  {
    key: "expired",
    title: "已过期",
    count: 4,
    countUnit: "个证照",
    tone: "expired",
    metrics: ["涉及 3 家门店", "最早过期 11 天", "需立即续期处理"],
  },
  {
    key: "warning",
    title: "即将过期",
    count: 4,
    countUnit: "个证照",
    tone: "warning",
    metrics: ["风险占比 33%", "7 天内到期", "建议本周完成续期"],
  },
  {
    key: "valid",
    title: "正常有效",
    count: 4,
    countUnit: "个证照",
    tone: "normal",
    metrics: ["合规率 67%", "覆盖 6 家门店", "近 30 天无异常"],
  },
  {
    key: "total",
    title: "证照总数",
    count: 12,
    countUnit: "个证照",
    tone: "brand",
    metrics: ["覆盖 6 家门店", "6 类经营资质", "负责人 4 人"],
  },
];

export const STORE_OPTIONS = [
  { label: "全部门店", value: "all" },
  { label: "上海浦东店", value: "上海浦东店" },
  { label: "北京朝阳店", value: "北京朝阳店" },
  { label: "杭州滨江店", value: "杭州滨江店" },
  { label: "深圳福田店", value: "深圳福田店" },
  { label: "广州天河店", value: "广州天河店" },
  { label: "成都武侯店", value: "成都武侯店" },
  { label: "上海南京路旗舰店", value: "上海南京路旗舰店" },
  { label: "北京朝阳加盟店", value: "北京朝阳加盟店" },
];

export const TAG_OPTIONS = [
  { label: "全部标签", value: "all" },
  { label: "经营资质", value: "经营资质" },
  { label: "安全合规", value: "安全合规" },
  { label: "工商注册", value: "工商注册" },
  { label: "卫生许可", value: "卫生许可" },
  { label: "设备管理", value: "设备管理" },
  { label: "人员健康", value: "人员健康" },
];

export const CATEGORY_OPTIONS = [
  { label: "全部分类", value: "all" },
  { label: "经营资质", value: "经营资质" },
  { label: "安全合规", value: "安全合规" },
  { label: "工商注册", value: "工商注册" },
  { label: "卫生许可", value: "卫生许可" },
  { label: "人员健康", value: "人员健康" },
  { label: "设备管理", value: "设备管理" },
];

export const OWNER_OPTIONS = [
  { label: "全部负责人", value: "all" },
  { label: "张明", value: "张明" },
  { label: "李华", value: "李华" },
  { label: "王芳", value: "王芳" },
  { label: "赵强", value: "赵强" },
];

const DEFAULT_LOGS: CertificateOperationLog[] = [
  { action: "上传附件", operator: "张明", time: "2024-05-28 14:20" },
  { action: "更新到期日", operator: "李华", time: "2024-05-20 09:15" },
  { action: "创建证照", operator: "王芳", time: "2024-03-12 11:00" },
];

const DEFAULT_ATTACHMENTS: CertificateAttachment[] = [
  { name: "证照扫描件.pdf", size: "1.2 MB", uploadedAt: "2024-05-28" },
  { name: "年检回执.jpg", size: "860 KB", uploadedAt: "2024-04-10" },
];

export const CERTIFICATE_TABLE_DATA: CertificateRecord[] = [
  {
    key: "1",
    storeName: "上海浦东店",
    storeType: "直营店",
    storeCode: "SH-PD-001",
    storeRegion: "华东 · 上海",
    certificateName: "食品经营许可证",
    certificateNo: "JY31011520240001",
    riskLevel: "expired",
    remainingDaysText: "已过期 11 天",
    expiryDate: "2024-05-20",
    issueDate: "2021-05-21",
    category: "经营资质",
    tag: "经营资质",
    owner: "张明",
    ownerDept: "门店运营部",
    statusFilterKey: "expired",
    attachments: DEFAULT_ATTACHMENTS,
    operationLogs: DEFAULT_LOGS,
  },
  {
    key: "2",
    storeName: "北京朝阳店",
    storeType: "加盟店",
    storeCode: "BJ-CY-018",
    storeRegion: "华北 · 北京",
    certificateName: "消防安全检查合格证",
    certificateNo: "XF11010520230188",
    riskLevel: "expired",
    remainingDaysText: "已过期 6 天",
    expiryDate: "2024-05-25",
    issueDate: "2022-05-26",
    category: "安全合规",
    tag: "安全合规",
    owner: "李华",
    ownerDept: "安全合规组",
    statusFilterKey: "expired",
    attachments: [DEFAULT_ATTACHMENTS[0]],
    operationLogs: DEFAULT_LOGS,
  },
  {
    key: "3",
    storeName: "杭州滨江店",
    storeType: "直营店",
    storeCode: "HZ-BJ-006",
    storeRegion: "华东 · 杭州",
    certificateName: "食品经营许可证",
    certificateNo: "JY33010820240009",
    riskLevel: "expired",
    remainingDaysText: "已过期 11 天",
    expiryDate: "2024-05-20",
    issueDate: "2020-06-01",
    category: "经营资质",
    tag: "经营资质",
    owner: "张明",
    ownerDept: "门店运营部",
    statusFilterKey: "urgent",
    attachments: DEFAULT_ATTACHMENTS,
    operationLogs: DEFAULT_LOGS,
  },
  {
    key: "4",
    storeName: "成都武侯店",
    storeType: "加盟店",
    storeCode: "CD-WH-022",
    storeRegion: "西南 · 成都",
    certificateName: "特种设备使用登记证",
    certificateNo: "TS51010720220045",
    riskLevel: "expired",
    remainingDaysText: "已过期 6 天",
    expiryDate: "2024-05-25",
    issueDate: "2022-08-15",
    category: "设备管理",
    tag: "设备管理",
    owner: "赵强",
    ownerDept: "设备管理部",
    statusFilterKey: "urgent",
    attachments: [DEFAULT_ATTACHMENTS[0]],
    operationLogs: DEFAULT_LOGS,
  },
  {
    key: "5",
    storeName: "上海南京路旗舰店",
    storeType: "旗舰店",
    storeCode: "SH-NJ-002",
    storeRegion: "华东 · 上海",
    certificateName: "消防安全检查合格证",
    certificateNo: "XF31010120240102",
    riskLevel: "warning",
    remainingDaysText: "剩余 7 天",
    expiryDate: "2024-06-08",
    issueDate: "2023-06-09",
    category: "安全合规",
    tag: "安全合规",
    owner: "李华",
    ownerDept: "安全合规组",
    statusFilterKey: "urgent",
    attachments: DEFAULT_ATTACHMENTS,
    operationLogs: DEFAULT_LOGS,
  },
  {
    key: "6",
    storeName: "北京朝阳加盟店",
    storeType: "加盟店",
    storeCode: "BJ-CY-029",
    storeRegion: "华北 · 北京",
    certificateName: "营业执照",
    certificateNo: "91110105MA01XXXX2X",
    riskLevel: "warning",
    remainingDaysText: "剩余 224 天",
    expiryDate: "2025-01-15",
    issueDate: "2020-01-16",
    category: "工商注册",
    tag: "工商注册",
    owner: "王芳",
    ownerDept: "法务合规部",
    statusFilterKey: "warning",
    attachments: [DEFAULT_ATTACHMENTS[0]],
    operationLogs: DEFAULT_LOGS,
  },
  {
    key: "7",
    storeName: "深圳福田店",
    storeType: "直营店",
    storeCode: "SZ-FT-011",
    storeRegion: "华南 · 深圳",
    certificateName: "卫生许可证",
    certificateNo: "WS44030420230077",
    riskLevel: "warning",
    remainingDaysText: "剩余 18 天",
    expiryDate: "2024-06-19",
    issueDate: "2022-06-20",
    category: "卫生许可",
    tag: "卫生许可",
    owner: "王芳",
    ownerDept: "法务合规部",
    statusFilterKey: "warning",
    attachments: DEFAULT_ATTACHMENTS,
    operationLogs: DEFAULT_LOGS,
  },
  {
    key: "8",
    storeName: "广州天河店",
    storeType: "直营店",
    storeCode: "GZ-TH-008",
    storeRegion: "华南 · 广州",
    certificateName: "从业人员健康证",
    certificateNo: "JK44010620240156",
    riskLevel: "warning",
    remainingDaysText: "剩余 12 天",
    expiryDate: "2024-06-13",
    issueDate: "2023-06-14",
    category: "人员健康",
    tag: "人员健康",
    owner: "赵强",
    ownerDept: "设备管理部",
    statusFilterKey: "warning",
    attachments: [DEFAULT_ATTACHMENTS[1]],
    operationLogs: DEFAULT_LOGS,
  },
  {
    key: "9",
    storeName: "深圳福田店",
    storeType: "直营店",
    storeCode: "SZ-FT-011",
    storeRegion: "华南 · 深圳",
    certificateName: "营业执照",
    certificateNo: "91440300MA5XXXX8Y",
    riskLevel: "normal",
    remainingDaysText: "剩余 298 天",
    expiryDate: "2025-03-28",
    issueDate: "2019-03-29",
    category: "工商注册",
    tag: "工商注册",
    owner: "王芳",
    ownerDept: "法务合规部",
    statusFilterKey: "valid",
    attachments: DEFAULT_ATTACHMENTS,
    operationLogs: DEFAULT_LOGS,
  },
  {
    key: "10",
    storeName: "广州天河店",
    storeType: "直营店",
    storeCode: "GZ-TH-008",
    storeRegion: "华南 · 广州",
    certificateName: "食品经营许可证",
    certificateNo: "JY44010620230021",
    riskLevel: "normal",
    remainingDaysText: "剩余 256 天",
    expiryDate: "2025-02-12",
    issueDate: "2022-02-13",
    category: "经营资质",
    tag: "经营资质",
    owner: "张明",
    ownerDept: "门店运营部",
    statusFilterKey: "valid",
    attachments: DEFAULT_ATTACHMENTS,
    operationLogs: DEFAULT_LOGS,
  },
  {
    key: "11",
    storeName: "上海浦东店",
    storeType: "直营店",
    storeCode: "SH-PD-001",
    storeRegion: "华东 · 上海",
    certificateName: "卫生许可证",
    certificateNo: "WS31011520220033",
    riskLevel: "normal",
    remainingDaysText: "剩余 180 天",
    expiryDate: "2024-11-28",
    issueDate: "2021-11-29",
    category: "卫生许可",
    tag: "卫生许可",
    owner: "王芳",
    ownerDept: "法务合规部",
    statusFilterKey: "valid",
    attachments: [DEFAULT_ATTACHMENTS[0]],
    operationLogs: DEFAULT_LOGS,
  },
  {
    key: "12",
    storeName: "北京朝阳店",
    storeType: "加盟店",
    storeCode: "BJ-CY-018",
    storeRegion: "华北 · 北京",
    certificateName: "从业人员健康证",
    certificateNo: "JK11010520240088",
    riskLevel: "normal",
    remainingDaysText: "剩余 90 天",
    expiryDate: "2024-08-30",
    issueDate: "2023-08-31",
    category: "人员健康",
    tag: "人员健康",
    owner: "赵强",
    ownerDept: "设备管理部",
    statusFilterKey: "valid",
    attachments: DEFAULT_ATTACHMENTS,
    operationLogs: DEFAULT_LOGS,
  },
];

export function countByStatusFilter(data: CertificateRecord[]) {
  return {
    expired: data.filter((r) => r.statusFilterKey === "expired").length,
    urgent: data.filter((r) => r.statusFilterKey === "urgent").length,
    warning: data.filter((r) => r.statusFilterKey === "warning").length,
    valid: data.filter((r) => r.statusFilterKey === "valid").length,
  };
}

export function getRiskStatusTone(
  level: RiskLevel
): "error" | "warning" | "success" {
  if (level === "expired") return "error";
  if (level === "warning") return "warning";
  return "success";
}

export function getRiskStatusLabel(level: RiskLevel) {
  if (level === "expired") return "已过期";
  if (level === "warning") return "即将到期";
  return "正常";
}
