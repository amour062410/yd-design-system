export const stepsTokens = {
  "steps-icon-border-finish": "#1677ff",
  "steps-icon-bg-finish": "#1677ff",
  "steps-icon-finish-icon-color": "#ffffff",

  "steps-icon-border-process": "#1677ff",
  "steps-icon-bg-process": "#ffffff",
  "steps-icon-process-number-color": "#1677ff",
  "steps-icon-dot-process-color": "#1677ff",

  "steps-icon-border-wait": "#c9cdd4",
  "steps-icon-bg-wait": "#ffffff",
  "steps-icon-wait-number-color": "#86909c",

  "steps-icon-border-error": "#f53f3f",
  "steps-icon-bg-error": "#f53f3f",
  "steps-icon-error-icon-color": "#ffffff",

  "steps-icon-border-warning": "#ff7d00",
  "steps-icon-bg-warning": "#ff7d00",
  "steps-icon-warning-icon-color": "#ffffff",

  "steps-tail-finish-color": "#1677ff",
  "steps-tail-wait-color": "#e5e6eb",

  "steps-title-finish-color": "#1d2129",
  "steps-title-process-color": "#1677ff",
  "steps-title-wait-color": "#86909c",
  "steps-title-error-color": "#f53f3f",
  "steps-title-warning-color": "#ff7d00",

  "steps-description-color": "#86909c",
  "steps-subtitle-color": "#c9cdd4",

  "steps-title-font-size": "14px",
  "steps-description-font-size": "12px",

  "steps-icon-size-sm": "24px",
  "steps-icon-size-md": "32px",
  "steps-icon-size-lg": "40px",
} as const;

export type StepsTokenKey = keyof typeof stepsTokens;

export const stepsSizeSpecs = {
  small: {
    iconSize: stepsTokens["steps-icon-size-sm"],
    titleFontSize: stepsTokens["steps-title-font-size"],
    descriptionFontSize: stepsTokens["steps-description-font-size"],
    tailWidth: "1px",
  },
  middle: {
    iconSize: stepsTokens["steps-icon-size-md"],
    titleFontSize: stepsTokens["steps-title-font-size"],
    descriptionFontSize: stepsTokens["steps-description-font-size"],
    tailWidth: "1px",
  },
  large: {
    iconSize: stepsTokens["steps-icon-size-lg"],
    titleFontSize: stepsTokens["steps-title-font-size"],
    descriptionFontSize: stepsTokens["steps-description-font-size"],
    tailWidth: "2px",
  },
} as const;

export type StepsSizeKey = keyof typeof stepsSizeSpecs;

export const stepsUsageTokenNames = [
  "steps-icon-border-finish",
  "steps-icon-bg-finish",
  "steps-icon-border-process",
  "steps-icon-border-wait",
  "steps-icon-border-error",
  "steps-icon-border-warning",
  "steps-tail-finish-color",
  "steps-tail-wait-color",
  "steps-title-finish-color",
  "steps-title-process-color",
  "steps-title-wait-color",
  "steps-title-error-color",
  "steps-title-warning-color",
  "steps-description-color",
  "steps-subtitle-color",
] as const;
