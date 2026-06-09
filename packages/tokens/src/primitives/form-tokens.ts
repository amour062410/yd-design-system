import { neutralGray, functionalColors } from "./colors";

/**
 * Form semantic tokens — derived from the YD Design `Form` 设计稿截图 + 现有控件约定。
 *
 * 优先复用既有体系：
 * - label 字号/字重/颜色对齐 `Input` 的 FieldLabel（13px / medium / text-primary）
 * - required / error 颜色复用 functional.danger (#F53F3F)
 * - help 颜色复用 neutral gray-6 (#86909C，即 text-tertiary)
 * 仅以下为 Form 专属布局量，原体系缺失，故新增：
 * form-item-gap / form-horizontal-label-width / form-inline-gap / form-label-gap
 */
export const formTokens = {
  /** 标签文字颜色（与 Input.FieldLabel 一致） */
  "form-label-color": neutralGray[10],
  /** 标签字号 */
  "form-label-font-size": "13px",
  /** 标签字重（medium） */
  "form-label-font-weight": "500",
  /** 标签与控件的间距（vertical 布局下 label→control） */
  "form-label-gap": "8px",
  /** 必填星号颜色 */
  "form-required-color": functionalColors.danger,
  /** 帮助文字颜色 */
  "form-help-color": neutralGray[6],
  /** 帮助文字字号 */
  "form-help-font-size": "12px",
  /** 错误文字颜色 */
  "form-error-color": functionalColors.danger,
  /** 警告文字颜色 */
  "form-warning-color": functionalColors.warning,
  /** 成功文字颜色 */
  "form-success-color": functionalColors.success,
  /** 错误/帮助文字字号 */
  "form-error-font-size": "12px",
  /** 表单项之间的纵向间距（vertical / horizontal 布局） */
  "form-item-gap": "20px",
  /** 控件与帮助/错误信息的间距 */
  "form-message-gap": "4px",
  /** horizontal 布局下标签列默认宽度 */
  "form-horizontal-label-width": "80px",
  /** inline 布局下表单项之间的间距 */
  "form-inline-gap": "16px",
} as const;

export type FormTokenKey = keyof typeof formTokens;

export interface FormTokenRow {
  token: FormTokenKey;
  value: string;
  description: string;
  /** 是否复用既有 Token（false 表示 Form 新增的布局量） */
  reused: boolean;
}

export const formTokenRows: readonly FormTokenRow[] = [
  {
    token: "form-label-color",
    value: formTokens["form-label-color"],
    description: "标签颜色，复用 text-primary / neutral gray-10",
    reused: true,
  },
  {
    token: "form-label-font-size",
    value: formTokens["form-label-font-size"],
    description: "标签字号，对齐 Input.FieldLabel",
    reused: true,
  },
  {
    token: "form-label-font-weight",
    value: formTokens["form-label-font-weight"],
    description: "标签字重 medium",
    reused: true,
  },
  {
    token: "form-label-gap",
    value: formTokens["form-label-gap"],
    description: "vertical 布局标签与控件间距 (spacing-2)",
    reused: true,
  },
  {
    token: "form-required-color",
    value: formTokens["form-required-color"],
    description: "必填星号，复用 functional.danger",
    reused: true,
  },
  {
    token: "form-help-color",
    value: formTokens["form-help-color"],
    description: "帮助文字，复用 text-tertiary / neutral gray-6",
    reused: true,
  },
  {
    token: "form-help-font-size",
    value: formTokens["form-help-font-size"],
    description: "帮助文字字号 (font.caption)",
    reused: true,
  },
  {
    token: "form-error-color",
    value: formTokens["form-error-color"],
    description: "错误文字，复用 functional.danger",
    reused: true,
  },
  {
    token: "form-warning-color",
    value: formTokens["form-warning-color"],
    description: "警告文字，复用 functional.warning",
    reused: true,
  },
  {
    token: "form-success-color",
    value: formTokens["form-success-color"],
    description: "成功文字，复用 functional.success",
    reused: true,
  },
  {
    token: "form-error-font-size",
    value: formTokens["form-error-font-size"],
    description: "错误/帮助文字字号",
    reused: true,
  },
  {
    token: "form-item-gap",
    value: formTokens["form-item-gap"],
    description: "表单项纵向间距（Form 新增布局量）",
    reused: false,
  },
  {
    token: "form-message-gap",
    value: formTokens["form-message-gap"],
    description: "控件与提示信息间距（Form 新增布局量）",
    reused: false,
  },
  {
    token: "form-horizontal-label-width",
    value: formTokens["form-horizontal-label-width"],
    description: "horizontal 标签列宽度（Form 新增布局量）",
    reused: false,
  },
  {
    token: "form-inline-gap",
    value: formTokens["form-inline-gap"],
    description: "inline 表单项间距（Form 新增布局量）",
    reused: false,
  },
] as const;

export const formUsageTokenNames = [
  "color-text-primary",
  "color-text-tertiary",
  "color-danger",
  "color-warning",
  "color-success",
  "radius-input",
] as const;
