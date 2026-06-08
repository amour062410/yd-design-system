export {
  stepsTokens,
  stepsSizeSpecs,
  stepsUsageTokenNames,
  type StepsTokenKey,
  type StepsSizeKey,
} from "@yd-ds/tokens";

export const stepsCssVars = {
  finishIconBg: "--steps-finish-icon-bg",
  finishIconColor: "--steps-finish-icon-color",
  finishTailColor: "--steps-finish-tail-color",
  processIconBg: "--steps-process-icon-bg",
  processIconColor: "--steps-process-icon-color",
  waitIconBg: "--steps-wait-icon-bg",
  waitIconColor: "--steps-wait-icon-color",
  errorIconBg: "--steps-error-icon-bg",
  errorIconColor: "--steps-error-icon-color",
  titleColor: "--steps-title-color",
  descriptionColor: "--steps-description-color",
} as const;
