# Drawer 组件开发报告

**日期**：2026-06-01  
**范围**：`packages/ui` · 文档 `/components/drawer`  
**约束**：不新建组件包，仅使用 `@yd-ds/ui` 与现有 Token 体系。

## 目标

基于 YD Design System 实现 Drawer，参考 Ant Design / Arco Design，与 Modal 交互规范一致：

- 品牌色 `#165DFF`（`--drawer-brand-color`）
- 默认圆角 `6px`（`--drawer-radius`，与 Modal 对齐）
- Token 来自 `@yd-ds/tokens` + `showcase-tokens.css`

## 交付物

| 路径 | 说明 |
|------|------|
| `packages/ui/src/components/drawer/drawer.tsx` | 主组件与业务 Pattern |
| `packages/ui/src/components/drawer/drawer-push.tsx` | Push 模式容器 |
| `packages/ui/src/components/drawer/drawer.types.ts` | 类型 |
| `packages/ui/src/components/drawer/drawer-tokens.ts` | Token 重导出 |
| `packages/ui/src/components/drawer/drawer.test.tsx` | Vitest |
| `packages/ui/src/components/drawer/drawer.stories.tsx` | Storybook |
| `packages/ui/src/components/drawer.tsx` | 构建 re-export |
| `docs/component-development/drawer-report.md` | 本报告 |

## 功能矩阵

| 能力 | 实现 |
|------|------|
| Left / Right / Top / Bottom | `placement` |
| Custom Header / Footer | `header` · `footer` |
| Esc 关闭 | `keyboard`（默认 true） |
| Mask 关闭 | `maskClosable`（默认 true） |
| Loading | 内容遮罩 + `DrawerFooter` loading |
| Destroy On Close | `destroyOnClose`（默认 true） |
| Push 模式 | `push` + `DrawerPushContainer` |
| Nested Drawer | `level` + `NestedUserDrawerFlow` |

## 文档页（必选区块）

`/components/drawer`：

1. Basic  
2. Placement  
3. Nested  
4. Loading  
5. Custom Footer  
6. Push  
7. Custom Header  

## API 增量

```tsx
<DrawerPushContainer>
  <main>...</main>
  <Drawer
    push
    keyboard
    destroyOnClose
    header={...}
    level={2}
  />
</DrawerPushContainer>
```

## 验证

```bash
pnpm --filter @yd-ds/tokens build
pnpm --filter @yd-ds/ui build
pnpm --filter @yd-ds/ui test
pnpm --filter docs-site exec tsc --noEmit
```

## Token 变更

- `drawer-radius`：8px → `radius.md`（6px）
- `showcase-tokens.css`：`--drawer-radius: 6px`
