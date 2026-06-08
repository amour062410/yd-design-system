# Tabs 组件开发报告

**日期**：2026-06-01  
**范围**：`packages/ui` · 文档 `/components/tabs`  
**约束**：不新建组件包，仅使用 `@yd-ds/ui` 与现有 Token 体系。

## 目标

基于 YD Design System 规范实现 Tabs，参考 Ant Design / Arco Design 能力，并与 Button、Input、Select 视觉一致：

- 品牌色 `#165DFF`
- 默认圆角 `6px`（`radius.md` → `--tabs-card-radius`）
- 使用 `@yd-ds/tokens` 中 `tabs-tokens` + `showcase-tokens.css` CSS 变量

## 交付物

| 路径 | 说明 |
|------|------|
| `packages/ui/src/components/tabs/tabs.tsx` | 主组件：`Tabs`、`TabShowcase`、`TabPanel` |
| `packages/ui/src/components/tabs/tabs.types.ts` | 类型定义 |
| `packages/ui/src/components/tabs/tabs-tokens.ts` | 重导出 tokens + `tabsCssVars` 映射 |
| `packages/ui/src/components/tabs/tabs.test.tsx` | Vitest 单元测试 |
| `packages/ui/src/components/tabs/tabs.stories.tsx` | Storybook 场景 |
| `packages/ui/src/components/tabs.tsx` | 构建入口 re-export（保持 `@yd-ds/ui/tabs` 路径不变） |
| `apps/docs-site/app/components/tabs/` | 文档页与 Showcase |
| `docs/component-development/tabs-report.md` | 本报告 |

## 功能矩阵

| 能力 | 实现方式 |
|------|----------|
| Line Tabs | `type="line"` + 底部指示条 |
| Card Tabs | `type="card"` + 6px 圆角容器/标签 |
| Segment Tabs | `type="segment"`（保留，与既有文档/抽屉演示兼容） |
| Disabled Tab | `item.disabled` + `TabShowcase state="disabled"` |
| Icon Tab | `item.icon` |
| Closable Tab | `closable` / `item.closable` + `onTabClose` |
| Editable Tabs | `editable` + `onTabAdd`（+ 按钮） |
| Overflow Tabs | `overflow` + 横向滚动与左右翻页 |

## Token 与样式

- **SSOT**：`packages/tokens/src/primitives/tabs-tokens.ts`
- **文档站 CSS**：`apps/docs-site/styles/showcase-tokens.css` 增加 `--tabs-card-radius: 6px`
- **UI 层**：`tabs-tokens.ts` 从 `@yd-ds/tokens` 重导出，避免第二套数值

## 文档页结构

`/components/tabs` 展示区块：

1. Basic  
2. Card  
3. Disabled  
4. Icon  
5. Closable  
6. Editable  
7. Overflow  

另含 Development Usage、Token Usage。

## API（增量）

```tsx
<Tabs
  items={TabsItem[]}
  type="line" | "card" | "segment"
  size="sm" | "md" | "lg"
  closable?
  editable?
  overflow?
  onTabClose?(key)
  onTabAdd?()
  // 既有：activeKey, defaultActiveKey, onChange, disabled, className
/>
```

向后兼容：`TabShowcase`、`DEFAULT_TABS_ITEMS`、`TabsType` 等导出未移除。

## 验证

```bash
pnpm --filter @yd-ds/ui build
pnpm --filter @yd-ds/ui test
pnpm --filter docs-site exec tsc --noEmit
```

## 后续建议

- 将 `TabPanel` 与内容区联动示例补入文档（可选）
- 键盘导航（Arrow/Home/End）与 roving tabindex（a11y 增强）
- SSOT `token.json` 与 `tabs-tokens` 自动同步（Token 治理阶段）
