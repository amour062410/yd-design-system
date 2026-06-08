import { emptyTokens, emptyUsageTokenNames } from "@yd-ds/tokens";
import type { EmptyType } from "@yd-ds/ui/empty";

export const EMPTY_INTRO =
  "云盯企业级空状态设计规范。通过 type 预设统一标题、描述与插画，规范表格、列表、搜索、异常等场景下的占位表达，避免与 Result / Skeleton / Alert 职责重叠。";

export const EMPTY_OVERVIEW_POINTS = [
  "视觉基线：Communication / Task / Network 三张参考稿定义线稿风格与配色体系",
  "业务优先：巡检、整改、风险等云盯场景提供开箱即用预设",
  "放置规范：Empty 置于内容区中心，不替代页面级结果反馈",
];

/** 用户提供的 3 张参考稿 — 全体系插画视觉源 */
export const EMPTY_REFERENCE_PROTOTYPES = [
  {
    type: "communication" as EmptyType,
    name: "Communication Empty",
    nameZh: "沟通空状态",
    description: "双气泡 + 线稿装饰线 + YD Blue 点缀，用于消息/沟通类空态",
  },
  {
    type: "task" as EmptyType,
    name: "Task Empty",
    nameZh: "任务空状态",
    description: "文档块 + 手势 + 薄荷绿强调，用于任务/待办类空态",
  },
  {
    type: "network" as EmptyType,
    name: "Network Empty",
    nameZh: "网络空状态",
    description: "路由器 + Wi-Fi 弧线 + 闪电符号，用于网络异常类空态",
  },
];

export const EMPTY_CODE_EXAMPLE = `import { Empty } from "@yd-ds/ui/empty";

// 表格无数据
<Table dataSource={[]} empty={<Empty type="inspection" />} />

// 搜索无结果
<Empty type="search" />

// 网络异常
<Empty type="offline">
  <Button onClick={retry}>重新加载</Button>
</Empty>`;

export const EMPTY_GALLERY_BUSINESS: EmptyType[] = [
  "inspection",
  "rectification",
  "risk",
  "store",
  "device",
];

export const EMPTY_GALLERY_GENERAL: EmptyType[] = [
  "default",
  "search",
  "filter",
  "folder",
  "document",
];

/** 历史记录场景复用 document 插画，文案单独配置 */
export const EMPTY_GALLERY_HISTORY = {
  type: "document" as EmptyType,
  label: "history",
  title: "暂无历史记录",
  description: "完成操作后将在此展示历史记录",
};

export const EMPTY_GALLERY_REFERENCE: EmptyType[] = [
  "communication",
  "task",
  "network",
];

export const EMPTY_GALLERY_EXCEPTION: EmptyType[] = [
  "network",
  "offline",
  "permission",
  "error",
];

export const EMPTY_PLACEMENT_SCENARIOS = [
  {
    title: "表格为空",
    description: "数据表格无记录时，Empty 置于表格内容区垂直居中，替代默认占位。",
    type: "inspection" as EmptyType,
    frame: "table" as const,
  },
  {
    title: "列表为空",
    description: "侧边栏、抽屉或卡片列表无条目时，在列表容器内居中展示。",
    type: "store" as EmptyType,
    frame: "list" as const,
  },
  {
    title: "搜索为空",
    description: "关键词或筛选后无匹配结果，紧贴搜索区域下方展示引导文案。",
    type: "search" as EmptyType,
    frame: "search" as const,
  },
  {
    title: "网络异常",
    description: "接口不可用或离线时，在原内容区展示异常 Empty 并提供重试操作。",
    type: "offline" as EmptyType,
    frame: "error" as const,
  },
];

export const EMPTY_DECISION_GUIDE = [
  {
    component: "Empty",
    when: "内容区已加载完成，确认无数据或无可展示结果",
    example: "巡检任务列表为空、门店筛选无结果",
    avoid: "流程提交成功/失败、需立即处理的系统告警",
  },
  {
    component: "Skeleton",
    when: "数据请求进行中，页面结构已知",
    example: "表格首屏加载、卡片列表骨架屏",
    avoid: "已确认无数据、需要插画说明的空状态",
  },
  {
    component: "Result",
    when: "流程结束后的整页结果反馈",
    example: "提交成功页、403 无权限页、支付结果页",
    avoid: "列表内嵌空态、局部区块占位",
  },
  {
    component: "Alert",
    when: "需用户立即感知并处理的提示信息",
    example: "表单校验失败、配置即将过期、操作风险提示",
    avoid: "长期占据内容区的空数据展示",
  },
];

export const EMPTY_DESIGN_TOKENS = [
  {
    name: "empty-illustration-size",
    value: emptyTokens["empty-illustration-size"],
    description: "默认插画尺寸 160px；Gallery 卡片推荐 120–140px。",
  },
  {
    name: "empty-title-color",
    value: emptyTokens["empty-title-color"],
    description: "标题文字色。",
  },
  {
    name: "empty-description-color",
    value: emptyTokens["empty-description-color"],
    description: "描述文字色。",
  },
  {
    name: "empty-illustration-gray",
    value: emptyTokens["empty-illustration-gray"],
    description: "插画浅灰主体色 #E5E6EB。",
  },
  {
    name: "empty-illustration-blue",
    value: emptyTokens["empty-illustration-blue"],
    description: "YD Brand Blue 点缀色 #165DFF。",
  },
];

export { emptyUsageTokenNames as EMPTY_USAGE_TOKEN_NAMES };
