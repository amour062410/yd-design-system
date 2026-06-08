"use client";

import { useState } from "react";
import {
  Input,
  InputShowcase,
  InteractiveBasicInput,
  InteractivePasswordInput,
  InteractiveTextArea,
  PasswordInput,
  PasswordInputShowcase,
  SearchInput,
  SearchInputShowcase,
  StaticFieldShowcase,
  TextArea,
  TextAreaShowcase,
} from "@yd-ds/ui/input";
import { Card, Label, Section } from "@/components/showcase/section";
import {
  DarkModePreviewCard,
  InputShowcaseFrame,
} from "@/components/showcase/input-showcase-frame";
import {
  INPUT_API_PROPS,
  INPUT_CODE_PREVIEW,
  INPUT_DO_ITEMS,
  INPUT_DONT_ITEMS,
  INPUT_SIZE_SPECS,
  INPUT_USAGE_TEXT,
} from "@/lib/data/inputMock";

const SEARCH_VARIANTS = [
  { variant: "icon" as const, label: "图标后缀" },
  { variant: "button-icon" as const, label: "图标按钮" },
  { variant: "button-text" as const, label: "文字按钮" },
];

export default function InputShowcasePage() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(INPUT_CODE_PREVIEW);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };

  return (
    <InputShowcaseFrame
      title="Input"
      subtitle="全局圆角规范 6px · Input（输入框）用于表单与搜索场景的文本录入与编辑，涵盖 Password、TextArea、Search 与 Addon 等变体。"
    >
      <Section title="Regular" description={INPUT_USAGE_TEXT}>
        <div className="space-y-8">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/60 pb-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full border border-brand/25 bg-brand-muted/80 px-3 py-1 text-[11px] font-semibold text-brand">
                Regular · 32px
              </span>
              <span className="rounded-full border border-border/70 px-3 py-1 text-[11px] text-muted-foreground">
                圆角 6px
              </span>
            </div>
            <p className="text-xs text-muted-foreground">
              默认 / Hover / 聚焦 合并为可交互演示，标签与输入框上下左对齐
            </p>
          </div>

          <div className="space-y-14">
            <div>
              <h3 className="mb-6 text-[13px] font-semibold text-text-primary">基础输入</h3>
              <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)]">
                <InteractiveBasicInput />

                <StaticFieldShowcase label="禁用" hint="不可编辑的静态禁用态">
                  <InputShowcase state="disabled" widthClassName="w-full" />
                </StaticFieldShowcase>

                <StaticFieldShowcase label="可清空" hint="输入后展示清除按钮">
                  <InputShowcase
                    state="focus"
                    allowClear
                    value="已输入内容"
                    widthClassName="w-full"
                  />
                </StaticFieldShowcase>
              </div>
            </div>

            <div className="border-t border-border/50 pt-10">
              <h3 className="mb-6 text-[13px] font-semibold text-text-primary">密码输入</h3>
              <div className="grid gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
                <InteractivePasswordInput />

                <StaticFieldShowcase label="禁用" hint="禁用态不可切换显隐">
                  <PasswordInputShowcase state="disabled" widthClassName="w-full" />
                </StaticFieldShowcase>
              </div>
            </div>

            <div className="border-t border-border/50 pt-10">
              <h3 className="mb-6 text-[13px] font-semibold text-text-primary">多行文本</h3>
              <div className="grid gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
                <InteractiveTextArea />

                <StaticFieldShowcase label="禁用" hint="静态禁用展示">
                  <TextAreaShowcase state="disabled" widthClassName="w-full" />
                </StaticFieldShowcase>
              </div>
            </div>

            <div className="border-t border-border/50 pt-10">
              <h3 className="mb-2 text-[13px] font-semibold text-text-primary">
                搜索 · 白底描边
              </h3>
              <p className="mb-6 text-[12px] text-text-tertiary">
                三种操作区：右侧图标 / 品牌色图标按钮 / 品牌色文字按钮
              </p>
              <div className="grid gap-8 md:grid-cols-3">
                {SEARCH_VARIANTS.map(({ variant, label }) => (
                  <StaticFieldShowcase key={variant} label={label}>
                    <SearchInputShowcase variant={variant} widthClassName="w-full max-w-none" />
                  </StaticFieldShowcase>
                ))}
              </div>
            </div>

            <div className="border-t border-border/50 pt-10">
              <h3 className="mb-2 text-[13px] font-semibold text-text-primary">
                搜索 · 浅灰填充
              </h3>
              <p className="mb-6 text-[12px] text-text-tertiary">
                无边框填充样式，适用于顶栏或工具区紧凑场景
              </p>
              <div className="grid gap-8 md:grid-cols-3">
                {SEARCH_VARIANTS.map(({ variant, label }) => (
                  <StaticFieldShowcase key={`filled-${variant}`} label={label}>
                    <SearchInputShowcase
                      variant={variant}
                      filled
                      widthClassName="w-full max-w-none"
                    />
                  </StaticFieldShowcase>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Section title="Usage" description="可交互示例">
        <Card>
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <Label>基础 · 可清空</Label>
              <Input placeholder="请输入" allowClear defaultValue="演示内容" />
            </div>
            <div>
              <Label>密码</Label>
              <PasswordInput placeholder="密码" />
            </div>
            <div className="lg:col-span-2">
              <Label>多行文本</Label>
              <TextArea placeholder="文字请输入" />
            </div>
            <div>
              <Label>搜索 · 图标</Label>
              <SearchInput placeholder="请输入" />
            </div>
            <div>
              <Label>搜索 · 文字按钮</Label>
              <SearchInput variant="button-text" placeholder="请输入" filled />
            </div>
          </div>
        </Card>
      </Section>

      <Section title="尺寸规格" description="Regular 32px · 圆角 6px · 与 Select / DatePicker 对齐">
        <Card>
          <div className="overflow-x-auto rounded-sm border border-border/60">
            <table className="w-full min-w-[480px] text-left text-[13px]">
              <thead>
                <tr className="border-b border-border/80 bg-surface-card-soft">
                  <th className="px-4 py-3 font-medium text-text-tertiary">Size</th>
                  <th className="px-4 py-3 font-medium text-text-tertiary">Height</th>
                  <th className="px-4 py-3 font-medium text-text-tertiary">Font</th>
                  <th className="px-4 py-3 font-medium text-text-tertiary">Padding</th>
                  <th className="px-4 py-3 font-medium text-text-tertiary">Radius</th>
                </tr>
              </thead>
              <tbody>
                {INPUT_SIZE_SPECS.map((row) => (
                  <tr
                    key={row.size}
                    className="border-b border-border/50 last:border-0"
                  >
                    <td className="px-4 py-3 font-medium capitalize text-text-primary">
                      {row.size}
                    </td>
                    <td className="px-4 py-3 text-text-secondary">{row.height}</td>
                    <td className="px-4 py-3 text-text-secondary">{row.fontSize}</td>
                    <td className="px-4 py-3 text-text-secondary">{row.padding}</td>
                    <td className="px-4 py-3 text-text-secondary">{row.radius}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </Section>

      <Section title="API">
        <Card className="overflow-hidden p-0 hover:shadow-ds">
          <table className="w-full min-w-[640px] text-left text-[13px]">
            <thead>
              <tr className="border-b border-border/80 bg-surface-card-soft">
                <th className="px-5 py-3.5 font-medium text-text-tertiary">属性</th>
                <th className="px-5 py-3.5 font-medium text-text-tertiary">类型</th>
                <th className="px-5 py-3.5 font-medium text-text-tertiary">默认值</th>
                <th className="px-5 py-3.5 font-medium text-text-tertiary">说明</th>
              </tr>
            </thead>
            <tbody>
              {INPUT_API_PROPS.map((prop) => (
                <tr
                  key={prop.name}
                  className="border-b border-border/50 transition-colors duration-fast last:border-0 hover:bg-brand-hover/50"
                >
                  <td className="px-5 py-3.5 font-mono text-[12px] font-medium text-brand">
                    {prop.name}
                  </td>
                  <td className="px-5 py-3.5 font-mono text-[11px] text-text-secondary">
                    {prop.type}
                  </td>
                  <td className="px-5 py-3.5 font-mono text-[11px] text-text-tertiary">
                    {prop.default}
                  </td>
                  <td className="px-5 py-3.5 text-text-secondary">{prop.desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </Section>

      <Section title="Do / Don't">
        <div className="grid gap-6 md:grid-cols-2">
          <Card inset>
            <h3 className="mb-4 flex items-center gap-2.5 text-sm font-semibold text-text-primary">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-brand/10 text-xs text-brand">
                ✓
              </span>
              Do
            </h3>
            <ul className="space-y-3 text-[14px] leading-relaxed text-text-secondary">
              {INPUT_DO_ITEMS.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-brand" />
                  {item}
                </li>
              ))}
            </ul>
          </Card>
          <Card inset>
            <h3 className="mb-4 flex items-center gap-2.5 text-sm font-semibold text-text-primary">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-red-500/10 text-xs text-red-500">
                ✕
              </span>
              Don&apos;t
            </h3>
            <ul className="space-y-3 text-[14px] leading-relaxed text-text-secondary">
              {INPUT_DONT_ITEMS.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-red-400" />
                  {item}
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </Section>

      <Section title="Dark Mode Preview">
        <DarkModePreviewCard>
          <div className="grid max-w-2xl gap-6">
            <Input placeholder="请输入" allowClear defaultValue="深色预览" />
            <PasswordInput placeholder="密码" />
            <TextArea placeholder="文字请输入" />
            <SearchInput variant="button-text" placeholder="搜索内容" />
          </div>
        </DarkModePreviewCard>
      </Section>

      <Section title="Code Preview">
        <Card className="overflow-hidden p-0 hover:shadow-ds">
          <div className="flex items-center justify-between border-b border-border/80 bg-surface-card-soft px-5 py-3">
            <span className="font-mono text-[11px] text-text-tertiary">FormFields.tsx</span>
            <button
              type="button"
              className="btn-primary px-3 py-1 text-[12px] font-medium"
              onClick={handleCopy}
            >
              {copied ? "已复制" : "复制"}
            </button>
          </div>
          <pre className="overflow-x-auto px-5 py-5 text-[12px] leading-[1.65] text-text-secondary">
            <code>{INPUT_CODE_PREVIEW}</code>
          </pre>
        </Card>
      </Section>
    </InputShowcaseFrame>
  );
}
