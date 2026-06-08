import { brandPrimary, functionalColors, neutralGray, primitiveColors } from "./primitives/colors";
import { radius } from "./primitives/radius";
import { shadowTokens } from "./primitives/shadows";

export type ContainerStateSpec = {
  name: string;
  token: string;
  borderToken: string;
  borderColor: string;
  backgroundToken: string;
  backgroundColor: string;
  dashed?: boolean;
};

export const containerGlobalRadius = {
  token: "radius-lg",
  value: radius.lg,
  label: "8px",
  note: "当前规范暂不适用于 Icon。",
} as const;

export const containerStates: ContainerStateSpec[] = [
  {
    name: "基础",
    token: "container.state.base",
    borderToken: "color.border.default",
    borderColor: neutralGray[4],
    backgroundToken: "color.neutral.gray-1",
    backgroundColor: neutralGray[1],
  },
  {
    name: "失效",
    token: "container.state.disabled",
    borderToken: "color.border.light",
    borderColor: neutralGray[3],
    backgroundToken: "color.neutral.gray-2",
    backgroundColor: neutralGray[2],
  },
  {
    name: "虚线",
    token: "container.state.dashed",
    borderToken: "color.border.default",
    borderColor: neutralGray[4],
    backgroundToken: "color.neutral.gray-1",
    backgroundColor: neutralGray[1],
    dashed: true,
  },
  {
    name: "虚线 Hover",
    token: "container.state.dashed-hover",
    borderToken: "color.brand.primary-6",
    borderColor: brandPrimary[6],
    backgroundToken: "color.brand.primary-1",
    backgroundColor: brandPrimary[1],
    dashed: true,
  },
  {
    name: "危险",
    token: "container.state.danger",
    borderToken: "color.functional.danger",
    borderColor: functionalColors.danger,
    backgroundToken: "color.danger.muted",
    backgroundColor: primitiveColors.destructive[50],
  },
  {
    name: "选中",
    token: "container.state.selected",
    borderToken: "color.brand.primary-6",
    borderColor: brandPrimary[6],
    backgroundToken: "color.brand.primary-1",
    backgroundColor: brandPrimary[1],
  },
  {
    name: "错误",
    token: "container.state.error",
    borderToken: "color.functional.danger",
    borderColor: functionalColors.danger,
    backgroundToken: "color.danger.muted",
    backgroundColor: primitiveColors.destructive[50],
  },
  {
    name: "提示",
    token: "container.state.info",
    borderToken: "color.functional.info",
    borderColor: functionalColors.info,
    backgroundToken: "color.info.50",
    backgroundColor: primitiveColors.info[50],
  },
  {
    name: "成功",
    token: "container.state.success",
    borderToken: "color.functional.success",
    borderColor: functionalColors.success,
    backgroundToken: "color.success.50",
    backgroundColor: primitiveColors.success[50],
  },
  {
    name: "警告",
    token: "container.state.warning",
    borderToken: "color.functional.warning",
    borderColor: functionalColors.warning,
    backgroundToken: "color.warning.50",
    backgroundColor: primitiveColors.warning[50],
  },
];

export const containerShadows = [
  {
    name: "一级下拉菜单",
    token: "shadow-dropdown",
    value: shadowTokens["shadow-dropdown"],
  },
  {
    name: "二级下拉菜单",
    token: "shadow-dropdown-submenu",
    value: shadowTokens["shadow-dropdown-submenu"],
  },
  {
    name: "弹窗",
    token: "shadow-modal",
    value: shadowTokens["shadow-modal"],
  },
  {
    name: "气泡提示",
    token: "shadow-popover",
    value: shadowTokens["shadow-popover"],
  },
] as const;

export const containerTokenUsage = [
  { token: "radius-md", value: radius.md },
  { token: "radius-lg", value: radius.lg },
  { token: "shadow-dropdown", value: shadowTokens["shadow-dropdown"] },
  { token: "shadow-modal", value: shadowTokens["shadow-modal"] },
  { token: "shadow-popover", value: shadowTokens["shadow-popover"] },
] as const;
