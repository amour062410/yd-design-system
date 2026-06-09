import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import {
  ASYNC_TREE_ROOT,
  OrganizationTree,
  PermissionTree,
  STORE_TREE_DATA,
  StoreTree,
  Tree,
  mockLoadTreeChildren,
} from "./index";

const meta: Meta<typeof Tree> = {
  title: "Components/Data Display/Tree",
  component: Tree,
  parameters: { layout: "padded" },
};

export default meta;

type Story = StoryObj<typeof Tree>;

export const Basic: Story = {
  render: () => (
    <div className="w-[280px]">
      <Tree treeData={STORE_TREE_DATA} defaultExpandedKeys={["nation", "chengdu"]} blockNode />
    </div>
  ),
};

export const Checkable: Story = {
  render: () => (
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
  ),
};

export const Searchable: Story = {
  render: () => (
    <div className="w-[280px]">
      <StoreTree searchable defaultExpandedKeys={["nation"]} />
    </div>
  ),
};

export const AsyncStory: Story = {
  name: "Async",
  render: function AsyncDemo() {
    return (
      <div className="w-[280px]">
        <Tree treeData={ASYNC_TREE_ROOT} loadData={mockLoadTreeChildren} blockNode showIcon />
      </div>
    );
  },
};

export const StoreTreeStory: Story = {
  name: "StoreTree",
  render: () => (
    <div className="w-[280px]">
      <StoreTree searchable />
    </div>
  ),
};

export const OrganizationTreeStory: Story = {
  name: "OrganizationTree",
  render: () => (
    <div className="w-[280px]">
      <OrganizationTree searchable />
    </div>
  ),
};

export const PermissionTreeStory: Story = {
  name: "PermissionTree",
  render: function PermissionDemo() {
    const [checkedKeys, setCheckedKeys] = useState<string[]>(["inspection-view"]);
    return (
      <div className="w-[280px]">
        <PermissionTree
          searchable
          checkedKeys={checkedKeys}
          onCheck={(keys) => setCheckedKeys(keys)}
        />
      </div>
    );
  },
};
