# Badge 组件设计分析报告

> **状态：** 待审阅（先分析后开发）  
> **推导来源：** `packages/tokens` + Tag / Progress / Table 业务 + 云盯巡检场景  
> **不依赖 Figma MCP**（额度受限时由现有设计系统反推）

---

## 0. 目标与范围

### 0.1 组件定位（铁三角）

```text
┌─────────────┬──────────────────────┬─────────────────────────┐
│  Tag        │  Progress            │  Badge                  │
│  状态       │  进度                │  数量与提醒              │
├─────────────┼──────────────────────┼─────────────────────────┤
│  待整改     │  整改完成率 82%      │  待整改 (12)            │
│  高风险     │  风险处理率 40%      │  高风险 (8)             │
│  进行中     │  巡检覆盖率 86%      │  待巡检 (36)            │
│  离散枚举   │  连续百分比          │  计数 / 红点 / 溢出提醒  │
└─────────────┴──────────────────────┴─────────────────────────┘
```

**Badge 不负责：**

- 表达业务流程状态文案（→ `Tag` / `InspectionStatusTag`）
- 表达完成比例或健康度（→ `Progress` / Business Progress Pack）

**Badge 负责：**

- 数字提醒（Count Badge）
- 未读 / 在线状态点（Dot Badge）
- 紧凑状态标记（Status Badge）
- 卡片角标促销/告警（Ribbon Badge）

### 0.2 API 范围（确认后实现）

| 维度 | 枚举 |
|------|------|
| `type` | `dot` · `count` · `status` · `ribbon` |
| `status` | `default` · `primary` · `success` · `warning` · `danger` · `info` |
| `size` | `sm` · `md` · `lg`（文档：小 / 中 / 大） |

附加能力：

| 能力 | 说明 |
|------|------|
| `count` | 显示数字 |
| `maxCount` | 最大显示值，默认 `99` |
| `overflowCount` | 溢出文案，默认 `"99+"` |
| `showZero` | `count=0` 时是否展示，默认 `false` |
| `dot` | 强制圆点模式（无数字） |
| `pulse` | 圆点呼吸动画（新告警提醒） |

组合模式：

- **独立 Badge**：`<Badge count={12} status="warning" />`
- **附着模式**：`<Badge count={3}><Button>消息</Button></Badge>`（右上角偏移）

业务预设（薄封装）：

- `InspectionBadge` · `RiskBadge` · `RectificationBadge` · `NotificationBadge`

### 0.3 不在本期范围

- Figma Code Connect 同步
- `token.json` 全量回写（仅新增 `badge-tokens.ts`）
- 全量改造 `TagGroup.TagCount` / `InspectionQuickFilter`（二期迁移）
- Badge 作为 Tag 内部子元素以外的表单控件

### 0.4 开发优先级

1. `badge-tokens.ts` + 基础 `Badge`
2. Dot / Count 模式 + 附着容器
3. Status / Ribbon 模式
4. 四个业务预设
5. 文档页 `/components/badge`（全中文）
6. **集成验收**：路由 · 左侧菜单 · 顶栏 · 搜索 · 首页快速入口

---

## 1. 继承哪些 Token

### 1.1 `packages/tokens` 直接继承

| 参考模块 | 继承内容 | Badge 映射 |
|----------|----------|------------|
| `primitives/colors.ts` | `brandPrimary[6]` `#165DFF` | `status="primary"` 填充 |
| | `functionalColors` success/warning/danger/info | 四态语义色 |
| | `neutralGray[4/5/6]` | `default` 底 / 禁用灰 |
| `primitives/radius.ts` | `full` | Count / Dot 胶囊圆角 |
| | `md` `6px` | Ribbon 折角、Status 圆角 |
| `primitives/typography.ts` | `fontSize` xs / caption | Count 数字 `11–12px` |
| `tag-tokens.ts` | `tag-primary` 等语义色 | **复用色值源**，独立 `badge-*` 命名空间 |
| `progress-tokens.ts` | `progress-trend-*` 动画时长 | `pulse` 动画参考 `200ms` |

`tag-figma-analysis.md` 已注明 **Tag / Badge 无专用 Token**——本期在 `badge-tokens.ts` 补齐（与 Tag 并列，不合并键名）。

### 1.2 建议 `badge-tokens.ts` 规格

```text
badge-height-sm           16px      # Count 胶囊高度
badge-height-md           18px
badge-height-lg           20px
badge-min-width-sm        16px      # 单数字圆形
badge-padding-x           6px       # 双位数字水平内边距
badge-font-size-sm        10px
badge-font-size-md        11px
badge-font-size-lg        12px
badge-dot-sm              6px
badge-dot-md              8px
badge-dot-lg              10px
badge-border-color        #FFFFFF   # 附着模式描边，与宿主分离
badge-offset-x/y          2px       # 右上角偏移
badge-primary             #165DFF
badge-success             #00B42A
badge-warning             #FF7D00
badge-danger              #F53F3F
badge-info                #3491FA
badge-default-bg          #E5E6EB
badge-default-text        rgba(0,0,0,0.65)
badge-ribbon-height       22px
badge-pulse-duration      200ms
```

### 1.3 尺寸阶梯（Badge 小于 Tag）

| 尺寸 | Count 高度 | Dot 直径 | 字号 | 典型场景 |
|------|-----------|----------|------|----------|
| **小** | 16px | 6px | 10px | 表格 Tab、侧栏图标 |
| **中** | 18px | 8px | 11px | 默认；筛选 Tag 附属 |
| **大** | 20px | 10px | 12px | 驾驶舱入口、顶栏提醒 |

> Badge 高度**显著低于** Tag（24–32px），避免与状态标签混淆。

---

## 2. 与 Tag 的关系

### 2.1 职责边界

| 场景 | 错误用法 | 正确用法 |
|------|----------|----------|
| 表格列「整改状态」 | `<Badge>待整改</Badge>` | `<RectificationStatusTag />` |
| 筛选「全部 (128)」数字 | 手写 `<span>` 灰底圆角 | `<Badge type="count" count={128} />` |
| 菜单「待整改」旁数量 | 在 Tag 文案里拼 `(12)` | Tag 文案 + 独立 Count Badge |
| TagGroup segmented Count | `TagCount` 私有组件 | 内部改调 `<Badge type="count" />`（二期） |

### 2.2 现有可迁移实现

| 文件 | 现状 | 迁移目标 |
|------|------|----------|
| `tag-group.tsx` · `TagCount` | 灰/蓝圆角数字，无 `maxCount` | `Badge type="count"` |
| `inspection-quick-filter.tsx` | 按钮内 `rounded-full` count | `Badge` 附着或内联 count |
| `table-business-patterns.tsx` · `StatusTabs` | 文案后缀 `(12)` | 可选 `Badge` 内联（二期） |

### 2.3 组合示例

```text
[ 待整改 ]  (12)     ← Tag + Badge，非 Tag 一体化
[ 全部 ]    128      ← TagGroup segmented + Badge count
🔔          ●         ← IconButton + Badge dot pulse
```

---

## 3. 与 Progress 的关系

| 维度 | Progress | Badge |
|------|----------|-------|
| 主信息 | 百分比 / 流程段 | 整数 count |
| 视觉 | 条 / 环 / 分段 | 圆点 / 胶囊数字 / 丝带 |
| 溢出 | 无 | `99+` |
| 动画 | 宽度 / stroke 过渡 | `pulse` 呼吸点 |
| 共存 | 驾驶舱卡片底部进度条 | 卡片标题角「新告警 99+」 |

**禁止**用 Progress 展示「待整改 12 项」——那是 Badge 或辅助文案，不是进度比例。

---

## 4. 与 Table / 云盯业务的关系

### 4.1 业务场景地图

```text
StoreInspectionDemo V3
├── StatusTabs「全部 30」        → Count Badge（或保持文本，二期统一）
├── InspectionQuickFilter        → 每项 count Badge
├── 侧栏「巡检」入口             → Dot / Count 提醒
└── 概览卡片角标                 → Ribbon「高风险」

任务巡检表 InspectionTable
├── 快捷筛选 待开始 (25)         → InspectionBadge
└── 批量操作栏                   → 选中数 Badge

消息 / 告警中心
└── 新告警 (99+)                 → NotificationBadge + overflowCount
```

### 4.2 巡检业务数量场景（用户给定）

| 场景 | 展示 | 预设 | status 建议 |
|------|------|------|-------------|
| 待整改（12） | Count | `RectificationBadge` | `warning` |
| 高风险（8） | Count | `RiskBadge` | `danger` |
| 已逾期（3） | Count | `InspectionBadge` variant | `danger` |
| 待巡检（36） | Count | `InspectionBadge` | `primary` |
| 新告警（99+） | Count + overflow | `NotificationBadge` | `danger` + `pulse` |

### 4.3 与 Business Progress Pack 分工

| 指标 | 组件 |
|------|------|
| 待整改 **12 项**（数量） | `RectificationBadge` |
| 整改完成率 **82%**（比例） | `RectificationProgress` |
| 高风险 **8 家**（数量） | `RiskBadge` |
| 风险处理率 **40%**（比例） | `RiskHandlingProgress` |

---

## 5. 四种类型设计

### 5.1 Dot Badge（圆点徽标）

**用途：** 未读、在线、新事件，不展示具体数字。

| 属性 | 说明 |
|------|------|
| `dot` | `true` 时忽略 count |
| `pulse` | 新告警呼吸动画 |
| 附着 | 图标按钮、头像、侧栏项右上角 |

```tsx
<Badge dot pulse status="danger">
  <Bell />
</Badge>
```

**规格：** 实心圆 + 2px 白描边（附着时与宿主分离）；`sm` 6px / `md` 8px / `lg` 10px。

### 5.2 Count Badge（数字徽标）

**用途：** 筛选 Tab、列表项、菜单提醒的主形态。

| 属性 | 默认 | 说明 |
|------|------|------|
| `count` | — | 当前数量 |
| `maxCount` | `99` | 超过后显示 overflow |
| `overflowCount` | `"99+"` | 溢出文案 |
| `showZero` | `false` | 0 是否展示 |

```tsx
<Badge count={128} maxCount={99} status="primary" />
// → 99+

<Badge count={12} status="warning" showZero />
```

**规格：** `rounded-full` · `tabular-nums` · `font-medium` · 单数字 min-width 等于高度（正圆）。

### 5.3 Status Badge（状态徽标）

**用途：** 极短状态词或单字标记（「新」「热」「逾」），**不是**完整 Tag 文案。

| 与 Tag 区别 | Status Badge | Tag |
|-------------|--------------|-----|
| 字数 | 1–2 字 | 完整短语 |
| 尺寸 | 16–20px 高 | 24–32px 高 |
| 场景 | 角标、行内标记 | 表格状态列 |

```tsx
<Badge type="status" status="danger">逾</Badge>
```

### 5.4 Ribbon Badge（丝带徽标）

**用途：** 卡片 / 封面角标（「新品」「高风险」「推荐」）。

```tsx
<Badge type="ribbon" status="danger" text="高风险" />
<Card>...</Card>
```

**规格：**

- 右上角三角折叠丝带
- 高度约 `22px`，字号 `11px`，字重 `500`
- 背景随 `status` 变化；`primary` 品牌蓝 `#165DFF`

---

## 6. 业务预设设计

### 6.1 设计原则

与 `InspectionStatusTag` / `RectificationProgress` 一致：

- 薄封装，内置中文与默认 `status`
- 对外只暴露业务语义 props
- 禁止业务页硬编码色值

### 6.2 `RectificationBadge`

```tsx
<RectificationBadge count={12} />
// 内部：label 可选展示「待整改」+ Badge count warning
```

| Prop | 说明 |
|------|------|
| `count` | 待整改数量 |
| `showLabel` | 默认 `false`；`true` 时渲染「待整改」文案 + Badge |
| `pulse` | 有新增整改时呼吸提醒 |

### 6.3 `RiskBadge`

```tsx
<RiskBadge count={8} level="high" />
// level: high → danger · medium → warning · low → success
```

### 6.4 `InspectionBadge`

```tsx
<InspectionBadge count={36} variant="pending" />
// variant: pending → primary「待巡检」
//          overdue → danger「已逾期」
```

### 6.5 `NotificationBadge`

```tsx
<NotificationBadge count={120} pulse />
// 默认 maxCount=99 → 99+，danger + pulse
```

附着模式：

```tsx
<NotificationBadge count={120}>
  <IconButton icon={Bell} />
</NotificationBadge>
```

---

## 7. 组件结构（确认后开发）

```text
packages/tokens/src/primitives/badge-tokens.ts
packages/ui/src/components/badge/
  badge.tsx                    # Badge 主组件 + BadgeWrapper
  badge.styles.ts              # status → 填充/描边
  badge.types.ts
  badge-tokens.ts              # CSS 变量 re-export
  badge-presets/
    inspection-badge.tsx
    risk-badge.tsx
    rectification-badge.tsx
    notification-badge.tsx
  badge.test.tsx
  badge.stories.tsx
packages/ui/src/components/badge.tsx   # @yd-ds/ui/badge barrel
```

导出：

- `@yd-ds/ui/badge` — `Badge` + 业务预设
- `@yd-ds/ui/table` — 兼容 re-export（可选）

---

## 8. 文档页规划（全中文）

路径：`/components/badge`

| 区块 | 标题 |
|------|------|
| 页头 | **Badge 徽标** |
| 说明 | 一句组件定位（数量与提醒） |
| | **数字徽标** — count / maxCount / 99+ / showZero |
| | **圆点徽标** — dot / pulse / 附着图标 |
| | **状态徽标** — 单字标记 |
| | **丝带徽标** — 卡片角标 |
| | **尺寸规格** — 小 / 中 / 大 |
| | **巡检业务示例** — 五个业务场景 mock |
| | **设计规范** — Token 卡片 |
| | **属性说明** — API 表 |

**巡检业务示例区内容：**

```text
待整改（12）   RectificationBadge
高风险（8）    RiskBadge
已逾期（3）    InspectionBadge variant=overdue
待巡检（36）   InspectionBadge variant=pending
新告警（99+）  NotificationBadge
```

---

## 9. 集成验收清单（开发完成后必做）

> 参照 Progress / Tag 集成教训：**代码完成 ≠ 文档站可达**。

| # | 检查项 | 配置位置 | 验收标准 |
|---|--------|----------|----------|
| 1 | 路由 | `app/components/badge/page.tsx` | `/components/badge` 可访问 |
| 2 | 组件左侧菜单 | `lib/component-navigation.ts` | `Badge 徽标` · `ready: true` |
| 3 | 顶栏导航 | `lib/site-navigation.ts` | 经「组件」前缀可达 |
| 4 | 全局搜索 | `components/docs-search.tsx` | 收录 `badge` / `徽标` |
| 5 | 首页快速入口 | `components/home/home-quick-links.tsx` | 含 Badge 链接 |
| 6 | `showcase-tokens.css` | `--badge-*` 变量注入 | 文档展示色一致 |
| 7 | `@yd-ds/ui/badge` | `package.json` exports + `tsup` | 构建通过 |

### 9.1 预期 Integration Report 输出模板

```text
Progress 页面：N/A（Badge 独立页）
Badge 页面：/components/badge
左侧菜单：组件 → Badge 徽标
顶部导航：组件（前缀匹配）
搜索关键词：badge、徽标、数字徽标、待整改
首页：快速入口 → 徽标
```

---

## 10. 迁移与兼容

| 阶段 | 动作 |
|------|------|
| **一期** | 新增 Badge + 预设 + 文档 + 全量集成验收 |
| **二期** | `TagCount` → `Badge`；`InspectionQuickFilter` count 统一 |
| **三期** | `StatusTabs` 可选 Badge 模式；`token.json` 回写 |

---

## 11. 风险与待确认项

| # | 问题 | 建议默认 |
|---|------|----------|
| 1 | `status` 用 `primary` 还是 `default` 表示品牌蓝？ | 计数默认 **`primary`**；中性灰用 **`default`** |
| 2 | Status Badge 与 Tag 是否合并？ | **否**，尺寸与语义不同 |
| 3 | Ribbon 是否支持左侧角？ | 一期仅 **右上角** |
| 4 | 附着 Badge 偏移基准 | 宿主右上角 `translate(40%, -40%)` |
| 5 | `InspectionBadge` 与 `InspectionStatusTag` 并存？ | **是**；Tag 表状态，Badge 表数量 |
| 6 | 业务预设是否进「巡检业务组件」菜单？ | **否**；进 `/components/badge` 业务示例区；预设从 `@yd-ds/ui/badge` 导出 |

---

## 12. 开发检查清单

- [ ] 用户确认本分析报告
- [ ] 新增 `badge-tokens.ts` 并导出
- [ ] 实现 `Badge`（dot / count / status / ribbon）
- [ ] 实现附着模式 + `pulse` + `overflowCount`
- [ ] 实现四个业务预设
- [ ] 文档页 `/components/badge`（全中文结构）
- [ ] **集成验收**（路由 / 菜单 / 搜索 / 首页）
- [ ] 输出 **Badge Integration Report**
- [ ] `pnpm build` + test 通过

---

## 附录 A：Tag / Progress / Badge 对照总表

| 业务概念 | Tag | Progress | Badge |
|----------|-----|----------|-------|
| 待整改状态 | `RectificationStatusTag` | — | — |
| 待整改数量 | — | — | `RectificationBadge (12)` |
| 整改完成率 | — | `RectificationProgress 82%` | — |
| 高风险等级 | `StoreRiskLevelTag` | — | — |
| 高风险门店数 | — | — | `RiskBadge (8)` |
| 已逾期任务 | `InspectionStatusTag` | — | `InspectionBadge (3)` |
| 待巡检门店数 | — | — | `InspectionBadge (36)` |
| 巡检覆盖率 | — | `InspectionCoverageProgress` | — |
| 新告警 | — | — | `NotificationBadge 99+` |

## 附录 B：现有硬编码 Count 样式摘录（待统一）

**`TagCount`（tag-group.tsx）：**

- 非选中：灰底 `#E5E6EB` · 字 `rgba(0,0,0,0.45)`
- 选中：品牌蓝底 · 白字
- `min-w-[18px]` · `rounded-full` · `11px` 量级字号

**`InspectionQuickFilter`：**

- 非选中： `--table-skeleton-bg` 底
- 选中：`--table-action-color` 底 + 白字
- `min-w-[20px]` · `text-[11px]`

→ Badge 统一为 `--badge-*` Token，选中态通过 `status="primary"` + 宿主 `active` 上下文处理。

---

**请先审阅本报告。** 确认后按 §0.4 优先级开发，并完成 §9 集成验收（菜单可达为硬性要求）。
