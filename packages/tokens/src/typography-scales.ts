import {
  fontFamilyStacks,
  fontWeight,
  fontWeightTokens,
  lineHeight,
  resolveFontSize,
  type FontSizeKey,
  type FontWeightKey,
  type LineHeightKey,
} from "./primitives/typography";

export type TypographyStyleDefinition = {
  name: string;
  token: string;
  preview: string;
  fontSize: string;
  fontSizeToken: string;
  fontWeight: string;
  fontWeightToken: string;
  lineHeight: string;
  lineHeightToken: string;
};

export type TypographyGroup = {
  id: string;
  title: string;
  description: string;
  styles: TypographyStyleDefinition[];
};

export type TypographyTokenRow = {
  token: string;
  value: string;
  category: string;
};

function composeStyle(
  name: string,
  token: string,
  preview: string,
  sizeKey: FontSizeKey,
  weightKey: FontWeightKey,
  lineHeightKey: LineHeightKey
): TypographyStyleDefinition {
  const size = resolveFontSize(sizeKey);
  return {
    name,
    token,
    preview,
    fontSize: size.fontSize,
    fontSizeToken: size.fontSizeToken,
    fontWeight: fontWeight[weightKey],
    fontWeightToken: `font-weight-${weightKey === "normal" ? "regular" : weightKey}`,
    lineHeight: lineHeight[lineHeightKey].value,
    lineHeightToken: lineHeight[lineHeightKey].token,
  };
}

export const typographyGroups: TypographyGroup[] = [
  {
    id: "heading",
    title: "Heading",
    description: "页面与模块标题层级，字号逐级递减、字重保持清晰对比。",
    styles: [
      composeStyle("H1", "font.heading.h1", "云盯设计系统", "4xl", "bold", "tight"),
      composeStyle("H2", "font.heading.h2", "构建一致的产品体验", "3xl", "semibold", "tight"),
      composeStyle("H3", "font.heading.h3", "组件与 Token 规范", "2xl", "semibold", "snug"),
      composeStyle("H4", "font.heading.h4", "Typography 字体体系", "xl", "semibold", "snug"),
      composeStyle("H5", "font.heading.h5", "Foundation 基础规范", "lg", "medium", "base"),
      composeStyle("H6", "font.heading.h6", "辅助说明标题", "base", "medium", "base"),
    ],
  },
  {
    id: "body",
    title: "Body",
    description: "正文阅读层级，适用于段落、表单说明与列表内容。",
    styles: [
      composeStyle(
        "Body Large",
        "font.body.large",
        "大号正文用于引导性段落或重要说明文字。",
        "lg",
        "normal",
        "relaxed"
      ),
      composeStyle(
        "Body Default",
        "font.body.default",
        "默认正文用于大多数界面文本与表单标签。",
        "base",
        "normal",
        "base"
      ),
      composeStyle(
        "Body Small",
        "font.body.small",
        "小号正文用于次要说明与紧凑布局场景。",
        "sm",
        "normal",
        "base"
      ),
    ],
  },
  {
    id: "caption",
    title: "Caption",
    description: "辅助与注释文字，用于时间戳、提示与表格次要信息。",
    styles: [
      composeStyle(
        "Caption 1",
        "font.caption.1",
        "Caption 1 · 12px 辅助说明",
        "xs",
        "normal",
        "base"
      ),
      composeStyle(
        "Caption 2",
        "font.caption.2",
        "Caption 2 · 11px 紧凑注释",
        "2xs",
        "normal",
        "tight"
      ),
    ],
  },
];

export const fontFamilyGroups = Object.values(fontFamilyStacks);

export const fontWeightGroup = Object.values(fontWeightTokens);

export const lineHeightGroup = Object.values(lineHeight);

/** Flat token registry for Token Table section */
export const typographyTokenRegistry: TypographyTokenRow[] = [
  ...fontFamilyGroups.map((f) => ({
    token: f.token,
    value: f.stack.join(", "),
    category: "Font Family",
  })),
  ...typographyGroups.flatMap((group) =>
    group.styles.flatMap((style) => [
      {
        token: style.fontSizeToken,
        value: style.fontSize,
        category: "Font Size",
      },
      {
        token: style.fontWeightToken,
        value: style.fontWeight,
        category: "Font Weight",
      },
      {
        token: style.lineHeightToken,
        value: style.lineHeight,
        category: "Line Height",
      },
      {
        token: style.token,
        value: `${style.fontSize} / ${style.fontWeight} / ${style.lineHeight}`,
        category: "Typography Role",
      },
    ])
  ),
  ...fontWeightGroup.map((w) => ({
    token: w.token,
    value: w.value,
    category: "Font Weight",
  })),
  ...lineHeightGroup.map((lh) => ({
    token: lh.token,
    value: lh.value,
    category: "Line Height",
  })),
];

/** Deduplicate token registry by token name */
export const typographyTokens = Array.from(
  new Map(typographyTokenRegistry.map((row) => [row.token, row])).values()
).sort((a, b) => a.token.localeCompare(b.token));

export const typographyCodeExample = `import {
  fontFamilyStacks,
  fontSize,
  fontWeight,
  lineHeight,
  typographyGroups,
} from "@yd-ds/tokens";

// 标题样式（H1）
const h1 = typographyGroups.find((g) => g.id === "heading")?.styles[0];

// 直接使用 primitive token
const bodySize = fontSize.base[0];       // 1rem
const bodyWeight = fontWeight.normal;    // 400
const bodyLeading = lineHeight.base.value; // 1.5

// CSS 变量（主题层）
// font-family: var(--font-sans);
// font-size: theme('fontSize.base');
`;

export const typographyCssExample = `.heading-h1 {
  font-family: var(--font-sans);
  font-size: 2.25rem;   /* font-size-4xl */
  font-weight: 700;      /* font-weight-bold */
  line-height: 1.25;     /* line-height-tight */
}

.body-default {
  font-size: 1rem;       /* font-size-base */
  font-weight: 400;      /* font-weight-regular */
  line-height: 1.5;      /* line-height-base */
}`;
