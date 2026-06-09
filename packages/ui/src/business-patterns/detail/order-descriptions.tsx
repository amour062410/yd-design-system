"use client";

import type { ReactNode } from "react";
import { Tag } from "../../components/tag";
import { Descriptions, type DescriptionsProps } from "../../components/descriptions";

export type OrderDescriptionsProps = Omit<DescriptionsProps, "title" | "column" | "bordered"> & {
  title?: ReactNode;
  orderNo?: string;
  payStatus?: string;
  amount?: string;
  payMethod?: string;
  orderTime?: string;
  transactionNo?: string;
};

/** 订单详情 —— 支付 / 交易 / 状态信息 */
export function OrderDescriptions({
  title = "订单详情",
  orderNo = "ORD-20240315001",
  payStatus = "已支付",
  amount = "¥ 12,800.00",
  payMethod = "企业对公转账",
  orderTime = "2024-03-15 14:32:08",
  transactionNo = "TXN-88442211",
  ...props
}: OrderDescriptionsProps) {
  return (
    <Descriptions title={title} column={3} bordered {...props}>
      <Descriptions.Item label="订单号" copyable tooltip="系统唯一订单编号">
        {orderNo}
      </Descriptions.Item>
      <Descriptions.Item label="支付状态">
        <Tag status="success">{payStatus}</Tag>
      </Descriptions.Item>
      <Descriptions.Item label="订单金额">{amount}</Descriptions.Item>
      <Descriptions.Item label="支付方式">{payMethod}</Descriptions.Item>
      <Descriptions.Item label="下单时间">{orderTime}</Descriptions.Item>
      <Descriptions.Item label="交易流水" copyable>
        {transactionNo}
      </Descriptions.Item>
    </Descriptions>
  );
}
