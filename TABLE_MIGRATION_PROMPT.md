# Table 组件页面开发指令

请基于 YD Design System 的设计规范和现有页面结构，开发 Table 组件的文档页面。

---

## 当前项目状态

Foundation 已完成：
- Colors
- Text
- Container
- Grid

Components 已完成：
- Button
- Link
- Input
- Checkbox
- Radio
- Switch
- Tabs
- Select
- Date Picker
- Time Picker
- Upload
- Card

**现在开始开发：Table**

---

## 项目架构

```
packages/tokens          # Design Token
packages/themes          # 主题配置
packages/ui              # 组件库
apps/docs-site           # 文档网站
```

---

## 参考页面

开发 Table 页面时，请严格参考以下页面的代码结构和实现方式：

1. **Button 页面**（主要参考）：
   - 文件路径：`apps/docs-site/app/components/button/page.tsx`
   - 参考点：
     - `ComponentDocHeader` 的使用方式
     - `ComponentPreview` 包裹展示区域
     - `ApiTable` API 文档表格
     - `CodeBlock` 代码示例
     - `DesignTokenShowcase` Token 展示
     - 页面整体结构：Header → Usage → 变体展示 → API → Props 类型 → Token Usage

2. **Link 页面**（参考 Token 复制功能）：
   - 文件路径：`apps/docs-site/app/components/link/page.tsx`
   - 参考点：
     - Token 点击复制功能
     - `CopyCodeBlock` 代码复制块

---

## 开发任务

### 1. 检查并完善 Table 组件

先检查 `packages/ui/src/components/` 是否已有 `table.tsx`：
- 如果已存在，检查是否完整（是否有所有变体、尺寸、状态）
- 如果不存在，新建组件

Table 组件需要支持的功能（基于设计稿）：

#### 基础功能
- 数据行展示（多列）
- 行选择（Checkbox）
- 表头
- 斑马纹（可选）

#### 两种尺寸
- **Regular**：默认尺寸，行高较高，适合内容较多的场景
- **Small**：紧凑尺寸，行高较小，适合页面空间紧张的场景

#### 状态标签
- 状态列支持带颜色标签（如"正在运行"用绿色点）
- 标签组件复用现有 Tag 或自定义

#### 操作列
- 文字链接操作（编辑、删除、更多）
- 图标按钮操作（查看、编辑、删除等）
- 下拉菜单操作（更多操作）

#### 筛选区域
- 搜索输入框
- 下拉筛选（状态筛选等）
- 筛选按钮

#### 分页
- 页码导航
- 页码按钮样式

#### 总结/合计行
- 表格底部支持总结行

### 2. 新建/完善文档页面

文件路径：`apps/docs-site/app/components/table/page.tsx`

页面结构必须包含以下 Section（按顺序）：

```
1. ComponentDocHeader（标题 + 描述）
2. Usage（引入代码示例）
3. 尺寸展示（Regular / Small）
   - 用 ComponentPreview 包裹
   - Regular：展示完整表格（含选择框、状态标签、操作列、筛选、分页、总结行）
   - Small：展示紧凑表格
4. 基础控件展示
   - 操作列的不同形态：文字链接 / 图标按钮 / 下拉菜单
5. API 文档（ApiTable）
6. Props 类型（CodeBlock）
7. Token Usage（DesignTokenShowcase 或自定义 Token 复制列表）
8. Development Usage（CopyCodeBlock）
```

### 3. 导航接入

确保侧边栏导航能访问到 Table 页面：
- 检查 `apps/docs-site/components/components-sidebar.tsx` 或相关导航配置
- 在 Components 分组下添加 Table 入口

---

## Token 接入要求

**禁止硬编码任何颜色值、字号、间距、圆角、阴影。**

所有样式必须通过 Token 引用：

| Token 类型 | 引用路径 |
|-----------|---------|
| 颜色 | `packages/tokens/src/primitives/colors.ts` |
| 字体 | `packages/tokens/src/primitives/typography.ts` |
| 圆角 | `packages/tokens/src/primitives/radius.ts` |
| 阴影 | `packages/tokens/src/primitives/shadows.ts` |
| 间距 | `packages/tokens/src/primitives/spacing.ts`（如有）|

表格相关 Token 示例：
- `--table-header-bg`：表头背景
- `--table-row-hover`：行悬停背景
- `--table-border`：表格边框
- `--table-cell-padding`：单元格内边距
- `--table-font-size`：表格字号

---

## 页面内容要求（基于设计稿）

### Section 1: 标题和描述

```
title: "Table"
description: "表格组件以行和列的形式展示结构化数据，便于比较和分析。支持排序、筛选、分页和可自定义列，适合清晰管理和展示大数据集。"
```

### Section 2: Regular 尺寸展示

展示一个完整的 Regular 尺寸表格，包含：
- 表头：选择框、模板名称、标签、状态、可以撤销、操作
- 数据行（5-6 行示例数据）
- 每行包含：
  - 选择框（Checkbox）
  - 模板名称（文本）
  - 标签（Tag 组件，如"门店"、"收银台"、"人员管理"）
  - 状态（带颜色圆点的文本，如"正在运行"绿色）
  - 可以撤销（文本）
  - 操作（编辑 / 删除 / 更多下拉）
- 筛选行（搜索框 + 下拉筛选 + 筛选按钮）
- 新增按钮行（"+ 增加数据源"）
- 总结行
- 分页器

### Section 3: Small 尺寸展示

展示一个 Small 尺寸的紧凑表格，包含：
- 同样的列结构
- 更小的行高和字号
- 精简的操作按钮
- 分页器

### Section 4: 基础控件展示

展示操作列的不同形态：

**操作 - 文字链接形态**
- 表头带排序图标
- 单元格内展示：编辑 / 删除 / 更多 ∨

**操作 - 下拉菜单形态**
- 点击"模板名称"表头，展示下拉筛选面板
- 包含：搜索框、选项列表（模板一、模板二）、分组
- 确定 / 重置 按钮

**操作 - 图标按钮形态**
- 展示四个图标按钮：查看、编辑、删除、更多（+）

**操作 - 带进度条形态**
- 展示进度条（绿色进度）
- 状态文本："正在运行" + "暂停更新"
- 百分比数字

### Section 5: API 文档

Table 组件的 Props：

| Prop | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| dataSource | `object[]` | `[]` | 表格数据源 |
| columns | `ColumnType[]` | `[]` | 列配置 |
| size | `"default" \| "small"` | `"default"` | 表格尺寸 |
| bordered | `boolean` | `false` | 是否展示边框 |
| rowSelection | `object` | - | 行选择配置 |
| pagination | `object \| false` | - | 分页配置 |
| summary | `(currentData) => ReactNode` | - | 总结栏 |
| onChange | `function` | - | 表格变化回调 |
| loading | `boolean` | `false` | 加载状态 |
| scroll | `object` | - | 滚动配置 |

ColumnType：
| Prop | 类型 | 说明 |
|------|------|------|
| title | `ReactNode` | 列标题 |
| dataIndex | `string` | 数据字段名 |
| key | `string` | 唯一标识 |
| render | `function` | 自定义渲染 |
| width | `number \| string` | 列宽 |
| align | `"left" \| "center" \| "right"` | 对齐方式 |
| sorter | `boolean \| function` | 排序配置 |
| filters | `object[]` | 筛选配置 |

### Section 6: Token Usage

展示表格相关 Token（点击复制）：

- `table-bg`
- `table-header-bg`
- `table-row-hover-bg`
- `table-border-color`
- `table-cell-padding-regular`
- `table-cell-padding-small`
- `table-font-size-regular`
- `table-font-size-small`
- `table-row-height-regular`
- `table-row-height-small`

### Section 7: Development Usage

展示代码示例：

```tsx
import { Table, Tag, Space } from "@yd-ds/ui";

const columns = [
  {
    title: "模板名称",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "标签",
    dataIndex: "tags",
    key: "tags",
    render: (tags) => (
      <>
        {tags.map((tag) => (
          <Tag key={tag}>{tag}</Tag>
        ))}
      </>
    ),
  },
  {
    title: "状态",
    dataIndex: "status",
    key: "status",
    render: (status) => (
      <span className="flex items-center gap-1">
        <span className="h-2 w-2 rounded-full bg-success" />
        {status}
      </span>
    ),
  },
  {
    title: "操作",
    key: "action",
    render: () => (
      <Space>
        <Link>编辑</Link>
        <Link>删除</Link>
      </Space>
    ),
  },
];

const data = [
  { key: "1", name: "123456778898", tags: ["门店", "收银台"], status: "正在运行" },
  // ...
];

export default function Demo() {
  return <Table columns={columns} dataSource={data} />;
}
```

---

## 风格统一要求

页面必须与其他组件页面保持完全一致：

1. **页面标题**：用 `ComponentDocHeader`，包含 title 和 description
2. **Section 标题**：统一用 `text-2xl font-semibold tracking-tight`
3. **Section 描述**：统一用 `text-sm text-muted-foreground`
4. **展示卡片**：用 `ComponentPreview` 包裹，或直接用 `rounded-md border bg-card px-6 py-8`
5. **页面间距**：外层容器统一用 `space-y-12`
6. **Section 间距**：内部用 `space-y-4`
7. **代码块**：用 `CodeBlock` 或 `CopyCodeBlock`
8. **API 表格**：用 `ApiTable`
9. **Token 展示**：用 `DesignTokenShowcase` 或自定义复制列表（参考 Link 页面）

---

## 注意事项

1. **不要引入新的依赖**：使用项目已有的组件和工具（lucide-react、@radix-ui、class-variance-authority 等）
2. **复用现有组件**：
   - Checkbox 用 `@yd-ds/ui` 的 Checkbox
   - Tag 用 `@yd-ds/ui` 的 Tag（或基于 Token 自定义）
   - Link 用 `@yd-ds/ui` 的 Link
   - Input 用 `@yd-ds/ui` 的 Input
   - Select 用 `@yd-ds/ui` 的 Select
3. **数据用 mock 数据**：在 `apps/docs-site/lib/data/` 下创建 `tableMock.ts` 存放示例数据
4. **样式用 Tailwind + Token**：禁止写死 px 值，通过 Token 或 Tailwind 类名

---

## 输出文件清单

开发完成后，确保以下文件存在且完整：

1. `packages/ui/src/components/table.tsx` — Table 组件
2. `apps/docs-site/app/components/table/page.tsx` — Table 文档页面
3. `apps/docs-site/app/components/table/` — 页面相关子组件（如有）
4. `apps/docs-site/lib/data/tableMock.ts` — Mock 数据
5. 导航配置已更新，侧边栏可访问 Table 页面

---

## 验证清单

开发完成后，请确认：

- [ ] Table 组件能正常渲染两种尺寸（Regular / Small）
- [ ] 表格包含选择框、标签、状态、操作列
- [ ] 操作列支持文字链接、图标按钮、下拉菜单形态
- [ ] 筛选区域正常展示
- [ ] 分页器正常展示
- [ ] 总结行正常展示
- [ ] 所有颜色、字号、间距来自 Token，无硬编码
- [ ] 页面风格与 Button、Link 页面一致
- [ ] Token Usage 区域支持点击复制
- [ ] Development Usage 区域展示代码示例
- [ ] 侧边栏导航可访问 Table 页面
