import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import {
  InspectorTransfer,
  PermissionTransfer,
  STORE_TRANSFER_DATA,
  StoreTransfer,
  Transfer,
} from "./index";

const meta: Meta<typeof Transfer> = {
  title: "Components/Data Display/Transfer",
  component: Transfer,
  parameters: { layout: "padded" },
};

export default meta;

type Story = StoryObj<typeof Transfer>;

export const Basic: Story = {
  render: function BasicDemo() {
    const [targetKeys, setTargetKeys] = useState<string[]>(["mixc"]);
    return (
      <Transfer
        dataSource={[...STORE_TRANSFER_DATA]}
        targetKeys={targetKeys}
        onChange={(keys) => setTargetKeys(keys)}
        titles={["待分配门店", "已分配门店"]}
      />
    );
  },
};

export const Searchable: Story = {
  render: function SearchableDemo() {
    const [targetKeys, setTargetKeys] = useState<string[]>([]);
    return (
      <StoreTransfer
        showSearch
        targetKeys={targetKeys}
        onChange={(keys) => setTargetKeys(keys)}
      />
    );
  },
};

export const OneWay: Story = {
  render: function OneWayDemo() {
    const [targetKeys, setTargetKeys] = useState<string[]>(["report-view"]);
    return (
      <PermissionTransfer
        oneWay
        targetKeys={targetKeys}
        onChange={(keys) => setTargetKeys(keys)}
      />
    );
  },
};

export const StoreTransferStory: Story = {
  name: "StoreTransfer",
  render: function StoreDemo() {
    const [targetKeys, setTargetKeys] = useState<string[]>(["wanda-plaza", "ifs"]);
    return (
      <StoreTransfer
        showSearch
        targetKeys={targetKeys}
        onChange={(keys) => setTargetKeys(keys)}
        footer={({ direction, selectedCount }) =>
          direction === "right" ? `已选 ${selectedCount} 家门店` : `待分配 ${selectedCount} 项`
        }
      />
    );
  },
};

export const InspectorTransferStory: Story = {
  name: "InspectorTransfer",
  render: function InspectorDemo() {
    const [targetKeys, setTargetKeys] = useState<string[]>(["zhangwei", "lina"]);
    return (
      <InspectorTransfer targetKeys={targetKeys} onChange={(keys) => setTargetKeys(keys)} />
    );
  },
};
