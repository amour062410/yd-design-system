import { stepsTokens, stepsUsageTokenNames } from "@yd-ds/tokens";

export const STEPS_INTRO =
  "步骤条用于引导用户完成多阶段流程。对标 Ant Design Steps，优先适配云盯巡检、整改、门店上线与报告生成等业务场景。";

export const STEPS_OVERVIEW_POINTS = [
  "状态：wait / process / finish / error，由 current 与 status 自动推导",
  "布局：支持 horizontal / vertical，三种尺寸 small / middle / large",
  "业务预设：InspectionSteps、RectificationSteps、StoreSetupSteps、ReportGenerateSteps",
];

export const STEPS_CODE_EXAMPLE = `import { Steps, InspectionSteps } from "@yd-ds/ui/steps";

// 基础用法
<Steps
  current={1}
  items={[
    { title: "创建任务", description: "定义巡检范围" },
    { title: "执行巡检", description: "现场检查取证" },
    { title: "完成归档", description: "报告入库" },
  ]}
/>

// 巡检业务预设
<InspectionSteps current={2} direction="vertical" />`;

export const STEPS_USAGE_TOKEN_NAMES = [...stepsUsageTokenNames];

export const STEPS_DESIGN_TOKENS = Object.entries(stepsTokens).map(
  ([key, value]) => ({
    token: key,
    value: String(value),
  })
);

export const STEPS_DECISION_GUIDE = [
  {
    component: "Steps",
    when: "多阶段线性流程，需展示「当前在哪一步」及前后步骤关系",
    examples: "巡检任务创建 → 执行 → 提交 → 归档；门店上线四步引导",
    avoid: "单一步骤内的百分比完成度",
  },
  {
    component: "Progress",
    when: "单一任务或指标的完成比例、加载进度",
    examples: "巡检完成率 68%；文件上传 45%",
    avoid: "拆分为多个命名步骤的导航",
  },
  {
    component: "Timeline",
    when: "按时间顺序记录已发生的事件或操作日志",
    examples: "整改记录时间线；审批流转历史",
    avoid: "尚未发生、需用户依次完成的未来步骤",
  },
];

export const STEPS_BASIC_ITEMS = [
  { title: "第一步已完成", description: "对于完成的内容进行备注" },
  {
    title: "第二步正在写",
    subTitle: "标记时间 2025-12-02 13:59:00",
    description: "对于完成的内容进行备注",
  },
  { title: "第三步未填写", description: "对于完成的内容进行备注" },
] as const;
