"use client";

import { useState } from "react";
import { ClipboardList, Store } from "lucide-react";
import {
  InspectionSteps,
  RectificationSteps,
  ReportGenerateSteps,
  Steps,
  StoreSetupSteps,
} from "@yd-ds/ui/steps";
import { STEPS_BASIC_ITEMS } from "@/lib/data/stepsMock";

function DemoCard({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className="mb-8 rounded-[6px] border border-[#e5e6eb] bg-white px-10 py-8 shadow-[0_1px_4px_rgba(0,0,0,0.04)] dark:bg-[#161618] dark:border-[#3f3f46]"
    >
      <p
        className="pb-4 text-[14px] font-medium text-[#1d2129] dark:text-[#f4f4f5] "
        style={{ borderBottom: "1px solid #e5e6eb", marginBottom: 24 }}
      >
        {label}
      </p>
      {children}
    </div>
  );
}

export function StepsBasicShowcase() {
  const [current, setCurrent] = useState(1);

  return (
    <DemoCard label="基础用法">
      <Steps
        current={current}
        onChange={setCurrent}
        items={[...STEPS_BASIC_ITEMS]}
      />
    </DemoCard>
  );
}

export function StepsHorizontalShowcase() {
  return (
    <DemoCard label="水平步骤">
      <Steps
        current={2}
        items={[
          { title: "创建任务", description: "定义巡检范围、周期与执行人" },
          { title: "执行巡检", description: "门店现场执行检查项" },
          { title: "提交结果", description: "汇总得分与问题项" },
          { title: "完成归档", description: "报告归档入库" },
        ]}
      />
    </DemoCard>
  );
}

export function StepsVerticalShowcase() {
  return (
    <DemoCard label="垂直方向">
      <div className="max-w-[420px]">
        <Steps
          direction="vertical"
          current={1}
          items={[
            { title: "创建任务", description: "定义巡检范围与执行人" },
            { title: "执行巡检", description: "现场检查并拍照取证" },
            { title: "提交结果", description: "汇总得分与问题项" },
            { title: "完成归档", description: "数据进入驾驶舱" },
          ]}
        />
      </div>
    </DemoCard>
  );
}

export function StepsStatusShowcase() {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <DemoCard label="带状态 · error / warning">
        <div className="space-y-6">
          <Steps
            current={1}
            status="error"
            items={[
              { title: "信息填写", description: "已完成" },
              { title: "信息确认", description: "校验失败，请修改后重试" },
              { title: "完成", description: "等待中" },
            ]}
          />
          <Steps
            current={1}
            status="warning"
            items={[
              { title: "信息填写", description: "已完成" },
              { title: "信息确认", description: "部分信息缺失，建议补充" },
              { title: "完成", description: "等待中" },
            ]}
          />
        </div>
      </DemoCard>
      <DemoCard label="尺寸对比">
        <div className="space-y-8">
          <Steps size="small" current={1} items={[{ title: "Small" }, { title: "Step 2" }]} />
          <Steps size="middle" current={1} items={[{ title: "Middle" }, { title: "Step 2" }]} />
          <Steps size="large" current={1} items={[{ title: "Large" }, { title: "Step 2" }]} />
        </div>
      </DemoCard>
    </div>
  );
}

export function StepsIconShowcase() {
  return (
    <DemoCard label="带图标">
      <Steps
        current={1}
        items={[
          {
            title: "创建门店",
            icon: <Store size={16} />,
            description: "录入门店基础信息",
          },
          {
            title: "配置巡检",
            icon: <ClipboardList size={16} />,
            description: "绑定巡检模板",
          },
          { title: "正式上线", description: "门店启用" },
        ]}
      />
    </DemoCard>
  );
}

export function StepsInspectionShowcase() {
  const [current, setCurrent] = useState(1);

  return (
    <DemoCard label="巡检流程">
      <InspectionSteps current={current} onChange={setCurrent} />
    </DemoCard>
  );
}

export function StepsRectificationShowcase() {
  return (
    <DemoCard label="整改流程">
      <div className="max-w-[420px]">
        <RectificationSteps current={2} direction="vertical" />
      </div>
    </DemoCard>
  );
}

export function StepsBusinessShowcase() {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <DemoCard label="门店上线">
        <StoreSetupSteps current={2} />
      </DemoCard>
      <DemoCard label="报告生成">
        <div className="max-w-[420px]">
          <ReportGenerateSteps current={1} direction="vertical" />
        </div>
      </DemoCard>
    </div>
  );
}
