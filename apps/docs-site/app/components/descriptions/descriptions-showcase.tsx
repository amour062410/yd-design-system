"use client";

import { Descriptions } from "@yd-ds/ui/descriptions";
import { Tag } from "@yd-ds/ui/tag";
import { ComponentDemoBlock } from "@/components/docs/component-demo-block";
import {
  DESCRIPTIONS_DEMO_CODES,
  DESCRIPTIONS_DEMO_ITEMS,
  DESCRIPTIONS_RESPONSIVE_ITEMS,
  INSPECTION_REMARK,
} from "@/lib/data/descriptionsMock";

const demoItems = [...DESCRIPTIONS_DEMO_ITEMS];

const borderedInspectionItems = [
  { label: "门店名称", value: "云盯杭州西湖旗舰店" },
  { label: "巡检任务", value: "XJ-20240315-008", copyable: true },
  { label: "巡检员", value: "张明" },
  { label: "巡检时间", value: "2024-03-15 14:30" },
  { label: "巡检得分", value: "92 分" },
  {
    label: "整改状态",
    value: (
      <span className="inline-flex items-center gap-2">
        <span
          className="size-2 shrink-0 rounded-full bg-[color:var(--tag-primary,#165dff)]"
          aria-hidden
        />
        <Tag variant="light" status="warning">
          待整改
        </Tag>
      </span>
    ),
  },
  { label: "问题项数", value: "3 项" },
  { label: "所属区域", value: "华东大区", span: 2 as const },
  {
    label: "门店地址",
    value: "浙江省杭州市西湖区文三路 478 号华星科技大厦 1 层",
    span: 3 as const,
  },
  { label: "巡检备注", value: INSPECTION_REMARK, span: "filled" as const },
];

export function DescriptionsDemosShowcase() {
  return (
    <div className="flex flex-col gap-12">
      <ComponentDemoBlock
        title="基本用法"
        description="通过 items 配置巡检字段，建立最简认知。"
        code={DESCRIPTIONS_DEMO_CODES.basic}
      >
        <Descriptions title="巡检详情" items={demoItems} />
      </ComponentDemoBlock>

      <ComponentDemoBlock
        title="带边框"
        description="bordered 开启表格化巡检报告样式，支持跨列与整行备注。"
        code={DESCRIPTIONS_DEMO_CODES.bordered}
      >
        <Descriptions
          title="巡检详情"
          bordered
          column={3}
          items={borderedInspectionItems}
        />
      </ComponentDemoBlock>

      <ComponentDemoBlock
        title="不同尺寸"
        description="size 支持 default / middle / small。"
        code={DESCRIPTIONS_DEMO_CODES.size}
      >
        <div className="flex flex-col gap-8">
          <Descriptions size="default" title="默认尺寸" items={demoItems.slice(0, 3)} />
          <Descriptions size="middle" title="中等尺寸" items={demoItems.slice(0, 3)} />
          <Descriptions size="small" title="紧凑尺寸" items={demoItems.slice(0, 3)} />
        </div>
      </ComponentDemoBlock>

      <ComponentDemoBlock
        title="响应式列数"
        description="三列栅格随断点收缩，水平/垂直两种标签布局，适合科技感后台详情面板。"
        version="5.8.0"
        code={DESCRIPTIONS_DEMO_CODES.responsive}
      >
        <div className="space-y-8">
          <Descriptions
            layout="horizontal"
            column={{ xs: 1, sm: 2, md: 3 }}
            items={[...DESCRIPTIONS_RESPONSIVE_ITEMS]}
          />
          <Descriptions
            layout="vertical"
            column={{ xs: 1, sm: 2, md: 3 }}
            items={[...DESCRIPTIONS_RESPONSIVE_ITEMS]}
          />
        </div>
      </ComponentDemoBlock>

      <ComponentDemoBlock
        title="垂直布局"
        description="layout=vertical 时 label 在上、content 在下。"
        code={DESCRIPTIONS_DEMO_CODES.vertical}
      >
        <Descriptions layout="vertical" title="垂直布局" items={demoItems.slice(0, 4)} />
      </ComponentDemoBlock>

      <ComponentDemoBlock
        title="垂直带边框"
        description="vertical + bordered 组合，适合移动端巡检摘要。"
        code={DESCRIPTIONS_DEMO_CODES.verticalBordered}
      >
        <Descriptions
          layout="vertical"
          bordered
          title="垂直带边框"
          column={2}
          items={demoItems.slice(0, 4)}
        />
      </ComponentDemoBlock>

      <ComponentDemoBlock
        title="整行填充"
        description="span='filled' 占满当前行剩余空间，常用于巡检备注。"
        version="5.8.0"
        code={DESCRIPTIONS_DEMO_CODES.spanFilled}
      >
        <Descriptions bordered column={3} title="巡检详情">
          <Descriptions.Item label="门店名称">云盯杭州西湖旗舰店</Descriptions.Item>
          <Descriptions.Item label="巡检任务">XJ-20240315-008</Descriptions.Item>
          <Descriptions.Item label="巡检员">张明</Descriptions.Item>
          <Descriptions.Item label="巡检备注" span="filled">
            {INSPECTION_REMARK}
          </Descriptions.Item>
        </Descriptions>
      </ComponentDemoBlock>

      <ComponentDemoBlock
        title="自定义样式"
        description="通过 classNames / styles 定制语义节点样式。"
        version="5.8.0"
        code={DESCRIPTIONS_DEMO_CODES.customStyles}
      >
        <Descriptions
          title="自定义样式"
          bordered
          classNames={{
            label: "text-[color:var(--descriptions-text-secondary,#4e5969)]",
            content: "font-medium",
          }}
          styles={{
            title: { color: "var(--descriptions-text-primary)" },
          }}
          items={demoItems.slice(0, 3)}
        />
      </ComponentDemoBlock>
    </div>
  );
}
