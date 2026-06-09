# Menu 导航菜单

企业后台导航组件，支持 **Horizontal（顶部导航）** 与 **Vertical（侧边栏导航）** 两种模式。

## 安装

```tsx
import { Menu } from "@yd-ds/ui/menu";
```

## 基本用法

### Vertical 侧边栏

```tsx
<Menu
  mode="vertical"
  items={[
    { key: "assign", label: "任务分配" },
    {
      key: "records",
      label: "巡检记录",
      children: [
        { key: "daily", label: "日常巡检" },
        { key: "special", label: "专项巡检" },
      ],
    },
  ]}
  selectedKeys={selectedKeys}
  openKeys={openKeys}
  onSelect={(info) => setSelectedKeys(info.selectedKeys)}
  onOpenChange={setOpenKeys}
/>
```

### Horizontal 顶部导航

```tsx
<Menu
  mode="horizontal"
  items={[
    { key: "home", label: "首页" },
    { key: "inspection", label: "巡检管理" },
    { key: "store", label: "门店管理" },
  ]}
  selectedKeys={[activeKey]}
  onSelect={(info) => setActiveKey(info.key)}
/>
```

### 收缩侧边栏

```tsx
<Menu
  mode="vertical"
  collapsed
  items={sidebarItems}
  selectedKeys={selectedKeys}
  onSelect={(info) => setSelectedKeys(info.selectedKeys)}
/>
```

## API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| mode | 布局模式 | `'horizontal' \| 'vertical'` | `'vertical'` |
| items | 菜单数据 | `MenuItemConfig[]` | `[]` |
| selectedKeys | 当前选中项 | `string[]` | - |
| defaultSelectedKeys | 默认选中项 | `string[]` | `[]` |
| openKeys | 当前展开子菜单 | `string[]` | - |
| defaultOpenKeys | 默认展开子菜单 | `string[]` | `[]` |
| onSelect | 选中回调 | `(info: SelectInfo) => void` | - |
| onOpenChange | 展开/折叠回调 | `(keys: string[]) => void` | - |
| collapsed | 收缩状态 | `boolean` | `false` |
| collapsedWidth | 收缩宽度 | `number` | `48` |
| expandIcon | 自定义展开图标 | `ReactNode \| (props) => ReactNode` | - |
| overflowedIndicator | 水平溢出指示器 | `ReactNode` | `···` |
| theme | 主题 | `'light' \| 'dark'` | `'light'` |

### MenuItemConfig

| 属性 | 说明 | 类型 |
| --- | --- | --- |
| key | 唯一标识 | `string` |
| label | 文案 | `ReactNode` |
| icon | 图标 | `ReactNode` |
| children | 子菜单 | `MenuItemConfig[]` |
| disabled | 禁用 | `boolean` |
| type | 类型 | `'item' \| 'group' \| 'subMenu'` |

## Design Token

| Token | 说明 | 默认值 |
| --- | --- | --- |
| `--menu-item-height` | 菜单项高度 | `40px` |
| `--menu-item-padding-inline` | 水平内边距 | `16px` |
| `--menu-icon-size` | 图标尺寸 | `16px` |
| `--menu-collapsed-width` | 收缩宽度 | `48px` |
| `--menu-highlight-color` | 选中主色 | `#165DFF` |
| `--menu-highlight-bg` | 选中背景 | `rgba(22,93,255,0.06)` |
| `--menu-hover-bg` | Hover 背景 | `rgba(0,0,0,0.04)` |
| `--menu-active-bar-width-vertical` | 竖向指示条 | `3px` |
| `--menu-active-bar-width-horizontal` | 横向下划线 | `2px` |
| `--menu-sub-menu-inline-indent` | 子菜单缩进 | `24px` |

## 业务场景

| 模式 | 用途 | 示例 |
| --- | --- | --- |
| 顶部导航 | 一级模块 | 首页 / 巡检管理 / 门店管理 / 报表中心 / 系统设置 |
| 侧边栏 | 二级功能 | 任务分配 / 巡检计划 / 巡检记录 / 问题整改 |
| 权限菜单 | 角色可见性 | 超级管理员 / 区域经理 / 巡检员 |
| 收缩侧边栏 | 高密度后台 | 仅图标 + Tooltip |

## 最佳实践

1. **顶部只放一级模块**，二级功能放在 Vertical 侧边栏。
2. **items 配置驱动**，避免在业务页面手写多层嵌套 DOM。
3. **收缩模式必须带 icon**，否则 Tooltip 无法提供有效信息。
4. **选中态与路由同步**，用 `selectedKeys` 受控绑定当前 pathname。
5. **分组用 `type: 'group'`**，仅做视觉分隔，不参与选中逻辑。
