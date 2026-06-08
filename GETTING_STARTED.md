# YD Design System - 前端快速上手

> 云盯科技统一设计系统，提供标准化的 UI 组件和 Design Token，帮助前端快速搭建一致性的产品界面。

---

## 🎯 什么是 YD Design System？

YD Design System 是云盯科技的产品设计系统，包含：

- **组件库**：Button、Input、Select、Modal 等 30+ 标准化组件
- **Design Token**：颜色、字体、间距、圆角等设计变量
- **文档网站**：组件使用示例和 API 文档

**目标**：让前端不用每次从零写组件，直接拿来用，保证设计和代码的一致性。

---

## 📦 安装

### 方式一：npm 安装（推荐）

```bash
# 使用 pnpm（推荐）
pnpm add @yd-ds/ui @yd-ds/tokens

# 或者使用 npm
npm install @yd-ds/ui @yd-ds/tokens
```

### 方式二：从 GitHub 安装（开发版）

```bash
pnpm add github:yunding/yd-design-system#main
```

---

## 🚀 快速开始

### 1. 引入样式

在使用组件前，先引入设计系统的全局样式：

```tsx
// 在 app 的根组件或 _app.tsx 中引入
import '@yd-ds/ui/styles.css'
```

### 2. 使用组件

```tsx
import { Button, Input } from '@yd-ds/ui'

export default function LoginPage() {
  return (
    <div className="p-6 max-w-sm mx-auto">
      <Input placeholder="用户名" />
      <Input.Password placeholder="密码" className="mt-4" />
      <Button variant="default" className="mt-6 w-full">
        登录
      </Button>
    </div>
  )
}
```

---

## 🧩 核心组件示例

### Button 按钮

```tsx
import { Button } from '@yd-ds/ui'

// 基础用法
<Button>默认按钮</Button>

// 不同样式
<Button variant="default">主要按钮</Button>
<Button variant="destructive">危险按钮</Button>
<Button variant="outline">描边按钮</Button>
<Button variant="ghost">幽灵按钮</Button>
<Button variant="link">链接按钮</Button>

// 不同尺寸
<Button size="sm">小按钮</Button>
<Button size="default">默认</Button>
<Button size="lg">大按钮</Button>

// 加载状态
<Button loading>加载中</Button>
```

**API**

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| `variant` | 按钮样式 | `default` / `destructive` / `outline` / `secondary` / `ghost` / `link` / `dashed` | `default` |
| `size` | 按钮尺寸 | `default` / `sm` / `lg` / `icon` | `default` |
| `loading` | 加载状态 | `boolean` | `false` |
| `disabled` | 禁用状态 | `boolean` | `false` |

---

### Input 输入框

```tsx
import { Input } from '@yd-ds/ui'

// 基础输入框
<Input placeholder="请输入内容" />

// 可清空
<Input placeholder="可清空" allowClear />

// 密码输入框
<Input.Password placeholder="密码" />

// 搜索框
<Input.Search placeholder="搜索" onSearch={() => console.log('搜索')} />

// 多行文本
<Input.TextArea placeholder="请输入多行文本" maxLength={500} />
```

---

### Select 下拉选择

```tsx
import { Select } from '@yd-ds/ui'

<Select placeholder="请选择城市">
  <Select.Option value="bj">北京</Select.Option>
  <Select.Option value="sh">上海</Select.Option>
  <Select.Option value="sz">深圳</Select.Option>
</Select>
```

---

## 🎨 使用 Design Token

Design Token 是设计系统的核心，确保所有颜色、间距、字体都保持一致。

### 在 CSS 中使用

```css
/* 使用设计 token */
.card {
  background: var(--color-bg-primary);
  border-radius: var(--radius-md);
  padding: var(--spacing-4);
}
```

### 在 Tailwind 中使用

如果你们项目用了 Tailwind CSS，Design Token 已经自动集成：

```tsx
<div className="bg-primary text-primary-foreground rounded-md p-4">
  这段代码会自动使用设计系统的颜色和间距
</div>
```

### 常用 Token 清单

**颜色**
- `--color-primary`：品牌主色
- `--color-bg-primary`：主背景色
- `--color-text-primary`：主文字颜色
- `--color-border`：边框颜色

**间距**
- `--spacing-1` 到 `--spacing-12`：4px → 48px

**圆角**
- `--radius-sm`：4px
- `--radius-md`：6px
- `--radius-lg`：8px

---

## 🛠️ 进阶用法

### 1. 自定义主题

如果你们项目需要自定义主题（比如暗黑模式），Design System 已经内置支持：

```tsx
// 在根组件包裹 ThemeProvider
import { ThemeProvider } from '@yd-ds/themes'

<ThemeProvider defaultTheme="light">
  <App />
</ThemeProvider>
```

### 2. 扩展组件

如果标准组件不满足需求，可以通过 `asChild` 属性扩展：

```tsx
import { Button } from '@yd-ds/ui'
import Link from 'next/link'

// 把 Button 当成 Link 用
<Button asChild>
  <Link href="/dashboard">去控制台</Link>
</Button>
```

---

## ❓ 常见问题

### Q1：和设计稿对不上怎么办？

**A**：确保所有颜色、间距都使用 Design Token，不要硬编码。如果设计稿用了非标准的样式，先和设计系统负责人（张璐）确认是否需要新增 Token。

### Q2：组件不满足需求怎么办？

**A**：有两种方式：
1. 提 Issue 给设计系统团队，我们会评估是否加入标准组件
2. 业务自己扩展，但尽量复用设计系统的 Token

### Q3：如何反馈 Bug 或提需求？

**A**：在 GitHub 仓库提 Issue，或者直接在飞书/企微群里找 @张璐。

---

## 📚 相关资源

- **文档网站**：[yd-design-system.vercel.app](https://yd-design-system.vercel.app)（待上线）
- **GitHub 仓库**：[github.com/yunding/yd-design-system](https://github.com/yunding/yd-design-system)（待创建）
- **Figma 设计稿**：（链接待补充）

---

## 👥 维护团队

- **设计负责人**：张璐
- **前端负责人**：（待补充）
- **更新日志**：见 GitHub Releases

---

**最后更新时间**：2026-06-02
