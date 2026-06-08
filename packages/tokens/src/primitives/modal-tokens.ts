import { brandPrimary, functionalColors, neutralGray } from "./colors";
import { radius } from "./radius";
import { shadowTokens } from "./shadows";

export const modalTokens = {
  "modal-width-sm": "400px",
  "modal-width-md": "600px",
  "modal-width-lg": "800px",
  "modal-width-xl": "1000px",
  "modal-width-fullscreen": "calc(100vw - 48px)",
  "modal-height-fullscreen": "calc(100vh - 48px)",
  "modal-header-height": "52px",
  "modal-footer-height": "56px",
  "modal-padding": "24px",
  "modal-body-gap": "16px",
  "modal-footer-gap": "8px",
  "modal-radius": radius.md,
  "modal-shadow": shadowTokens["shadow-popover"],
  "modal-overlay": "rgba(15, 20, 25, 0.45)",
  "modal-bg": neutralGray[1],
  "modal-border-color": neutralGray[4],
  "modal-title-color": neutralGray[10],
  "modal-text-color": neutralGray[8],
  "modal-close-color": neutralGray[6],
  "modal-slot-border": brandPrimary[3],
  "modal-slot-bg": brandPrimary[1],
  "modal-info-color": brandPrimary[6],
  "modal-success-color": functionalColors.success,
  "modal-warning-color": functionalColors.warning,
  "modal-error-color": functionalColors.danger,
  "modal-animation-duration": "200ms",
} as const;

export type ModalTokenKey = keyof typeof modalTokens;

export const modalSizeSpecs = {
  sm: { width: modalTokens["modal-width-sm"], label: "Small" },
  md: { width: modalTokens["modal-width-md"], label: "Medium" },
  lg: { width: modalTokens["modal-width-lg"], label: "Large" },
  xl: { width: modalTokens["modal-width-xl"], label: "Extra Large" },
  fullscreen: {
    width: modalTokens["modal-width-fullscreen"],
    label: "Fullscreen",
  },
} as const;

export type ModalSizeKey = keyof typeof modalSizeSpecs;

export const modalUsageTokenNames = [
  "modal-width-sm",
  "modal-width-md",
  "modal-width-lg",
  "modal-width-xl",
  "modal-width-fullscreen",
  "modal-header-height",
  "modal-footer-height",
  "modal-padding",
  "modal-body-gap",
  "modal-radius",
  "modal-shadow",
  "modal-overlay",
  "modal-info-color",
  "modal-success-color",
  "modal-warning-color",
  "modal-error-color",
] as const;

export const modalDesignSpecRows = [
  { token: "modal-width-sm", value: modalTokens["modal-width-sm"], desc: "Small 宽度" },
  { token: "modal-width-md", value: modalTokens["modal-width-md"], desc: "Medium 宽度" },
  { token: "modal-width-lg", value: modalTokens["modal-width-lg"], desc: "Large 宽度" },
  { token: "modal-width-xl", value: modalTokens["modal-width-xl"], desc: "Extra Large 宽度" },
  { token: "modal-width-fullscreen", value: modalTokens["modal-width-fullscreen"], desc: "Fullscreen 宽度" },
  { token: "modal-header-height", value: modalTokens["modal-header-height"], desc: "Header 高度" },
  { token: "modal-footer-height", value: modalTokens["modal-footer-height"], desc: "Footer 高度" },
  { token: "modal-padding", value: modalTokens["modal-padding"], desc: "内边距" },
  { token: "modal-body-gap", value: modalTokens["modal-body-gap"], desc: "Body 字段间距" },
  { token: "modal-radius", value: modalTokens["modal-radius"], desc: "圆角" },
  { token: "modal-shadow", value: modalTokens["modal-shadow"], desc: "阴影" },
  { token: "modal-animation-duration", value: modalTokens["modal-animation-duration"], desc: "动画时长" },
] as const;

export const modalStructureSpecRows = [
  { part: "Structure", value: "Header + Body + Footer", desc: "三段式垂直布局，Body 可滚动" },
  { part: "Header", value: "52px hug", desc: "固定高度 52px，内容垂直居中；标题 16px Semibold + 关闭按钮" },
  { part: "Body", value: "Header ↓ 24px ↓ 内容", desc: "Body 顶部内边距 24px，与 Header 间距固定" },
  { part: "Footer", value: "56px min-height", desc: "右对齐按钮组，间距 8px" },
] as const;

export const modalSpacingSpecRows = [
  { token: "modal-header-height", value: "52px", desc: "Header 固定高度（hug）" },
  { token: "modal-padding", value: "24px", desc: "Header 水平内边距；Body 四向内边距（Header ↓ 24px ↓ 内容）" },
  { token: "modal-body-gap", value: "16px", desc: "表单项、段落垂直间距" },
  { token: "modal-footer-gap", value: "8px", desc: "Footer 按钮间距" },
  { token: "icon-title-gap", value: "8px", desc: "状态图标与标题间距" },
] as const;

export const modalVisualSpecRows = [
  { token: "modal-shadow", value: modalTokens["modal-shadow"], desc: "Shadow · popover 层级阴影" },
  { token: "modal-overlay", value: modalTokens["modal-overlay"], desc: "Mask · 45% 深色遮罩" },
  { token: "modal-animation-duration", value: "200ms", desc: "Motion · fade-in + scale 0.96→1" },
  { token: "modal-radius", value: "6px", desc: "容器与按钮统一圆角" },
] as const;

export const modalPatternSpecRows = [
  { pattern: "Delete Modal", size: "sm", footer: "取消 + 危险确定", desc: "删除资源、批量操作二次确认" },
  { pattern: "Form Modal", size: "md / lg", footer: "取消 + 确定", desc: "新增 / 编辑，字段 ≤ 8 项" },
  { pattern: "Detail Modal", size: "md", footer: "关闭", desc: "只读详情，Descriptions 两列布局" },
  { pattern: "Upload Modal", size: "md", footer: "取消 + 开始上传", desc: "附件、证照、导入文件" },
  { pattern: "Approval Modal", size: "sm", footer: "驳回 + 通过", desc: "审批意见 + 通过 / 驳回" },
  { pattern: "Warning Modal", size: "sm", footer: "取消 + 继续", desc: "风险提示、不可逆操作前警告" },
  { pattern: "Fullscreen Modal", size: "fullscreen", footer: "取消 + 保存", desc: "复杂配置、多 Tab / 多区块表单" },
] as const;
