"use client";

import { ChevronRight } from "lucide-react";
import { Button } from "@yd-ds/ui/button";
import { Collapse, CollapseItem } from "@yd-ds/ui/collapse";
import { Tag } from "@yd-ds/ui/tag";
import { cn } from "@yd-ds/ui";
import { COLLAPSE_PANEL_CONTENT } from "@/lib/data/collapseMock";

function DemoCard({
  label,
  span = 1,
  children,
}: {
  label: string;
  span?: 1 | 2;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "rounded-[6px] border border-[#e5e6eb] bg-white p-6 shadow-[0_1px_4px_rgba(0,0,0,0.04)] dark:border-[#3f3f46] dark:bg-[#161618]",
        span === 2 && "md:col-span-2"
      )}
    >
      <p
        className="mb-4 border-b border-[#f2f3f5] pb-3 text-[14px] font-medium text-[#1d2129] dark:text-[#f4f4f5]"
      >
        {label}
      </p>
      {children}
    </div>
  );
}

function CompactTable() {
  const rows = [
    { store: "杭州西湖银泰店", score: 88, status: "良好" },
    { store: "上海静安寺店", score: 76, status: "待整改" },
    { store: "南京新街口店", score: 92, status: "优秀" },
  ];

  return (
    <table className="w-full border-collapse text-left text-[13px]">
      <thead>
        <tr className="border-b border-[#e5e6eb] bg-[#f7f8fa]">
          <th className="px-3 py-2 font-medium text-[#1d2129]">门店</th>
          <th className="px-3 py-2 font-medium text-[#1d2129]">得分</th>
          <th className="px-3 py-2 font-medium text-[#1d2129]">状态</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => (
          <tr key={row.store} className="border-b border-[#f2f3f5] last:border-0">
            <td className="px-3 py-2 text-[#4e5969]">{row.store}</td>
            <td className="px-3 py-2 text-[#4e5969]">{row.score}</td>
            <td className="px-3 py-2 text-[#4e5969]">{row.status}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export function CollapseShowcaseGrid() {
  return (
    <section className="mb-10 grid grid-cols-1 gap-6 md:grid-cols-2">
      <DemoCard label="基础用法">
        <Collapse defaultActiveKey="1">
          <CollapseItem key="1" title="这是一个折叠的标题">
            {COLLAPSE_PANEL_CONTENT}
          </CollapseItem>
          <CollapseItem key="2" title="这是一个折叠的标题">
            {COLLAPSE_PANEL_CONTENT}
          </CollapseItem>
          <CollapseItem key="3" title="这是一个折叠的标题">
            {COLLAPSE_PANEL_CONTENT}
          </CollapseItem>
        </Collapse>
      </DemoCard>

      <DemoCard label="手风琴模式（Accordion）">
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
      </DemoCard>

      <DemoCard label="无边框模式">
        <Collapse ghost defaultActiveKey="1">
          <CollapseItem key="1" title="这是一个折叠的标题">
            {COLLAPSE_PANEL_CONTENT}
          </CollapseItem>
          <CollapseItem key="2" title="这是一个折叠的标题">
            {COLLAPSE_PANEL_CONTENT}
          </CollapseItem>
        </Collapse>
      </DemoCard>

      <DemoCard label="自定义箭头/图标">
        <Collapse
          defaultActiveKey="1"
          expandIcon={({ isActive }) => (
            <ChevronRight
              aria-hidden
              style={{
                width: "var(--collapse-icon-size-md, 12px)",
                height: "var(--collapse-icon-size-md, 12px)",
                color: "var(--collapse-color-icon, #4e5969)",
                transform: isActive ? "rotate(90deg)" : "rotate(0deg)",
                transition:
                  "transform var(--collapse-motion-duration, 0.2s) var(--collapse-motion-easing, ease)",
              }}
            />
          )}
        >
          <CollapseItem key="1" title="自定义展开图标">
            {COLLAPSE_PANEL_CONTENT}
          </CollapseItem>
          <CollapseItem key="2" title="第二个面板">
            {COLLAPSE_PANEL_CONTENT}
          </CollapseItem>
        </Collapse>
      </DemoCard>

      <DemoCard label="面板内嵌表格" span={2}>
        <Collapse defaultActiveKey="table">
          <CollapseItem key="table" title="门店巡检得分明细" subtitle="华东一区 · 共 3 家">
            <CompactTable />
          </CollapseItem>
          <CollapseItem key="summary" title="汇总说明">
            表格支持在折叠内容区展示紧凑型业务数据，适用于详情页与配置面板。
          </CollapseItem>
        </Collapse>
      </DemoCard>

      <DemoCard label="折叠位置（左侧）">
        <Collapse defaultActiveKey="1" expandIconPosition="left">
          <CollapseItem key="1" title="左侧展开图标">
            {COLLAPSE_PANEL_CONTENT}
          </CollapseItem>
          <CollapseItem key="2" title="第二个面板">
            {COLLAPSE_PANEL_CONTENT}
          </CollapseItem>
        </Collapse>
      </DemoCard>

      <DemoCard label="折叠位置（右侧）">
        <Collapse defaultActiveKey="1" expandIconPosition="right">
          <CollapseItem key="1" title="右侧展开图标">
            {COLLAPSE_PANEL_CONTENT}
          </CollapseItem>
          <CollapseItem key="2" title="第二个面板">
            {COLLAPSE_PANEL_CONTENT}
          </CollapseItem>
        </Collapse>
      </DemoCard>

      <DemoCard label="嵌套折叠面板" span={2}>
        <Collapse defaultActiveKey="outer">
          <CollapseItem key="outer" title="门店巡检结果" subtitle="杭州西湖银泰店">
            <Collapse nested bordered={false} ghost defaultActiveKey="score">
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
      </DemoCard>

      <DemoCard label="额外操作区">
        <Collapse defaultActiveKey="1">
          <CollapseItem
            key="1"
            title="巡检任务"
            subtitle="已完成 12 项检查"
            extra={
              <div className="flex items-center gap-2">
                <Tag status="primary">进行中</Tag>
                <Button size="sm" variant="outline" className="h-6 px-2 text-xs">
                  编辑
                </Button>
              </div>
            }
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
      </DemoCard>

      <DemoCard label="副标题展示">
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
      </DemoCard>

      <DemoCard label="禁用状态">
        <Collapse defaultActiveKey="1">
          <CollapseItem key="1" title="可展开面板">
            {COLLAPSE_PANEL_CONTENT}
          </CollapseItem>
          <CollapseItem key="2" title="禁用面板" disabled>
            该面板不可展开。
          </CollapseItem>
          <CollapseItem key="3" title="正常面板">
            {COLLAPSE_PANEL_CONTENT}
          </CollapseItem>
        </Collapse>
      </DemoCard>

      <DemoCard label="业务场景示例">
        <Collapse accordion defaultActiveKey="risk">
          <CollapseItem
            key="risk"
            title="风险隐患详情"
            subtitle="消防通道堆放杂物"
            extra={<Tag status="danger">高风险</Tag>}
          >
            发现时间：2025-06-04 14:32；要求 24 小时内完成整改并上传现场照片。
          </CollapseItem>
          <CollapseItem key="rect" title="整改记录" subtitle="2025-06-03 提交">
            整改措施：清理消防通道、补齐灭火器检查记录、更新员工培训签到表。
          </CollapseItem>
        </Collapse>
      </DemoCard>
    </section>
  );
}
