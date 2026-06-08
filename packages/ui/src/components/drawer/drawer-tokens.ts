/**
 * Drawer tokens — aligned with @yd-ds/tokens and showcase CSS variables.
 * Brand #165DFF · radius 6px (--drawer-radius)
 */
export {
  drawerTokens,
  drawerSizeSpecs,
  drawerUsageTokenNames,
  drawerDesignSpecRows,
  type DrawerTokenKey,
  type DrawerSizeKey,
} from "@yd-ds/tokens";

export const drawerCssVars = {
  radius: "--drawer-radius",
  mask: "--drawer-mask",
  bg: "--drawer-bg",
  shadow: "--drawer-shadow",
  borderColor: "--drawer-border-color",
  titleColor: "--drawer-title-color",
  textColor: "--drawer-text-color",
  closeColor: "--drawer-close-color",
  brandColor: "--drawer-brand-color",
  headerHeight: "--drawer-header-height",
  footerHeight: "--drawer-footer-height",
  padding: "--drawer-padding",
  bodyGap: "--drawer-body-gap",
  footerGap: "--drawer-footer-gap",
  animationDuration: "--drawer-animation-duration",
} as const;
