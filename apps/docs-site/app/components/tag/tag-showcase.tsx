"use client";

import { useState } from "react";
import { CircleAlert, ShieldAlert } from "lucide-react";
import {
  Tag,
  TagGroup,
  InspectionStatusTag,
  RiskLevelTag,
  StoreStatusTag,
} from "@yd-ds/ui/tag";
import {
  TAG_SEGMENTED_ITEMS,
  TAG_SIZE_LABELS,
  TAG_STATUS_LABELS,
  TAG_VARIANT_LABELS,
  TAG_VARIANTS,
} from "@/lib/data/tagMock";

function ShowcasePanel({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-md border bg-card px-6 py-8 md:px-10 md:py-10 ${className ?? ""}`}
    >
      {children}
    </div>
  );
}

/** Hero：状态 × 变体完整色板 */
export function TagPaletteShowcase() {
  return (
    <ShowcasePanel className="!py-10">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px] border-collapse">
          <thead>
            <tr>
              <th className="w-20 pb-6 text-left text-xs font-medium text-muted-foreground" />
              {TAG_VARIANTS.map((variant) => (
                <th
                  key={variant}
                  className="pb-6 text-center text-sm font-semibold text-foreground"
                >
                  {TAG_VARIANT_LABELS[variant]}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {TAG_STATUS_LABELS.map(({ status, label }) => (
              <tr key={status}>
                <td className="py-3 pr-6 text-sm font-medium text-muted-foreground">
                  {label}
                </td>
                {TAG_VARIANTS.map((variant) => (
                  <td key={variant} className="py-3 text-center">
                    <Tag variant={variant} status={status}>
                      {label}
                    </Tag>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </ShowcasePanel>
  );
}

export function TagSizesShowcase() {
  return (
    <ShowcasePanel>
      <div className="flex flex-wrap items-end gap-12 md:gap-16">
        {TAG_SIZE_LABELS.map(({ size, label, height }) => (
          <div key={size} className="flex flex-col items-center gap-3">
            <Tag size={size}>标签</Tag>
            <div className="text-center">
              <p className="text-sm font-medium text-foreground">{label}</p>
              <p className="text-xs text-muted-foreground">{height}</p>
            </div>
          </div>
        ))}
      </div>
    </ShowcasePanel>
  );
}

export function TagClosableShowcase() {
  const [tags, setTags] = useState(["巡检任务", "门店管理", "风险预警"]);

  return (
    <ShowcasePanel>
      <div className="flex flex-wrap gap-3">
        {tags.map((label) => (
          <Tag
            key={label}
            closable
            onClose={() => setTags((prev) => prev.filter((t) => t !== label))}
          >
            {label}
          </Tag>
        ))}
      </div>
    </ShowcasePanel>
  );
}

export function TagIconShowcase() {
  return (
    <ShowcasePanel>
      <div className="flex flex-wrap items-center gap-4">
        <Tag
          variant="light"
          status="warning"
          icon={<CircleAlert className="size-3.5" />}
        >
          需关注
        </Tag>
        <Tag
          variant="outline"
          status="danger"
          icon={<ShieldAlert className="size-3.5" />}
        >
          高风险
        </Tag>
        <Tag variant="light" status="primary" icon={<CircleAlert className="size-3.5" />}>
          主要
        </Tag>
      </div>
    </ShowcasePanel>
  );
}

export function TagGroupShowcase() {
  const [single, setSingle] = useState("all");
  const [multiple, setMultiple] = useState<string[]>(["pending", "done"]);

  return (
    <ShowcasePanel>
      <div className="space-y-10">
        <div>
          <p className="mb-4 text-sm font-medium text-foreground">单选模式</p>
          <TagGroup
            mode="single"
            value={single}
            onChange={(v) => setSingle(String(v))}
            items={[
              { value: "all", label: "全部" },
              { value: "pending", label: "待处理", status: "warning" },
              { value: "done", label: "已完成", status: "success" },
            ]}
          />
        </div>
        <div className="border-t border-border/50 pt-10">
          <p className="mb-4 text-sm font-medium text-foreground">多选模式</p>
          <TagGroup
            mode="multiple"
            value={multiple}
            onChange={(v) => setMultiple(Array.isArray(v) ? v : [])}
            items={[
              { value: "pending", label: "待整改", status: "warning" },
              { value: "rectifying", label: "整改中", status: "primary" },
              { value: "done", label: "已完成", status: "success" },
              { value: "abnormal", label: "异常", status: "danger" },
            ]}
          />
        </div>
      </div>
    </ShowcasePanel>
  );
}

export function TagSegmentedShowcase() {
  const [value, setValue] = useState("pending");

  return (
    <ShowcasePanel>
      <TagGroup
        mode="segmented"
        size="lg"
        value={value}
        onChange={(v) => setValue(String(v))}
        items={[...TAG_SEGMENTED_ITEMS]}
        aria-label="巡检状态筛选"
      />
    </ShowcasePanel>
  );
}

export function TagBusinessShowcase() {
  return (
    <ShowcasePanel>
      <div className="space-y-10">
        <div>
          <p className="mb-4 text-sm font-medium text-foreground">巡检状态</p>
          <div className="flex flex-wrap gap-3">
            <InspectionStatusTag status="pending" />
            <InspectionStatusTag status="in_progress" />
            <InspectionStatusTag status="completed" />
            <InspectionStatusTag status="overdue" />
          </div>
        </div>
        <div className="border-t border-border/50 pt-10">
          <p className="mb-4 text-sm font-medium text-foreground">风险等级</p>
          <div className="flex flex-wrap gap-3">
            <RiskLevelTag level="high" />
            <RiskLevelTag level="medium" />
            <RiskLevelTag level="low" />
          </div>
        </div>
        <div className="border-t border-border/50 pt-10">
          <p className="mb-4 text-sm font-medium text-foreground">门店状态</p>
          <div className="flex flex-wrap gap-3">
            <StoreStatusTag status="open" />
            <StoreStatusTag status="closed" />
            <StoreStatusTag status="rectifying" />
            <StoreStatusTag status="risk" />
          </div>
        </div>
      </div>
    </ShowcasePanel>
  );
}
