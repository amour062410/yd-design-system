"use client";

import type { ReactNode } from "react";
import { Divider, type DividerProps } from "../../components/divider";

export type SectionDividerProps = Omit<DividerProps, "orientation"> & {
  orientation?: DividerProps["orientation"];
  children?: ReactNode;
};

/** 一级分组 —— 员工 / 项目 / 企业 / 订单详情页 */
export function SectionDivider({
  orientation = "left",
  children,
  ...props
}: SectionDividerProps) {
  return (
    <Divider orientation={orientation} {...props}>
      {children}
    </Divider>
  );
}

export type SubSectionDividerProps = SectionDividerProps;

/** 二级分组 —— 配置项 / 高级设置 */
export function SubSectionDivider({
  plain = true,
  margin = 16,
  orientation = "left",
  children,
  ...props
}: SubSectionDividerProps) {
  return (
    <Divider plain margin={margin} orientation={orientation} {...props}>
      {children}
    </Divider>
  );
}

export type DashboardDividerProps = Omit<DividerProps, "plain" | "margin">;

/** 驾驶舱模块切换 —— Card / DashboardSection 内部分组 */
export function DashboardDivider(props: DashboardDividerProps) {
  return <Divider plain margin={16} {...props} />;
}
