export {
  formTokens,
  formTokenRows,
  formUsageTokenNames,
  type FormTokenKey,
  type FormTokenRow,
} from "@yd-ds/tokens";

/** Form CSS 变量名映射（如需 runtime 主题覆盖时使用） */
export const formCssVars = {
  labelColor: "--form-label-color",
  labelFontSize: "--form-label-font-size",
  labelFontWeight: "--form-label-font-weight",
  labelGap: "--form-label-gap",
  requiredColor: "--form-required-color",
  helpColor: "--form-help-color",
  helpFontSize: "--form-help-font-size",
  errorColor: "--form-error-color",
  errorFontSize: "--form-error-font-size",
  itemGap: "--form-item-gap",
  messageGap: "--form-message-gap",
  horizontalLabelWidth: "--form-horizontal-label-width",
  inlineGap: "--form-inline-gap",
} as const;
