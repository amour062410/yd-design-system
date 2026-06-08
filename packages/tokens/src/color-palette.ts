import { toSwatch, type ColorSwatchDefinition } from "./color-utils";

export type ColorPaletteGroup = {
  id: string;
  title: string;
  description: string;
  swatches: ColorSwatchDefinition[];
};

/** Extended palette from legacy Colors showcase — Border, Text, state scales, accents */
export const colorPaletteGroups: ColorPaletteGroup[] = [
  {
    id: "brand-functional",
    title: "Functional / 功能色",
    description: "品牌主色及交互层级",
    swatches: [
      toSwatch("Primary / 主要", "color.brand.primary", "#165DFF", "品牌主按钮、重点操作"),
      toSwatch("Hover / 悬浮", "color.brand.hover", "#4080FF", "按钮和链接 hover"),
      toSwatch("Active / 激活", "color.brand.active", "#0E42D2", "按钮按下状态"),
      toSwatch("Selected", "color.brand.selected", "#2D63E5", "选中高亮与强调背景"),
      toSwatch("Muted", "color.brand.muted", "#B7D1FF", "弱化品牌背景"),
      toSwatch("Tint", "color.brand.tint", "#EAF2FF", "卡片浅色底"),
    ],
  },
  {
    id: "border",
    title: "Border / 边框",
    description: "系统描边层级",
    swatches: [
      toSwatch("重 / 按钮描边", "color.border.strong", "#86909C", "强调描边、主要外框"),
      toSwatch("深 / 悬浮", "color.border.hover", "#C9CDD4", "悬浮边框反馈"),
      toSwatch("一般", "color.border.default", "#E5E6EB", "默认边框与分隔线"),
      toSwatch("浅色", "color.border.light", "#F2F2F2", "弱化边框背景"),
    ],
  },
  {
    id: "text",
    title: "Text / 文字",
    description: "文本语义层级",
    swatches: [
      toSwatch("正文标题 88%", "color.text.primary", "rgba(0,0,0,0.88)", "正文与标题文本"),
      toSwatch("次强调 65%", "color.text.secondary", "rgba(0,0,0,0.65)", "次级文本信息"),
      toSwatch("次要信息 45%", "color.text.tertiary", "rgba(0,0,0,0.45)", "弱提示文字"),
      toSwatch("置灰信息 25%", "color.text.disabled", "rgba(0,0,0,0.25)", "禁用与占位文本"),
      toSwatch("纯白文字", "color.text.inverse", "#FFFFFF", "深色底反白文字"),
    ],
  },
  {
    id: "success-scale",
    title: "Success / 成功",
    description: "完成、可用、通过状态",
    swatches: [
      toSwatch("常规", "color.success.default", "#00B42A", "成功主色"),
      toSwatch("悬浮", "color.success.hover", "#23C343", "hover 状态"),
      toSwatch("点击", "color.success.active", "#009A29", "active 状态"),
      toSwatch("禁用", "color.success.disabled", "#7BE188", "禁用状态"),
      toSwatch("浅色背景", "color.success.muted", "rgba(0,180,42,0.05)", "成功提示背景"),
    ],
  },
  {
    id: "warning-scale",
    title: "Warning / 警告",
    description: "提醒、待处理状态",
    swatches: [
      toSwatch("Warning 1", "color.warning.1", "#FF7D00", "主要警告提示"),
      toSwatch("Warning 2", "color.warning.2", "#FF9A2E", "按钮 hover"),
      toSwatch("Warning 3", "color.warning.3", "#D25F00", "激活态"),
      toSwatch("Warning 4", "color.warning.4", "#FFCF8B", "标签背景"),
      toSwatch("Warning 5", "color.warning.5", "#FFF7E8", "警告浅底"),
    ],
  },
  {
    id: "danger-scale",
    title: "Danger / 错误",
    description: "错误、风险、拦截状态",
    swatches: [
      toSwatch("常规", "color.danger.default", "#F53F3F", "错误主色"),
      toSwatch("悬浮", "color.danger.hover", "#F76560", "hover 状态"),
      toSwatch("点击", "color.danger.active", "#CB272D", "active 状态"),
      toSwatch("禁用", "color.danger.disabled", "#FBACA3", "禁用状态"),
      toSwatch("浅色背景", "color.danger.muted", "rgba(245,63,63,0.05)", "错误提示背景"),
    ],
  },
  ...([1, 2, 3, 4, 5, 6] as const).map((index) => ({
    id: `accent-${index}`,
    title: `Accent / 辅助色 ${index}`,
    description: "图表与扩展语义色（全状态）",
    swatches: accentSwatches(index),
  })),
];

function accentSwatches(index: 1 | 2 | 3 | 4 | 5 | 6): ColorSwatchDefinition[] {
  const palettes: Record<
    number,
    { default: string; hover: string; active: string; disabled: string; muted: string }
  > = {
    1: {
      default: "#0FC6C2",
      hover: "#33D1C9",
      active: "#0AA5A8",
      disabled: "#86E8DD",
      muted: "rgba(15,198,194,0.05)",
    },
    2: {
      default: "#F77234",
      hover: "#F99057",
      active: "#CC5120",
      disabled: "#FCC59F",
      muted: "rgba(247,114,52,0.05)",
    },
    3: {
      default: "#3491FA",
      hover: "#57A9FB",
      active: "#206CCF",
      disabled: "#9FD4FD",
      muted: "rgba(52,145,250,0.05)",
    },
    4: {
      default: "#9FDB1D",
      hover: "#B5E241",
      active: "#7EB712",
      disabled: "#DCF190",
      muted: "rgba(159,219,29,0.05)",
    },
    5: {
      default: "#34F3FA",
      hover: "#5DFAFF",
      active: "#2DDCE2",
      disabled: "#CCFDFF",
      muted: "rgba(52,243,250,0.05)",
    },
    6: {
      default: "#F5319D",
      hover: "#F754A8",
      active: "#CB1E83",
      disabled: "#FB9DC7",
      muted: "rgba(245,49,157,0.05)",
    },
  };

  const palette = palettes[index];
  const prefix = `color.accent.${index}`;

  return [
    toSwatch("常规", `${prefix}.default`, palette.default, "主色"),
    toSwatch("悬浮", `${prefix}.hover`, palette.hover, "hover 状态"),
    toSwatch("点击", `${prefix}.active`, palette.active, "active 状态"),
    toSwatch("禁用", `${prefix}.disabled`, palette.disabled, "禁用状态"),
    toSwatch("浅色背景", `${prefix}.muted`, palette.muted, "5% 浅色背景"),
  ];
}
