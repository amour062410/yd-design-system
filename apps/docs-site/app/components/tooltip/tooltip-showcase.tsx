"use client";

import type { ReactNode } from "react";
import { Button } from "@yd-ds/ui/button";
import { Input } from "@yd-ds/ui/input";
import { Tooltip } from "@yd-ds/ui/tooltip";
import type { TooltipPlacement } from "@yd-ds/ui/tooltip";

function DemoCard({
  label,
  description,
  span = 1,
  children,
}: {
  label: string;
  description?: string;
  span?: 1 | 2;
  children: ReactNode;
}) {
  return (
    <div
      className={span === 2 ? "md:col-span-2" : undefined}
      style={{
        background: "var(--color-surface-card, #fff)",
        border: "1px solid #e5e6eb",
        borderRadius: 6,
        padding: 24,
        boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
      }}
    >
      <div className="mb-4 border-b border-[#f2f3f5] pb-3">
        <p className="text-[14px] font-medium text-[#1d2129] dark:text-[#f4f4f5]">
          {label}
        </p>
        {description ? (
          <p className="mt-0.5 text-[13px] text-[#86909c]">{description}</p>
        ) : null}
      </div>
      {children}
    </div>
  );
}

function PlacementButton({ placement }: { placement: TooltipPlacement }) {
  return (
    <Tooltip content="文字提示" placement={placement}>
      <Button variant="secondary" className="w-[112px]">
        {placement}
      </Button>
    </Tooltip>
  );
}

const SEMANTIC: { color: string; label: string }[] = [
  { color: "default", label: "默认" },
  { color: "primary", label: "品牌" },
  { color: "success", label: "成功" },
  { color: "warning", label: "警告" },
  { color: "danger", label: "危险" },
  { color: "info", label: "信息" },
];

const PALETTE: { color: string; label: string }[] = [
  { color: "#1D2129", label: "Dark" },
  { color: "#F53F3F", label: "Red" },
  { color: "#F77234", label: "Orange" },
  { color: "#FF7D00", label: "Warning" },
  { color: "#F7BA1E", label: "Gold" },
  { color: "#9FDB1D", label: "Lime" },
  { color: "#00B42A", label: "Green" },
  { color: "#14C9C9", label: "Cyan" },
  { color: "#3491FA", label: "Blue" },
  { color: "#165DFF", label: "Brand" },
  { color: "#722ED1", label: "Purple" },
  { color: "#F5319D", label: "Magenta" },
];

export function TooltipShowcase() {
  return (
    <section className="mb-10 grid grid-cols-1 gap-6 md:grid-cols-2">
      <DemoCard
        label="基础用法"
        description="hover / focus 触发，深色默认底 + 上方箭头"
      >
        <div className="flex flex-wrap items-center gap-3">
          <Tooltip content="文字提示">
            <Button variant="secondary">悬停查看</Button>
          </Tooltip>
          <Tooltip content="支持任意 React 节点">
            <Button>主要按钮</Button>
          </Tooltip>
        </div>
      </DemoCard>

      <DemoCard label="触发方式" description="hover / focus / click">
        <div className="flex flex-wrap items-center gap-3">
          <Tooltip content="悬停触发" trigger="hover">
            <Button variant="secondary">hover</Button>
          </Tooltip>
          <Tooltip content="聚焦触发" trigger="focus">
            <Input placeholder="focus 我" className="w-[140px]" />
          </Tooltip>
          <Tooltip content="点击切换" trigger="click">
            <Button variant="secondary">click</Button>
          </Tooltip>
        </div>
      </DemoCard>

      <DemoCard
        label="12 个弹出方向"
        description="居中布局，四周留足空间，每个方向清晰可辨（空间不足时才自动翻转）"
        span={2}
      >
        <div className="mx-auto flex w-full max-w-[560px] flex-col items-center gap-4 py-6">
          <div className="flex gap-3">
            <PlacementButton placement="top-start" />
            <PlacementButton placement="top" />
            <PlacementButton placement="top-end" />
          </div>
          <div className="flex w-full items-center justify-between">
            <div className="flex flex-col gap-3">
              <PlacementButton placement="left-start" />
              <PlacementButton placement="left" />
              <PlacementButton placement="left-end" />
            </div>
            <div className="flex flex-col gap-3">
              <PlacementButton placement="right-start" />
              <PlacementButton placement="right" />
              <PlacementButton placement="right-end" />
            </div>
          </div>
          <div className="flex gap-3">
            <PlacementButton placement="bottom-start" />
            <PlacementButton placement="bottom" />
            <PlacementButton placement="bottom-end" />
          </div>
        </div>
      </DemoCard>

      <DemoCard label="语义色" description="预设：default / primary / success / warning / danger / info">
        <div className="flex flex-wrap items-center gap-3">
          {SEMANTIC.map(({ color, label }) => (
            <Tooltip key={color} content="文字提示" color={color}>
              <Button variant="secondary">{label}</Button>
            </Tooltip>
          ))}
        </div>
      </DemoCard>

      <DemoCard
        label="自定义色板"
        description="color 支持任意 hex / rgb / css 变量，对齐设计稿全色板"
      >
        <div className="flex flex-wrap items-center gap-2">
          {PALETTE.map(({ color, label }) => (
            <Tooltip key={label} content="文字提示" color={color}>
              <button
                type="button"
                className="h-7 rounded-[4px] px-2.5 text-[12px] text-white"
                style={{ background: color }}
              >
                {label}
              </button>
            </Tooltip>
          ))}
        </div>
      </DemoCard>

      <DemoCard label="无箭头 / 长文本" description="arrow=false · maxWidth 自动换行" span={2}>
        <div className="flex flex-wrap items-center gap-3">
          <Tooltip content="无箭头提示" arrow={false}>
            <Button variant="secondary">无箭头</Button>
          </Tooltip>
          <Tooltip
            content="这是一段较长的文字提示，用于演示在最大宽度约束下文本自动换行的表现，默认最大宽度为 280px。"
            maxWidth={220}
          >
            <Button variant="secondary">长文本</Button>
          </Tooltip>
          <Tooltip content="禁用时不弹出" disabled>
            <Button variant="secondary" disabled>
              禁用
            </Button>
          </Tooltip>
        </div>
      </DemoCard>
    </section>
  );
}
