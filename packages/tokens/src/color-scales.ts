import {
  brandPrimary,
  functionalColors,
  neutralGray,
  type BrandPrimaryStep,
  type FunctionalColorKey,
  type NeutralGrayStep,
} from "./primitives/colors";
import { toSwatch, type ColorSwatchDefinition } from "./color-utils";

export type ColorScaleGroup = {
  id: "brand" | "functional" | "neutral";
  title: string;
  description: string;
  swatches: ColorSwatchDefinition[];
};

const brandSteps = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] as const satisfies readonly BrandPrimaryStep[];

const brandSwatches: ColorSwatchDefinition[] = brandSteps.map((step) =>
  toSwatch(`Primary-${step}`, `color.brand.primary-${step}`, brandPrimary[step])
);

const functionalSwatches: ColorSwatchDefinition[] = (
  Object.keys(functionalColors) as FunctionalColorKey[]
).map((key) => {
  const label = key.charAt(0).toUpperCase() + key.slice(1);
  return toSwatch(label, `color.functional.${key}`, functionalColors[key]);
});

const graySteps = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] as const satisfies readonly NeutralGrayStep[];

const neutralSwatches: ColorSwatchDefinition[] = graySteps.map((step) =>
  toSwatch(`Gray-${step}`, `color.neutral.gray-${step}`, neutralGray[step])
);

export const colorScaleGroups: ColorScaleGroup[] = [
  {
    id: "brand",
    title: "Brand",
    description: "品牌主色阶，Primary-6 为品牌主色 #165DFF，用于主按钮、链接与重点强调。",
    swatches: brandSwatches,
  },
  {
    id: "functional",
    title: "Functional",
    description: "功能语义色，用于成功、警告、危险与信息反馈场景。",
    swatches: functionalSwatches,
  },
  {
    id: "neutral",
    title: "Neutral",
    description: "中性灰阶，用于背景、边框、正文与禁用态等层级表达。",
    swatches: neutralSwatches,
  },
];
