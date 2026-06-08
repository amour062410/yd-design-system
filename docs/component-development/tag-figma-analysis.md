# Tag 组件 Figma 分析报告

> **状态：未完成（待 MCP 配额恢复或提供节点链接后补全）**  
> **生成时间：** 2026-06-05  
> **目标文件：** YD Design Code / Components / Tag

---

## 0. 执行摘要

本次任务要求通过 **Figma MCP** 读取 `YD Design Code` 文件中 `Components / Tag` 组件，并输出 Variant / Size / State / Token / Auto Layout / Padding / Radius / Typography 等规格。

**当前结论：无法从 Figma 拉取真实节点数据，本报告中的第 1–8 节均为「待读取」，不可作为开发依据。**

### 阻塞原因

| 项目 | 说明 |
|------|------|
| Figma 文件 | `YD-Design-code`（fileKey: `wvRXf521tH8YbSW5rfBzzu`），来源：`packages/tokens/token.json` |
| MCP 认证用户 | `554360846@qq.com`（lu zhang） |
| 云盯团队席位 | **View**（Starter）— MCP 读取配额约 **6 次/月** |
| 本次调用结果 | `search_design_system`、`get_metadata`、`use_figma` 均返回 **Rate limit reached** |

### 解除阻塞建议（任选其一）

1. **升级席位**：云盯团队 View → Full/Dev，或切换至 AMOUR 团队 Full 席位（Pro+ 约 200 次/天）。
2. **提供节点直链**：例如  
   `https://www.figma.com/design/wvRXf521tH8YbSW5rfBzzu/YD-Design-code?node-id=XXXX-YYYY`  
   便于配额恢复后一次 `get_design_context` / `use_figma` 精准读取。
3. **导出组件规格**：在 Figma 中选中 Tag Component Set → 导出 Variant 属性截图或 Dev Mode 规格表。

**确认补全本报告后，再开始 Tag 组件开发。**

---

## 1. Variant 数量

| 字段 | 值 |
|------|-----|
| Component Set 名称 | `Tag`（路径：`Components / Tag`） |
| Variant 总数 | **待读取** |
| Variant 属性维度 | **待读取**（预期可能含 Type / Color / Size / State 等） |
| 计算方式 | `COMPONENT_SET.children.length` 或 Variant 属性笛卡尔积 |

### 待核实问题

- Tag 与 Badge 是否在同一 Component Set？
- 是否存在「可关闭」「带图标」「带圆点」等独立 Variant 轴？

---

## 2. Size 规格

| Size 枚举 | 高度 | 水平 Padding | 字号 | 状态 |
|-----------|------|--------------|------|------|
| Small | 待读取 | 待读取 | 待读取 | ⏳ |
| Medium / Default | 待读取 | 待读取 | 待读取 | ⏳ |
| Large | 待读取 | 待读取 | 待读取 | ⏳ |

### 本地 Token 参考（非 Tag 专用，仅供对照）

`packages/tokens/token.json` 中通用控件高度（**不等于 Tag 实测值**）：

| Token | 值 |
|-------|-----|
| `controlHeightSM` | 24px |
| `controlHeight` | 32px |
| `controlHeightLG` | 40px |

> Tag 实际 Size 必须以 Figma Component Set 为准，不可直接套用 Button/Input 高度。

---

## 3. State 规格

| State | 说明 | 是否存在于 Tag |
|-------|------|----------------|
| Default | 默认 | 待读取 |
| Hover | 悬停 | 待读取 |
| Active / Pressed | 按下 | 待读取 |
| Disabled | 禁用 | 待读取 |
| Selected / Checked | 选中（若适用） | 待读取 |

### 待读取项

- 各 State 是否通过 **Variant 属性** 表达，还是 **Component Property + Interaction**？
- 是否存在 **Focus** 描边态（无障碍）？

---

## 4. 各状态对应 Token

> `packages/tokens/token-architecture.md` 注明：**Tag / Badge 尚无专用 Token 映射**，业务页目前使用功能色硬编码。

### 4.1 预期 Token 类别（待 Figma 绑定核实）

| 属性 | 预期 Variable 类型 | 待读取变量名 |
|------|-------------------|--------------|
| 背景 Fill | COLOR | 待读取 |
| 文字 Fill | COLOR | 待读取 |
| 描边 Stroke | COLOR | 待读取 |
| 图标 Fill | COLOR | 待读取 |

### 4.2 功能色体系（可用于 Tag 语义色推断）

`token.json` → `color.functional` 每组含 **default / hover / active / disabled / muted**：

| 语义 | default | muted（浅底） |
|------|---------|---------------|
| Primary | `#165DFF` | `rgba(22,93,255,0.05)` |
| Success | 待查 token.json | 待查 |
| Warning | 待查 | 待查 |
| Error | 待查 | 待查 |
| Info | 待查 | 待查 |

### 4.3 按 State × Type 的 Token 矩阵

| Type | State | Background Token | Text Token | Border Token |
|------|-------|------------------|------------|--------------|
| — | — | **待读取** | **待读取** | **待读取** |

---

## 5. Auto Layout 配置

| 属性 | 预期值 | 实测值 |
|------|--------|--------|
| `layoutMode` | `HORIZONTAL`（推测） | 待读取 |
| `primaryAxisAlignItems` | 待读取 | 待读取 |
| `counterAxisAlignItems` | `CENTER`（推测） | 待读取 |
| `layoutSizingHorizontal` | `HUG`（推测） | 待读取 |
| `layoutSizingVertical` | `HUG`（推测） | 待读取 |
| `itemSpacing`（图标与文字 Gap） | 待读取 | 待读取 |
| `layoutWrap` | 待读取 | 待读取 |

### 子节点结构（待读取）

```
Tag (Auto Layout Frame)
├── [可选] Leading Icon
├── Label (TEXT)
└── [可选] Trailing Icon / Close
```

---

## 6. Padding

| Size | paddingTop | paddingRight | paddingBottom | paddingLeft | 绑定 Token |
|------|------------|--------------|---------------|-------------|------------|
| SM | 待读取 | 待读取 | 待读取 | 待读取 | 待读取 |
| MD | 待读取 | 待读取 | 待读取 | 待读取 | 待读取 |
| LG | 待读取 | 待读取 | 待读取 | 待读取 | 待读取 |

### 本地 Spacing 候选（仅供开发时对照，非 Figma 实测）

| Token | 值 |
|-------|-----|
| `spacing-1` | 4px |
| `spacing-1.5` | 6px |
| `spacing-2` | 8px |
| `marginXS` | 8px |

---

## 7. Radius

| 场景 | 值 | Token |
|------|-----|-------|
| Tag 圆角 | **待读取** | 待读取 |
| 是否全圆角（pill） | **待读取** | — |

### 本地 Radius 参考

| Token | 值 | 说明 |
|-------|-----|------|
| `borderRadiusSM` | 4px | 小圆角 |
| `borderRadius` | **6px** | 全局默认（Button 等） |
| `borderRadiusLG` | 8px | 容器 |
| `radius-full` | 9999px | 胶囊形 |

> Tag 在 YD DS 中可能使用 `4px`（紧凑）或 `6px`（默认），需以 Figma 为准。

---

## 8. Typography

| Size | Font Family | Font Size | Line Height | Font Weight | Letter Spacing | Text Style 名称 |
|------|-------------|-----------|-------------|-------------|----------------|-----------------|
| SM | 待读取 | 待读取 | 待读取 | 待读取 | 待读取 | 待读取 |
| MD | 待读取 | 待读取 | 待读取 | 待读取 | 待读取 | 待读取 |
| LG | 待读取 | 待读取 | 待读取 | 待读取 | 待读取 | 待读取 |

### 本地 Typography 参考（Figma 组件常用标注）

| 样式 | fontSize | lineHeight | fontWeight |
|------|----------|------------|------------|
| Base/Regular | 14px | 22px | 400 |
| Large/Regular | 16px | 24px | 400 |
| font.caption.1 | 12px | 1.5 | 400 |

| 字体族（Figma 标注） | `SF Pro, PingFang SC, sans-serif` |
| 代码字体族 | `Inter, ui-sans-serif, system-ui, sans-serif` |

---

## 9. 补全报告时的 MCP 读取计划

配额恢复后，建议按以下顺序一次会话内完成（减少调用次数）：

```text
Step 1  get_metadata(fileKey, 无 nodeId)           → 定位 Components 页
Step 2  use_figma                                   → 遍历找到 Tag COMPONENT_SET
Step 3  use_figma                                   → 导出 variantProperties + 各 variant 布局/填充/字体
Step 4  get_variable_defs(fileKey, nodeId=Tag)      → 解析 boundVariables → Token 名
```

### `use_figma` 待执行脚本（草稿）

```javascript
// 定位 Components 页 → Tag Component Set → 汇总 variant 规格
await figma.setCurrentPageAsync(
  figma.root.children.find((p) => p.name === "Components")
);
const tagSet = figma.currentPage.findOne(
  (n) => n.type === "COMPONENT_SET" && n.name === "Tag"
);
// return: variant count, sizes, states, padding, radius, typography, bound variables
```

---

## 10. 与代码库现状的对照

| 项目 | 现状 |
|------|------|
| `packages/ui` 中独立 Tag 组件 | **尚未实现** |
| 业务中的 Tag 类实现 | `InspectionStatusTag`、`StoreRiskLevelTag`、`RectificationStatusTag` 等（各业务自建） |
| Token 层 Tag 映射 | **缺失**（见 `token-architecture.md`） |
| Figma Code Connect | **未发现** Tag 的 `.figma.ts` 文件 |

---

## 11. 开发前检查清单

- [ ] MCP 成功读取 Tag Component Set
- [ ] 确认 Variant 总数与属性轴
- [ ] 确认 Size / State 枚举与 Figma 命名一致
- [ ] 导出 Token 绑定表（Fill / Text / Border）
- [ ] 记录 Auto Layout + Padding + Radius + Typography 实测值
- [ ] 与 `packages/tokens` 对齐或新增 Tag 语义 Token
- [ ] 用户确认本报告 → 再启动 `packages/ui/src/components/tag/`

---

## 附录 A — 文件元数据

```json
{
  "figmaFileKey": "wvRXf521tH8YbSW5rfBzzu",
  "figmaFileName": "YD-Design-code",
  "figmaPageFoundations": "Foundations",
  "targetPath": "Components / Tag",
  "mcpUser": "554360846@qq.com",
  "cloudTeam": "云盯 (View seat)"
}
```

## 附录 B — 参考链接

- Figma 文件（需权限）：`https://www.figma.com/design/wvRXf521tH8YbSW5rfBzzu/YD-Design-code`
- MCP 配额说明：[Figma MCP Rate limits](https://www.figma.com/developers/api#authentication)
