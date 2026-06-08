import { InspectionOverviewCards } from "./inspection-overview-cards";
import { InspectionRiskTable } from "./inspection-risk-table";
import { InspectionScore } from "./inspection-score";
import { InspectionStatusTag } from "./inspection-status-tag";
import { InspectionTable } from "./inspection-table";
import { STORE_INSPECTION_TASK_SAMPLE } from "./inspection-task-mock";
import {
  STORE_INSPECTION_RISK_DATA,
  STORE_INSPECTION_V3_OVERVIEW,
  StoreInspectionDemo,
} from "./store-inspection-demo";
import { StoreRiskLevelTag } from "./store-risk-level-tag";
import { RectificationStatusTag } from "./rectification-status-tag";
import { TableBatchActions } from "../../components/table/table-batch-actions";
import { TableToolbar } from "../../components/table/table-toolbar";

export default {
  title: "YD Design System/InspectionTable",
  parameters: { layout: "padded" },
};

export const StatusTags = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <InspectionStatusTag status="pending" />
      <InspectionStatusTag status="in_progress" />
      <InspectionStatusTag status="completed" />
      <InspectionStatusTag status="overdue" />
      <InspectionStatusTag status="cancelled" />
    </div>
  ),
};

export const RiskLevelAndScore = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <StoreRiskLevelTag level="high" />
      <StoreRiskLevelTag level="medium" />
      <StoreRiskLevelTag level="low" />
      <InspectionScore score={95} />
      <InspectionScore score={82} />
      <InspectionScore score={67} />
    </div>
  ),
};

export const RectificationTags = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <RectificationStatusTag status="abnormal" />
      <RectificationStatusTag status="pending_rectification" />
      <RectificationStatusTag status="rectifying" />
      <RectificationStatusTag status="completed" />
    </div>
  ),
};

export const OverviewCards = {
  render: () => <InspectionOverviewCards items={STORE_INSPECTION_V3_OVERVIEW} />,
};

export const ToolbarCompact = {
  render: () => (
    <TableToolbar
      variant="compact"
      searchable
      exportable
      resettable
      columnSetting
      advancedFilterable
      advancedFilterExpanded={false}
      searchValue=""
      onSearch={() => undefined}
      onMethodChange={() => undefined}
      onReset={() => undefined}
      onToggleAdvancedFilter={() => undefined}
      onExport={() => undefined}
      onOpenColumnSetting={() => undefined}
    />
  ),
};

export const BatchActions = {
  render: () => (
    <TableBatchActions selectedCount={12} selectedKeys={["1", "2"]} onClear={() => undefined} />
  ),
};

export const InspectionTableTask = {
  name: "InspectionTable（任务态 V2）",
  render: () => (
    <InspectionTable
      dataSource={STORE_INSPECTION_TASK_SAMPLE}
      pagination={{ total: STORE_INSPECTION_TASK_SAMPLE.length }}
    />
  ),
};

export const StoreInspectionDemoV3 = {
  name: "StoreInspectionDemo V3",
  render: () => <StoreInspectionDemo />,
};
