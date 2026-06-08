# Modal 组件开发报告

**日期**：2026-06-01  
**范围**：`packages/ui` · 文档 `/components/modal`  
**约束**：不新建组件包，仅使用 `@yd-ds/ui` 与现有 Token 体系。

## 目标

基于 YD Design System 实现 Modal，参考 Ant Design / Arco Design，与 Button、Input、Select、Tabs 风格一致：

- 品牌色 `#165DFF`（`--modal-info-color`）
- 默认圆角 `6px`（`--modal-radius`）
- Token 来自 `@yd-ds/tokens` + `showcase-tokens.css`

## 交付物

| 路径 | 说明 |
|------|------|
| `packages/ui/src/components/modal/modal.tsx` | 主组件与子组件、业务 Pattern |
| `packages/ui/src/components/modal/modal.types.ts` | 类型定义 |
| `packages/ui/src/components/modal/modal-tokens.ts` | Token 重导出 + `modalCssVars` |
| `packages/ui/src/components/modal/modal.test.tsx` | Vitest |
| `packages/ui/src/components/modal/modal.stories.tsx` | Storybook |
| `packages/ui/src/components/modal.tsx` | 构建入口 re-export |
| `apps/docs-site/app/components/modal/` | 文档与 Showcase |
| `docs/component-development/modal-report.md` | 本报告 |

## 功能矩阵

| 能力 | 实现 |
|------|------|
| Basic Modal | `Modal` + `ModalHeader` / `Body` / `Footer` |
| Confirm Modal | `ConfirmModal` |
| Info / Success / Warning / Error | `ConfirmModal` + `type` |
| Footer 自定义 | `footer` / `ModalFooter` children |
| Header 自定义 | `header` 属性 |
| Esc 关闭 | `keyboard`（默认 true） |
| Mask 点击关闭 | `maskClosable`（默认 true） |
| Loading | `loading` 内容遮罩 + `ModalFooter` loading |
| Destroy On Close | `destroyOnClose`（默认 true；false 时保留挂载） |

## 文档页（必选区块）

`/components/modal` 顶部展示：

1. Basic  
2. Confirm  
3. Success  
4. Error  
5. Loading  
6. Custom Footer  
7. Custom Header  

保留原有 Usage、Pattern、Design Spec 等扩展章节。

## API 增量

```tsx
<Modal
  keyboard?: boolean      // Esc，默认 true
  destroyOnClose?: boolean // 默认 true
  loading?: boolean
  header?: ReactNode      // 自定义 Header
  maskClosable?: boolean
  // 既有：open, onClose, size, type, title, footer, ...
/>
```

## 验证

```bash
pnpm --filter @yd-ds/ui build
pnpm --filter @yd-ds/ui test
pnpm --filter docs-site exec tsc --noEmit
```

## 后续建议

- `useModal` / `Modal.confirm()` 命令式 API（可选）
- Focus trap 与初始焦点管理（a11y）
- 与 `token.json` SSOT 自动同步脚本
