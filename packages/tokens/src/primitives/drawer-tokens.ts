import { brandPrimary, neutralGray } from "./colors";
import { radius } from "./radius";
import { shadowTokens } from "./shadows";

export const drawerTokens = {
  "drawer-width-sm": "378px",
  "drawer-width-md": "480px",
  "drawer-width-lg": "640px",
  "drawer-width-xl": "800px",
  "drawer-header-height": "56px",
  "drawer-footer-height": "56px",
  "drawer-padding": "24px",
  "drawer-body-gap": "16px",
  "drawer-footer-gap": "8px",
  "drawer-radius": radius.md,
  "drawer-shadow": shadowTokens["shadow-popover"],
  "drawer-mask": "rgba(15, 20, 25, 0.45)",
  "drawer-bg": neutralGray[1],
  "drawer-border-color": neutralGray[4],
  "drawer-title-color": neutralGray[10],
  "drawer-text-color": neutralGray[8],
  "drawer-close-color": neutralGray[6],
  "drawer-slot-border": brandPrimary[3],
  "drawer-slot-bg": brandPrimary[1],
  "drawer-brand-color": brandPrimary[6],
  "drawer-animation-duration": "300ms",
} as const;

export type DrawerTokenKey = keyof typeof drawerTokens;

export const drawerSizeSpecs = {
  sm: { width: drawerTokens["drawer-width-sm"], label: "Small" },
  md: { width: drawerTokens["drawer-width-md"], label: "Medium" },
  lg: { width: drawerTokens["drawer-width-lg"], label: "Large" },
  xl: { width: drawerTokens["drawer-width-xl"], label: "Extra Large" },
} as const;

export type DrawerSizeKey = keyof typeof drawerSizeSpecs;

export const drawerUsageTokenNames = [
  "drawer-width-sm",
  "drawer-width-md",
  "drawer-width-lg",
  "drawer-width-xl",
  "drawer-header-height",
  "drawer-footer-height",
  "drawer-padding",
  "drawer-radius",
  "drawer-shadow",
  "drawer-mask",
  "drawer-animation-duration",
] as const;

export const drawerDesignSpecRows = [
  { token: "drawer-width-sm", value: drawerTokens["drawer-width-sm"], desc: "Small 宽度" },
  { token: "drawer-width-md", value: drawerTokens["drawer-width-md"], desc: "Medium 宽度" },
  { token: "drawer-width-lg", value: drawerTokens["drawer-width-lg"], desc: "Large 宽度" },
  { token: "drawer-width-xl", value: drawerTokens["drawer-width-xl"], desc: "Extra Large 宽度" },
  { token: "drawer-header-height", value: drawerTokens["drawer-header-height"], desc: "Header 高度" },
  { token: "drawer-footer-height", value: drawerTokens["drawer-footer-height"], desc: "Footer 高度" },
  { token: "drawer-padding", value: drawerTokens["drawer-padding"], desc: "内边距" },
  { token: "drawer-radius", value: drawerTokens["drawer-radius"], desc: "圆角（统一 6px，与 Modal 一致）" },
  { token: "drawer-shadow", value: drawerTokens["drawer-shadow"], desc: "阴影" },
  { token: "drawer-mask", value: drawerTokens["drawer-mask"], desc: "Mask 透明度" },
  { token: "drawer-animation-duration", value: drawerTokens["drawer-animation-duration"], desc: "动画时长" },
] as const;

export const drawerAnatomySpecRows = [
  { part: "Header", value: "auto · min 56px", desc: "标题 + 描述 + 状态标签 + 关闭（标题区上下各 16px）" },
  { part: "Body", value: "flex-1 scroll", desc: "Header ↓ 24px ↓ 内容，可滚动" },
  { part: "Footer", value: "56px", desc: "固定底部，取消 + 保存，右对齐" },
  { part: "Close Button", value: "32px", desc: "Header 右侧 × 关闭" },
  { part: "Mask", value: "45% overlay", desc: "点击遮罩关闭（可配置）" },
] as const;

export const drawerBestPracticeRows = [
  { scenario: "轻量确认", drawer: "—", modal: "✓ Modal", page: "—" },
  { scenario: "复杂编辑", drawer: "✓ Drawer", modal: "—", page: "可选" },
  { scenario: "详情查看", drawer: "✓ Drawer", modal: "可选", page: "—" },
  { scenario: "多步骤流程", drawer: "✓ Drawer", modal: "—", page: "✓ 独立页" },
  { scenario: "系统配置", drawer: "✓ XL Drawer", modal: "Fullscreen", page: "✓ 独立页" },
] as const;
