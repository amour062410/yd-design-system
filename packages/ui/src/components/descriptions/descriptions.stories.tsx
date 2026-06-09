import { Badge } from "../badge";
import { Link } from "../link";
import { Tag } from "../tag";
import { StoreInspectionDescriptions } from "../../business-patterns/detail/store-inspection-descriptions";
import { Descriptions } from "./index";

export default {
  title: "YD Design System/Descriptions",
  component: Descriptions,
  parameters: { layout: "padded" },
};

const inspectionItems = [
  { label: "门店名称", value: "云盯杭州西湖旗舰店" },
  { label: "巡检任务", value: "XJ-20240315-008", copyable: true },
  { label: "巡检员", value: "张明" },
];

export const Basic = {
  render: () => <Descriptions title="巡检详情" items={inspectionItems} />,
};

export const Bordered = {
  render: () => (
    <Descriptions title="巡检详情" bordered column={3} items={inspectionItems} />
  ),
};

export const StoreInspection = {
  render: () => <StoreInspectionDescriptions extra={<Link href="#">导出报告</Link>} />,
};

export const MultipleColumns = {
  render: () => (
    <Descriptions
      title="巡检详情"
      column={4}
      items={[
        ...inspectionItems,
        { label: "巡检时间", value: "2024-03-15 14:30" },
        { label: "巡检得分", value: "92 分" },
        { label: "问题项数", value: "3 项" },
        { label: "所属区域", value: "华东大区" },
      ]}
    />
  ),
};

export const Vertical = {
  render: () => (
    <Descriptions title="巡检详情" layout="vertical" column={3} items={inspectionItems} />
  ),
};

const responsiveScoreItems = [
  { label: "巡检项目", value: "店面卫生" },
  { label: "巡检状态", value: "已合格" },
  { label: "巡检时间", value: "2024-03-15 10:00:00" },
  { label: "标准分值", value: "100.00" },
  { label: "扣分分值", value: "5.00" },
  { label: "最终得分", value: "95.00" },
];

export const Responsive = {
  render: () => (
    <div className="space-y-8">
      <Descriptions
        layout="horizontal"
        column={{ xs: 1, sm: 2, md: 3 }}
        items={responsiveScoreItems}
      />
      <Descriptions
        layout="vertical"
        column={{ xs: 1, sm: 2, md: 3 }}
        items={responsiveScoreItems}
      />
    </div>
  ),
};

export const WithTag = {
  render: () => (
    <Descriptions
      items={[
        {
          label: "整改状态",
          value: (
            <Tag variant="light" status="warning">
              待整改
            </Tag>
          ),
        },
        {
          label: "任务状态",
          value: (
            <Tag variant="light" status="primary">
              进行中
            </Tag>
          ),
        },
      ]}
    />
  ),
};

export const WithBadge = {
  render: () => (
    <Descriptions
      items={[{ label: "待办整改", value: <Badge count={3}>整改项</Badge> }]}
    />
  ),
};

export const WithLink = {
  render: () => (
    <Descriptions
      items={[
        {
          label: "门店档案",
          value: <Link href="#">查看门店详情</Link>,
        },
      ]}
    />
  ),
};

export const Copyable = {
  render: () => (
    <Descriptions
      items={[
        { label: "巡检任务", value: "XJ-20240315-008", copyable: true },
        { label: "门店编号", value: "ST-HZ-00128", copyable: true },
      ]}
    />
  ),
};

export const EmptyValue = {
  render: () => (
    <Descriptions
      items={[
        { label: "巡检备注", value: "" },
        { label: "复检时间", value: null },
      ]}
    />
  ),
};

export const SpanLayout = {
  render: () => (
    <Descriptions column={3} bordered title="跨列展示">
      <Descriptions.Item label="门店名称">云盯杭州西湖旗舰店</Descriptions.Item>
      <Descriptions.Item label="巡检员">张明</Descriptions.Item>
      <Descriptions.Item label="巡检得分">92 分</Descriptions.Item>
      <Descriptions.Item label="门店地址" span={3}>
        浙江省杭州市西湖区文三路 478 号华星科技大厦 1 层
      </Descriptions.Item>
    </Descriptions>
  ),
};
