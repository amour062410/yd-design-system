import type { TransferProDiffResult, TransferProRecord } from "../transfer-pro.types";

export function computeTransferDiff(
  baselineKeys: string[],
  currentKeys: string[]
): TransferProDiffResult {
  const baseline = new Set(baselineKeys);
  const current = new Set(currentKeys);
  return {
    added: currentKeys.filter((key) => !baseline.has(key)),
    removed: baselineKeys.filter((key) => !current.has(key)),
    unchanged: baselineKeys.filter((key) => current.has(key)),
  };
}

export function buildDiffKeySets(diff: TransferProDiffResult) {
  return {
    added: new Set(diff.added),
    removed: new Set(diff.removed),
  };
}

export function annotateRecordsWithDiff<T extends TransferProRecord>(
  records: T[],
  diff: TransferProDiffResult
): Array<T & { diffType?: "add" | "remove" | "unchanged" }> {
  const added = new Set(diff.added);
  const removed = new Set(diff.removed);
  return records.map((record) => ({
    ...record,
    diffType: added.has(record.key) ? "add" : removed.has(record.key) ? "remove" : "unchanged",
  }));
}
