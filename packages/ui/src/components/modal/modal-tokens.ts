/**
 * Modal tokens — aligned with @yd-ds/tokens and showcase CSS variables.
 * Brand #165DFF · radius 6px (--modal-radius)
 */
export {
  modalTokens,
  modalSizeSpecs,
  modalUsageTokenNames,
  modalDesignSpecRows,
  type ModalTokenKey,
  type ModalSizeKey,
} from "@yd-ds/tokens";

export const modalCssVars = {
  radius: "--modal-radius",
  overlay: "--modal-overlay",
  bg: "--modal-bg",
  shadow: "--modal-shadow",
  borderColor: "--modal-border-color",
  titleColor: "--modal-title-color",
  textColor: "--modal-text-color",
  closeColor: "--modal-close-color",
  infoColor: "--modal-info-color",
  successColor: "--modal-success-color",
  warningColor: "--modal-warning-color",
  errorColor: "--modal-error-color",
  headerHeight: "--modal-header-height",
  footerHeight: "--modal-footer-height",
  padding: "--modal-padding",
  bodyGap: "--modal-body-gap",
  footerGap: "--modal-footer-gap",
  animationDuration: "--modal-animation-duration",
} as const;
