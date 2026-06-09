"use client";

import {
  OrganizationTree,
  PermissionTree,
  StoreTree,
  Tree,
  ASYNC_TREE_ROOT,
  STORE_TREE_DATA,
  mockLoadTreeChildren,
} from "@yd-ds/ui/tree";
import { ComponentDemoBlock } from "@/components/docs/component-demo-block";
import { TREE_DEMO_CODES } from "@/lib/data/treeMock";

export function TreeDemosShowcase() {
  return (
    <div className="flex flex-col gap-12">
      <ComponentDemoBlock title="基础用法" description="展开/收起、单选节点。" code={TREE_DEMO_CODES.basic}>
        <div className="w-[280px]">
          <Tree treeData={STORE_TREE_DATA} defaultExpandedKeys={["nation", "chengdu"]} blockNode />
        </div>
      </ComponentDemoBlock>

      <ComponentDemoBlock title="可勾选" description="父子联动 + 半选态。" code={TREE_DEMO_CODES.checkable}>
        <div className="w-[280px]">
          <Tree
            treeData={STORE_TREE_DATA}
            checkable
            showIcon
            defaultExpandedKeys={["nation"]}
            defaultCheckedKeys={["cd-mixc"]}
            blockNode
          />
        </div>
      </ComponentDemoBlock>

      <ComponentDemoBlock title="可搜索" description="匹配节点、自动展开父级、高亮关键字。" code={TREE_DEMO_CODES.searchable}>
        <div className="w-[280px]">
          <StoreTree searchable defaultExpandedKeys={["nation"]} />
        </div>
      </ComponentDemoBlock>

      <ComponentDemoBlock title="异步加载" description="展开节点时懒加载子级。" code={TREE_DEMO_CODES.async}>
        <div className="w-[280px]">
          <Tree treeData={ASYNC_TREE_ROOT} loadData={mockLoadTreeChildren} showIcon blockNode />
        </div>
      </ComponentDemoBlock>

      <ComponentDemoBlock title="StoreTree" description="门店区域树业务组件。" code={TREE_DEMO_CODES.storeTree}>
        <div className="w-[280px]">
          <StoreTree searchable />
        </div>
      </ComponentDemoBlock>

      <ComponentDemoBlock title="OrganizationTree" description="组织架构树。" code={TREE_DEMO_CODES.organizationTree}>
        <div className="w-[280px]">
          <OrganizationTree searchable />
        </div>
      </ComponentDemoBlock>

      <ComponentDemoBlock title="PermissionTree" description="权限配置树，默认可勾选。" code={TREE_DEMO_CODES.permissionTree}>
        <div className="w-[280px]">
          <PermissionTree searchable defaultCheckedKeys={["inspection-view"]} />
        </div>
      </ComponentDemoBlock>
    </div>
  );
}
