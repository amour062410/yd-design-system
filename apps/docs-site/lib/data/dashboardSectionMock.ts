export const DASHBOARD_SECTION_INTRO =
  "DashboardSection 是 Dashboard 页面布局组件，统一标题栏、右侧操作区、内容区与底部操作区的结构。仅提供布局能力，不写死任何业务，内容由调用方传入。";

export const DASHBOARD_SECTION_OVERVIEW_POINTS = [
  "标题栏：左侧 title + subtitle + description，右侧 filters + extra + actions（可选）",
  "结构：标题栏（header） / 内容区（children） / 底部操作区（actions，默认）",
  "外观：variant 支持 card（带容器边框背景阴影）与 plain（仅结构与间距）",
  "间距：padding 支持 small / middle / large 三档",
  "纯布局：使用语义 token，不含业务逻辑，适配运营驾驶舱、项目中心、工作台、数据分析等场景",
];

export const DASHBOARD_SECTION_CODE_EXAMPLE = `import { DashboardSection } from "@yd-ds/ui/dashboard-section";
import { Button } from "@yd-ds/ui/button";

<DashboardSection
  title="运营驾驶舱"
  subtitle="华东一区"
  description="实时经营概览 · 最近更新 2 分钟前"
  filters={
    <>
      <Button size="sm" variant="outline">今日</Button>
      <Button size="sm" variant="ghost">本周</Button>
    </>
  }
  actions={<Button size="sm">导出</Button>}
  actionsPlacement="header"
>
  {/* 内容区由调用方填充，组件仅提供布局结构 */}
</DashboardSection>`;
