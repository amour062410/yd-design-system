"use client";

import { useState } from "react";
import { Cascader, CascaderShowcase } from "@yd-ds/ui/cascader";
import {
  CASCADER_DEMO_OPTIONS,
  CASCADER_SIZE_LABELS,
  CASCADER_STATE_LABELS,
  CASCADER_STORE_OPTIONS,
  CASCADER_TYPE_LABELS,
} from "@/lib/data/cascaderMock";

export function CascaderStatesShowcase() {
  const [value, setValue] = useState<string[]>([]);

  return (
    <div className="rounded-md border bg-card px-6 py-8 md:px-8">
      <p className="mb-4 text-xs text-muted-foreground">静态规格</p>
      <div className="flex flex-wrap items-start gap-8 md:gap-10">
        {CASCADER_STATE_LABELS.map(({ state, label, open }) => (
          <div key={state} className="flex flex-col items-center gap-2">
            <CascaderShowcase
              state={state}
              open={open}
              status={state === "error" ? "error" : undefined}
              options={CASCADER_DEMO_OPTIONS}
            />
            <span className="text-[11px] text-muted-foreground">{label}</span>
          </div>
        ))}
      </div>

      <div className="mt-8 border-t border-border/50 pt-8">
        <p className="mb-4 text-xs text-muted-foreground">
          可交互 · 省市区级联（点击展开多列面板）
        </p>
        <Cascader
          options={CASCADER_DEMO_OPTIONS}
          value={value}
          onChange={(next) => setValue(next as string[])}
          placeholder="请选择地区"
          className="max-w-[320px]"
        />
        <p className="mt-3 text-xs text-muted-foreground">
          当前选中：{value.length ? value.join(" / ") : "—"}
        </p>
      </div>
    </div>
  );
}

export function CascaderTypesShowcase() {
  const [basic, setBasic] = useState<string[]>([]);
  const [partial, setPartial] = useState<string[]>([]);
  const [search, setSearch] = useState<string[]>([]);
  const [clearable, setClearable] = useState<string[]>([
    "zhejiang",
    "hangzhou",
    "xihu",
  ]);
  const [multi, setMulti] = useState<string[][]>([]);
  const [custom, setCustom] = useState<string[]>([
    "zhejiang",
    "hangzhou",
    "xihu",
  ]);

  return (
    <div className="space-y-6">
      <div className="rounded-md border bg-card px-6 py-6 md:px-8">
        <div className="mb-4">
          <h3 className="text-[13px] font-semibold text-foreground">
            {CASCADER_TYPE_LABELS[0].label}
          </h3>
          <p className="text-xs text-muted-foreground">
            {CASCADER_TYPE_LABELS[0].description}
          </p>
        </div>
        <Cascader
          options={CASCADER_DEMO_OPTIONS}
          value={basic}
          onChange={(v) => setBasic(v as string[])}
          placeholder="请选择地区"
          className="max-w-[320px]"
        />
      </div>

      <div className="rounded-md border bg-card px-6 py-6 md:px-8">
        <div className="mb-4">
          <h3 className="text-[13px] font-semibold text-foreground">
            {CASCADER_TYPE_LABELS[1].label}
          </h3>
          <p className="text-xs text-muted-foreground">
            {CASCADER_TYPE_LABELS[1].description}
          </p>
        </div>
        <Cascader
          options={CASCADER_DEMO_OPTIONS}
          value={partial}
          onChange={(v) => setPartial(v as string[])}
          changeOnSelect
          placeholder="可选任意层级"
          className="max-w-[320px]"
        />
      </div>

      <div className="rounded-md border bg-card px-6 py-6 md:px-8">
        <div className="mb-4">
          <h3 className="text-[13px] font-semibold text-foreground">
            {CASCADER_TYPE_LABELS[2].label}
          </h3>
          <p className="text-xs text-muted-foreground">
            {CASCADER_TYPE_LABELS[2].description}
          </p>
        </div>
        <Cascader
          options={CASCADER_STORE_OPTIONS}
          value={search}
          onChange={(v) => setSearch(v as string[])}
          showSearch
          placeholder="搜索门店路径"
          className="max-w-[320px]"
        />
      </div>

      <div className="rounded-md border bg-card px-6 py-6 md:px-8">
        <div className="mb-4">
          <h3 className="text-[13px] font-semibold text-foreground">
            {CASCADER_TYPE_LABELS[3].label}
          </h3>
          <p className="text-xs text-muted-foreground">
            {CASCADER_TYPE_LABELS[3].description}
          </p>
        </div>
        <Cascader
          options={CASCADER_DEMO_OPTIONS}
          value={clearable}
          onChange={(v) => setClearable(v as string[])}
          allowClear
          placeholder="请选择地区"
          className="max-w-[320px]"
        />
      </div>

      <div className="rounded-md border bg-card px-6 py-6 md:px-8">
        <div className="mb-4">
          <h3 className="text-[13px] font-semibold text-foreground">
            {CASCADER_TYPE_LABELS[4].label}
          </h3>
          <p className="text-xs text-muted-foreground">
            {CASCADER_TYPE_LABELS[4].description}
          </p>
        </div>
        <Cascader
          multiple
          maxTagCount={2}
          options={CASCADER_DEMO_OPTIONS}
          value={multi}
          onChange={(v) => setMulti(v as string[][])}
          placeholder="可多选地区"
          className="max-w-[360px]"
        />
      </div>

      <div className="rounded-md border bg-card px-6 py-6 md:px-8">
        <div className="mb-4">
          <h3 className="text-[13px] font-semibold text-foreground">
            {CASCADER_TYPE_LABELS[5].label}
          </h3>
          <p className="text-xs text-muted-foreground">
            {CASCADER_TYPE_LABELS[5].description}
          </p>
        </div>
        <Cascader
          options={CASCADER_DEMO_OPTIONS}
          value={custom}
          onChange={(v) => setCustom(v as string[])}
          displayRender={(labels) => labels.join(" > ")}
          placeholder="请选择地区"
          className="max-w-[320px]"
        />
      </div>
    </div>
  );
}

export function CascaderSizesShowcase() {
  return (
    <div className="rounded-md border bg-card px-6 py-8 md:px-8">
      <div className="flex flex-wrap items-end gap-8">
        {CASCADER_SIZE_LABELS.map(({ size, label, height }) => (
          <div key={size} className="flex flex-col items-center gap-2">
            <CascaderShowcase
              size={size}
              open
              options={CASCADER_DEMO_OPTIONS}
              className="w-[240px]"
            />
            <span className="text-[11px] text-muted-foreground">
              {label} · {height}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function CascaderBusinessShowcase() {
  const [store, setStore] = useState<string[]>([]);
  const [stores, setStores] = useState<string[][]>([]);

  return (
    <div className="space-y-8 rounded-md border bg-card px-6 py-8 md:px-8">
      <div>
        <p className="mb-1 text-[13px] font-medium text-foreground">
          单选 · 大区 / 省 / 市 / 门店
        </p>
        <p className="mb-4 text-xs text-muted-foreground">
          选中叶子节点后回填完整路径，面板自动关闭。
        </p>
        <Cascader
          options={CASCADER_STORE_OPTIONS}
          value={store}
          onChange={(v) => setStore(v as string[])}
          showSearch
          allowClear
          placeholder="请选择门店"
          className="max-w-[420px]"
        />
      </div>

      <div className="border-t border-border/50 pt-8">
        <p className="mb-1 text-[13px] font-medium text-foreground">
          多选 · Ant Design multiple 模式
        </p>
        <p className="mb-4 text-xs text-muted-foreground">
          叶子节点左侧复选框勾选，可多选门店；展开路径仅用色块高亮，面板保持打开。
        </p>
        <Cascader
          multiple
          options={CASCADER_STORE_OPTIONS}
          value={stores}
          onChange={(v) => setStores(v as string[][])}
          showSearch
          allowClear
          maxTagCount={2}
          placeholder="请选择多个门店"
          className="max-w-[420px]"
        />
        <p className="mt-3 text-xs text-muted-foreground">
          已选 {stores.length} 项
          {stores.length > 0
            ? `：${stores.map((p) => p.join(" / ")).join("；")}`
            : ""}
        </p>
      </div>
    </div>
  );
}
