# Transfer 穿梭框

双栏穿梭选择组件，用于门店分配、巡检员分配、权限配置等云盯后台场景。

## 基础用法

```tsx
import { Transfer } from "@yd-ds/ui/transfer";

<Transfer
  dataSource={dataSource}
  targetKeys={targetKeys}
  onChange={setTargetKeys}
  titles={["待分配门店", "已分配门店"]}
/>
```

## 业务预设

```tsx
import { StoreTransfer, InspectorTransfer, PermissionTransfer } from "@yd-ds/ui/transfer";

<StoreTransfer targetKeys={storeKeys} onChange={setStoreKeys} showSearch />
<InspectorTransfer targetKeys={inspectorKeys} onChange={setInspectorKeys} />
<PermissionTransfer targetKeys={permissionKeys} onChange={setPermissionKeys} oneWay />
```

## API

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| dataSource | 数据源 | `TransferItem[]` | `[]` |
| targetKeys | 右侧已选 key | `string[]` | - |
| onChange | 穿梭回调 | `(targetKeys, direction, moveKeys) => void` | - |
| render | 自定义渲染 | `(item) => ReactNode` | - |
| titles | 左右标题 | `[ReactNode, ReactNode]` | `['源列表','目标列表']` |
| showSearch | 搜索过滤 | `boolean \| { left?, right? }` | `false` |
| searchPlaceholder | 搜索占位 | `string \| [string, string]` | `'请搜索'` |
| oneWay | 单向分配 | `boolean` | `false` |
| disabledKeys | 禁用项 | `string[]` | `[]` |
| disabled | 整体禁用 | `boolean` | `false` |
| footer | 底部统计 | `ReactNode \| (props) => ReactNode` | - |
| listStyle | 列表样式 | `CSSProperties \| [left, right]` | - |

## Design Token

| Token | CSS 变量 | 说明 |
|-------|----------|------|
| transfer-panel-width | `--transfer-panel-width` | 面板宽度 240px |
| transfer-item-height | `--transfer-item-height` | 列表项高度 32px |
| transfer-header-height | `--transfer-header-height` | 头部高度 40px |
| transfer-border-radius | `--transfer-border-radius` | 圆角 8px |
| transfer-gap | `--transfer-gap` | 间距 16px |
| transfer-title-font-size | `--transfer-title-font-size` | 标题字号 14px |

## 业务场景

| 预设 | 用途 | 示例数据 |
|------|------|----------|
| StoreTransfer | 巡检任务分配门店 | 万达广场店、环球港店、万象城店 |
| InspectorTransfer | 分配巡检员到区域 | 张伟、李娜、王磊 |
| PermissionTransfer | 角色权限配置 | 巡检管理、工单管理、报表查看 |

## 最佳实践

1. 大批量数据启用 `showSearch`，左右列表独立过滤
2. 不可操作项通过 `disabledKeys` 标记，如冻结门店/人员
3. 单向授权场景使用 `oneWay`，隐藏返回左侧按钮
4. 通过 `footer` 展示「已选 N 家门店」等统计信息
5. 支持 Checkbox 批量选择、双击单条快速移动

## 注意事项

- 双击列表项可快速穿梭（单向模式下右侧不可双击回退）
- disabled 项降低 opacity 且禁止 pointer 交互
- 所有颜色/间距/圆角均来自 Transfer Token，禁止写死样式值
