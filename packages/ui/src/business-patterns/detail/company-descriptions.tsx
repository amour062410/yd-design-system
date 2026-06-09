"use client";

import type { ReactNode } from "react";
import { Tag } from "../../components/tag";
import { Descriptions, type DescriptionsProps } from "../../components/descriptions";

export type CompanyDescriptionsProps = Omit<DescriptionsProps, "title" | "column" | "bordered"> & {
  title?: ReactNode;
  companyName?: string;
  verified?: boolean;
  phone?: string;
  scale?: string;
  address?: string;
};

/** 企业详情 —— 认证 / 联系方式 / 规模 */
export function CompanyDescriptions({
  title = "企业详情",
  companyName = "云盯科技有限公司",
  verified = true,
  phone = "400-888-8888",
  scale = "500-999 人",
  address = "浙江省杭州市余杭区未来科技城",
  ...props
}: CompanyDescriptionsProps) {
  return (
    <Descriptions title={title} column={2} bordered {...props}>
      <Descriptions.Item label="企业名称">{companyName}</Descriptions.Item>
      <Descriptions.Item label="认证状态">
        <Tag status={verified ? "success" : "default"}>
          {verified ? "已认证" : "未认证"}
        </Tag>
      </Descriptions.Item>
      <Descriptions.Item label="联系电话" copyable>
        {phone}
      </Descriptions.Item>
      <Descriptions.Item label="企业规模">{scale}</Descriptions.Item>
      <Descriptions.Item label="地址" span={2}>
        {address}
      </Descriptions.Item>
    </Descriptions>
  );
}
