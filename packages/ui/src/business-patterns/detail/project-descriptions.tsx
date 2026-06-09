"use client";

import type { ReactNode } from "react";
import { Tag } from "../../components/tag";
import { Descriptions, type DescriptionsProps } from "../../components/descriptions";

export type ProjectDescriptionsProps = Omit<DescriptionsProps, "title" | "column" | "bordered"> & {
  title?: ReactNode;
  projectName?: string;
  owner?: string;
  status?: string;
  statusType?: "primary" | "success" | "warning" | "danger" | "info" | "default";
  period?: string;
  priority?: string;
  memberCount?: number;
};

/** 项目详情 —— 项目状态 / 负责人 / 周期 */
export function ProjectDescriptions({
  title = "项目详情",
  projectName = "云盯后台重构",
  owner = "李四",
  status = "进行中",
  statusType = "primary",
  period = "2024-01-01 ~ 2024-12-31",
  priority = "高",
  memberCount = 12,
  ...props
}: ProjectDescriptionsProps) {
  return (
    <Descriptions title={title} column={3} bordered {...props}>
      <Descriptions.Item label="项目名称">{projectName}</Descriptions.Item>
      <Descriptions.Item label="负责人">{owner}</Descriptions.Item>
      <Descriptions.Item label="状态">
        <Tag status={statusType}>{status}</Tag>
      </Descriptions.Item>
      <Descriptions.Item label="项目周期">{period}</Descriptions.Item>
      <Descriptions.Item label="优先级">
        <Tag status="warning">{priority}</Tag>
      </Descriptions.Item>
      <Descriptions.Item label="成员数">{memberCount}</Descriptions.Item>
    </Descriptions>
  );
}
