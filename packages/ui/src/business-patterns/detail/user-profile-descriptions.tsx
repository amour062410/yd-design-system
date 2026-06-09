"use client";

import type { ReactNode } from "react";
import { Link } from "../../components/link";
import { Tag } from "../../components/tag";
import { Descriptions, type DescriptionsProps } from "../../components/descriptions";

export type UserProfileDescriptionsProps = Omit<DescriptionsProps, "title" | "column" | "bordered"> & {
  title?: ReactNode;
  name?: string;
  employeeId?: string;
  status?: string;
  department?: string;
  phone?: string;
  email?: string;
};

/** 用户详情 —— 员工 / 候选人 / 管理员 */
export function UserProfileDescriptions({
  title = "员工详情",
  name = "张三",
  employeeId = "YD-1024",
  status = "在职",
  department = "产品部",
  phone = "13800138000",
  email = "zhangsan@yd.com",
  extra,
  ...props
}: UserProfileDescriptionsProps) {
  return (
    <Descriptions title={title} column={3} bordered extra={extra} {...props}>
      <Descriptions.Item label="姓名">{name}</Descriptions.Item>
      <Descriptions.Item label="工号" copyable>
        {employeeId}
      </Descriptions.Item>
      <Descriptions.Item label="状态">
        <Tag status="success">{status}</Tag>
      </Descriptions.Item>
      <Descriptions.Item label="部门">{department}</Descriptions.Item>
      <Descriptions.Item label="手机号" copyable>
        {phone}
      </Descriptions.Item>
      <Descriptions.Item label="邮箱">
        <Link href={`mailto:${email}`}>{email}</Link>
      </Descriptions.Item>
    </Descriptions>
  );
}
