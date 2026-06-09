import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { InspectorTransferPro, StoreTransferPro, TransferPro } from "./index";

const meta: Meta<typeof TransferPro> = {
  title: "Components/Data Display/Transfer Pro",
  component: TransferPro,
  parameters: { layout: "padded" },
};

export default meta;

type Story = StoryObj<typeof TransferPro>;

export const TreeMode: Story = {
  render: function TreeDemo() {
    const [keys, setKeys] = useState<string[]>(["store-sh-wanda"]);
    return <StoreTransferPro showSearch targetKeys={keys} onChange={(next) => setKeys(next)} />;
  },
};

export const TableMode: Story = {
  render: function TableDemo() {
    const [keys, setKeys] = useState<string[]>(["store-nj-wanda"]);
    return (
      <TransferPro
        mode={{ left: "tree", right: "table" }}
        showSearch
        targetKeys={keys}
        onChange={(next) => setKeys(next)}
      />
    );
  },
};

export const DiffView: Story = {
  render: function DiffDemo() {
    const [keys, setKeys] = useState<string[]>(["store-sh-wanda", "store-gz-wanda"]);
    return (
      <StoreTransferPro
        showDiff
        baselineKeys={["store-sh-wanda"]}
        targetKeys={keys}
        onChange={(next) => setKeys(next)}
      />
    );
  },
};

export const InspectorDispatch: Story = {
  render: function InspectorDemo() {
    const [keys, setKeys] = useState<string[]>(["zhang"]);
    return <InspectorTransferPro targetKeys={keys} onChange={(next) => setKeys(next)} />;
  },
};
