import { Button } from "../button";
import { CheckboxGroup } from "../checkbox";
import { DatePicker } from "../date-picker";
import { Input, TextArea } from "../input";
import { RadioGroup } from "../radio";
import { Select } from "../select";
import { Switch } from "../switch";
import { TimePicker } from "../time-picker";
import { Upload } from "../upload";
import { Form } from "./index";

export default {
  title: "YD Design System/Form",
  component: Form,
  parameters: { layout: "padded" },
};

/** 项目创建表单 —— vertical：必填、帮助、tooltip、extra、错误态 */
export const ProjectCreate = {
  render: () => (
    <Form className="max-w-[480px]" onSubmit={(e) => e.preventDefault()}>
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
      <Form.Item label="所属区域" required>
        <Select
          placeholder="请选择区域"
          options={["华东一区", "华东二区", "华南一区"]}
        />
      </Form.Item>
      <Form.Item label="项目描述" help="不超过 200 字，用于项目列表摘要">
        <TextArea placeholder="请输入项目描述" maxLength={200} />
      </Form.Item>
      <Form.Item label="启用通知" extra="可稍后在设置中调整">
        <Switch defaultChecked label="开启" />
      </Form.Item>
      <div className="flex gap-2">
        <Button type="submit">创建项目</Button>
        <Button variant="secondary" type="button">
          取消
        </Button>
      </div>
    </Form>
  ),
};

/** 门店信息表单 —— horizontal：固定标签列宽 */
export const StoreInfo = {
  render: () => (
    <Form
      layout="horizontal"
      labelWidth={96}
      className="max-w-[560px]"
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
      <Form.Item label="开业日期" help="用于计算门店运营时长">
        <DatePicker />
      </Form.Item>
      <Form.Item label="门店地址" status="warning" error="建议补全详细门牌号">
        <Input defaultValue="上海市浦东新区" />
      </Form.Item>
      <Form.Item label="门头照片">
        <Upload listType="picture-card" buttonText="上传" />
      </Form.Item>
    </Form>
  ),
};

/** 巡检任务表单 —— vertical：单选 / 多选 / 日期 */
export const InspectionTask = {
  render: () => (
    <Form className="max-w-[520px]" onSubmit={(e) => e.preventDefault()}>
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
      <Form.Item label="截止时间" required status="error" error="请选择截止时间">
        <DatePicker showTime />
      </Form.Item>
      <Form.Item label="备注">
        <TextArea placeholder="补充说明（选填）" />
      </Form.Item>
    </Form>
  ),
};

/** Inline 查询表单 —— inline：紧凑筛选条 */
export const InlineQuery = {
  render: () => (
    <Form layout="inline" onSubmit={(e) => e.preventDefault()}>
      <Form.Item label="门店">
        <Input placeholder="门店名称" />
      </Form.Item>
      <Form.Item label="状态">
        <Select
          placeholder="全部"
          options={["待巡检", "进行中", "已完成"]}
        />
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
  ),
};

/** Horizontal 表单 —— 标签右对齐 + 冒号 */
export const HorizontalForm = {
  render: () => (
    <Form
      layout="horizontal"
      labelAlign="right"
      colon
      labelWidth={100}
      className="max-w-[560px]"
      onSubmit={(e) => e.preventDefault()}
    >
      <Form.Item label="联系人" required>
        <Input placeholder="请输入联系人" />
      </Form.Item>
      <Form.Item label="联系电话" required help="用于接收巡检通知">
        <Input placeholder="请输入手机号" />
      </Form.Item>
      <Form.Item label="负责区域">
        <Select placeholder="请选择" options={["华东", "华南", "华北"]} />
      </Form.Item>
      <Form.Item label="备注" status="success" help="信息已校验通过">
        <Input defaultValue="VIP 客户" />
      </Form.Item>
    </Form>
  ),
};
