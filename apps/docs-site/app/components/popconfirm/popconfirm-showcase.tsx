"use client";

import { useState } from "react";
import { Button } from "@yd-ds/ui/button";
import {
  BatchActionConfirm,
  DeleteConfirm,
  StatusSwitchConfirm,
} from "@yd-ds/ui/business-patterns/feedback";
import { Popconfirm, type PopconfirmPlacement } from "@yd-ds/ui/popconfirm";
import {
  POPCONFIRM_PLACEMENTS,
  POPCONFIRM_TYPE_LABELS,
} from "@/lib/data/popconfirmMock";

function DemoCard({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-md border bg-card px-6 py-6 md:px-8">
      <div className="mb-4">
        <h3 className="text-[13px] font-semibold text-foreground">{title}</h3>
        {description ? (
          <p className="text-xs text-muted-foreground">{description}</p>
        ) : null}
      </div>
      {children}
    </div>
  );
}

export function PopconfirmTypesShowcase() {
  const [controlledOpen, setControlledOpen] = useState(false);

  return (
    <div className="space-y-6">
      <DemoCard
        title={POPCONFIRM_TYPE_LABELS[0].label}
        description={POPCONFIRM_TYPE_LABELS[0].description}
      >
        <Popconfirm title="确认删除该员工？" onConfirm={() => {}}>
          <Button variant="destructive">删除</Button>
        </Popconfirm>
      </DemoCard>

      <DemoCard
        title={POPCONFIRM_TYPE_LABELS[1].label}
        description={POPCONFIRM_TYPE_LABELS[1].description}
      >
        <Popconfirm
          title="确认删除该员工？"
          description="删除后无法恢复"
          onConfirm={() => {}}
        >
          <Button variant="destructive">删除</Button>
        </Popconfirm>
      </DemoCard>

      <DemoCard
        title={POPCONFIRM_TYPE_LABELS[2].label}
        description={POPCONFIRM_TYPE_LABELS[2].description}
      >
        <Popconfirm title="确认删除？" description="此操作不可撤销" danger onConfirm={() => {}}>
          <Button variant="outline">危险确认</Button>
        </Popconfirm>
      </DemoCard>

      <DemoCard
        title={POPCONFIRM_TYPE_LABELS[3].label}
        description={POPCONFIRM_TYPE_LABELS[3].description}
      >
        <Popconfirm title="提交中" loading onConfirm={() => {}}>
          <Button>Loading 示例</Button>
        </Popconfirm>
      </DemoCard>

      <DemoCard
        title={POPCONFIRM_TYPE_LABELS[4].label}
        description={POPCONFIRM_TYPE_LABELS[4].description}
      >
        <Popconfirm
          open={controlledOpen}
          onOpenChange={setControlledOpen}
          title="受控 Popconfirm"
          description="open / onOpenChange"
          onConfirm={() => setControlledOpen(false)}
        >
          <Button variant="secondary">受控触发</Button>
        </Popconfirm>
      </DemoCard>
    </div>
  );
}

export function PopconfirmPlacementShowcase() {
  return (
    <div className="rounded-md border bg-card px-6 py-8 md:px-8">
      <p className="mb-6 text-xs text-muted-foreground">八向弹出 placement</p>
      <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
        {POPCONFIRM_PLACEMENTS.map((placement) => (
          <div key={placement} className="flex flex-col items-center gap-2">
            <Popconfirm
              placement={placement as PopconfirmPlacement}
              title={`${placement}`}
              onConfirm={() => {}}
            >
              <Button variant="secondary" size="sm">
                {placement}
              </Button>
            </Popconfirm>
          </div>
        ))}
      </div>
    </div>
  );
}

export function PopconfirmBusinessShowcase() {
  return (
    <div className="space-y-6">
      <DemoCard title="DeleteConfirm" description="删除员工 / 项目 / 任务 / 角色 / 部门">
        <DeleteConfirm onConfirm={() => {}}>
          <Button variant="destructive">删除</Button>
        </DeleteConfirm>
      </DemoCard>

      <DemoCard title="StatusSwitchConfirm" description="启用 / 禁用 / 冻结 / 解冻 — 自动生成文案">
        <div className="flex flex-wrap gap-3">
          <StatusSwitchConfirm action="enable" onConfirm={() => {}}>
            <Button variant="secondary" size="sm">
              启用
            </Button>
          </StatusSwitchConfirm>
          <StatusSwitchConfirm action="disable" onConfirm={() => {}}>
            <Button variant="secondary" size="sm">
              禁用
            </Button>
          </StatusSwitchConfirm>
          <StatusSwitchConfirm action="freeze" onConfirm={() => {}}>
            <Button variant="secondary" size="sm">
              冻结
            </Button>
          </StatusSwitchConfirm>
        </div>
      </DemoCard>

      <DemoCard title="BatchActionConfirm" description="批量删除 / 归档 / 导出">
        <BatchActionConfirm count={25} actionLabel="删除" danger onConfirm={() => {}}>
          <Button variant="destructive">批量删除 (25)</Button>
        </BatchActionConfirm>
      </DemoCard>
    </div>
  );
}

export function PopconfirmAsyncShowcase() {
  return (
    <DemoCard title="Async Confirm" description="onConfirm 返回 Promise 时自动 loading">
      <Popconfirm
        title="异步提交"
        description="模拟 1.5s 网络请求"
        onConfirm={() => new Promise((resolve) => setTimeout(resolve, 1500))}
      >
        <Button>异步确认</Button>
      </Popconfirm>
    </DemoCard>
  );
}
