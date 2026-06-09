"use client";

import { Input } from "@yd-ds/ui/input";
import { Select } from "@yd-ds/ui/select";
import { RealtimeStoreInspectionFilter } from "@yd-ds/ui/business/filter-bar";
import { FILTERBAR_SEMANTIC_DOM } from "@/lib/data/filterBarMock";
import { descriptionsDocTableThClass } from "../descriptions/descriptions-doc-table";

export function FilterBarSemanticShowcase() {
  return (
    <div className="space-y-6">
      <RealtimeStoreInspectionFilter />

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
            {FILTERBAR_SEMANTIC_DOM.map((row) => (
              <tr key={row.node} className="border-b last:border-0">
                <td className="px-4 py-3 font-mono text-xs">
                  <code>{row.node}</code>
                  <span className="ml-2 text-muted-foreground">
                    [data-filter-bar=&quot;{row.node}&quot;]
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
