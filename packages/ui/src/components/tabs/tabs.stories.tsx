/**
 * Storybook CSF — Basic / Card / Disabled / Icon / Closable / Editable / Overflow
 */
import { useState } from "react";
import { FileText, Settings } from "lucide-react";
import { Tabs, type TabsItem, type TabsProps } from "./tabs";

export default {
  title: "YD Design System/Tabs",
  component: Tabs,
  parameters: { layout: "padded" },
};

function ControlledTabs(props: Partial<TabsProps>) {
  const [activeKey, setActiveKey] = useState(
    props.defaultActiveKey ?? props.items?.[0]?.key ?? "1"
  );
  return (
    <Tabs
      {...props}
      items={props.items ?? []}
      activeKey={activeKey}
      onChange={setActiveKey}
    />
  );
}

export const Basic = {
  render: () => (
    <ControlledTabs
      type="line"
      items={[
        { key: "1", label: "概览" },
        { key: "2", label: "配置" },
        { key: "3", label: "日志" },
      ]}
    />
  ),
};

export const Card = {
  render: () => (
    <ControlledTabs
      type="card"
      items={[
        { key: "1", label: "Tab 1" },
        { key: "2", label: "Tab 2" },
      ]}
    />
  ),
};

export const Disabled = {
  render: () => (
    <ControlledTabs
      items={[
        { key: "1", label: "可用" },
        { key: "2", label: "禁用", disabled: true },
        { key: "3", label: "可用 2" },
      ]}
    />
  ),
};

export const Icon = {
  render: () => (
    <ControlledTabs
      items={[
        { key: "doc", label: "文档", icon: <FileText size={16} /> },
        { key: "set", label: "设置", icon: <Settings size={16} /> },
      ]}
    />
  ),
};

export const Closable = {
  render: () => {
    const [items, setItems] = useState<TabsItem[]>([
      { key: "1", label: "Tab 1", closable: true },
      { key: "2", label: "Tab 2", closable: true },
      { key: "3", label: "Tab 3", closable: true },
    ]);
    const [activeKey, setActiveKey] = useState("1");
    return (
      <Tabs
        closable
        items={items}
        activeKey={activeKey}
        onChange={setActiveKey}
        onTabClose={(key) => {
          const next = items.filter((i) => i.key !== key);
          setItems(next);
          if (activeKey === key) setActiveKey(next[0]?.key ?? "");
        }}
      />
    );
  },
};

export const Editable = {
  render: () => {
    const [items, setItems] = useState<TabsItem[]>([
      { key: "1", label: "Tab 1" },
      { key: "2", label: "Tab 2" },
    ]);
    const [activeKey, setActiveKey] = useState("1");
    const [seq, setSeq] = useState(3);
    return (
      <Tabs
        editable
        closable
        items={items}
        activeKey={activeKey}
        onChange={setActiveKey}
        onTabAdd={() => {
          const key = String(seq);
          setSeq((n) => n + 1);
          setItems((prev) => [...prev, { key, label: `Tab ${key}`, closable: true }]);
          setActiveKey(key);
        }}
        onTabClose={(key) => {
          const next = items.filter((i) => i.key !== key);
          setItems(next);
          if (activeKey === key) setActiveKey(next[0]?.key ?? "");
        }}
      />
    );
  },
};

export const Overflow = {
  render: () => (
    <ControlledTabs
      overflow
      className="max-w-[360px]"
      items={Array.from({ length: 10 }, (_, i) => ({
        key: String(i + 1),
        label: `标签 ${i + 1}`,
      }))}
    />
  ),
};
