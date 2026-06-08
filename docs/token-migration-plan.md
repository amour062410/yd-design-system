# Token 治理迁移方案（SSOT：`token.json`）

> **范围**：`packages/tokens`、`packages/themes`、`apps/docs-site/styles/showcase-tokens.css`  
> **约束**：本文档仅描述迁移方案，**不包含代码改动**。  
> **关联文档**：`packages/tokens/token-architecture.md`  
> **审计日期**：2026-06-01

---

## 0. 目标与原则

| 原则 | 说明 |
|------|------|
| **SSOT** | `packages/tokens/token.json` 为设计与数值的单一事实来源 |
| **生成物只读** | `src/generated/**`、`dist/tokens.css`（部分）、`showcase-tokens.css`（目标态）由构建产出，禁止手改 |
| **代码层保留** | 组件尺寸矩阵、文档元数据、主题运行时、HSL 转换策略保留在 TypeScript |
| **渐进迁移** | 先 Primitive → Semantic → Component 别名，最后收口文档站 CSS |

---

## 1. 现状盘点

### 1.1 `packages/tokens/src` 中所有 Token 相关文件

#### 入口与构建

| 文件 | 角色 |
|------|------|
| `index.ts` | 公共 API 聚合导出（126 行） |
| `tailwind-preset.ts` | Tailwind 扩展，引用 primitive + CSS 变量（65 行） |
| `tokens.css` | Light 默认 CSS 变量（HSL，`--primary` 等）（35 行） |

#### Primitive 层（原子）

| 文件 | 导出概要 | 与 `token.json` 关系 |
|------|----------|----------------------|
| `primitives/colors.ts` | `brandPrimary`、`neutralGray`、`functionalColors`、`textRoleColors`、`primitiveColors`（含 **slate** 刻度） | 色值与 JSON **高度重叠**；`slate` **不在 JSON** |
| `primitives/spacing.ts` | `spacing` 刻度 0–32 | 与 `spacing.scale.*` **一一对应** |
| `primitives/radius.ts` | `radius` none/sm/md/lg/xl/2xl/full | 与 `radius.*` **一一对应** |
| `primitives/typography.ts` | `fontFamily`、`fontSize`、`fontWeight`、`lineHeight` | 与 `typography.*` 大部分对应 |
| `primitives/shadows.ts` | `shadows`、`shadowTokens` | 与 `shadow.elevation.*` + `shadow.semantic.*` 对应 |

#### Semantic 层（语义）

| 文件 | 导出概要 | 与 `token.json` 关系 |
|------|----------|----------------------|
| `semantic/colors.ts` | `semanticColorsLight`、`semanticColorsDark` | JSON 有 `color.semantic.*`（8 项），但 TS 使用 **shadcn + slate** 体系，**未读 JSON** |

#### Component 层（组件 Token — 分散定义）

> **说明**：仓库中 **不存在** `component-tokens.ts`。组件 Token 分布在 `primitives/*-tokens.ts`（命名历史原因，实际为 Component 层）。

| 文件 | Token 对象 | 附带元数据 |
|------|------------|------------|
| `primitives/checkbox-tokens.ts` | `checkboxTokens` | `checkboxSizeSpecs`、`checkboxTokenRows` |
| `primitives/radio-tokens.ts` | `radioTokens` | `radioSizeSpecs` |
| `primitives/switch-tokens.ts` | `switchTokens` | `switchSizeSpecs`、`switchVariantSpecs`、`switchTokenRows` |
| `primitives/tabs-tokens.ts` | `tabsTokens` | `tabsSizeSpecs`、`tabsTokenRows` |
| `primitives/select-tokens.ts` | `selectTokens` | `selectSizeSpecs`、`selectUsageTokenNames` |
| `primitives/datepicker-tokens.ts` | `datePickerTokens` | `datePickerSizeSpecs`、`datePickerUsageTokenNames` |
| `primitives/timepicker-tokens.ts` | `timePickerTokens` | `timePickerSizeSpecs`、`timePickerUsageTokenNames` |
| `primitives/upload-tokens.ts` | `uploadTokens` | `uploadUsageTokenNames` |
| `primitives/table-tokens.ts` | `tableTokens` | `tableSizeSpecs`、`tableDesignSpecRows`、`tableBusinessSpecRows` |
| `primitives/modal-tokens.ts` | `modalTokens` | `modalSizeSpecs`、多组 `*SpecRows` |
| `primitives/drawer-tokens.ts` | `drawerTokens` | `drawerSizeSpecs`、`*SpecRows` |
| `primitives/message-tokens.ts` | `messageTokens` | `messageDesignSpecRows` |
| `primitives/link-colors.ts` | `linkColorTokens`、`linkStatusColors` | 映射 `text.link` + functional |

#### 文档 / Foundations 辅助（非运行时组件样式主路径）

| 文件 | 用途 |
|------|------|
| `color-utils.ts` | `toSwatch`、`hexToRgb` |
| `color-scales.ts` | Foundations 色板分组（引用 `brandPrimary` 等） |
| `color-palette.ts` | 扩展色板文案（Border、Accent、状态色阶梯） |
| `typography-scales.ts` | 标题/正文组合样式、文档示例字符串 |
| `container-scales.ts` | Container 状态规范、圆角/阴影引用 |

#### SSOT 源文件

| 文件 | 说明 |
|------|------|
| `token.json` | 176 个叶子 Token；**当前无任何 import/构建消费** |
| `token-architecture.md` | 架构说明（非机器可读） |

---

### 1.2 `component-tokens.ts` 调查结果

| 项 | 结论 |
|----|------|
| 路径 `packages/tokens/src/component-tokens.ts` | **不存在** |
| 路径 `packages/tokens/src/**/component-tokens.ts` | **不存在** |
| 全仓库 `component-tokens` 字符串 | **无匹配** |

**迁移建议（后续实现阶段，非本次改代码）**：

- 新增 `src/component/index.ts` 或 `src/generated/component-tokens.ts`，**聚合** 12 个 `*-tokens.ts` 的导出，作为 Component 层统一入口。
- `token.json` 扩展 `component` 节点后，生成器只写入 `src/generated/component/*.ts`，手写 `*SizeSpecs` / `*TokenRows` 保留在同目录 `*.meta.ts`。

---

### 1.3 `semantic/colors.ts` 调查结果

```text
packages/tokens/src/semantic/colors.ts  (59 行)
├── semanticColorsLight   → 引用 primitiveColors.slate + brand[500] + functionalColors
├── semanticColorsDark    → 同上暗色映射
└── SemanticColorToken    → 类型导出
```

| 观察 | 影响 |
|------|------|
| **未引用** `brandPrimary` / `neutralGray` 直接命名 | 与 Figma/`token.json` 的 Arco 灰阶脱节 |
| **未被其他包 import**（仅 `index.ts` 导出） | 实际主题色来自 `tokens.css` 的 HSL 变量，而非该对象 |
| JSON `color.semantic.*` 与 TS 对象 **无自动映射** | 双轨：JSON 8 项 vs TS 20+ 角色 |

---

### 1.4 Themes 相关配置

| 文件 | 包 | 职责 |
|------|-----|------|
| `packages/themes/src/presets.ts` | `@yd-ds/themes` | `ThemeMode`、`THEME_STORAGE_KEY`、`themePresets`（class 名） |
| `packages/themes/src/theme-provider.tsx` | `@yd-ds/themes` | `localStorage`、`.dark` class 切换（**无 Token 数值**） |
| `packages/themes/src/themes.css` | `@yd-ds/themes` | `.dark` 下 HSL 覆盖（`--primary`、`--border` 等） |
| `packages/themes/src/index.ts` | 导出 Provider + presets |

**文档站加载顺序**（`apps/docs-site/app/globals.css`）：

```text
@yd-ds/tokens/css     → packages/tokens/src/tokens.css（light 默认）
@yd-ds/themes/css     → packages/themes/src/themes.css（dark 覆盖）
showcase-tokens.css   → ~304 条 `--*` 变量（与 *-tokens.ts 重复）
```

**Tailwind 消费链**：

```text
token.json (未接入)
    → primitives/*.ts
    → tailwind-preset.ts
    → @yd-ds/ui / docs-site tailwind.config
    → class: bg-primary → hsl(var(--primary))  ← 来自 tokens.css，非 semanticColorsLight
```

---

## 2. 分析结论

### A. 与 `token.json` 重复维护的 Token

以下数据在 **JSON 与 TS/CSS 中各维护一份**，改色需多处同步：

#### A.1 Primitive 色值（重复度：高）

| token.json 路径 | 代码位置 | 备注 |
|-----------------|----------|------|
| `color.brand.primary.1–10` | `brandPrimary`、`primitiveColors.brand` | 完全同值 |
| `color.brand.interactive.*` | `showcase-tokens.css` `--color-brand-button-*` | JSON 有，TS 无集中常量 |
| `color.neutral.gray.1–10` | `neutralGray` | 完全同值 |
| `color.functional.*` | `functionalColors` | 完全同值 |
| `color.text.*` | `textRoleColors` | 完全同值 |
| `color.success/danger/warning.*` | `primitiveColors.success/destructive/warning` | 部分阶梯在 JSON，部分仅 TS |
| `color.accent.*` | `color-palette.ts` 硬编码 | JSON 与 palette **双份** Accent 30 色 |

#### A.2 Semantic 色值（重复度：高，且不一致）

| 概念 | token.json | 其他来源 | 冲突 |
|------|------------|----------|------|
| 主色 | `color.semantic.primary` | `tokens.css --primary`（HSL）、`semanticColorsLight.primary`（hex→brand）、`--color-brand` | 三套表达 |
| 主色 Hover | `semantic.primaryHover` / `brand.interactive.hover` | `--color-brand-button-hover` | 同值多路径 |
| 边框 | `color.border.default` | `semantic.border` (#d9d9d9)、`--border`（slate HSL） | **色值不一致** |
| 功能色 | `color.functional.*` | `--success`/`--warning`、`semanticColorsLight.success` | 格式不同（hex vs HSL） |

#### A.3 非颜色 Primitive（重复度：中）

| token.json | 代码 |
|------------|------|
| `spacing.scale.*` | `spacing.ts` |
| `radius.*` | `radius.ts` |
| `shadow.elevation.*` | `shadows.ts` |
| `shadow.semantic.*` | `shadowTokens` |
| `typography.fontSize/weight/lineHeight.*` | `typography.ts` |

#### A.4 Component Token（重复度：极高）

| 层 | TS 文件 | 重复 CSS |
|----|---------|----------|
| Checkbox / Radio / Switch / Tabs | `*-tokens.ts` | `showcase-tokens.css` 同名 `--*` |
| Select / DatePicker / TimePicker / Upload | 同上 | 同上 |
| Table / Modal / Drawer / Message / Link | 同上 | 同上 |

约 **304** 条 showcase CSS 变量与 **12** 个组件 Token 文件 + **link-colors** 形成 **TS 常量 → 手写 CSS** 双轨（组件实现读 CSS，文档/导出读 TS）。

#### A.5 仅存在于代码、JSON 无对应（反向重复风险）

| 代码 | 说明 |
|------|------|
| `primitiveColors.slate` | shadcn 主题用，JSON 无 |
| `modal-width-*`、`drawer-width-*` | 布局 Token，JSON 无 `component` 节点 |
| `checkbox-size-sm` 等 | 尺寸不在 JSON |
| `showcase-tokens.css` 中 `--color-surface-*`、glass 相关 | 文档站扩展，JSON 无 |

---

### B. 可以直接从 `token.json` 生成的 Token

建议由 `scripts/generate-tokens.mjs`（名称待定）输出到 `src/generated/`，并在 `index.ts` 中 re-export。

#### B.1 可 100% 自动生成（建议 Phase 1）

| 生成目标 | JSON 源 | 输出形态 |
|----------|---------|----------|
| `generated/primitives/colors.ts` | `color.brand.primary`、`neutral.gray`、`functional`、`text`、`border`、`background` | `as const` 对象 + 路径类型 |
| `generated/primitives/spacing.ts` | `spacing.scale` | 同结构 |
| `generated/primitives/radius.ts` | `radius` | 同结构 |
| `generated/primitives/shadows.ts` | `shadow.elevation` + `shadow.semantic` | `shadows` + `shadowTokens` |
| `generated/primitives/semantic-colors.json.ts` | `color.semantic.*` | 扁平常量（供 CSS 生成器使用） |
| `generated/css/primitives.css` | 上述颜色/间距/圆角 | `--color-brand-primary-6` 等 |
| `generated/foundations/color-scales.ts` | 色阶遍历 | 替代手写 `color-scales.ts` 中的 swatch 列表 |
| `generated/foundations/color-palette.ts` | `color.accent`、`warning`、`success`、`danger` | 减少 palette 硬编码 |

#### B.2 可自动生成别名/引用（建议 Phase 2）

| 生成目标 | 规则 |
|----------|------|
| `generated/component/colors.ts` | `checkbox-color-bg-checked` → `{brand.primary.6}` 解析为 hex |
| `generated/css/showcase-tokens.css` | 由 Component 颜色 Token + 尺寸 Token 合并输出 |
| `tokens.css` 的 hex→HSL | 从 `color.semantic.primary` 推导 `--primary`（需统一策略） |
| `themes.css` dark | 从 JSON 增加 `color.semantic.dark.*` 后生成 |

#### B.3 生成器输入扩展（需先改 JSON，再生成）

| JSON 待扩展 | 以便生成 |
|-------------|----------|
| `component.button.*`、`component.input.*` | Button/Input 不再只靠 Tailwind 默认 |
| `spacing.semantic.controlHeight*` | 对齐 Select/DatePicker 高度 |
| `component.modal.width.*`、`component.drawer.width.*` | 布局 Token 入 SSOT |

---

### C. 必须保留在代码层的 Token

以下类型 **不适合** 全部写入 `token.json`，或需保留 TS 逻辑：

#### C.1 结构与运行时（必须手写）

| 类别 | 文件/位置 | 原因 |
|------|-----------|------|
| 主题运行时 | `theme-provider.tsx`、`presets.ts` | React 状态、媒体查询，非静态 Token |
| Tailwind 绑定 | `tailwind-preset.ts` | 映射 `hsl(var(--primary))` 的结构固定，值来自生成 CSS |
| 颜色工具 | `color-utils.ts` | `toSwatch`、转换算法 |
| 类型导出 | 各 `*TokenKey`、`*SizeKey` | 可由生成器产出，但属于代码契约 |

#### C.2 组件尺寸与组合规格（建议保留 TS，JSON 可选补充）

| 类别 | 示例 | 原因 |
|------|------|------|
| Size Specs | `checkboxSizeSpecs`、`modalSizeSpecs`、`drawerSizeSpecs` | 含 `fontSizeKey`、`gap`、`icon` 等非 Token 字段 |
| Variant Specs | `switchVariantSpecs` | 变体逻辑组合 |
| 业务表格 | `tableBusinessSpecRows` | 业务文档，非设计原子 |
| 动画/计算 | `modal-width-fullscreen: calc(100vw - 48px)` | 表达式与上下文相关 |

#### C.3 文档元数据（保留中文描述）

| 类别 | 示例 | 原因 |
|------|------|------|
| Token 表格行 | `checkboxTokenRows`、`modalDesignSpecRows` | `description` 为文档文案 |
| 排版组合 | `typography-scales.ts` 中 `typographyGroups` | 组合样式 + 示例代码字符串 |
| Container 状态 | `container-scales.ts` | 状态名、虚线等业务语义 |

#### C.4 架构性遗留（迁移期决策，非永久）

| 类别 | 当前 | 迁移方向 |
|------|------|----------|
| `primitiveColors.slate` | shadcn 默认 | Phase 3：改为从 `neutral.gray` 生成 HSL，或 JSON 增加 `color.neutral.slate` 映射表 |
| `semanticColorsLight` | 未使用 | 删除或改为 generated + 单测快照 |
| `typography.fontFamily.figma` | 仅设计标注 | 保留在 JSON metadata，不生成到运行时 |

#### C.5 文档站专属（可保留在 apps，不纳入 SSOT）

| 位置 | 说明 |
|------|------|
| `globals.css` 中 `.glass`、动画 keyframes | 文档展示增强 |
| `showcase-tokens.css` 中 marketing 色 | 迁移后仅保留 **无法** 归入组件 Token 的变量 |

---

## 3. 目标架构（迁移后）

```text
token.json (SSOT, 人工 + Figma 导出)
        │
        ▼
scripts/generate-tokens.*  (CI + prebuild)
        │
        ├── src/generated/primitives/*.ts
        ├── src/generated/semantic/*.ts
        ├── src/generated/component/*-tokens.ts   ← 合并现状 12 文件
        ├── src/generated/css/tokens.css          ← 含 HSL 语义变量
        ├── src/generated/css/themes.dark.css
        └── apps/docs-site/styles/showcase-tokens.css (generated)
        │
        ▼
src/index.ts (re-export generated + 手写 meta)
        │
        ├── @yd-ds/tokens → UI / docs
        └── tailwind-preset.ts (读 generated)
```

**`component-tokens.ts` 目标形态**（新文件，迁移 Phase 2 创建）：

```text
src/component/index.ts          # 对外 component-tokens 入口
src/component/*.meta.ts         # 手写：SizeSpecs、TokenRows、中文 description
src/generated/component/*.ts    # 生成：纯数值对象
```

---

## 4. 分阶段迁移计划

### Phase 0：治理基线（1–2 天，无行为变更）

- [ ] 锁定 `token.json` schema 版本字段（`$metadata.version`）
- [ ] CI：`pnpm tokens:validate` 校验 JSON schema + 禁止修改 `src/generated` 手改
- [ ] 文档：本方案 + `token-architecture.md` 链接进 `packages/tokens/README.md`
- [ ] 建立 **允许手改** 文件白名单（见 §6）

### Phase 1：Primitive SSOT（3–5 天）

| 步骤 | 动作 |
|------|------|
| 1.1 | 实现 JSON → `src/generated/primitives/{colors,spacing,radius,shadows}.ts` |
| 1.2 | `primitives/colors.ts` 改为 thin re-export 或 deprecated 转发 |
| 1.3 | 生成 `generated/css/primitives.css`，`tokens.css` 仅 `@import` 生成文件 |
| 1.4 | 快照测试：生成值 === 当前 `brandPrimary[6]` 等 |

**验收**：改 `token.json` 中 `brand.primary.6` 一处，重建后 TS/CSS 全局变色。

### Phase 2：Semantic 统一（3–5 天）

| 步骤 | 动作 |
|------|------|
| 2.1 | 扩展 JSON：`color.semantic` 覆盖 success/warning/danger/info/text/surface/border |
| 2.2 | 生成 `semantic/colors.ts` 与 `tokens.css` HSL 变量（hex→HSL 单函数） |
| 2.3 | 废弃 `semanticColorsLight` 中 slate 依赖，或生成 neutral→slate 映射表 |
| 2.4 | 对齐 `themes.css` dark 与 JSON dark 节点 |

**验收**：`bg-primary` 与 `color.semantic.primary` 溯源到同一 JSON 叶子节点。

### Phase 3：Component Token（5–8 天）

| 步骤 | 动作 |
|------|------|
| 3.1 | JSON 增加 `component` 树（从现有 `*-tokens.ts` 反推导入） |
| 3.2 | 生成 `generated/component/*-tokens.ts`（仅数值） |
| 3.3 | 创建 `src/component/index.ts`（**即规划中的 component-tokens 入口**） |
| 3.4 | 生成 `showcase-tokens.css`，删除手写重复块 |
| 3.5 | UI 包逐步改为 `var(--checkbox-*)` 仅来自生成 CSS |

**验收**：`checkbox-tokens.ts` 手写的 hex 清零，仅留 `checkboxSizeSpecs` 等 meta。

### Phase 4：清理与强制（2–3 天）

- [ ] ESLint：禁止 `packages/ui` 内 `#165DFF` 字面量
- [ ] 删除重复的 `color-palette.ts` 硬编码 Accent（改为读 generated）
- [ ] Figma 导出流水线写入 `token.json`
- [ ] 归档 `primitives/colors.ts` 中 `slate` 为 deprecated

---

## 5. 文件级迁移映射表

| 现状文件 | 迁移操作 | SSOT 来源 |
|----------|----------|-----------|
| `token.json` | **保留，唯一手写源** | 设计 + Figma |
| `primitives/colors.ts` | → `generated` + 薄封装 | `color.*` |
| `primitives/spacing.ts` | → `generated` | `spacing.scale` |
| `primitives/radius.ts` | → `generated` | `radius` |
| `primitives/shadows.ts` | → `generated` | `shadow.*` |
| `primitives/typography.ts` | 部分 `generated` + 手写 resolver | `typography` |
| `semantic/colors.ts` | → `generated` | `color.semantic` + theme 映射 |
| `primitives/*-tokens.ts` (×12) | 数值 → `generated/component`；meta 保留 | `component.*`（新建） |
| `component-tokens.ts` | **新建** `component/index.ts` | 聚合导出 |
| `link-colors.ts` | → `generated/component/link.ts` | `text.link` + functional |
| `color-scales.ts` | → `generated/foundations` | 遍历 JSON |
| `color-palette.ts` | 缩为描述 overlay 或全生成 | `color.accent` 等 |
| `color-utils.ts` | **保留** | — |
| `typography-scales.ts` | **保留** meta | `typography.styles` 可选生成 |
| `container-scales.ts` | **保留** + 引用 generated 色 | `radius.lg`、`shadow.semantic` |
| `tokens.css` | → `generated/css` | semantic + primitive |
| `themes.css` | → `generated/css/themes.dark.css` | dark semantic |
| `tailwind-preset.ts` | **保留** 结构 | 引用 generated |
| `showcase-tokens.css` | → docs-site generated | component + docs 扩展 |
| `theme-provider.tsx` | **保留** | — |
| `presets.ts` | **保留** | — |

---

## 6. 手写白名单（迁移完成后仍允许编辑）

```
packages/tokens/token.json
packages/tokens/scripts/**
packages/tokens/src/color-utils.ts
packages/tokens/src/typography-scales.ts
packages/tokens/src/container-scales.ts
packages/tokens/src/component/**/*.meta.ts
packages/tokens/src/tailwind-preset.ts
packages/themes/src/theme-provider.tsx
packages/themes/src/presets.ts
apps/docs-site/app/globals.css          # 动画、glass 等
```

**禁止手写（迁移完成后）**：

```
packages/tokens/src/generated/**
packages/tokens/src/primitives/colors.ts   # 若仍存在则仅 re-export
apps/docs-site/styles/showcase-tokens.css  # 改为 generated
```

---

## 7. 风险与决策点

| 风险 | 缓解 |
|------|------|
| UI 大量依赖 `showcase-tokens.css` 而非 `@yd-ds/tokens` | Phase 3 先生成 CSS，路径不变 |
| shadcn HSL 与 hex 品牌色并存 | 单一生成管道 `hexToHsl(semantic.primary)` |
| `semanticColorsLight` 零消费 | Phase 2 删除或改为测试快照 |
| JSON 缺少 component 尺寸 | 迁移前用脚本从 TS **反灌** JSON（一次性） |
| Accent 30 色是否进 SSOT | 产品确认；不进则 JSON 标记 `deprecated` |

**需产品/设计确认的决策**：

1. Info 色：`functional.info` (#3491FA) vs 品牌蓝 (#165DFF) 统一规则  
2. 中性色：全面切到 `neutral.gray` 还是保留 `slate` 映射  
3. 圆角：全局 6px（`radius.md`）vs Drawer/Message 8px（`radius.lg`）是否写入 JSON 组件节点  

---

## 8. 验收标准（SSOT 完成定义）

- [ ] `token.json` 变更后，执行 `pnpm --filter @yd-ds/tokens build` 可更新所有 generated 产物  
- [ ] 仓库内（除 `token.json` 与 scripts）无品牌色 hex 硬编码  
- [ ] `component-tokens` 入口存在，文档与 UI 引用同一 generated CSS  
- [ ] `semantic/colors.ts` 与 `tokens.css` 同源，dark 由 JSON 驱动  
- [ ] CI 失败条件：generated 与 `token.json` 不同步（git diff check）  

---

## 9. 附录：消费方索引

| 消费方 | 引用方式 |
|--------|----------|
| `packages/ui` | `@yd-ds/tokens`（SizeSpecs、Tokens）、Tailwind `bg-primary` |
| `apps/docs-site` | `@yd-ds/tokens`、`*TokenRows`、`showcase-tokens.css`、`globals.css` |
| `packages/themes` | 仅 CSS class，无数值 Token |
| Foundations 页 | `colorScaleGroups`、`colorPaletteGroups`、`typographyGroups` |

---

*本方案为分析交付物；实施时请按 Phase 0→4 顺序执行，每阶段独立 PR。*
