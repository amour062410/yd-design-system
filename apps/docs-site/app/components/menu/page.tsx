import { ApiTable, type ApiTableRow } from "@/components/docs/api-table";
import { CopyCodeBlock } from "@/components/docs/copy-code-block";
import {
  MENU_CODE_EXAMPLE,
  MENU_INTRO,
  MENU_OVERVIEW_POINTS,
  MENU_USAGE_TOKEN_NAMES,
} from "@/lib/data/menuMock";
import { MenuShowcaseGrid } from "./menu-showcase";

const SECTION_CLASS = "mx-auto max-w-[960px] px-4";

const MENU_API_ROWS: ApiTableRow[] = [
  {
    prop: "mode",
    type: '"horizontal" | "vertical"',
    default: '"vertical"',
    description: "布局模式：顶部导航 / 侧边栏导航",
  },
  { prop: "items", type: "MenuItemConfig[]", description: "菜单数据配置（推荐）" },
  { prop: "selectedKeys", type: "string[]", description: "当前选中项（受控）" },
  { prop: "defaultSelectedKeys", type: "string[]", description: "默认选中项" },
  { prop: "openKeys", type: "string[]", description: "当前展开的子菜单（受控）" },
  { prop: "defaultOpenKeys", type: "string[]", description: "默认展开的子菜单" },
  {
    prop: "onSelect",
    type: "(info: SelectInfo) => void",
    description: "选中菜单项时回调",
  },
  {
    prop: "onOpenChange",
    type: "(openKeys: string[]) => void",
    description: "子菜单展开/折叠时回调",
  },
  {
    prop: "collapsed",
    type: "boolean",
    default: "false",
    description: "Vertical 模式侧边栏收缩，仅显示图标",
  },
  {
    prop: "onCollapse",
    type: "(collapsed: boolean) => void",
    description: "收缩状态变化回调",
  },
  {
    prop: "collapsedWidth",
    type: "number",
    default: "48",
    description: "收缩时的宽度（px）",
  },
  {
    prop: "expandIcon",
    type: "ReactNode | ((props) => ReactNode)",
    description: "自定义子菜单展开图标",
  },
  {
    prop: "overflowedIndicator",
    type: "ReactNode",
    description: "Horizontal 模式溢出指示器",
  },
  {
    prop: "theme",
    type: '"light" | "dark"',
    default: '"light"',
    description: "菜单主题",
  },
];

const MENU_ITEM_API_ROWS: ApiTableRow[] = [
  { prop: "key", type: "string", description: "唯一标识" },
  { prop: "label", type: "ReactNode", description: "菜单项文案" },
  { prop: "icon", type: "ReactNode", description: "图标" },
  { prop: "children", type: "MenuItemConfig[]", description: "子菜单项" },
  { prop: "disabled", type: "boolean", description: "是否禁用" },
  {
    prop: "type",
    type: '"item" | "group" | "subMenu"',
    description: "菜单项类型；group 为分组标题",
  },
];

export default function MenuPage() {
  return (
    <div>
      <header id="menu-intro" className={`${SECTION_CLASS} border-b border-border pb-8`}>
        <h1 className="text-[28px] font-semibold tracking-tight text-foreground">
          Menu 导航菜单
        </h1>
        <p className="mt-3 max-w-[720px] text-[14px] leading-7 text-muted-foreground">
          {MENU_INTRO}
        </p>
        <ul className="mt-4 list-disc space-y-1 pl-5 text-[13px] text-muted-foreground">
          {MENU_OVERVIEW_POINTS.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>
      </header>

      <section id="menu-demos" className={`${SECTION_CLASS} mt-12`}>
        <h2 className="mb-6 text-2xl font-semibold tracking-tight">示例</h2>
        <MenuShowcaseGrid />
      </section>

      <section id="menu-when-to-use" className={`${SECTION_CLASS} mt-12 border-t border-border pt-12`}>
        <h2 className="mb-4 text-2xl font-semibold tracking-tight">何时使用</h2>
        <ul className="list-disc space-y-2 pl-5 text-[14px] leading-7 text-muted-foreground">
          <li>云盯后台一级模块切换（首页 / 巡检管理 / 门店管理 / 报表 / 设置）</li>
          <li>模块内二级功能导航（任务分配 / 巡检计划 / 巡检记录 / 问题整改）</li>
          <li>角色权限配置树，按分组展示不同角色可见菜单</li>
          <li>高密度后台需收缩侧边栏，仅保留图标 + Tooltip</li>
        </ul>
        <div className="mt-6">
          <CopyCodeBlock code={MENU_CODE_EXAMPLE} />
        </div>
      </section>

      <section id="menu-api" className={`${SECTION_CLASS} mt-12 border-t border-border pt-12`}>
        <h2 className="mb-4 text-2xl font-semibold tracking-tight">API</h2>
        <h3 className="mb-3 text-lg font-semibold">Menu</h3>
        <ApiTable rows={MENU_API_ROWS} />
        <h3 className="mb-3 mt-8 text-lg font-semibold">MenuItemConfig</h3>
        <ApiTable rows={MENU_ITEM_API_ROWS} />
      </section>

      <section id="menu-tokens" className={`${SECTION_CLASS} mt-12 border-t border-border pt-12 pb-16`}>
        <h2 className="mb-4 text-2xl font-semibold tracking-tight">Design Token</h2>
        <p className="mb-4 text-sm text-muted-foreground">
          点击 Token 名称可复制，深浅主题见 showcase-tokens.css。
        </p>
        <div className="grid gap-2">
          {MENU_USAGE_TOKEN_NAMES.map((token) => (
            <div
              key={token}
              className="flex items-center justify-between rounded-md border border-border px-4 py-2 text-[13px]"
            >
              <code className="text-foreground">{token}</code>
              <span className="text-muted-foreground">--{token}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
