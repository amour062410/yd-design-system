"use client";

import type { ReactNode } from "react";
import { Tag } from "../../components/tag";
import { Descriptions, type DescriptionsProps } from "../../components/descriptions";

export type StoreInspectionDescriptionsProps = Omit<
  DescriptionsProps,
  "title" | "column" | "bordered"
> & {
  title?: ReactNode;
  storeName?: string;
  taskId?: string;
  inspector?: string;
  inspectedAt?: string;
  score?: string;
  issueCount?: string;
  region?: string;
  address?: string;
  rectificationStatus?: ReactNode;
  remark?: string;
};

const DEFAULT_REMARK =
  "门店整体陈列规范，收银区存在杂物堆放；试衣间镜面有污渍需清洁；消防通道标识遮挡，需在 3 个工作日内完成整改并上传佐证照片。";

/** 店铺巡检详情 —— 巡检报告 / 整改回显 */
export function StoreInspectionDescriptions({
  title = "巡检详情",
  storeName = "云盯杭州西湖旗舰店",
  taskId = "XJ-20240315-008",
  inspector = "张明",
  inspectedAt = "2024-03-15 14:30",
  score = "92 分",
  issueCount = "3 项",
  region = "华东大区",
  address = "浙江省杭州市西湖区文三路 478 号华星科技大厦 1 层",
  rectificationStatus = (
    <Tag variant="light" status="warning">
      待整改
    </Tag>
  ),
  remark = DEFAULT_REMARK,
  extra,
  ...props
}: StoreInspectionDescriptionsProps) {
  return (
    <Descriptions title={title} column={3} bordered extra={extra} {...props}>
      <Descriptions.Item label="门店名称">{storeName}</Descriptions.Item>
      <Descriptions.Item label="巡检任务" copyable>
        {taskId}
      </Descriptions.Item>
      <Descriptions.Item label="巡检员">{inspector}</Descriptions.Item>
      <Descriptions.Item label="巡检时间">{inspectedAt}</Descriptions.Item>
      <Descriptions.Item label="巡检得分">{score}</Descriptions.Item>
      <Descriptions.Item label="整改状态">{rectificationStatus}</Descriptions.Item>
      <Descriptions.Item label="问题项数">{issueCount}</Descriptions.Item>
      <Descriptions.Item label="所属区域" span={2}>
        {region}
      </Descriptions.Item>
      <Descriptions.Item label="门店地址" span={3}>
        {address}
      </Descriptions.Item>
      <Descriptions.Item label="巡检备注" span="filled">
        {remark}
      </Descriptions.Item>
    </Descriptions>
  );
}
