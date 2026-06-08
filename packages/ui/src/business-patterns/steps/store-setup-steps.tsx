"use client";

import { Steps } from "../../components/steps/steps";
import type { StoreSetupStepsProps } from "../../components/steps/steps.types";

const STORE_SETUP_ITEMS = [
  { title: "创建门店", description: "录入门店基础信息与组织架构" },
  { title: "配置人员", description: "分配店长、督导与巡检执行人" },
  { title: "配置巡检", description: "绑定巡检模板与执行计划" },
  { title: "正式上线", description: "门店启用，开始数据采集" },
] as const;

export function StoreSetupSteps({
  current = 0,
  ...props
}: StoreSetupStepsProps) {
  return (
    <Steps
      current={current}
      items={[...STORE_SETUP_ITEMS]}
      {...props}
    />
  );
}

export { STORE_SETUP_ITEMS };
