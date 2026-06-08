"use client";

import { useState, type ReactNode } from "react";
import { Tabs, TabShowcase, type TabsItem } from "@yd-ds/ui/tabs";
import {
  TABS_DEMO_ITEMS,
  TABS_ICON_ITEMS,
  TABS_OVERFLOW_ITEMS,
} from "@/lib/data/tabsMock";
function ShowcaseCard({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: ReactNode;
}) {
  return (
    <div className="rounded-md border bg-card px-6 py-8 md:px-8">
      <div className="mb-4">
        <h3 className="text-[13px] font-semibold text-foreground">{title}</h3>
        {description ? (
          <p className="mt-1 text-xs text-muted-foreground">{description}</p>
        ) : null}
      </div>
      {children}
    </div>
  );
}

export function TabsBasicShowcase() {
  const [activeKey, setActiveKey] = useState("1");
  return (
    <ShowcaseCard title="Basic" description="Line Tabs · 品牌色 #165DFF · 圆角 6px（Card/Segment）">
      <Tabs
        type="line"
        items={TABS_DEMO_ITEMS.slice(0, 3)}
        activeKey={activeKey}
        onChange={setActiveKey}
      />
      <p className="mt-3 text-xs text-muted-foreground">当前选中：{activeKey}</p>
    </ShowcaseCard>
  );
}

export function TabsCardShowcase() {
  const [activeKey, setActiveKey] = useState("2");
  return (
    <ShowcaseCard title="Card" description="Card Tabs · 容器与标签圆角 6px">
      <Tabs
        type="card"
        items={TABS_DEMO_ITEMS.slice(0, 3)}
        activeKey={activeKey}
        onChange={setActiveKey}
      />
    </ShowcaseCard>
  );
}

export function TabsDisabledShowcase() {
  const [activeKey, setActiveKey] = useState("1");
  const items = [
    { key: "1", label: "可用" },
    { key: "2", label: "禁用项", disabled: true },
    { key: "3", label: "可用 2" },
  ];
  return (
    <ShowcaseCard title="Disabled" description="单项 disabled，不可切换">
      <div className="mb-6 flex flex-wrap gap-6">
        <TabShowcase state="default" label="Default" />
        <TabShowcase state="disabled" label="Disabled" />
      </div>
      <Tabs items={items} activeKey={activeKey} onChange={setActiveKey} />
    </ShowcaseCard>
  );
}

export function TabsIconShowcase() {
  const [activeKey, setActiveKey] = useState("overview");
  const items = TABS_ICON_ITEMS.map((item) => ({
    key: item.key,
    label: item.label,
    icon: <item.icon size={16} strokeWidth={2} />,
  }));

  return (
    <ShowcaseCard title="Icon" description="标签前图标，与 Button / Input 图标尺寸一致">
      <Tabs items={items} activeKey={activeKey} onChange={setActiveKey} type="line" />
    </ShowcaseCard>
  );
}

export function TabsClosableShowcase() {
  const [items, setItems] = useState<TabsItem[]>([
    { key: "1", label: "Tab 1", closable: true },
    { key: "2", label: "Tab 2", closable: true },
    { key: "3", label: "Tab 3", closable: true },
  ]);
  const [activeKey, setActiveKey] = useState("1");

  return (
    <ShowcaseCard title="Closable" description="点击 × 关闭；至少保留一个标签">
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
    </ShowcaseCard>
  );
}

export function TabsEditableShowcase() {
  const [items, setItems] = useState<TabsItem[]>([
    { key: "1", label: "Tab 1", closable: true },
    { key: "2", label: "Tab 2", closable: true },
  ]);
  const [activeKey, setActiveKey] = useState("1");
  const [seq, setSeq] = useState(3);

  return (
    <ShowcaseCard title="Editable" description="新增（+）与删除（×）组合">
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
    </ShowcaseCard>
  );
}

export function TabsOverflowShowcase() {
  const [activeKey, setActiveKey] = useState("1");
  return (
    <ShowcaseCard
      title="Overflow"
      description="标签过多时横向滚动，两侧显示翻页按钮"
    >
      <Tabs
        overflow
        className="max-w-[420px]"
        items={TABS_OVERFLOW_ITEMS}
        activeKey={activeKey}
        onChange={setActiveKey}
      />
    </ShowcaseCard>
  );
}
