"use client";

import { useState } from "react";
import { Descriptions } from "@yd-ds/ui/descriptions";
import { Tag } from "@yd-ds/ui/tag";
import { DESCRIPTIONS_SEMANTIC_DOM } from "@/lib/data/descriptionsMock";
import { descriptionsDocTableThClass } from "./descriptions-doc-table";

export function DescriptionsSemanticShowcase() {
  const [bordered, setBordered] = useState(true);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={() => setBordered((prev) => !prev)}
          className="rounded-md border border-border bg-background px-3 py-1.5 text-sm font-medium transition-colors hover:bg-muted"
        >
          切换边框
        </button>
        <span className="text-sm text-muted-foreground">
          当前：{bordered ? "带边框" : "无边框"}
        </span>
      </div>

      <Descriptions
        bordered={bordered}
        title="语义化 DOM 预览"
        extra={<span className="text-xs text-muted-foreground">导出报告</span>}
        column={2}
        items={[
          { label: "门店名称", value: "云盯杭州西湖旗舰店" },
          { label: "巡检员", value: "张明" },
          {
            label: "整改状态",
            value: (
              <Tag variant="light" status="warning">
                待整改
              </Tag>
            ),
            span: 2,
          },
        ]}
      />

      <div className="overflow-x-auto rounded-lg border">
        <table className="w-full min-w-[520px] text-left text-sm">
          <thead>
            <tr className="border-b bg-muted/50">
              <th className={descriptionsDocTableThClass}>节点</th>
              <th className={descriptionsDocTableThClass}>说明</th>
              <th className={descriptionsDocTableThClass}>版本</th>
            </tr>
          </thead>
          <tbody>
            {DESCRIPTIONS_SEMANTIC_DOM.map((row) => (
              <tr key={row.node} className="border-b last:border-0">
                <td className="px-4 py-3 font-mono text-xs">
                  <code>{row.node}</code>
                  <span className="ml-2 text-muted-foreground">
                    [data-descriptions=&quot;{row.node}&quot;]
                  </span>
                </td>
                <td className="px-4 py-3 text-muted-foreground">{row.description}</td>
                <td className="px-4 py-3 font-mono text-xs text-muted-foreground">
                  {row.version}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
