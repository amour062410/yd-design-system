# Select 组件合并报告

> **执行日期**：2026-06-04  
> **依据**：`docs/component-architecture-audit.md` §7.3  
> **唯一实现来源**：`packages/ui` → `@yd-ds/ui/select`

---

## 1. 合并目标与约束

| 约束 | 执行情况 |
|------|----------|
| 保留 `packages/ui` 为唯一实现 | ✓ |
| 不改变现有 Select **公共 API**（`SelectProps` 字段未删减/重命名） | ✓ |
| 不改变视觉样式（沿用 ui 的 class、`z-30`、`rounded-md` 面板、hover 阴影） | ✓ |
| 不新增第二套 Token | ✓（仅 `@yd-ds/tokens` 的 `selectSizeSpecs` / CSS 变量） |
| 合并 Option Group、搜索、多选、清空、测试、Stories | ✓ |

---

## 2. 对比摘要

| 能力 | `packages/ui/select.tsx`（合并前） | `packages/components/select` | 合并后 `ui` |
|------|----------------------------------|----------------------------|-------------|
| 单选 / 多选 | ✓ | ✓ | ✓ |
| 搜索 | ✓ | ✓ | ✓ |
| 清空 | ✓ | ✓ | ✓ |
| 禁用 | ✓ | ✓ | ✓ |
| Placeholder | ✓ | ✓ | ✓ |
| **Option Group** | ✗ | ✓ | ✓ |
| `withCreate` | ✓ | ✗ | ✓（保留） |
| `showcaseState` / `SelectShowcase` | ✓ | ✗ | ✓（保留） |
| 选项 `disabled` | ✗ | ✓ | ✓ |
| 搜索无结果提示 | ✗ | ✓ | ✓ |
| `role="listbox"` / `role="option"` | 部分 | ✓ | ✓ |
| 单元测试 | ✗ | ✓ | ✓（迁至 ui） |
| Storybook 场景 | ✗ | ✓ | ✓（迁至 ui） |

**未并入 ui 的 API（避免破坏现有契约）**：`onOpenChange`、`defaultOpen`、`onClear`、`searchPlaceholder`、`listMaxHeight`、`id` 等 components-select 专有 props。

---

## 3. 代码变更说明

### 3.1 `packages/ui/src/components/select.tsx`

- 新增类型：`SelectOptionGroup`、`SelectOptionsInput`（`options` 仍兼容 `string` / 扁平 `SelectOption`）
- 新增 `parseSelectOptions()` 并导出
- `SelectOption` 增加可选 `disabled?: boolean`
- 分组渲染：无搜索关键词时按 Group 展示；搜索时扁平过滤
- 保留：`showcaseState`、`withCreate`、多选默认 demo 值、`SelectShowcase`、`DEFAULT_SELECT_OPTIONS`
- 无障碍：搜索框 `aria-label="请搜索"`；列表 `role="listbox"` / `role="option"`

### 3.2 测试与 Stories（迁入 ui）

| 文件 | 说明 |
|------|------|
| `packages/ui/src/components/select.test.tsx` | 6 个 Vitest 用例 |
| `packages/ui/src/components/select.stories.tsx` | Basic / Multiple / Searchable / Disabled / Clearable / GroupedOptions |
| `packages/ui/vitest.config.ts` | Vitest + jsdom |
| `packages/ui/package.json` | `test` 脚本与 devDependencies |

### 3.3 文档站

| 文件 | 说明 |
|------|------|
| `apps/docs-site/app/components/select/select-showcase.tsx` | 新增 **Grouped Options** 区块 |
| `apps/docs-site/lib/data/selectMock.ts` | `SELECT_GROUPED_DEMO_OPTIONS`、类型标签、代码示例 |
| 移除 `@yd-ds/components-select` 依赖 | `package.json` |

---

## 4. B. 保留文件清单

### 运行时组件（唯一源）

```
packages/ui/src/components/select.tsx
packages/ui/src/components/select.test.tsx
packages/ui/src/components/select.stories.tsx
packages/ui/vitest.config.ts
```

### Token（既有体系，未新增包内 Token 文件）

```
packages/tokens/src/primitives/select-tokens.ts
apps/docs-site/styles/showcase-tokens.css   # --select-* 变量
```

### 文档与 Showcase（官方入口）

```
apps/docs-site/app/components/select/page.tsx
apps/docs-site/app/components/select/select-showcase.tsx
apps/docs-site/lib/data/selectMock.ts
```

### 业务消费（未改 import 路径）

```
apps/docs-site/app/business-patterns/certificate-management/certificate-management-view.tsx
  → @yd-ds/ui/select
```

---

## 5. C. 已删除文件清单

### 整包移除

```
packages/components/select/          # 含 Select.tsx、select-tokens.ts、测试、Stories、dist
packages/components/               # 空目录已删除
```

### 平行 Showcase 移除

```
apps/docs/select-showcase/
apps/docs-site/app/select-showcase/page.tsx
```

### 配置清理

```
apps/docs-site/package.json        # 移除 @yd-ds/components-select
apps/docs-site/tsconfig.json       # 移除 ../docs/select-showcase include
pnpm-workspace.yaml                # 移除 packages/components/*
```

---

## 6. 验证命令

```bash
pnpm install
pnpm --filter @yd-ds/ui build
pnpm --filter @yd-ds/ui test
pnpm --filter docs-site typecheck
```

文档页：**http://localhost:3000/components/select**（含 Grouped Options）

---

## 7. 合并后架构

```text
token.json / @yd-ds/tokens (select-tokens.ts)
        ↓
showcase-tokens.css (--select-*)
        ↓
@yd-ds/ui/select  ← 唯一 Select 实现
        ↓
docs-site / business-patterns
```

**禁止再引用**：`@yd-ds/components-select`、`/select-showcase` 路由。

---

## 7. 后续建议（可选）

1. 在根 `turbo.json` / CI 中增加 `pnpm --filter @yd-ds/ui test`  
2. 若启用 Storybook，入口指向 `packages/ui/src/components/select.stories.tsx`  
3. 按 `docs/token-migration-plan.md` 将 `select-tokens` 与 `token.json` 对齐生成

---

*合并完成；仓库内仅保留一套 Select 实现。*
