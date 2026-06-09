"use client";

import type { ReactNode } from "react";
import { Button } from "@yd-ds/ui/button";
import { CheckboxGroup } from "@yd-ds/ui/checkbox";
import { DatePicker } from "@yd-ds/ui/date-picker";
import { Form } from "@yd-ds/ui/form";
import { Input, TextArea } from "@yd-ds/ui/input";
import { RadioGroup } from "@yd-ds/ui/radio";
import { Select } from "@yd-ds/ui/select";
import { Switch } from "@yd-ds/ui/switch";
import { TimePicker } from "@yd-ds/ui/time-picker";
import { Upload } from "@yd-ds/ui/upload";

function DemoCard({
  label,
  description,
  span = 1,
  children,
}: {
  label: string;
  description?: string;
  span?: 1 | 2;
  children: ReactNode;
}) {
  return (
    <div
      className={span === 2 ? "md:col-span-2" : undefined}
      style={{
        background: "var(--color-surface-card, #fff)",
        border: "1px solid #e5e6eb",
        borderRadius: 6,
        padding: 24,
        boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
      }}
    >
      <div className="mb-4 border-b border-[#f2f3f5] pb-3">
        <p className="text-[14px] font-medium text-[#1d2129] dark:text-[#f4f4f5]">
          {label}
        </p>
        {description ? (
          <p className="mt-0.5 text-[13px] text-[#86909c]">{description}</p>
        ) : null}
      </div>
      {children}
    </div>
  );
}

export function FormShowcase() {
  return (
    <section className="mb-10 grid grid-cols-1 gap-6 md:grid-cols-2">
      <DemoCard
        label="项目创建表单（Vertical）"
        description="标签在上 · 必填星号 · tooltip · 帮助/错误信息"
      >
        <Form onSubmit={(e) => e.preventDefault()}>
          <Form.Item label="项目名称" required tooltip="项目在系统内的唯一名称">
            <Input placeholder="请输入项目名称" />
          </Form.Item>
          <Form.Item
            label="项目编码"
            required
            status="error"
            error="项目编码已存在，请更换"
          >
            <Input defaultValue="PRJ-001" />
          </Form.Item>
          <Form.Item label="项目描述" help="不超过 200 字，用于列表摘要">
            <TextArea placeholder="请输入项目描述" maxLength={200} />
          </Form.Item>
          <Form.Item label="启用通知" extra="可稍后调整">
            <Switch defaultChecked label="开启" />
          </Form.Item>
          <div className="flex gap-2">
            <Button type="submit">创建</Button>
            <Button variant="secondary" type="button">
              取消
            </Button>
          </div>
        </Form>
      </DemoCard>

      <DemoCard
        label="门店信息表单（Horizontal）"
        description="固定标签列宽 96px · 标签右对齐"
      >
        <Form
          layout="horizontal"
          labelAlign="right"
          labelWidth={96}
          onSubmit={(e) => e.preventDefault()}
        >
          <Form.Item label="门店名称" required>
            <Input placeholder="请输入门店名称" />
          </Form.Item>
          <Form.Item label="门店类型" required>
            <Select placeholder="请选择" options={["直营店", "加盟店", "旗舰店"]} />
          </Form.Item>
          <Form.Item label="营业时间">
            <TimePicker range />
          </Form.Item>
          <Form.Item
            label="门店地址"
            status="warning"
            error="建议补全详细门牌号"
          >
            <Input defaultValue="上海市浦东新区" />
          </Form.Item>
        </Form>
      </DemoCard>

      <DemoCard
        label="巡检任务表单（Vertical）"
        description="单选 / 多选 / 日期时间 · 统一错误态"
      >
        <Form onSubmit={(e) => e.preventDefault()}>
          <Form.Item label="任务名称" required>
            <Input placeholder="请输入任务名称" />
          </Form.Item>
          <Form.Item label="任务周期" required>
            <RadioGroup
              defaultValue="month"
              options={[
                { label: "每日", value: "day" },
                { label: "每周", value: "week" },
                { label: "每月", value: "month" },
              ]}
            />
          </Form.Item>
          <Form.Item label="巡检项" required help="至少选择一项">
            <CheckboxGroup
              defaultValue={["safety"]}
              options={[
                { label: "安全隐患", value: "safety" },
                { label: "卫生状况", value: "clean" },
                { label: "陈列规范", value: "display" },
              ]}
            />
          </Form.Item>
          <Form.Item
            label="截止时间"
            required
            status="error"
            error="请选择截止时间"
          >
            <DatePicker showTime />
          </Form.Item>
        </Form>
      </DemoCard>

      <DemoCard
        label="状态总览"
        description="default / success / warning / error 四态文案与边框"
      >
        <Form onSubmit={(e) => e.preventDefault()}>
          <Form.Item label="默认" help="常规帮助信息（tertiary）">
            <Input placeholder="default" />
          </Form.Item>
          <Form.Item label="成功" status="success" help="信息校验通过">
            <Input defaultValue="已通过" />
          </Form.Item>
          <Form.Item label="警告" status="warning" help="建议补充完整">
            <Input defaultValue="待完善" />
          </Form.Item>
          <Form.Item label="错误" status="error" error="该字段为必填">
            <Input />
          </Form.Item>
        </Form>
      </DemoCard>

      <DemoCard
        label="Inline 查询表单"
        description="紧凑横向排布 · 用于列表筛选条"
        span={2}
      >
        <Form layout="inline" onSubmit={(e) => e.preventDefault()}>
          <Form.Item label="门店">
            <Input placeholder="门店名称" />
          </Form.Item>
          <Form.Item label="状态">
            <Select placeholder="全部" options={["待巡检", "进行中", "已完成"]} />
          </Form.Item>
          <Form.Item label="日期">
            <DatePicker range />
          </Form.Item>
          <div className="flex gap-2">
            <Button type="submit">查询</Button>
            <Button variant="secondary" type="button">
              重置
            </Button>
          </div>
        </Form>
      </DemoCard>

      <DemoCard
        label="附件上传（Horizontal · 右对齐 + 冒号）"
        description="labelAlign=right · colon · 与 Upload 协作"
        span={2}
      >
        <Form
          layout="horizontal"
          labelAlign="right"
          colon
          labelWidth={100}
          onSubmit={(e) => e.preventDefault()}
        >
          <Form.Item label="联系人" required>
            <Input placeholder="请输入联系人" />
          </Form.Item>
          <Form.Item label="联系电话" required help="用于接收巡检通知">
            <Input placeholder="请输入手机号" />
          </Form.Item>
          <Form.Item label="门头照片">
            <Upload listType="picture-card" buttonText="上传" />
          </Form.Item>
        </Form>
      </DemoCard>
    </section>
  );
}
