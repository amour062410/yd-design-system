import type { TabsShowcaseState, TabsType } from "@yd-ds/ui/tabs";
import { tabsSizeSpecs, type TabsSizeKey } from "@yd-ds/tokens";
import { FileText, Settings, Users } from "lucide-react";

export const TABS_INTRO =
  "Tabs（标签页）用于在同一层级内容之间快速切换。适用于分类浏览、配置管理、内容分组等场景。";

export const TABS_STATE_LABELS: { state: TabsShowcaseState; label: string }[] = [
  { state: "default", label: "Default" },
  { state: "hover", label: "Hover" },
  { state: "active", label: "Active" },
  { state: "disabled", label: "Disabled" },
];

export const TABS_TYPE_LABELS: { type: TabsType; label: string; description: string }[] = [
  { type: "line", label: "Line Tabs", description: "默认下划线指示器" },
  { type: "card", label: "Card Tabs", description: "卡片边框容器" },
  { type: "segment", label: "Segment Tabs", description: "分段背景切换" },
];

export const TABS_SIZE_LABELS: {
  size: TabsSizeKey;
  label: string;
  height: string;
}[] = [
  { size: "sm", label: "Small", height: tabsSizeSpecs.sm.height },
  { size: "md", label: "Medium", height: tabsSizeSpecs.md.height },
  { size: "lg", label: "Large", height: tabsSizeSpecs.lg.height },
];

export const TABS_ICON_ITEMS = [
  { key: "overview", label: "Overview", icon: FileText },
  { key: "settings", label: "Settings", icon: Settings },
  { key: "members", label: "Members", icon: Users },
] as const;

export const TABS_DEMO_ITEMS = [
  { key: "1", label: "Tab 1" },
  { key: "2", label: "Tab 2" },
  { key: "3", label: "Tab 3" },
  { key: "4", label: "Tab 4" },
];

export const TABS_OVERFLOW_ITEMS = Array.from({ length: 12 }, (_, i) => ({
  key: String(i + 1),
  label: `标签 ${i + 1}`,
}));

export const TABS_CODE_EXAMPLE = `import { Tabs } from "@yd-ds/ui/tabs";

// Line · Card · closable · editable · overflow
<Tabs
  type="line"
  items={[
    { key: "1", label: "Tab 1", icon: <Icon />, closable: true },
    { key: "2", label: "Tab 2", disabled: true },
  ]}
  defaultActiveKey="1"
  closable
  editable
  overflow
  onChange={(key) => {}}
  onTabClose={(key) => {}}
  onTabAdd={() => {}}
/>`;

export const TABS_USAGE_TOKEN_NAMES = [
  "tabs-color-active",
  "tabs-color-hover",
  "tabs-color-disabled",
  "tabs-border-color",
  "tabs-indicator-color",
  "tabs-card-radius",
  "tabs-height-sm",
  "tabs-height-md",
  "tabs-height-lg",
] as const;
