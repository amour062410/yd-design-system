"use client";

import { useState } from "react";
import { cn } from "@yd-ds/ui";
import { ApiTable, type ApiTableRow } from "@/components/docs/api-table";
import { ComponentDocHeader } from "@/components/docs/component-doc-header";
import { CopyCodeBlock } from "@/components/docs/copy-code-block";
import {
  CASCADER_CODE_EXAMPLE,
  CASCADER_INTRO,
  CASCADER_USAGE_TOKEN_NAMES,
} from "@/lib/data/cascaderMock";
import {
  CascaderBusinessShowcase,
  CascaderSizesShowcase,
  CascaderStatesShowcase,
  CascaderTypesShowcase,
} from "./cascader-showcase";

const API_TABLE_CLASS =
  "overflow-x-auto rounded-[6px] border border-[#e5e6eb] [&_thead_tr]:border-b [&_thead_tr]:border-[#e5e6eb] [&_th]:bg-[#f7f8fa] [&_th]:px-4 [&_th]:py-2.5 [&_th]:text-left [&_th]:text-[13px] [&_th]:font-semibold [&_th]:text-[#1d2129] [&_tbody_tr]:border-b [&_tbody_tr]:border-[#f2f3f5] [&_tbody_tr:last-child]:border-0 [&_tbody_tr:hover]:bg-[#f7f8fa] [&_td]:px-4 [&_td]:py-2.5 [&_td]:text-[13px] [&_td]:text-[#4e5969]";

const CASCADER_API_ROWS: ApiTableRow[] = [
  { prop: "options", type: "CascaderOption[]", description: "级联数据源（label / value / children / isLeaf / loading）" },
  { prop: "value", type: "string[] | string[][]", description: "受控值；单选为路径数组，多选为路径数组的数组" },
  { prop: "defaultValue", type: "string[] | string[][]", default: "[]", description: "非受控默认值" },
  { prop: "placeholder", type: "string", default: '"请选择"', description: "占位文案" },
  { prop: "disabled", type: "boolean", default: "false", description: "禁用" },
  { prop: "status", type: '"error"', description: "错误态边框" },
  { prop: "size", type: '"sm" | "md" | "lg"', default: '"md"', description: "尺寸（24 / 32 / 40px）" },
  { prop: "allowClear", type: "boolean", default: "false", description: "显示清空按钮" },
  { prop: "showSearch", type: "boolean", default: "false", description: "面板内搜索，支持关键词高亮" },
  { prop: "searchPlaceholder", type: "string", default: '"请搜索"', description: "搜索框占位" },
  { prop: "filter", type: "(input, path) => boolean", description: "自定义搜索过滤（Ant showSearch.filter）" },
  { prop: "onSearch", type: "(value: string) => void", description: "搜索输入变化回调" },
  { prop: "changeOnSelect", type: "boolean", default: "false", description: "选中非叶子时是否回填（Ant changeOnSelect）" },
  { prop: "expandTrigger", type: '"click" | "hover"', default: '"click"', description: "子级展开方式" },
  { prop: "expandDelay", type: "number", default: "150", description: "hover 展开延迟（ms）" },
  { prop: "multiple", type: "boolean", default: "false", description: "多选模式（Ant multiple）" },
  { prop: "showCheckedStrategy", type: '"SHOW_PARENT" | "SHOW_CHILD"', default: '"SHOW_CHILD"', description: "多选标签展示策略" },
  { prop: "maxTagCount", type: "number", description: "多选标签最多展示数量" },
  { prop: "displayRender", type: "(labels, selectedOptions) => ReactNode", description: "自定义选中展示（Ant displayRender）" },
  { prop: "popupMatchSelectWidth", type: "boolean", default: "true", description: "面板最小宽度对齐触发器" },
  { prop: "notFoundContent", type: "ReactNode", default: '"无匹配项"', description: "搜索无结果文案" },
  { prop: "open", type: "boolean", description: "受控面板显隐" },
  { prop: "defaultOpen", type: "boolean", default: "false", description: "非受控默认显隐" },
  { prop: "onOpenChange", type: "(open: boolean) => void", description: "面板显隐变化" },
  { prop: "fieldNames", type: "{ label?, value?, children?, isLeaf? }", description: "自定义字段名" },
  { prop: "separator", type: "string", default: '" / "', description: "默认展示路径分隔符" },
  {
    prop: "onChange",
    type: "(value, selectedOptions) => void",
    description: "选中变化；单选 value 为 string[]，多选为 string[][]",
  },
];

export default function CascaderPage() {
  const [copied, setCopied] = useState<string | null>(null);

  const copyToken = async (token: string) => {
    await navigator.clipboard.writeText(token);
    setCopied(token);
    window.setTimeout(() => setCopied(null), 1200);
  };

  return (
    <div className="space-y-12">
      <ComponentDocHeader title="Cascader" description={CASCADER_INTRO} />

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">Cascader States</h2>
        <p className="text-sm text-muted-foreground">
          Default、Hover、Focus、Disabled、Error。
        </p>
        <CascaderStatesShowcase />
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">Cascader Types</h2>
        <p className="text-sm text-muted-foreground">
          Basic、Change On Select、Searchable、Clearable。
        </p>
        <CascaderTypesShowcase />
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">Cascader Sizes</h2>
        <p className="text-sm text-muted-foreground">Small、Medium、Large。</p>
        <CascaderSizesShowcase />
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">Business Demo</h2>
        <p className="text-sm text-muted-foreground">
          大区 → 省 → 市 → 门店四级级联；含单选与 Ant multiple 多选，选项态仅用色块区分。
        </p>
        <CascaderBusinessShowcase />
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">API</h2>
        <ApiTable rows={CASCADER_API_ROWS} className={API_TABLE_CLASS} />
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">Development Usage</h2>
        <CopyCodeBlock code={CASCADER_CODE_EXAMPLE} />
        <p className="text-xs text-muted-foreground">
          从 <code className="rounded bg-muted px-1">@yd-ds/ui/cascader</code> 引入。
          value 为路径数组，展示文案会自动拼接为「浙江省 / 杭州市 / 西湖区」。
        </p>
      </section>

      <section className="space-y-4 pb-12">
        <h2 className="text-2xl font-semibold tracking-tight">Token Usage</h2>
        <p className="text-sm text-muted-foreground">点击 Token 名称可复制。</p>
        <div className="grid gap-3 sm:grid-cols-2">
          {CASCADER_USAGE_TOKEN_NAMES.map((token) => (
            <button
              key={token}
              type="button"
              onClick={() => copyToken(token)}
              className={cn(
                "rounded-md border bg-card px-4 py-3 text-left text-sm transition-colors hover:bg-muted/50",
                copied === token && "border-primary"
              )}
            >
              <code className="text-[13px] text-foreground">{token}</code>
              {copied === token ? (
                <span className="ml-2 text-xs text-primary">已复制</span>
              ) : null}
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}
