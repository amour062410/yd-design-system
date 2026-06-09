"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@yd-ds/ui/card";
import { DashboardSection } from "@yd-ds/ui/dashboard-section";
import { Descriptions } from "@yd-ds/ui/descriptions";
import { Divider } from "@yd-ds/ui/divider";
import { Form } from "@yd-ds/ui/form";
import { Input } from "@yd-ds/ui/input";
import {
  DashboardDivider,
  SectionDivider,
  SubSectionDivider,
} from "@yd-ds/ui/business-patterns/layout";
import { ComponentDemoBlock } from "@/components/docs/component-demo-block";
import { DIVIDER_DEMO_CODES } from "@/lib/data/dividerMock";

const inspectionItems = [
  { label: "门店名称", value: "云盯杭州西湖旗舰店" },
  { label: "巡检员", value: "张明" },
  { label: "巡检得分", value: "92 分" },
];

export function DividerDemosShowcase() {
  return (
    <div className="flex flex-col gap-12">
      <ComponentDemoBlock title="基本用法" description="水平实线分割上下内容。" code={DIVIDER_DEMO_CODES.basic}>
        <div className="max-w-[640px]">
          <p className="text-sm text-muted-foreground">上方内容</p>
          <Divider />
          <p className="text-sm text-muted-foreground">下方内容</p>
        </div>
      </ComponentDemoBlock>

      <ComponentDemoBlock title="左对齐标题" description="orientation=left，标题靠左。" code={DIVIDER_DEMO_CODES.leftText}>
        <Divider orientation="left">基本信息</Divider>
      </ComponentDemoBlock>

      <ComponentDemoBlock title="居中标题" description="orientation=center，默认对齐。" code={DIVIDER_DEMO_CODES.centerText}>
        <Divider orientation="center">基本信息</Divider>
      </ComponentDemoBlock>

      <ComponentDemoBlock title="右对齐标题" description="orientation=right，标题靠右。" code={DIVIDER_DEMO_CODES.rightText}>
        <Divider orientation="right">基本信息</Divider>
      </ComponentDemoBlock>

      <ComponentDemoBlock title="垂直分割线" description="行内模块分隔。" code={DIVIDER_DEMO_CODES.vertical}>
        <div className="flex items-center text-sm">
          <span>巡检任务</span>
          <Divider type="vertical" />
          <span>整改记录</span>
          <Divider type="vertical" />
          <span>门店档案</span>
        </div>
      </ComponentDemoBlock>

      <ComponentDemoBlock title="虚线" description="dashed 适用于弱分组。" code={DIVIDER_DEMO_CODES.dashed}>
        <div className="max-w-[640px] space-y-6">
          <Divider dashed />
          <Divider dashed orientation="center">
            虚线分组
          </Divider>
        </div>
      </ComponentDemoBlock>

      <ComponentDemoBlock title="弱化标题" description="plain 降低字重，适合辅助说明。" code={DIVIDER_DEMO_CODES.plain}>
        <Divider plain orientation="left">
          辅助说明
        </Divider>
      </ComponentDemoBlock>

      <ComponentDemoBlock title="Card 布局" description="Card 内 KPI 与图表区域分组。" code={DIVIDER_DEMO_CODES.cardLayout}>
        <Card className="max-w-[640px]">
          <CardHeader>
            <CardTitle>门店巡检概览</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4 text-center text-sm">
              <div>
                <p className="text-muted-foreground">今日巡检</p>
                <p className="text-lg font-semibold">128</p>
              </div>
              <div>
                <p className="text-muted-foreground">待整改</p>
                <p className="text-lg font-semibold">12</p>
              </div>
              <div>
                <p className="text-muted-foreground">完成率</p>
                <p className="text-lg font-semibold">92%</p>
              </div>
            </div>
            <Divider />
            <p className="text-sm text-muted-foreground">图表区域占位</p>
          </CardContent>
        </Card>
      </ComponentDemoBlock>

      <ComponentDemoBlock title="Form 布局" description="SectionDivider / SubSectionDivider 分组表单项。" code={DIVIDER_DEMO_CODES.formLayout}>
        <Form layout="vertical" className="max-w-[480px]">
          <SectionDivider>基础信息</SectionDivider>
          <Form.Item label="门店名称">
            <Input placeholder="请输入门店名称" />
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
      </ComponentDemoBlock>

      <ComponentDemoBlock title="Descriptions 布局" description="详情页多段 Descriptions 分组。" code={DIVIDER_DEMO_CODES.descriptionsLayout}>
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
      </ComponentDemoBlock>

      <ComponentDemoBlock title="Dashboard 布局" description="DashboardDivider 用于驾驶舱模块切换。" code={DIVIDER_DEMO_CODES.dashboardLayout}>
        <DashboardSection title="华东大区巡检驾驶舱" className="max-w-[800px]">
          <p className="mb-4 text-sm text-muted-foreground">KPI 区域</p>
          <DashboardDivider />
          <p className="text-sm text-muted-foreground">图表区域</p>
        </DashboardSection>
      </ComponentDemoBlock>
    </div>
  );
}
