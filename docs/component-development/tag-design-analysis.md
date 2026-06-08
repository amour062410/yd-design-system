# Tag 组件设计分析报告

> **状态：** 一期已完成（2026-06-01）  
> **推导来源：** `packages/tokens` + Button / Select + Table 业务 Tag + YD Design 规范  
> **不依赖 Figma MCP**（额度受限，规格由现有设计系统反推）

---

## 0. 目标与范围

### 0.1 组件目标

在 `packages/ui` 中新增通用 **Tag** 与 **TagGroup**，统一当前散落在 Table 业务套件中的标签实现，并作为巡检场景状态切换的基础组件。

### 0.2 API 范围（确认后实现）

| 维度 | 枚举 |
|------|------|
| `variant` | `solid` · `light` · `outline` |
| `status` | `primary` · `success` · `warning` · `danger` · `info` · `default` |
| `size` | `sm` · `md` · `lg` |

附加能力：

- `TagGroup`：`none` · `single` · `multiple` · **`segmented`**（滑块高亮 + Count + 键盘导航）· 可横向滚动
- 业务预设：`RiskLevelTag` · `StoreStatusTag` · `InspectionStatusTag`（薄封装，**内部映射 `variant="light"`**）

### 0.4 审阅补充（已纳入）

**调整一 — 默认 variant**

| 层级 | 默认 variant | 说明 |
|------|--------------|------|
| **Tag 基础组件** | **`outline`** | 保持中立，不带业务色彩 |
| **业务预设** | **`light`（内部）** | `InspectionStatusTag` / `RiskLevelTag` / `StoreStatusTag` 自行映射 |

**调整二 — TagGroup `segmented` 模式**

用于状态切换：全部 / 异常 / 待整改 / 整改中 / 已完成

- 单选
- 滑块高亮（segment track + 白色 indicator）
- Count 支持
- 键盘：`ArrowLeft/Right` · `Home` · `End`
- 目标替换：`InspectionQuickFilter` · `RiskFilterBar` · `StoreStatusSwitcher`（二期）

**开发优先级：** Tag → TagGroup → Segmented → InspectionStatusTag → RiskLevelTag → StoreStatusTag

### 0.3 不在本期范围

- Figma Code Connect 同步
- `token.json` 全量回写（仅新增 `tag-tokens.ts`）
- 改造所有 Table 业务文件（二期迁移）

---

## 1. 参考了哪些已有组件

### 1.1 `packages/tokens`（优先级最高）

| 参考模块 | 继承内容 |
|----------|----------|
| `primitives/colors.ts` | `brandPrimary[1..10]`、`functionalColors`、`neutralGray`、`primitiveColors.success/warning/destructive/info[50]` |
| `token.json` | `color.success/warning/danger` 的 `default/hover/active/muted`；`color.brand.interactive.tint`；`color.text.*`；`color.border.default` |
| `primitives/radius.ts` | `sm(4px)` · `md(6px)` · `lg(8px)` · `full` |
| `primitives/typography.ts` + `token.json` typography | `font-size-xs/sm`、`font.caption.*`、`fontWeight medium` |
| `spacing.semantic` + `token.json` | `controlHeightSM(24)` · `marginXS(8)` · `buttonPaddingHorizontalSM(7)` |
| `container-scales.ts` | **选中 / 成功 / 警告 / 危险 / 提示** 容器的「描边 + 浅底」组合 → **light / outline** 变体直接对标 |

`token-architecture.md` 已标明 **Tag / Badge 无专用 Token**——本期在 `packages/tokens/src/primitives/tag-tokens.ts` 补齐。

### 1.2 Button（`packages/ui/src/components/button.tsx`）

| 借鉴点 | Tag 映射 |
|--------|----------|
| `cva` + `VariantProps` 变体架构 | `tagVariants` 同样使用 `class-variance-authority` |
| `variant: default` → 实色底 + 反色字 | → **`solid`** |
| `variant: outline` → 边框 + 透明/浅底 | → **`outline`** |
| `size: sm/md/lg` 高度阶梯 | Tag 尺寸按比例**缩小**（Tag 非主操作控件） |
| `rounded-md`（6px） | Tag 默认 `radius-md` |
| `transition-colors` · `focus-visible:ring-2` | 可点击 Tag / TagGroup 项继承无障碍焦点环 |
| `inline-flex items-center gap-2` | Tag 内部图标 + 文案布局 |

Button **不直接复用** `buttonVariants`，避免语义混淆（Tag 默认非按钮语义）。

### 1.3 Select（`packages/tokens/src/primitives/select-tokens.ts`）

| Select 规格 | Tag 推导 |
|-------------|----------|
| `sm` 高 32px · `md` 40px · `lg` 48px | Tag 整体**低于** Select，避免与表单控件抢视觉权重 |
| `select-radius: radius.md (6px)` | Tag 默认圆角与 Select 一致 |
| `select-option-selected: brandPrimary[1]` | TagGroup **选中态**浅底参考此色 |
| `fontSizeKey: xs / sm / base` 随尺寸变化 | Tag `sm→xs` · `md→xs/sm` · `lg→sm` |

### 1.4 Table 中的 Tag 使用场景

| 现有实现 | 文件 | 现状模式 | 统一后策略 |
|----------|------|----------|------------|
| 巡检状态 | `inspection-status-tag.tsx` | `light` 风格：8% 透明度底 + 功能色字 + 可选图标 | → `Tag variant="light"` + `status` 映射 |
| 快捷筛选 | `inspection-quick-filter.tsx` | 可点击 Tag 组：`h-8` · 边框 · 选中高亮 · Count Badge | → **`TagGroup mode="segmented"`**（二期替换） |
| 风险等级 | `store-risk-level-tag.tsx` | `light` + 圆点指示器 | → `RiskLevelTag` 预设 |
| 整改状态 | `rectification-status-tag.tsx` | `light` · `text-xs` · 硬编码 hex | → 归入 `StoreStatusTag` 或独立 rectification 预设 |
| 证照风险 | `table-business-patterns.tsx` `RiskLevelTag` | 证照域 expired/warning/normal | 保留证照域实现；门店域用新 `RiskLevelTag` 预设 |
| 状态 Tab | `StatusTabs` | 文字 Tab + count，无胶囊边框 | TagGroup **filter** 模式可对齐此交互 |

**共性提取：**

- 业务 Tag **100% 使用 light 变体**（浅底 + 彩色字），与表格信息密度匹配
- 筛选 Tag **outline + 选中 primary 浅底**，高度 `32px (h-8)`
- 圆角使用 `--table-radius`（与全局 `radius-md` 对齐）
- 字号以 **12–13px** 为主

### 1.5 YD Design 规范

| 规范项 | 值 | Tag 应用 |
|--------|-----|----------|
| 品牌主色 | `#165DFF`（Primary-6） | `status="primary"` |
| 默认圆角 | `6px`（`radius-md`） | `md` / `lg` 默认；`sm` 可用 `4px` 更紧凑 |
| 功能色 | Success `#00B42A` · Warning `#FF7D00` · Danger `#F53F3F` · Info `#3491FA` | 四态 status |
| 8px 间距网格 | `marginXS = 8px` | TagGroup `gap-2`；Tag 水平 padding 为 4 的倍数 |
| 企业级极简 | 低阴影、浅底优先 | 默认推荐 `light`，慎用 `solid` |

---

## 2. 继承了哪些 Token

### 2.1 计划新增 `tag-tokens.ts`

```ts
// packages/tokens/src/primitives/tag-tokens.ts（拟）
export const tagTokens = {
  "tag-radius-sm": radius.sm,      // 4px
  "tag-radius-md": radius.md,      // 6px
  "tag-height-sm": "24px",
  "tag-height-md": "28px",
  "tag-height-lg": "32px",
  "tag-padding-x-sm": "6px",
  "tag-padding-x-md": "8px",
  "tag-padding-x-lg": "10px",
  "tag-gap": "4px",
  "tag-font-size-sm": "12px",
  "tag-font-size-md": "12px",
  "tag-font-size-lg": "14px",
  "tag-font-weight": "500",
};
```

CSS 变量前缀：`--tag-*`，在 `packages/ui` 的 Tag 样式中引用，与 Button 的 Tailwind 语义类并存。

### 2.2 色彩 Token 映射表

#### Status → 语义色源

| status | 主色 Token | 浅底 Token（light） | 边框 Token（outline） |
|--------|------------|---------------------|------------------------|
| `primary` | `color.brand.interactive.primary` `#165DFF` | `color.brand.primary-1` `#E8F0FF` / `brand.interactive.tint` `#EAF2FF` | `color.brand.interactive.primary` |
| `success` | `color.functional.success` `#00B42A` | `color.success.muted` `rgba(0,180,42,0.05)` / `success.50` `#E8FFEA` | `color.functional.success` |
| `warning` | `color.functional.warning` `#FF7D00` | `color.warning.5` `#FFF7E8` / `rgba(255,125,0,0.1)` | `color.functional.warning` |
| `danger` | `color.functional.danger` `#F53F3F` | `color.danger.muted` `rgba(245,63,63,0.05)` / `destructive.50` `#FFECE8` | `color.functional.danger` |
| `info` | `color.functional.info` `#3491FA` | `color.accent.3.muted` / `info.50` | `color.functional.info` |
| `default` | `color.text.secondary` `rgba(0,0,0,0.65)` | `color.neutral.gray-2` `#F7F8FA` | `color.border.default` `#E5E6EB` |

#### Variant → 色彩组合逻辑

| variant | 背景 | 文字 | 边框 |
|---------|------|------|------|
| **solid** | status 主色 | `color.text.inverse` / `#FFFFFF` | 无 |
| **light** | status 浅底（muted / 50 色阶） | status 主色 | 无 |
| **outline** | `transparent` 或 `background.container` | status 主色 | 1px status 主色或 `border.default`（default 态） |

与 Button 对齐的交互色（可点击 Tag）：

| 状态 | solid | light | outline |
|------|-------|-------|---------|
| hover | 主色 → `*.hover` | 浅底透明度 +2% | 边框 → 主色 hover |
| active | 主色 → `*.active` | 浅底加深 | 边框 active |
| disabled | `*.disabled` + `opacity-50` | 灰底 `gray-2` + `text.disabled` | 灰边框 |

### 2.3 圆角 Token

| size | radius Token | 值 | 理由 |
|------|--------------|-----|------|
| `sm` | `tag-radius-sm` / `radius.sm` | **4px** | 紧凑标签，对齐 `borderRadiusSM` |
| `md` | `tag-radius-md` / `radius.md` | **6px** | 默认；与 Button / Select 一致 |
| `lg` | `tag-radius-md` | **6px** | 仅增高字号与 padding，圆角不放大（避免「按钮化」） |

### 2.4 字体 Token

| size | fontSize | lineHeight | fontWeight | 对标 |
|------|----------|------------|------------|------|
| `sm` | `12px` (`font-size-xs`) | `16px` | `500` | `font.caption.1` |
| `md` | `12px` | `20px` | `500` | 现有 `InspectionStatusTag` `text-xs` |
| `lg` | `14px` (`font-size-sm`) | `22px` | `500` | `Base/Regular` Figma 标注 |

字体族：`var(--font-sans)` → Inter / PingFang SC 栈（与全局一致）。

### 2.5 间距 Token

| size | height | paddingX | gap（图标） | 对标 |
|------|--------|----------|-------------|------|
| `sm` | **24px** (`controlHeightSM`) | **6px** | 4px | 表格内密集标签 |
| `md` | **28px** | **8px** | 4px | 默认；接近 `InspectionQuickFilter` 视觉密度 |
| `lg` | **32px** (`controlHeight`) | **10px** | 6px | 筛选栏 / 强调标签；对齐 `h-8` 筛选按钮 |

垂直 padding 由 `height - lineHeight` 推算，使用 `inline-flex items-center` 居中（与 Button 相同）。

---

## 3. Variant 设计逻辑

### 3.1 设计原则

Tag 的三种 variant 与 Button 三种视觉层级对应，但**降低对比度与尺寸**，服务「分类 / 状态 / 筛选」而非「主操作」。

```
视觉权重：solid  >  outline  >  light
基础组件默认：outline（中立）
业务预设默认：light（语义色）
使用频率：light（业务） > outline（基础） > solid（强调）
```

### 3.2 `solid` — 实色标签

**场景：** 强调计数、关键状态角标、空状态引导（少量使用）

| 属性 | 规则 |
|------|------|
| 背景 | status 主色 100% |
| 文字 | 白色 |
| 边框 | 无 |
| 阴影 | 无（区别于 Button `shadow-sm`） |

参考：Button `variant="default"`，去掉 shadow 与 hover 位移。

### 3.3 `light` — 浅色标签（业务预设默认，非基础组件默认）

**场景：** 表格状态列、风险等级、整改状态——**业务组件内部使用**

| 属性 | 规则 |
|------|------|
| 背景 | status muted / 50 色阶（5%–12% 透明度） |
| 文字 | status 主色 |
| 边框 | 无 |

参考：

- `container-scales.ts` → `container.state.success/warning/danger/info`
- 现有 `InspectionStatusTag` / `StoreRiskLevelTag` 硬编码 rgba → **收拢为 Token**

业务预设统一 `variant="light"`，与现有 Table 业务视觉无缝迁移。

### 3.4 `outline` — 描边标签（基础组件默认）

**场景：** 通用分类标签、TagGroup 未选中项、保持中性的基础展示

| 属性 | 规则 |
|------|------|
| 背景 | 透明或 `background.container` |
| 文字 | `color.text.secondary`（未选中）/ status 主色（选中） |
| 边框 | `1px solid color.border.default`（未选中）/ status 主色（选中） |

参考：

- Button `variant="outline"`
- `InspectionQuickFilter` 非激活态：`border table-border` + 次要文字色

### 3.5 Variant × Status 矩阵（18 组合）

全部组合均合法；推荐用法标注 ⭐：

|  | primary | success | warning | danger | info | default |
|--|---------|---------|---------|--------|------|---------|
| **solid** | ⭐ 计数徽章 | 完成强调 | 慎用 | ⭐ 告警强调 | 信息强调 | 少用 |
| **light** | ⭐ 进行中 | ⭐ 已完成 | ⭐ 待处理 | ⭐ 异常 | ⭐ 说明 | ⭐ 中性 |
| **outline** | ⭐ 筛选选中 | 筛选 | 筛选 | 筛选 | 筛选 | ⭐ 筛选默认 |

---

## 4. Size 设计逻辑

### 4.1 尺寸阶梯推导

Tag 高度刻意 **≤ Button sm (32px)**，并 **< Select sm (32px) 的内边距视觉**：

```
Button:  sm 32px · default 36px · lg 40px
Select:  sm 32px · md 40px · lg 48px
Tag:     sm 24px · md 28px · lg 32px   ← 新阶梯
```

推导依据：

1. 现有 `InspectionStatusTag`：`text-xs` + `py-0.5` ≈ **22–24px** 视觉高度 → `sm`
2. 现有 `InspectionQuickFilter` 按钮：`h-8` = **32px** → `lg` / TagGroup 项
3. `StoreRiskLevelTag`：`text-[13px]` ≈ **26–28px** → `md`

### 4.2 默认尺寸

| 上下文 | 推荐 size |
|--------|-----------|
| Table 单元格内 | `sm` |
| 表格工具栏 / 筛选 | `md` 或 `lg` |
| TagGroup 巡检状态切换 | `lg`（对齐现有 `h-8` 筛选按钮） |
| 页面标题旁辅助标签 | `md` |

**组件默认：`size="md"`，`variant="outline"`**

### 4.3 图标与关闭按钮

| size | 图标尺寸 | 圆点指示器 |
|------|----------|------------|
| `sm` | `12px` | `6px` |
| `md` | `14px` | `6px` |
| `lg` | `14px` | `8px` |

与 Button `[&_svg]:size-4` 相比缩小一级，避免 Tag 图标「按钮化」。

---

## 5. TagGroup 设计逻辑

### 5.1 组件职责

`TagGroup` 管理**一组可交互 Tag**，用于巡检状态切换、列表筛选，合并：

- `InspectionQuickFilter`（胶囊 + Count + 横向滚动）
- `StatusTabs`（文字 Tab + count）

### 5.2 模式

| mode | 行为 | ARIA | 参考 |
|------|------|------|------|
| **`segmented`** | 单选 + **滑块高亮** + Count + 键盘导航 | `role="tablist"` + `role="tab"` | `InspectionQuickFilter` / Tabs segment |
| `single` | 单选，outline/light 切换 | `role="tablist"` | 胶囊筛选 |
| `multiple` | 多选 toggle | `role="group"` + `aria-pressed` | Toggle 组 |
| `none` | 纯展示容器 | `role="list"` | 多个静态 Tag（outline） |

### 5.2.1 `segmented` 规格

| 属性 | 值 |
|------|-----|
| Track 背景 | `tag-segment-track` `#F2F3F5` |
| Indicator | 白色 + `shadow-sm`，`transition left/width 200ms` |
| 选中文字 | `tag-primary` `#165DFF` |
| 默认尺寸 | `size="lg"`（32px，对齐 `h-8` 筛选栏） |
| 键盘 | `ArrowLeft/Right/Up/Down` · `Home` · `End` |
| Count | 选中：primary 实心徽章；未选中：灰底 |

### 5.3 可滚动

```text
flex flex-nowrap gap-2 overflow-x-auto
```

与 `InspectionQuickFilter` 一致；窄屏下筛选 Tag 不换行。

### 5.4 TagGroup 项样式

| 状态 | variant 映射 |
|------|--------------|
| 未选中 | `outline` + `status="default"` |
| 选中（single/multiple） | `light` + `status="primary"` 或继承项配置 |
| 含 count | 右侧 `solid` mini 徽章或圆形 Count（复用 QuickFilter 逻辑） |

选中态 Token：

- 边框：`--table-action-color` / `brandPrimary[6]`
- 背景：`--table-row-selected-bg` / `brandPrimary[1]`
- 文字：`--table-action-color`

与现有 `InspectionQuickFilter` **像素级对齐**，便于二期替换。

### 5.5 TagGroup API（拟）

```tsx
<TagGroup
  mode="single"           // single | multiple | none
  value={string | string[]}
  onChange={...}
  scrollable
  items={[
    { value: "all", label: "全部", count: 128 },
    { value: "pending", label: "待开始", count: 25, status: "warning" },
  ]}
/>
```

---

## 6. 业务预设设计

### 6.1 `InspectionStatusTag`（迁移为预设）

| 业务 status | Tag status | variant | 图标 |
|-------------|------------|---------|------|
| `pending` | `warning` | `light` | `CircleDashed` |
| `in_progress` | `primary` | `light` | `Loader2`（spin） |
| `completed` | `success` | `light` | `CheckCircle2` |
| `overdue` | `danger` | `light` | `Clock3` |
| `cancelled` | `default` | `light` | `Ban` |

实现：`InspectionStatusTag` → 内部 `<Tag variant="light" … icon={…} />`，保持现有 API。

### 6.2 `RiskLevelTag`（门店巡检域）

| level | Tag status | 前缀 |
|-------|------------|------|
| `high` | `danger` | 圆点 |
| `medium` | `warning` | 圆点 |
| `low` | `success` | 圆点 |

与 `store-risk-level-tag.tsx` 对齐；证照域 `RiskLevelTag`（expired/warning/normal）保持独立，避免破坏性改动。

### 6.3 `StoreStatusTag`（门店经营态）

新增预设，服务门店/证照/巡检公共场景：

| storeStatus | 文案 | Tag status |
|-------------|------|------------|
| `open` | 营业中 | `success` |
| `closed` | 停业 | `default` |
| `rectifying` | 整改中 | `warning` |
| `risk` | 风险门店 | `danger` |
| `offline` | 未上线 | `info` |

参考：证照管理页门店类型 Tag（直营店/旗舰店）→ 使用 `outline` + `primary` 的 `light` 变体作为子类型标签。

---

## 7. 文件结构（确认后开发）

```text
packages/tokens/src/primitives/tag-tokens.ts      # 新增 Token
packages/ui/src/components/tag/
  tag.tsx                                         # Tag + tagVariants
  tag-group.tsx                                   # TagGroup
  tag-presets/
    inspection-status-tag.tsx                     # 迁移
    risk-level-tag.tsx                            # 门店域预设
    store-status-tag.tsx                          # 新增
  tag.test.tsx
  tag.stories.tsx
apps/docs-site/app/components/tag/
  page.tsx
  tag-demos.tsx
```

导出：

- `@yd-ds/ui` → `Tag` · `TagGroup`
- `@yd-ds/ui/tag` 或主入口 — 业务预设保持 `@yd-ds/ui/table` 重导出（兼容期）

---

## 8. 迁移与兼容策略

| 阶段 | 动作 |
|------|------|
| **一期** | 新增 Tag / TagGroup / tag-tokens；业务预设内部改调 Tag，**对外 API 不变** |
| **二期** | `InspectionQuickFilter` 内部改用 `TagGroup` |
| **三期** | 文档站新增 `/components/tag`；侧边栏接入 |
| **四期** | `token.json` 回写 `component.tag.*` |

---

## 9. 风险与待确认项

| # | 问题 | 建议默认 |
|---|------|----------|
| 1 | `md` 高度 28px 还是 32px？ | **28px** 为默认标签；**32px** 仅 TagGroup |
| 2 | `solid` / `light` 是否作为 Tag 默认？ | **否**，基础 Tag 默认 **`outline`**；业务预设内部用 `light` |
| 3 | 证照 `RiskLevelTag` 是否合并？ | **否**，双预设并存 |
| 4 | `StoreStatusTag` 枚举是否覆盖整改态？ | 覆盖 `rectifying`，与 `RectificationStatusTag` 可共存 |
| 5 | Tag 是否支持 `closable`？ | **已支持**（`closable` + `onClose`） |

---

## 10. 开发检查清单

- [x] 用户确认本分析报告（含 outline 默认 + segmented 模式）
- [x] 新增 `tag-tokens.ts` 并导出
- [x] 实现 `Tag`（默认 `outline`）
- [x] 实现 `TagGroup`（single / multiple / segmented / scrollable）
- [x] 实现三个业务预设（内部 `light`）
- [x] 单元测试 + Storybook
- [x] 文档页 `/components/tag` + 侧边栏导航
- [x] `pnpm build` + test 通过

---

## 附录：与 Button 体系对照总表

| 维度 | Button | Tag（推导） |
|------|--------|-------------|
| 主色 | `bg-primary` | `status="primary"` + `solid` |
| 描边 | `variant="outline"` | `variant="outline"` |
| 浅底 | `secondary` / `accent` | `variant="light"` |
| 圆角 | `rounded-md` 6px | `radius-md` 6px |
| 字号 | `text-sm` 14px | `12–14px` 随 size |
| 高度 | 32–40px | **24–32px** |
| 字重 | `font-medium` 500 | `font-medium` 500 |

---

**审阅已通过。** 实现路径：`@yd-ds/ui/tag`；证照域 `RiskLevelTag`（expired/warning/normal）仍从 `@yd-ds/ui/table` 业务 patterns 导出，门店域 `RiskLevelTag` 从 `@yd-ds/ui/tag` 导出。
