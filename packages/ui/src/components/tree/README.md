# Tree 树形控件

Tree 以结构化可展开格式展示层级数据，适用于门店组织、权限配置、区域筛选等云盯后台场景。

## 何时使用

- 门店 / 区域层级浏览（`StoreTree`）
- 组织架构选择（`OrganizationTree`）
- 权限勾选配置（`PermissionTree`）
- 需要搜索定位节点并自动展开父级

## 基础用法

```tsx
import { Tree, STORE_TREE_DATA } from "@yd-ds/ui/tree";

<Tree
  treeData={STORE_TREE_DATA}
  defaultExpandedKeys={["nation", "chengdu"]}
  blockNode
/>
```

## 业务能力

| 能力 | Prop | 说明 |
|------|------|------|
| 展开/收起 | `expandedKeys` / `defaultExpandedKeys` / `defaultExpandAll` | 受控或非受控 |
| 单选/多选 | `selectedKeys` / `multiple` | 节点选中 |
| 勾选 | `checkable` / `checkedKeys` / `checkStrictly` | 父子联动或严格模式 |
| 搜索 | `searchable` / `searchValue` | 匹配节点、展开父级、高亮关键字 |
| 异步加载 | `loadData` / `loadedKeys` | 展开时加载子节点，已加载节点不重复请求 |

## 业务组件

```tsx
import { StoreTree, OrganizationTree, PermissionTree } from "@yd-ds/ui/tree";

<StoreTree searchable selectedKeys={selected} onSelect={setSelected} />
<OrganizationTree searchable />
<PermissionTree searchable checkedKeys={checked} onCheck={setChecked} />
```

## Design Token

| CSS 变量 | 说明 |
|----------|------|
| `--tree-color-bg` | 容器背景 #FFFFFF |
| `--tree-color-border` | 边框 #F0F0F0 |
| `--tree-color-title-selected` | 选中文字 #165DFF |
| `--tree-color-node-selected-bg` | 选中背景 rgba(22,93,255,0.08) |
| `--tree-indent-size` | 层级缩进 24px |
| `--tree-node-height` | 行高 32px |

## 最佳实践

1. 门店树默认展开当前区域，避免一次性展开全部节点。
2. 搜索场景使用 `searchable`，配合真实门店/组织命名。
3. 权限树使用 `PermissionTree` + `checkable`，勾选结果提交前做半选态合并。
4. 异步加载仅用于大区/区域懒加载，避免首屏加载整棵树。

## 注意事项

- 节点 `key` 必须全局唯一。
- `loadData` 返回子节点后会自动写入内部 tree 数据。
- 搜索时仅展示匹配节点及其祖先，清空搜索恢复完整树。
