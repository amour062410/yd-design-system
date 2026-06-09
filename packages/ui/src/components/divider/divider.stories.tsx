"use client";

import type { ReactNode } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../card";
import { Descriptions } from "../descriptions";
import { Form } from "../form";
import { Input } from "../input";
import { DashboardSection } from "../dashboard-section";
import {
  DashboardDivider,
  SectionDivider,
  SubSectionDivider,
} from "../../business-patterns/layout";
import { Divider } from "./index";

export default {
  title: "YD Design System/Divider",
  component: Divider,
  parameters: { layout: "padded" },
};

const inspectionItems = [
  { label: "门店名称", value: "云盯杭州西湖旗舰店" },
  { label: "巡检员", value: "张明" },
  { label: "巡检得分", value: "92 分" },
];

export const Basic = {
  render: () => (
    <div className="max-w-[640px]">
      <p className="text-sm text-[color:var(--color-text-secondary,#86909c)]">上方内容</p>
      <Divider />
      <p className="text-sm text-[color:var(--color-text-secondary,#86909c)]">下方内容</p>
    </div>
  ),
};

export const LeftText = {
  render: () => <Divider orientation="left">基本信息</Divider>,
};

export const CenterText = {
  render: () => <Divider orientation="center">基本信息</Divider>,
};

export const RightText = {
  render: () => <Divider orientation="right">基本信息</Divider>,
};

export const Vertical = {
  render: () => (
    <div className="flex items-center text-sm">
      <span>巡检任务</span>
      <Divider type="vertical" />
      <span>整改记录</span>
      <Divider type="vertical" />
      <span>门店档案</span>
    </div>
  ),
};

export const Dashed = {
  render: () => (
    <div className="max-w-[640px] space-y-6">
      <Divider dashed />
      <Divider dashed orientation="center">
        虚线分组
      </Divider>
    </div>
  ),
};

export const Plain = {
  render: () => (
    <Divider plain orientation="left">
      辅助说明
    </Divider>
  ),
};

export const CardLayout = {
  render: () => (
    <Card className="max-w-[640px]">
      <CardHeader>
        <CardTitle>门店巡检概览</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-4 text-center text-sm">
          <div>
            <p className="text-[color:var(--color-text-secondary,#86909c)]">今日巡检</p>
            <p className="text-lg font-semibold">128</p>
          </div>
          <div>
            <p className="text-[color:var(--color-text-secondary,#86909c)]">待整改</p>
            <p className="text-lg font-semibold">12</p>
          </div>
          <div>
            <p className="text-[color:var(--color-text-secondary,#86909c)]">完成率</p>
            <p className="text-lg font-semibold">92%</p>
          </div>
        </div>
        <Divider />
        <p className="text-sm text-[color:var(--color-text-secondary,#86909c)]">图表区域占位</p>
      </CardContent>
    </Card>
  ),
};

export const FormLayout = {
  render: () => (
    <Form layout="vertical" className="max-w-[480px]">
      <SectionDivider>基础信息</SectionDivider>
      <Form.Item label="门店名称">
        <Input placeholder="请输入门店名称" />
      </Form.Item>
      <Form.Item label="巡检员">
        <Input placeholder="请输入巡检员" />
      </Form.Item>
      <SectionDivider>联系信息</SectionDivider>
      <Form.Item label="联系电话">
        <Input placeholder="请输入联系电话" />
      </Form.Item>
      <SubSectionDivider>附加信息</SubSectionDivider>
      <Form.Item label="备注">
        <Input placeholder="请输入备注" />
      </Form.Item>
    </Form>
  ),
};

export const DescriptionsLayout = {
  render: () => (
    <div className="max-w-[720px] space-y-2">
      <Descriptions title="巡检详情" column={3} items={inspectionItems} />
      <Divider />
      <Descriptions
        title="整改信息"
        column={2}
        items={[
          { label: "整改状态", value: "待整改" },
          { label: "整改截止", value: "2024-03-22" },
        ]}
      />
    </div>
  ),
};

export const DashboardLayout = {
  render: () => (
    <DashboardSection title="华东大区巡检驾驶舱" className="max-w-[800px]">
      <p className="mb-4 text-sm text-[color:var(--color-text-secondary,#86909c)]">KPI 区域</p>
      <DashboardDivider />
      <p className="text-sm text-[color:var(--color-text-secondary,#86909c)]">图表区域</p>
    </DashboardSection>
  ),
};

export const SectionDividerStory = {
  name: "SectionDivider",
  render: () => (
    <div className="max-w-[640px] space-y-4">
      <SectionDivider>基础信息</SectionDivider>
      <SectionDivider orientation="center">项目详情</SectionDivider>
    </div>
  ),
};

export const SubSectionDividerStory = {
  name: "SubSectionDivider",
  render: () => (
    <div className="max-w-[640px] space-y-4">
      <SubSectionDivider>高级设置</SubSectionDivider>
      <SubSectionDivider>配置项分组</SubSectionDivider>
    </div>
  ),
};

export const DashboardDividerStory = {
  name: "DashboardDivider",
  render: () => (
    <div className="max-w-[640px]">
      <p className="text-sm">模块 A</p>
      <DashboardDivider />
      <p className="text-sm">模块 B</p>
    </div>
  ),
};
