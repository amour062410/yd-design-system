import type {
  FormHTMLAttributes,
  HTMLAttributes,
  ReactNode,
} from "react";

/** 表单布局方式 */
export type FormLayout = "vertical" | "horizontal" | "inline";

/** 表单项校验状态 */
export type FormItemStatus = "default" | "success" | "warning" | "error";

/** 标签对齐方式（仅 horizontal / inline 生效） */
export type FormLabelAlign = "left" | "right";

/** 必填标记策略：true 显示星号；"optional" 反向给非必填项加「可选」 */
export type FormRequiredMark = boolean | "optional";

export interface FormProps
  extends Omit<FormHTMLAttributes<HTMLFormElement>, "onSubmit"> {
  /** 布局方式，默认 vertical */
  layout?: FormLayout;
  /** 标签对齐，默认 left（依据 Figma 截图，标签左对齐无冒号） */
  labelAlign?: FormLabelAlign;
  /** horizontal 布局标签列宽度，默认 80px */
  labelWidth?: number | string;
  /** 是否在标签后显示冒号，默认 false */
  colon?: boolean;
  /** 必填标记策略，默认 true */
  requiredMark?: FormRequiredMark;
  /** 整表禁用，向下透传到所有 Form.Item */
  disabled?: boolean;
  /** 原生 submit 回调 */
  onSubmit?: (event: React.FormEvent<HTMLFormElement>) => void;
  children?: ReactNode;
}

export interface FormItemProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "id"> {
  /** 字段标签 */
  label?: ReactNode;
  /** 关联控件的 id（不传则自动生成并注入唯一子控件） */
  htmlFor?: string;
  /** 是否必填（显示红色星号） */
  required?: boolean;
  /** 标签旁的说明气泡内容（hover 图标显示 title） */
  tooltip?: ReactNode;
  /** 标签行右侧的额外节点（如「忘记密码」链接） */
  extra?: ReactNode;
  /** 帮助文字（灰色，常驻提示） */
  help?: ReactNode;
  /** 错误文字（status=error 时优先展示） */
  error?: ReactNode;
  /** 校验状态，默认 default */
  status?: FormItemStatus;
  /** 覆盖 Form 的布局 */
  layout?: FormLayout;
  /** 覆盖 Form 的标签对齐 */
  labelAlign?: FormLabelAlign;
  /** 覆盖 Form 的标签列宽 */
  labelWidth?: number | string;
  /** 覆盖 Form 的冒号设置 */
  colon?: boolean;
  /** 禁用该项（透传到子控件） */
  disabled?: boolean;
  children?: ReactNode;
}

export interface FormContextValue {
  layout: FormLayout;
  labelAlign: FormLabelAlign;
  labelWidth: number | string;
  colon: boolean;
  requiredMark: FormRequiredMark;
  disabled: boolean;
}

export interface FormItemContextValue {
  /** 控件 id（用于 label htmlFor） */
  id?: string;
  /** 帮助/错误信息节点 id（用于 aria-describedby） */
  describedById?: string;
  status: FormItemStatus;
  required: boolean;
  disabled: boolean;
}
