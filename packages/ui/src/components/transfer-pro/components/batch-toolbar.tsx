"use client";

import type { TransferProBatchStrategy, TransferProRule } from "../transfer-pro.types";
import { TRANSFER_PRO_RULE_LABELS } from "../transfer-pro-data";
import { transferProToolbarButtonClass } from "../transfer-pro.tokens";

const STRATEGY_LABELS: Record<TransferProBatchStrategy, string> = {
  manual: "手动选择",
  recommend: "智能推荐",
  full: "一键全量",
};

export function BatchToolbar({
  strategy,
  onStrategyChange,
  activeRule,
  onRuleApply,
  disabled,
}: {
  strategy: TransferProBatchStrategy;
  onStrategyChange: (strategy: TransferProBatchStrategy) => void;
  activeRule?: TransferProRule;
  onRuleApply?: (rule: TransferProRule) => void;
  disabled?: boolean;
}) {
  return (
    <div className="flex min-h-[var(--transfer-pro-batch-toolbar-height,44px)] flex-wrap items-center gap-2 rounded-t-[var(--transfer-pro-border-radius,8px)] border border-b border-[color:var(--transfer-pro-color-border,#f0f0f0)] bg-[var(--transfer-pro-color-bg,#fff)] px-3 py-2">
      <span className="text-[12px] text-[color:var(--transfer-pro-color-text-secondary,#86909c)]">分配策略</span>
      {(Object.keys(STRATEGY_LABELS) as TransferProBatchStrategy[]).map((item) => (
        <button
          key={item}
          type="button"
          disabled={disabled}
          aria-pressed={strategy === item}
          onClick={() => onStrategyChange(item)}
          className={transferProToolbarButtonClass(strategy === item)}
        >
          {STRATEGY_LABELS[item]}
        </button>
      ))}
      {onRuleApply ? (
        <>
          <span className="mx-1 h-4 w-px bg-[color:var(--transfer-pro-color-border,#f0f0f0)]" />
          {(Object.keys(TRANSFER_PRO_RULE_LABELS) as TransferProRule[]).map((rule) => (
            <button
              key={rule}
              type="button"
              disabled={disabled}
              aria-pressed={activeRule === rule}
              onClick={() => onRuleApply(rule)}
              className={transferProToolbarButtonClass(activeRule === rule)}
            >
              {TRANSFER_PRO_RULE_LABELS[rule]}
            </button>
          ))}
        </>
      ) : null}
    </div>
  );
}
