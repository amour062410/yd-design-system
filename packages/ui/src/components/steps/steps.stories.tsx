import { ClipboardList, Store } from "lucide-react";
import {
  InspectionSteps,
  RectificationSteps,
  ReportGenerateSteps,
  StoreSetupSteps,
} from "../../business-patterns/steps";
import { Steps } from "./index";

export default {
  title: "YD Design System/Steps",
  parameters: { layout: "padded" },
};

export const Basic = {
  render: () => (
    <Steps
      current={1}
      items={[
        { title: "第一步已完成", description: "对于完成的内容进行备注" },
        {
          title: "第二步正在写",
          subTitle: "标记时间 2025-12-02 13:59:00",
          description: "对于完成的内容进行备注",
        },
        { title: "第三步未填写", description: "对于完成的内容进行备注" },
      ]}
    />
  ),
};

export const Vertical = {
  render: () => (
    <Steps
      direction="vertical"
      current={0}
      items={[
        { title: "创建任务", description: "定义巡检范围与执行人" },
        { title: "执行巡检", description: "现场检查并拍照取证" },
        { title: "提交结果", description: "汇总得分与问题项" },
      ]}
    />
  ),
};

export const Error = {
  render: () => (
    <Steps
      current={1}
      status="error"
      items={[
        { title: "信息填写", description: "已完成" },
        { title: "信息确认", description: "校验失败，请修改" },
        { title: "完成", description: "等待中" },
      ]}
    />
  ),
};

export const WithIcon = {
  render: () => (
    <Steps
      current={1}
      items={[
        { title: "创建门店", icon: <Store size={16} />, description: "录入基础信息" },
        {
          title: "配置巡检",
          icon: <ClipboardList size={16} />,
          description: "绑定模板与计划",
        },
        { title: "正式上线", description: "门店启用" },
      ]}
    />
  ),
};

export const InspectionFlow = {
  render: () => <InspectionSteps current={2} />,
};

export const RectificationFlow = {
  render: () => <RectificationSteps current={1} direction="vertical" />,
};

export const StoreSetupFlow = {
  render: () => <StoreSetupSteps current={3} />,
};

export const ReportGenerateFlow = {
  render: () => <ReportGenerateSteps current={0} direction="vertical" />,
};
