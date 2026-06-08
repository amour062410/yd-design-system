# YD Design System

企业级 Design System 单体仓库，基于 **Turborepo** + **Next.js** + **React** + **TypeScript** + **Tailwind CSS** + **shadcn/ui**。

## 目录结构

```
yd-design-system/
├── apps/
│   └── docs-site/          # 组件文档与展示站 (Next.js)
├── packages/
│   ├── tokens/             # Design Token（Primitive + Semantic）
│   ├── themes/             # 主题系统（亮/暗/系统）
│   ├── ui/                 # 组件库（shadcn/ui 架构）
│   └── typescript-config/  # 共享 TS 配置
├── package.json
├── pnpm-workspace.yaml
└── turbo.json
```

## 快速开始

```bash
pnpm install
pnpm build
pnpm dev
```

文档站默认运行在 [http://localhost:3000](http://localhost:3000)。

## 添加新组件（shadcn CLI）

在 `packages/ui` 目录执行：

```bash
cd packages/ui
pnpm dlx shadcn@latest add <component-name>
```

然后在 `src/index.ts` 中导出新组件，并在 `apps/docs-site` 添加对应文档页。

## 包说明

| 包 | 说明 |
|---|---|
| `@yd-ds/tokens` | 颜色、间距、字体等 Design Token；导出 CSS 变量与 Tailwind preset |
| `@yd-ds/themes` | `ThemeProvider`、暗色模式 CSS 覆盖 |
| `@yd-ds/ui` | 可复用 React 组件，供业务与文档站引用 |

## 部署到 Vercel

1. 导入本仓库
2. **Root Directory** 设为 `apps/docs-site`（或使用根目录 `vercel.json`）
3. Framework Preset: **Next.js**
4. Install: `cd ../.. && pnpm install`
5. Build: `cd ../.. && pnpm turbo run build --filter=docs-site`

## 技术架构

- **Token 分层**：Primitive → Semantic → CSS Variables → Tailwind Theme
- **主题**：`ThemeProvider` + `class` 策略暗色模式
- **组件**：CVA 变体 + Radix Slot，兼容 shadcn 生态
- **构建**：Turborepo 任务编排，包间 `dependsOn: ^build`

## License

MIT
