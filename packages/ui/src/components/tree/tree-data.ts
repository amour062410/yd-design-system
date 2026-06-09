import type { TreeDataNode } from "./tree.types";

export const STORE_TREE_DATA: TreeDataNode[] = [
  {
    key: "nation",
    title: "全国门店",
    children: [
      {
        key: "chengdu",
        title: "成都区域",
        children: [
          { key: "cd-mixc", title: "万象城店", isLeaf: true },
          { key: "cd-ifs", title: "IFS店", isLeaf: true },
          { key: "cd-intime", title: "银泰店", isLeaf: true },
        ],
      },
      {
        key: "chongqing",
        title: "重庆区域",
        children: [
          { key: "cq-raffles", title: "来福士店", isLeaf: true },
          { key: "cq-longfor", title: "龙湖天街店", isLeaf: true },
          { key: "cq-ring", title: "光环购物公园店", isLeaf: true },
        ],
      },
    ],
  },
];

export const ORGANIZATION_TREE_DATA: TreeDataNode[] = [
  {
    key: "hq",
    title: "总部",
    children: [
      {
        key: "ops-center",
        title: "运营中心",
        children: [
          { key: "east", title: "华东区", isLeaf: true },
          { key: "south", title: "华南区", isLeaf: true },
          { key: "southwest", title: "西南区", isLeaf: true },
        ],
      },
    ],
  },
];

export const PERMISSION_TREE_DATA: TreeDataNode[] = [
  {
    key: "inspection",
    title: "巡检管理",
    children: [
      { key: "inspection-view", title: "查看", isLeaf: true },
      { key: "inspection-edit", title: "编辑", isLeaf: true },
      { key: "inspection-delete", title: "删除", isLeaf: true },
    ],
  },
  {
    key: "workorder",
    title: "工单管理",
    children: [
      { key: "workorder-view", title: "查看", isLeaf: true },
      { key: "workorder-edit", title: "编辑", isLeaf: true },
      { key: "workorder-delete", title: "删除", isLeaf: true },
    ],
  },
];

export const ASYNC_TREE_ROOT: TreeDataNode[] = [
  { key: "async-root", title: "西南大区", isLeaf: false },
];

export async function mockLoadTreeChildren(node: TreeDataNode): Promise<TreeDataNode[]> {
  await new Promise((resolve) => setTimeout(resolve, 600));
  if (node.key === "async-root") {
    return [
      {
        key: "async-chengdu",
        title: "成都区域",
        children: [
          { key: "async-cd-mixc", title: "万象城店", isLeaf: true },
          { key: "async-cd-ifs", title: "IFS店", isLeaf: true },
        ],
      },
      {
        key: "async-chongqing",
        title: "重庆区域",
        isLeaf: false,
      },
    ];
  }
  if (node.key === "async-chongqing") {
    return [
      { key: "async-cq-raffles", title: "来福士店", isLeaf: true },
      { key: "async-cq-longfor", title: "龙湖天街店", isLeaf: true },
    ];
  }
  return [];
}

export function getAllExpandableKeys(nodes: TreeDataNode[]): string[] {
  const keys: string[] = [];
  const walk = (list: TreeDataNode[]) => {
    list.forEach((node) => {
      if (node.children?.length) {
        keys.push(node.key);
        walk(node.children);
      }
    });
  };
  walk(nodes);
  return keys;
}

export function getAllKeys(nodes: TreeDataNode[]): string[] {
  const keys: string[] = [];
  const walk = (list: TreeDataNode[]) => {
    list.forEach((node) => {
      keys.push(node.key);
      if (node.children?.length) walk(node.children);
    });
  };
  walk(nodes);
  return keys;
}
