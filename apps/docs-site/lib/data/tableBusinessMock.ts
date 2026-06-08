import type {
  CertificateRecord,
  ExpandableDetailRow,
  StatusTabItem,
} from "@yd-ds/ui/table";

export const EXPANDABLE_DETAIL_ROWS: ExpandableDetailRow[] = [
  {
    key: "1",
    score: 15,
    knowledgeLink: "已关联",
    knowledgeCount: 2,
    importance: "yellow",
    scoringItem: "仪容仪表",
    scoringRule: "员工制服整洁、发型规范",
    owner: "店长 / 督导",
    standardCount: 23,
    detail: {
      knowledgePoints: [
        {
          title: "门店仪容仪表标准",
          content: "制服穿戴、工牌佩戴、发型与妆容要求",
          description: "适用于直营店与加盟店一线员工",
        },
        {
          title: "顾客接待礼仪",
          content: "迎宾话术、引导动线、送别规范",
          description: "高峰时段需双人协同接待",
        },
      ],
      course: { name: "鞋服行业专业术语", lessonCount: 4 },
      materials: [
        { name: "销售技巧培训.PDF", type: "pdf" },
        { name: "门店服务示范.mp4", type: "video" },
        { name: "陈列检查表.xlsx", type: "file" },
      ],
      standardImages: ["1", "2", "3", "4", "5", "6"],
    },
  },
  {
    key: "2",
    score: 10,
    knowledgeLink: "已关联",
    knowledgeCount: 1,
    importance: "red",
    scoringItem: "收银合规",
    scoringRule: "单笔退款需二次确认",
    owner: "财务 / 店长",
    standardCount: 12,
    detail: {
      knowledgePoints: [
        {
          title: "退款审批流程",
          content: "超 500 元需督导审批",
          description: "红线项，违规将触发风控预警",
        },
      ],
      course: { name: "收银系统操作规范", lessonCount: 2 },
      materials: [{ name: "退款SOP.pdf", type: "pdf" }],
      standardImages: ["1", "2", "3"],
    },
  },
  {
    key: "3",
    score: 8,
    knowledgeLink: "已关联",
    knowledgeCount: 3,
    importance: "normal",
    scoringItem: "陈列标准",
    scoringRule: "主推款需位于黄金视线区",
    owner: "陈列专员",
    standardCount: 18,
    detail: {
      course: { name: "季节性陈列策略", lessonCount: 6 },
      materials: [{ name: "春季陈列手册.pdf", type: "pdf" }],
      standardImages: ["1", "2", "3", "4"],
    },
  },
];

export const CERTIFICATE_STATUS_TABS: StatusTabItem[] = [
  { key: "all", label: "全部" },
  { key: "expired", label: "已过期", count: 11, tone: "danger" },
  { key: "urgent", label: "紧急", count: 12, tone: "danger" },
  { key: "warning", label: "预警", count: 8, tone: "warning" },
  { key: "valid", label: "有效" },
];

/** 已按紧急 → 预警 → 安全排序，便于「全部」Tab 展示 */
export const CERTIFICATE_STATUS_ROWS: CertificateRecord[] = [
  {
    key: "1",
    storeName: "杭州滨江店",
    storeType: "直营店",
    certificateName: "食品经营许可证",
    riskLevel: "expired",
    remainingDaysText: "已过期 11 天",
    category: "经营资质",
    statusFilterKey: "expired",
  },
  {
    key: "5",
    storeName: "成都武侯店",
    storeType: "加盟店",
    certificateName: "特种设备使用登记证",
    riskLevel: "expired",
    remainingDaysText: "已过期 6 天",
    category: "设备管理",
    statusFilterKey: "urgent",
  },
  {
    key: "2",
    storeName: "上海南京路旗舰店",
    storeType: "旗舰店",
    certificateName: "消防安全检查合格证",
    riskLevel: "warning",
    remainingDaysText: "剩余 7 天",
    category: "安全合规",
    statusFilterKey: "urgent",
  },
  {
    key: "3",
    storeName: "北京朝阳加盟店",
    storeType: "加盟店",
    certificateName: "营业执照",
    riskLevel: "warning",
    remainingDaysText: "剩余 224 天",
    category: "工商注册",
    statusFilterKey: "warning",
  },
  {
    key: "4",
    storeName: "深圳福田店",
    storeType: "直营店",
    certificateName: "卫生许可证",
    riskLevel: "normal",
    remainingDaysText: "剩余 298 天",
    category: "卫生许可",
    statusFilterKey: "valid",
  },
  {
    key: "6",
    storeName: "广州天河店",
    storeType: "直营店",
    certificateName: "从业人员健康证",
    riskLevel: "normal",
    remainingDaysText: "剩余 2 天",
    category: "人员健康",
    statusFilterKey: "valid",
  },
];

export const CERTIFICATE_FILTER_STORE_OPTIONS = [
  { label: "全部门店", value: "all" },
  ...Array.from(new Set(CERTIFICATE_STATUS_ROWS.map((r) => r.storeName))).map(
    (name) => ({ label: name, value: name })
  ),
];

export const CERTIFICATE_FILTER_TAG_OPTIONS = [
  { label: "全部标签", value: "all" },
  ...Array.from(new Set(CERTIFICATE_STATUS_ROWS.map((r) => r.category))).map(
    (tag) => ({ label: tag, value: tag })
  ),
];

export const CERTIFICATE_FILTER_CATEGORY_OPTIONS = [
  { label: "全部分类", value: "all" },
  ...Array.from(new Set(CERTIFICATE_STATUS_ROWS.map((r) => r.category))).map(
    (cat) => ({ label: cat, value: cat })
  ),
];

export const BUSINESS_PATTERN_BEST_PRACTICES = [
  "展开详情仅通过「参考标准」列 + 触发，操作列右侧固定。",
  "证照列表通过 StatusTabs + statusFilterKey 做前端筛选，大数据量时建议服务端分页。",
  "风险色条按紧急 #EB5757、预警 #F2994A、安全 #6FCF97 排序展示。",
  "展开动画使用 CSS grid 过渡，减少布局抖动，适合 8px 间距网格。",
];
