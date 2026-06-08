import {
  tagSizeSpecs,
  tagTokens,
  tagUsageTokenNames,
  type TagSizeKey,
} from "@yd-ds/tokens";
import type { TagStatus, TagVariant } from "@yd-ds/ui/tag";

export const TAG_INTRO =
  "用于标记、分类与状态展示。默认描边样式保持中立，业务预设映射浅色变体。支持标签组与分段选择器，适用于巡检筛选与状态切换。";

export const TAG_VARIANT_LABELS: Record<TagVariant, string> = {
  light: "浅色",
  outline: "描边",
  solid: "实心",
};

export const TAG_STATUS_LABELS: { status: TagStatus; label: string }[] = [
  { status: "default", label: "默认" },
  { status: "primary", label: "主要" },
  { status: "success", label: "成功" },
  { status: "warning", label: "警告" },
  { status: "danger", label: "危险" },
  { status: "info", label: "信息" },
];

export const TAG_VARIANTS: TagVariant[] = ["light", "outline", "solid"];

export const TAG_SIZE_LABELS: {
  size: TagSizeKey;
  label: string;
  height: string;
}[] = [
  { size: "sm", label: "小尺寸", height: tagSizeSpecs.sm.height },
  { size: "md", label: "中尺寸", height: tagSizeSpecs.md.height },
  { size: "lg", label: "大尺寸", height: tagSizeSpecs.lg.height },
];

export const TAG_SEGMENTED_ITEMS = [
  { value: "all", label: "全部", count: 128 },
  { value: "abnormal", label: "异常", count: 18 },
  { value: "pending", label: "待整改", count: 42 },
  { value: "rectifying", label: "整改中", count: 8 },
  { value: "completed", label: "已完成", count: 56 },
] as const;

export const TAG_CODE_EXAMPLE = `import {
  Tag,
  TagGroup,
  InspectionStatusTag,
  RiskLevelTag,
  StoreStatusTag,
} from "@yd-ds/ui/tag";

<Tag>默认标签</Tag>
<Tag variant="light" status="success">成功</Tag>

<TagGroup
  mode="segmented"
  size="lg"
  value={status}
  onChange={setStatus}
  items={[
    { value: "all", label: "全部", count: 128 },
    { value: "abnormal", label: "异常", count: 18 },
  ]}
/>

<InspectionStatusTag status="in_progress" />
<RiskLevelTag level="high" />
<StoreStatusTag status="open" />`;

export const TAG_DESIGN_TOKENS = [
  {
    name: "tag-primary",
    value: tagTokens["tag-primary"],
    description: "主要色与分段选中态，品牌色 #165DFF。",
  },
  {
    name: "tag-radius-md",
    value: tagTokens["tag-radius-md"],
    description: "标签圆角 6px。",
  },
  {
    name: "tag-height-md",
    value: tagTokens["tag-height-md"],
    description: "中尺寸高度 28px。",
  },
  {
    name: "tag-segment-track",
    value: tagTokens["tag-segment-track"],
    description: "分段选择器轨道背景。",
  },
] as const;

export { tagUsageTokenNames as TAG_USAGE_TOKEN_NAMES };
