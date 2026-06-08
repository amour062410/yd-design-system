import { primitiveColors, functionalColors } from "../primitives/colors";

/**
 * Semantic color tokens — map primitives to UI roles.
 * CSS variables reference these via themes package.
 */
export const semanticColorsLight = {
  background: primitiveColors.white,
  foreground: primitiveColors.slate[950],
  card: primitiveColors.white,
  "card-foreground": primitiveColors.slate[950],
  popover: primitiveColors.white,
  "popover-foreground": primitiveColors.slate[950],
  primary: primitiveColors.brand[500],
  "primary-foreground": primitiveColors.white,
  secondary: primitiveColors.slate[100],
  "secondary-foreground": primitiveColors.slate[900],
  muted: primitiveColors.slate[100],
  "muted-foreground": primitiveColors.slate[500],
  accent: primitiveColors.slate[100],
  "accent-foreground": primitiveColors.slate[900],
  destructive: primitiveColors.destructive[500],
  "destructive-foreground": primitiveColors.white,
  border: primitiveColors.slate[200],
  input: primitiveColors.slate[200],
  ring: primitiveColors.brand[400],
  success: functionalColors.success,
  warning: functionalColors.warning,
  info: functionalColors.info,
  danger: functionalColors.danger,
} as const;

export const semanticColorsDark = {
  background: primitiveColors.slate[950],
  foreground: primitiveColors.slate[50],
  card: primitiveColors.slate[900],
  "card-foreground": primitiveColors.slate[50],
  popover: primitiveColors.slate[900],
  "popover-foreground": primitiveColors.slate[50],
  primary: primitiveColors.brand[500],
  "primary-foreground": primitiveColors.white,
  secondary: primitiveColors.slate[800],
  "secondary-foreground": primitiveColors.slate[50],
  muted: primitiveColors.slate[800],
  "muted-foreground": primitiveColors.slate[400],
  accent: primitiveColors.slate[800],
  "accent-foreground": primitiveColors.slate[50],
  destructive: primitiveColors.destructive[500],
  "destructive-foreground": primitiveColors.white,
  border: primitiveColors.slate[800],
  input: primitiveColors.slate[800],
  ring: primitiveColors.brand[400],
  success: functionalColors.success,
  warning: functionalColors.warning,
  info: functionalColors.info,
  danger: functionalColors.danger,
} as const;

export type SemanticColorToken = keyof typeof semanticColorsLight;
