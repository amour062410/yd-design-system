"use client";

import type { ReactNode } from "react";
import type { TransferProDiffResult } from "../transfer-pro.types";
import { transferProDiffBadgeClass } from "../transfer-pro.tokens";

export function TransferFooter({
  selectedCount,
  totalCount,
  diff,
  showDiff,
  extra,
}: {
  selectedCount: number;
  totalCount: number;
  diff?: TransferProDiffResult;
  showDiff?: boolean;
  extra?: ReactNode;
}) {
  return (
    <div className={transferProPanelFooterClass()}>
      <div className="flex flex-wrap items-center gap-2">
        <span>
          已选 {selectedCount} / 共 {totalCount} 项
        </span>
        {showDiff && diff ? (
          <>
            <span className={transferProDiffBadgeClass("add")}>+{diff.added.length} 新增</span>
            <span className={transferProDiffBadgeClass("remove")}>-{diff.removed.length} 移除</span>
            <span className="text-[color:var(--transfer-pro-color-text-secondary,#86909c)]">
              不变 {diff.unchanged.length}
            </span>
          </>
        ) : null}
        {extra}
      </div>
    </div>
  );
}

export function transferProPanelFooterClass() {
  return "shrink-0 border-t border-[color:var(--transfer-pro-color-border,#f0f0f0)] bg-[color:var(--transfer-pro-color-bg,#fff)] px-3 py-2 text-[12px] text-[color:var(--transfer-pro-color-text-secondary,#86909c)]";
}
