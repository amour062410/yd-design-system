import { ChevronRight } from "lucide-react";
import { Tag } from "../tag/tag";
import { Collapse, CollapseItem } from "./index";

const PANEL_CONTENT =
  "通过折叠面板收纳次要信息，保持页面信息层级清晰。适用于详情页、配置页与移动端列表场景。";

export default {
  title: "YD Design System/Collapse",
  component: Collapse,
  parameters: { layout: "padded" },
};

export const Basic = {
  render: () => (
    <Collapse defaultActiveKey="1">
      <CollapseItem key="1" title="这是一个折叠的标题">
        {PANEL_CONTENT}
      </CollapseItem>
      <CollapseItem key="2" title="这是一个折叠的标题">
        {PANEL_CONTENT}
      </CollapseItem>
      <CollapseItem key="3" title="这是一个折叠的标题">
        {PANEL_CONTENT}
      </CollapseItem>
      <CollapseItem key="4" title="这是一个折叠的标题">
        {PANEL_CONTENT}
      </CollapseItem>
    </Collapse>
  ),
};

export const Accordion = {
  render: () => (
    <Collapse accordion defaultActiveKey="task">
      <CollapseItem key="task" title="巡检任务" subtitle="华东一区 · 2025-06 周期">
        当前周期共 128 家门店，已完成现场巡检 96 家，待执行 32 家。
      </CollapseItem>
      <CollapseItem key="risk" title="风险隐患" subtitle="待整改 14 项">
        高风险 3 项、中风险 6 项、低风险 5 项，需在 48 小时内完成复核。
      </CollapseItem>
      <CollapseItem key="report" title="巡检报告" subtitle="已生成 82 份">
        报告已推送至区域经理工作台，支持导出 PDF 与 Excel。
      </CollapseItem>
    </Collapse>
  ),
};

export const Nested = {
  render: () => (
    <Collapse defaultActiveKey="outer">
      <CollapseItem key="outer" title="门店巡检结果" subtitle="杭州西湖银泰店">
        <Collapse bordered={false} ghost defaultActiveKey="score">
          <CollapseItem key="score" title="综合得分" subtitle="88 分 · 良好">
            服务规范 92、环境卫生 85、食品安全 90、设备运行 84。
          </CollapseItem>
          <CollapseItem key="issues" title="问题项明细" subtitle="共 6 项">
            冷藏柜温度记录缺失、后厨地漏清洁不达标、消防通道堆放杂物等。
          </CollapseItem>
        </Collapse>
      </CollapseItem>
      <CollapseItem key="history" title="历史巡检记录" subtitle="近 6 个月">
        2025-05 得分 86；2025-04 得分 91；2025-03 得分 79。
      </CollapseItem>
    </Collapse>
  ),
};

export const WithExtra = {
  render: () => (
    <Collapse defaultActiveKey="1">
      <CollapseItem
        key="1"
        title="巡检任务"
        subtitle="已完成 12 项检查"
        extra={<Tag status="primary">进行中</Tag>}
      >
        执行人：张明；计划完成时间：2025-06-05 18:00；剩余检查项 4 项。
      </CollapseItem>
      <CollapseItem
        key="2"
        title="整改任务"
        subtitle="待复核 3 项"
        extra={<Tag status="warning">待整改</Tag>}
      >
        上次整改提交时间 2025-06-03，区域督导已安排二次复核。
      </CollapseItem>
    </Collapse>
  ),
};

export const WithSubtitle = {
  render: () => (
    <Collapse defaultActiveKey="1">
      <CollapseItem
        key="1"
        title="课程章节目录"
        subtitle="共 8 章 · 预计 6 小时"
      >
        第一章 门店合规基础；第二章 食品安全操作；第三章 服务礼仪与投诉处理。
      </CollapseItem>
      <CollapseItem key="2" title="第二章 食品安全操作" subtitle="45 分钟 · 3 节">
        2.1 原料验收；2.2 冷链管理；2.3 留样与销毁记录。
      </CollapseItem>
    </Collapse>
  ),
};

export const Ghost = {
  render: () => (
    <Collapse ghost defaultActiveKey="1">
      <CollapseItem key="1" title="这是一个折叠的标题">
        {PANEL_CONTENT}
      </CollapseItem>
      <CollapseItem key="2" title="这是一个折叠的标题">
        {PANEL_CONTENT}
      </CollapseItem>
      <CollapseItem key="3" title="这是一个折叠的标题">
        {PANEL_CONTENT}
      </CollapseItem>
    </Collapse>
  ),
};

export const Borderless = {
  render: () => (
    <div className="grid gap-8 md:grid-cols-2">
      <Collapse bordered expandIconPosition="left" defaultActiveKey="1">
        <CollapseItem key="1" title="这是一个折叠的标题">
          {PANEL_CONTENT}
        </CollapseItem>
        <CollapseItem key="2" title="这是一个折叠的标题">
          {PANEL_CONTENT}
        </CollapseItem>
      </Collapse>
      <Collapse bordered expandIconPosition="right" defaultActiveKey="1">
        <CollapseItem key="1" title="这是一个折叠的标题">
          {PANEL_CONTENT}
        </CollapseItem>
        <CollapseItem key="2" title="这是一个折叠的标题">
          {PANEL_CONTENT}
        </CollapseItem>
      </Collapse>
      <Collapse ghost expandIconPosition="left" defaultActiveKey="1">
        <CollapseItem key="1" title="这是一个折叠的标题">
          {PANEL_CONTENT}
        </CollapseItem>
        <CollapseItem key="2" title="这是一个折叠的标题">
          {PANEL_CONTENT}
        </CollapseItem>
      </Collapse>
      <Collapse ghost expandIconPosition="right" defaultActiveKey="1">
        <CollapseItem key="1" title="这是一个折叠的标题">
          {PANEL_CONTENT}
        </CollapseItem>
        <CollapseItem key="2" title="这是一个折叠的标题">
          {PANEL_CONTENT}
        </CollapseItem>
      </Collapse>
    </div>
  ),
};

export const Disabled = {
  render: () => (
    <Collapse defaultActiveKey="1">
      <CollapseItem key="1" title="可展开面板">
        {PANEL_CONTENT}
      </CollapseItem>
      <CollapseItem key="2" title="禁用面板" disabled>
        该面板不可展开。
      </CollapseItem>
      <CollapseItem key="3" title="正常面板">
        {PANEL_CONTENT}
      </CollapseItem>
    </Collapse>
  ),
};

export const CustomIcon = {
  render: () => (
    <Collapse
      defaultActiveKey="1"
      expandIcon={({ isActive }) => (
        <ChevronRight
          aria-hidden
          style={{
            width: "var(--collapse-icon-size-md)",
            height: "var(--collapse-icon-size-md)",
            color: "var(--collapse-color-icon-active)",
            transform: isActive ? "rotate(90deg)" : "rotate(0deg)",
            transition:
              "transform var(--collapse-motion-duration) var(--collapse-motion-easing)",
          }}
        />
      )}
    >
      <CollapseItem key="1" title="自定义展开图标">
        {PANEL_CONTENT}
      </CollapseItem>
      <CollapseItem key="2" title="第二个面板">
        {PANEL_CONTENT}
      </CollapseItem>
    </Collapse>
  ),
};

export const BusinessExamples = {
  render: () => (
    <div className="flex max-w-3xl flex-col gap-6">
      <Collapse defaultActiveKey="risk-1">
        <CollapseItem
          key="risk-1"
          title="风险隐患详情"
          subtitle="高风险 · 消防通道堆放杂物"
          extra={<Tag status="danger">高风险</Tag>}
        >
          发现时间：2025-06-04 14:32；责任门店：杭州西湖银泰店；要求 24
          小时内完成整改并上传现场照片。
        </CollapseItem>
        <CollapseItem
          key="risk-2"
          title="冷链温度异常"
          subtitle="中风险 · 冷藏柜 8℃"
          extra={<Tag status="warning">中风险</Tag>}
        >
          连续 3 次巡检记录超过 6℃，已通知门店店长与区域食安专员联合复核。
        </CollapseItem>
      </Collapse>

      <Collapse defaultActiveKey="rect-1">
        <CollapseItem key="rect-1" title="整改记录" subtitle="2025-06-03 提交">
          整改措施：清理消防通道、补齐灭火器检查记录、更新员工培训签到表。
        </CollapseItem>
        <CollapseItem key="rect-2" title="复核结果" subtitle="2025-06-04 通过">
          区域督导现场确认整改完成，风险等级由高风险降为低风险。
        </CollapseItem>
      </Collapse>

      <Collapse defaultActiveKey="store">
        <CollapseItem
          key="store"
          title="门店巡检结果"
          subtitle="综合得分 88 · 良好"
          extra={<Tag status="success">已通过</Tag>}
        >
          服务 92、环境 85、食安 90、设备 84；问题项 6 个，已整改 4 个。
        </CollapseItem>
      </Collapse>

      <Collapse accordion defaultActiveKey="chapter-1">
        <CollapseItem key="chapter-1" title="第一章 门店合规基础" subtitle="3 节">
          1.1 证照管理；1.2 人员健康证；1.3 制度公示与培训档案。
        </CollapseItem>
        <CollapseItem key="chapter-2" title="第二章 食品安全操作" subtitle="4 节">
          2.1 原料验收；2.2 加工留样；2.3 清洁消毒；2.4 虫害防治。
        </CollapseItem>
      </Collapse>

      <Collapse defaultActiveKey="config-notify">
        <CollapseItem key="config-notify" title="消息通知配置" subtitle="巡检提醒">
          任务创建提醒、逾期预警、整改复核结果推送至企业微信与短信。
        </CollapseItem>
        <CollapseItem key="config-score" title="评分规则配置" subtitle="权重设置">
          服务 30%、环境 25%、食安 30%、设备 15%；及格线 80 分。
        </CollapseItem>
      </Collapse>
    </div>
  ),
};
