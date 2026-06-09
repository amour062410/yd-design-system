import type { TransferProInspector, TransferProRecord, TransferProRule } from "../transfer-pro.types";

export function applyTransferRule(
  rule: TransferProRule,
  sourceRecords: TransferProRecord[],
  options?: {
    region?: string;
    inspectors?: TransferProInspector[];
    maxCount?: number;
  }
): string[] {
  const available = sourceRecords.filter((item) => !item.disabled);
  const maxCount = options?.maxCount ?? available.length;

  switch (rule) {
    case "by-region": {
      const region = options?.region ?? available[0]?.region;
      return available.filter((item) => item.region === region).slice(0, maxCount).map((item) => item.key);
    }
    case "by-store-level":
      return [...available]
        .sort((a, b) => (a.storeLevel ?? "C").localeCompare(b.storeLevel ?? "C"))
        .slice(0, maxCount)
        .map((item) => item.key);
    case "by-inspection-frequency": {
      const order = { high: 0, medium: 1, low: 2 } as const;
      return [...available]
        .sort(
          (a, b) =>
            (order[a.inspectionFrequency ?? "low"] ?? 2) -
            (order[b.inspectionFrequency ?? "low"] ?? 2)
        )
        .slice(0, maxCount)
        .map((item) => item.key);
    }
    case "by-inspector-load": {
      const inspectors = options?.inspectors ?? [];
      const sortedInspectors = [...inspectors].sort((a, b) => a.load - b.load);
      const result: string[] = [];
      available.forEach((store, index) => {
        const inspector = sortedInspectors[index % Math.max(sortedInspectors.length, 1)];
        if (inspector && store.region === inspector.region) {
          result.push(store.key);
        }
      });
      if (result.length === 0) return available.slice(0, maxCount).map((item) => item.key);
      return result.slice(0, maxCount);
    }
    default:
      return [];
  }
}

export function recommendTransferKeys(sourceRecords: TransferProRecord[], limit = 3): string[] {
  return applyTransferRule("by-inspection-frequency", sourceRecords, { maxCount: limit });
}

export function fullTransferKeys(sourceRecords: TransferProRecord[]): string[] {
  return sourceRecords.filter((item) => !item.disabled).map((item) => item.key);
}
