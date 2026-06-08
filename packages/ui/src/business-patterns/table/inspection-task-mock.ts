import type { InspectionRecord } from "./inspection.types";

const REGIONS = ["华东", "华北", "华南", "西南", "华中"] as const;
const LEVELS = ["S", "A", "B", "C"] as const;
const OWNERS = ["张明", "李华", "王芳", "赵强", "陈静", "刘洋", "周敏", "吴磊"] as const;
const METHODS = ["现场巡检", "视频巡检", "混合巡检"] as const;
const CYCLES = ["每周一", "每周三", "双周", "每月 1 日", "每月 15 日"] as const;

function generateTaskData(): InspectionRecord[] {
  const rows: InspectionRecord[] = [];
  const distribution: { status: InspectionRecord["status"]; count: number }[] = [
    { status: "pending", count: 25 },
    { status: "in_progress", count: 32 },
    { status: "completed", count: 58 },
    { status: "overdue", count: 13 },
  ];
  let index = 0;

  for (const { status, count } of distribution) {
    for (let i = 0; i < count; i++) {
      index += 1;
      const region = REGIONS[index % REGIONS.length];
      rows.push({
        key: String(index),
        storeName: `${region}·云盯体验店 ${String(index).padStart(3, "0")}`,
        owner: OWNERS[index % OWNERS.length],
        cycle: CYCLES[index % CYCLES.length],
        method: METHODS[index % METHODS.length],
        status,
        lastInspectionAt: `2026-05-${String((index % 28) + 1).padStart(2, "0")}`,
        storeCode: `YD-${region.slice(0, 1)}-${String(index).padStart(3, "0")}`,
        region,
        storeLevel: LEVELS[index % LEVELS.length],
        isRisk: index <= 8,
        createdAt: "2025-12-01",
        updatedAt: `2026-05-${String((index % 28) + 1).padStart(2, "0")} 09:00`,
      });
    }
  }

  return rows;
}

/** InspectionTable（任务态 V2）示例数据 */
export const STORE_INSPECTION_TASK_DATA = generateTaskData();

export const STORE_INSPECTION_TASK_SAMPLE = STORE_INSPECTION_TASK_DATA.slice(0, 12);

/** @deprecated 使用 STORE_INSPECTION_TASK_DATA */
export const STORE_INSPECTION_DEMO_DATA = STORE_INSPECTION_TASK_DATA;

/** @deprecated 使用 STORE_INSPECTION_TASK_SAMPLE */
export const STORE_INSPECTION_SAMPLE_DATA = STORE_INSPECTION_TASK_SAMPLE;
