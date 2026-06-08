import { Tag, TagGroup } from "../tag";
import { InspectionStatusTag } from "../../business-patterns/tag/inspection-status-tag";
import { RiskLevelTag } from "../../business-patterns/tag/risk-level-tag";
import { StoreStatusTag } from "../../business-patterns/tag/store-status-tag";

export default {
  title: "YD Design System/Tag",
  parameters: { layout: "padded" },
};

export const Variants = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Tag variant="outline">outline default</Tag>
      <Tag variant="outline" status="primary">
        outline primary
      </Tag>
      <Tag variant="light" status="success">
        light success
      </Tag>
      <Tag variant="solid" status="danger">
        solid danger
      </Tag>
    </div>
  ),
};

export const Sizes = {
  render: () => (
    <div className="flex flex-wrap items-center gap-2">
      <Tag size="sm">
        sm
      </Tag>
      <Tag size="md">
        md
      </Tag>
      <Tag size="lg">
        lg
      </Tag>
    </div>
  ),
};

export const SegmentedGroup = {
  render: () => (
    <TagGroup
      mode="segmented"
      size="lg"
      defaultValue="all"
      items={[
        { value: "all", label: "全部", count: 128 },
        { value: "abnormal", label: "异常", count: 18 },
        { value: "pending", label: "待整改", count: 42 },
        { value: "rectifying", label: "整改中", count: 12 },
        { value: "completed", label: "已完成", count: 56 },
      ]}
    />
  ),
};

export const BusinessPresets = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <InspectionStatusTag status="in_progress" />
      <RiskLevelTag level="high" />
      <StoreStatusTag status="risk" />
    </div>
  ),
};
