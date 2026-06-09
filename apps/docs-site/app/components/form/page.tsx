import { ApiTable, type ApiTableRow } from "@/components/docs/api-table";
import { CopyCodeBlock } from "@/components/docs/copy-code-block";
import { FormShowcase } from "./form-showcase";

const API_TABLE_CLASS =
  "overflow-x-auto rounded-[6px] border border-[#e5e6eb] [&_thead_tr]:border-b [&_thead_tr]:border-[#e5e6eb] [&_th]:bg-[#f7f8fa] [&_th]:px-4 [&_th]:py-2.5 [&_th]:text-left [&_th]:text-[13px] [&_th]:font-semibold [&_th]:text-[#1d2129] [&_tbody_tr]:border-b [&_tbody_tr]:border-[#f2f3f5] [&_tbody_tr:last-child]:border-0 [&_tbody_tr:hover]:bg-[#f7f8fa] [&_td]:px-4 [&_td]:py-2.5 [&_td]:text-[13px] [&_td]:text-[#4e5969]";

const FORM_INTRO =
  "Form（表单）用于统一管理用户输入的布局、标签、帮助信息与错误态。Form 负责整体布局与默认值下发，Form.Item 统一接管单个字段的标签、必填标记、帮助/错误信息，并把 Input、Select、DatePicker 等控件包裹成结构一致的表单项。V1 仅解决「统一布局 / 统一标签 / 统一帮助 / 统一错误」，不含动态表单、字段注册、异步校验与复杂联动。";

const FORM_OVERVIEW_POINTS = [
  "三种布局：vertical（标签在上）、horizontal（标签列 + 控件列）、inline（紧凑筛选条）。",
  "四种状态：default / success / warning / error，status=error 时优先展示 error 文案并设置 aria-invalid。",
  "统一接管 Input、Textarea、Select、Radio、Checkbox、Switch、DatePicker、TimePicker、Upload：自动注入 id、aria-describedby 与 disabled。",
  "标签能力：required 红色星号、tooltip 说明、extra 右侧附加节点、colon 冒号、labelAlign 对齐、labelWidth 列宽。",
  "与 Modal、Drawer、DashboardSection 配合：Form 自身不带容器边框，放入任意容器即贴合其内边距。",
];

const FORM_API_ROWS: ApiTableRow[] = [
  {
    prop: "layout",
    type: '"vertical" | "horizontal" | "inline"',
    default: '"vertical"',
    description: "表单布局方式",
  },
  {
    prop: "labelAlign",
    type: '"left" | "right"',
    default: '"left"',
    description: "标签对齐（horizontal / inline 生效）",
  },
  {
    prop: "labelWidth",
    type: "number | string",
    default: '"80px"',
    description: "horizontal 布局标签列宽度",
  },
  {
    prop: "colon",
    type: "boolean",
    default: "false",
    description: "是否在标签后显示冒号",
  },
  {
    prop: "requiredMark",
    type: 'boolean | "optional"',
    default: "true",
    description: "必填标记策略：true 显示星号 / optional 给非必填项加「(可选)」",
  },
  {
    prop: "disabled",
    type: "boolean",
    default: "false",
    description: "整表禁用，向下透传到所有 Form.Item",
  },
  {
    prop: "onSubmit",
    type: "(e: FormEvent) => void",
    description: "原生 submit 回调",
  },
];

const FORM_ITEM_API_ROWS: ApiTableRow[] = [
  { prop: "label", type: "ReactNode", description: "字段标签" },
  {
    prop: "required",
    type: "boolean",
    default: "false",
    description: "是否必填（显示红色星号）",
  },
  {
    prop: "status",
    type: '"default" | "success" | "warning" | "error"',
    default: '"default"',
    description: "校验状态，驱动信息着色与控件边框",
  },
  { prop: "help", type: "ReactNode", description: "帮助文字（灰色常驻提示）" },
  {
    prop: "error",
    type: "ReactNode",
    description: "错误文字（status=error 时优先展示）",
  },
  { prop: "tooltip", type: "ReactNode", description: "标签旁说明气泡（hover/focus 弹出 Tooltip）" },
  { prop: "extra", type: "ReactNode", description: "标签行右侧附加节点" },
  {
    prop: "htmlFor",
    type: "string",
    description: "关联控件 id（不传则自动生成并注入子控件）",
  },
  {
    prop: "layout / labelAlign / labelWidth / colon / disabled",
    type: "—",
    description: "覆盖 Form 同名默认值",
  },
  { prop: "children", type: "ReactNode", description: "字段控件" },
];

const FORM_CODE_EXAMPLE = `import { Form } from "@yd-ds/ui/form";
import { Input } from "@yd-ds/ui/input";
import { Select } from "@yd-ds/ui/select";

export function StoreForm() {
  return (
    <Form layout="horizontal" labelWidth={96} onSubmit={(e) => e.preventDefault()}>
      <Form.Item label="门店名称" required tooltip="门店在系统内的唯一名称">
        <Input placeholder="请输入门店名称" />
      </Form.Item>
      <Form.Item label="门店类型" required status="error" error="请选择门店类型">
        <Select placeholder="请选择" options={["直营店", "加盟店"]} />
      </Form.Item>
      <Form.Item label="备注" help="选填，最多 200 字">
        <Input placeholder="补充说明" />
      </Form.Item>
    </Form>
  );
}`;

export default function FormPage() {
  return (
    <div className="mx-auto max-w-[960px] px-4">
      <header className="pt-8">
        <h1
          className="text-[28px] font-semibold tracking-tight text-[#1d2129]"
          style={{ marginBottom: 12 }}
        >
          Form 表单
        </h1>
        <p className="text-[14px] text-[#86909c]" style={{ lineHeight: 1.8 }}>
          {FORM_INTRO}
        </p>
      </header>

      <section className="mb-8">
        <h2 className="mb-4 text-[20px] font-semibold tracking-tight text-[#1d2129]">
          Overview
        </h2>
        <ul className="list-disc space-y-2 pl-5 text-sm text-muted-foreground">
          {FORM_OVERVIEW_POINTS.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>
      </section>

      <FormShowcase />

      <section className="mt-12 border-t border-[#e5e6eb] pt-4">
        <h2 className="mb-4 text-[18px] font-semibold text-[#1d2129]">API</h2>
        <h3 className="mb-3 text-base font-medium text-[#1d2129]">Form</h3>
        <ApiTable rows={FORM_API_ROWS} className={API_TABLE_CLASS} />
        <h3 className="mb-3 mt-8 text-base font-medium text-[#1d2129]">
          Form.Item
        </h3>
        <ApiTable rows={FORM_ITEM_API_ROWS} className={API_TABLE_CLASS} />
      </section>

      <section className="mt-12 space-y-4 pb-12">
        <h2 className="text-[20px] font-semibold tracking-tight text-[#1d2129]">
          Development Usage
        </h2>
        <CopyCodeBlock
          code={FORM_CODE_EXAMPLE}
          className="rounded-[6px] border-[#e5e6eb] bg-[#f7f8fa]"
        />
        <p className="text-xs text-muted-foreground">
          从 <code className="rounded bg-muted px-1">@yd-ds/ui/form</code> 引入。
          Form 仅负责布局与默认值，控件从各自子路径（如{" "}
          <code className="rounded bg-muted px-1">@yd-ds/ui/input</code>）引入后放入
          Form.Item 即可。
        </p>
      </section>
    </div>
  );
}
