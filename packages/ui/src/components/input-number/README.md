# InputNumber 数字输入框

数字输入框用于表单与配置页中的数值录入，支持步进、精度、格式化与云盯巡检业务预设。

## 组件说明

- 企业后台风格：8px 圆角、#F0F0F0 边框、聚焦 #165DFF、无阴影
- 右侧步进控件（▲/▼），支持键盘 ↑/↓
- 支持 prefix / suffix / unit 扩展
- 与 Form 组合使用，适用于巡检规则、阈值、时限等配置场景

## 基础用法

```tsx
import { InputNumber } from "@yd-ds/ui/input-number";

<InputNumber defaultValue={92} min={0} max={100} step={1} unit="分" />
```

## 业务预设

```tsx
import {
  InspectionScoreInput,
  RectificationDeadlineInput,
  AlertThresholdInput,
  DeviceCountInput,
  BusinessHoursInput,
} from "@yd-ds/ui/input-number";

<InspectionScoreInput defaultValue={92} />
<RectificationDeadlineInput defaultValue={7} />
<AlertThresholdInput defaultValue={85.5} />
<DeviceCountInput defaultValue={35} />
<BusinessHoursInput defaultValue={12} />
```

## API

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| value | 受控值 | `number \| null` | - |
| defaultValue | 非受控默认值 | `number` | - |
| min / max | 最小/最大值 | `number` | - |
| step | 步长 | `number` | `1` |
| precision | 小数精度 | `number` | - |
| disabled / readOnly | 禁用/只读 | `boolean` | `false` |
| status | 校验态 | `'error' \| 'warning'` | - |
| size | 尺寸 | `'small' \| 'default' \| 'large'` | `'default'` |
| prefix / suffix | 前缀/后缀 | `ReactNode` | - |
| unit | 单位文字 | `string` | - |
| controls | 是否显示步进按钮 | `boolean` | `true` |
| formatter / parser | 格式化/解析 | `function` | - |
| onChange | 值变化 | `(value: number \| null) => void` | - |

## Design Token

| Token | CSS 变量 | 说明 |
|-------|----------|------|
| input-number-border-default | `--input-number-border-default` | 默认边框 #D9D9D9 |
| input-number-border-focus | `--input-number-border-focus` | 聚焦边框 #165DFF |
| input-number-border-error | `--input-number-border-error` | 错误边框 #FF4D4F |
| input-number-radius | `--input-number-radius` | 圆角 8px |
| input-number-height-md | `--input-number-height-md` | 默认高度 32px |
| input-number-control-bg-hover | `--input-number-control-bg-hover` | 步进按钮 Hover #F5F5F5 |

## 业务场景

| 预设 | 范围 | 步长 | 单位 | 用途 |
|------|------|------|------|------|
| InspectionScoreInput | 0–100 | 1 | 分 | 巡检评分 |
| RectificationDeadlineInput | 1–30 | 1 | 天 | 整改时限 |
| AlertThresholdInput | 0–100 | 0.1 | - | 告警阈值 |
| DeviceCountInput | ≥0 | 1 | 台 | 设备数量 |
| BusinessHoursInput | 0–24 | 0.5 | 小时 | 营业时长 |

## 最佳实践

1. 配置类表单优先使用业务预设，保持范围与单位一致
2. 需要千分位展示时使用 `formatter` / `parser` 成对配置
3. 与 Form.Item 组合时，通过 `status` 传递校验态
4. 只读场景使用 `readOnly`，禁用整表时使用 Form `disabled`

## 注意事项

- 清空输入后 `onChange` 返回 `null`
- 失焦时自动按 min/max/precision 校正
- 步进按钮在达到边界时自动禁用
- 不做互联网运营风格的大圆角与重阴影
