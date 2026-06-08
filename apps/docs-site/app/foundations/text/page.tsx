"use client";

import { useState } from "react";
import {
  fontWeight,
  lineHeight,
  primitiveColors,
  resolveFontSize,
  type FontSizeKey,
} from "@yd-ds/tokens";
import { ComponentDocHeader } from "@/components/docs/component-doc-header";

type TextSpec = {
  id: string;
  label: string;
  sizeKey: FontSizeKey;
  usage: string;
  sample: string;
};

const cnSpecs: TextSpec[] = [
  { id: "12/CN_Regular", label: "12/CN_Regular", sizeKey: "xs", usage: "次级提示与弱说明", sample: "正文内容" },
  { id: "14/CN_Regular", label: "14/CN_Regular", sizeKey: "sm", usage: "默认正文与表单标签", sample: "正文内容" },
  { id: "16/CN_Regular", label: "16/CN_Regular", sizeKey: "base", usage: "正文强调与模块正文", sample: "正文内容" },
  { id: "20/CN_Regular", label: "20/CN_Regular", sizeKey: "xl", usage: "区块小标题", sample: "正文内容" },
  { id: "24/CN_Regular", label: "24/CN_Regular", sizeKey: "2xl", usage: "页面次级标题", sample: "正文内容" },
  { id: "36/CN_Regular", label: "36/CN_Regular", sizeKey: "4xl", usage: "页面主标题", sample: "正文内容" },
  { id: "48/CN_Regular", label: "48/CN_Regular", sizeKey: "5xl", usage: "品牌级大标题", sample: "正文内容" },
];

const enSpecs: TextSpec[] = [
  { id: "12/EN_Regular", label: "12/EN_Regular", sizeKey: "xs", usage: "Caption 与元信息", sample: "The Pragmatic Romanticism" },
  { id: "14/EN_Regular", label: "14/EN_Regular", sizeKey: "sm", usage: "默认英文正文", sample: "The Pragmatic Romanticism" },
  { id: "16/EN_Regular", label: "16/EN_Regular", sizeKey: "base", usage: "正文强调与说明", sample: "The Pragmatic Romanticism" },
  { id: "20/EN_Regular", label: "20/EN_Regular", sizeKey: "xl", usage: "模块标题", sample: "The Pragmatic Romanticism" },
  { id: "24/EN_Regular", label: "24/EN_Regular", sizeKey: "2xl", usage: "页面次级标题", sample: "The Pragmatic Romanticism" },
  { id: "36/EN_Regular", label: "36/EN_Regular", sizeKey: "4xl", usage: "页面主标题", sample: "The Pragmatic Romanticism" },
  { id: "48/EN_Regular", label: "48/EN_Regular", sizeKey: "5xl", usage: "视觉引导标题", sample: "The Pragmatic Romanticism" },
];

const titleTextColorTokens = [
  { name: "Black 88%", token: "color.text.black88", value: primitiveColors.text.black88 },
  { name: "Black 65%", token: "color.text.black65", value: primitiveColors.text.black65 },
  { name: "Black 45%", token: "color.text.black45", value: primitiveColors.text.black45 },
  { name: "Black 25%", token: "color.text.black25", value: primitiveColors.text.black25 },
  { name: "Link", token: "color.text.link", value: primitiveColors.text.link },
  { name: "Success", token: "color.text.success", value: primitiveColors.text.success },
  { name: "Warning", token: "color.text.warning", value: primitiveColors.text.warning },
  { name: "Error", token: "color.text.error", value: primitiveColors.text.error },
] as const;

const codeExample = `import { resolveFontSize, fontWeight, primitiveColors } from "@yd-ds/tokens";

const body = resolveFontSize("sm"); // 14px

const style = {
  fontSize: body.fontSize,                  // font-size-sm
  fontWeight: fontWeight.normal,            // font-weight-regular
  lineHeight: body.lineHeight,              // line-height from token
  color: primitiveColors.text.black88,      // color.text.black88
};`;

export default function TextPage() {
  const [copied, setCopied] = useState<string | null>(null);

  const copyText = async (text: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(text);
    window.setTimeout(() => setCopied(null), 1200);
  };

  const copyCode = async () => {
    await navigator.clipboard.writeText(codeExample);
    setCopied("样式代码");
    window.setTimeout(() => setCopied(null), 1200);
  };

  return (
    <div className="space-y-12">
      <ComponentDocHeader
        title="Text"
        description="字体与文本规范页面，基于 Design Token 统一定义中英文字体、颜色层级与平台字体选用。"
      />

      <section className="space-y-4">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">Section 01 · 中文字体规范</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            规格：12 / 14 / 16 / 20 / 24 / 36 / 48（Regular）
          </p>
        </div>
        <TypographyList specs={cnSpecs} onCopy={copyText} />
      </section>

      <section className="space-y-4">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">Section 02 · 英文字体规范</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            示例文案：The Pragmatic Romanticism
          </p>
        </div>
        <TypographyList specs={enSpecs} onCopy={copyText} />

        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-card p-4">
            <h3 className="text-sm font-semibold">Font Weight</h3>
            <div className="mt-3 space-y-2 text-sm">
              {[
                { label: "Regular", token: "font-weight-regular", value: fontWeight.normal },
                { label: "Medium", token: "font-weight-medium", value: fontWeight.medium },
                { label: "Semibold", token: "font-weight-semibold", value: fontWeight.semibold },
                { label: "Bold", token: "font-weight-bold", value: fontWeight.bold },
              ].map((item) => (
                <button key={item.token} type="button" onClick={() => copyText(item.token)} className="flex w-full items-center justify-between rounded px-2 py-1.5 text-left hover:bg-muted/50">
                  <span style={{ fontWeight: item.value }}>{item.label}</span>
                  <span className="font-mono text-xs text-primary">{item.token}</span>
                </button>
              ))}
            </div>
          </div>
          <div className="rounded-lg border bg-card p-4">
            <h3 className="text-sm font-semibold">Line Height</h3>
            <div className="mt-3 space-y-2 text-sm">
              {Object.values(lineHeight).map((lh) => (
                <button key={lh.token} type="button" onClick={() => copyText(lh.token)} className="flex w-full items-center justify-between rounded px-2 py-1.5 text-left hover:bg-muted/50">
                  <span>line-height: {lh.value}</span>
                  <span className="font-mono text-xs text-primary">{lh.token}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">Section 03 · 文本颜色规范</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            双栏：Title & Text（16px Medium）与 Text（14px Medium）
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          <ColorColumn
            title="Title&Text / 小标题&正文"
            subtitle="16px Medium"
            fontSize={resolveFontSize("base").fontSize}
            weight={fontWeight.medium}
            items={titleTextColorTokens}
            onCopy={copyText}
          />
          <ColorColumn
            title="Text / 正文"
            subtitle="14px Medium"
            fontSize={resolveFontSize("sm").fontSize}
            weight={fontWeight.medium}
            items={titleTextColorTokens}
            onCopy={copyText}
          />
        </div>
      </section>

      <section className="space-y-4">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">Section 04 · 字体选用</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            平台推荐字体方案（中文 / 英文）
          </p>
        </div>
        <div className="overflow-x-auto rounded-lg border">
          <table className="w-full min-w-[560px] text-left text-sm">
            <thead>
              <tr className="border-b bg-muted/40">
                <th className="px-4 py-3 font-semibold">平台</th>
                <th className="px-4 py-3 font-semibold">中文字体</th>
                <th className="px-4 py-3 font-semibold">英文字体</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="px-4 py-3">macOS / iOS</td>
                <td className="px-4 py-3">PingFang SC / 苹方</td>
                <td className="px-4 py-3">SF Pro / Inter</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3">Windows</td>
                <td className="px-4 py-3">Microsoft YaHei / 微软雅黑</td>
                <td className="px-4 py-3">Segoe UI / Arial</td>
              </tr>
              <tr>
                <td className="px-4 py-3">Android</td>
                <td className="px-4 py-3">Noto Sans CJK SC / 思源黑体</td>
                <td className="px-4 py-3">Roboto / Noto Sans</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="overflow-x-auto rounded-lg border">
          <table className="w-full min-w-[680px] text-left text-sm">
            <thead>
              <tr className="border-b bg-muted/40">
                <th className="px-4 py-3 font-semibold">Token Name</th>
                <th className="px-4 py-3 font-semibold">Value</th>
              </tr>
            </thead>
            <tbody>
              {[
                ...cnSpecs.map((spec) => {
                  const resolved = resolveFontSize(spec.sizeKey);
                  return { token: resolved.fontSizeToken, value: resolved.fontSize };
                }),
                ...Object.entries(fontWeight).map(([k, v]) => ({
                  token: `font-weight-${k === "normal" ? "regular" : k}`,
                  value: v,
                })),
                ...Object.values(lineHeight).map((lh) => ({
                  token: lh.token,
                  value: lh.value,
                })),
              ].map((row) => (
                <tr key={row.token} className="border-b last:border-0">
                  <td className="px-4 py-3">
                    <button type="button" onClick={() => copyText(row.token)} className="font-mono text-xs text-primary hover:opacity-80">
                      {row.token}
                    </button>
                  </td>
                  <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{row.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="rounded-lg border bg-muted/30">
          <div className="flex items-center justify-between border-b px-4 py-2">
            <span className="text-xs text-muted-foreground">代码示例</span>
            <button type="button" onClick={copyCode} className="rounded bg-primary px-2.5 py-1 text-xs font-medium text-primary-foreground">
              复制样式代码
            </button>
          </div>
          <pre className="overflow-x-auto p-4 font-mono text-xs leading-relaxed">
            <code>{codeExample}</code>
          </pre>
        </div>
      </section>

      <div
        className={`fixed bottom-6 left-1/2 z-50 max-w-[90vw] -translate-x-1/2 truncate rounded-md bg-foreground px-4 py-2 text-xs font-medium text-background shadow-lg transition-opacity duration-200 ${
          copied ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        已复制：{copied}
      </div>
    </div>
  );
}

function TypographyList({
  specs,
  onCopy,
}: {
  specs: TextSpec[];
  onCopy: (token: string) => void;
}) {
  return (
    <div className="rounded-lg border">
      {specs.map((spec, idx) => {
        const resolved = resolveFontSize(spec.sizeKey);
        return (
          <div
            key={spec.id}
            className={`grid grid-cols-1 gap-3 px-4 py-3 md:grid-cols-[1fr_auto] md:items-center ${
              idx !== specs.length - 1 ? "border-b" : ""
            }`}
          >
            <p
              className="text-foreground"
              style={{
                fontSize: resolved.fontSize,
                fontWeight: fontWeight.normal,
                lineHeight: resolved.lineHeight,
              }}
            >
              {spec.sample}
            </p>
            <div className="text-right text-[11px] leading-relaxed text-muted-foreground md:min-w-[320px]">
              <div className="font-mono">
                {toPx(resolved.fontSize)}/Regular · {spec.id}
              </div>
              <div>
                {resolved.fontSizeToken} · font-weight-regular ·{" "}
                {lineHeightTokenFromValue(resolved.lineHeight)}
              </div>
              <button
                type="button"
                onClick={() => onCopy(resolved.fontSizeToken)}
                className="font-mono text-primary hover:opacity-80"
              >
                Token: {resolved.fontSizeToken}
              </button>
              <div>{spec.usage}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function ColorColumn({
  title,
  subtitle,
  fontSize,
  weight,
  items,
  onCopy,
}: {
  title: string;
  subtitle: string;
  fontSize: string;
  weight: string;
  items: readonly { name: string; token: string; value: string }[];
  onCopy: (token: string) => void;
}) {
  return (
    <div className="rounded-lg border bg-card p-4">
      <h3 className="text-2xl font-semibold tracking-tight text-foreground">{title}</h3>
      <p className="mt-2 font-mono text-xs text-muted-foreground">{subtitle}</p>
      <div className="mt-4 space-y-2">
        {items.map((item) => (
          <button
            key={item.token}
            type="button"
            onClick={() => onCopy(item.token)}
            className="flex w-full items-center justify-between rounded px-2 py-1.5 text-left transition-colors hover:bg-muted/50"
          >
            <span style={{ color: item.value, fontSize, fontWeight: weight }}>{item.name}</span>
            <span className="font-mono text-[10px] text-primary">{item.token}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

function toPx(remValue: string) {
  if (!remValue.endsWith("rem")) return remValue;
  const rem = Number(remValue.replace("rem", ""));
  return `${Math.round(rem * 16)}px`;
}

function lineHeightTokenFromValue(value: string) {
  const matched = Object.values(lineHeight).find((item) => item.value === value);
  return matched?.token ?? "line-height-base";
}
