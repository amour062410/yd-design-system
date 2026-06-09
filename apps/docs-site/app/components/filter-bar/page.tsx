import { ApiTable } from "@/components/docs/api-table";
import {
  FILTERBAR_API_ROWS,
  FILTERBAR_COMPONENT_TOKENS,
  FILTERBAR_GLOBAL_TOKENS,
  FILTERBAR_INTRO,
  FILTERBAR_ITEM_API_ROWS,
  FILTERBAR_WHEN_TO_USE,
} from "@/lib/data/filterBarMock";
import { descriptionsDocTableThClass } from "../descriptions/descriptions-doc-table";
import { FilterBarDemosShowcase } from "./filter-bar-showcase";
import { FilterBarSemanticShowcase } from "./filter-bar-semantic-showcase";

const SECTION_CLASS = "scroll-mt-24";

export default function FilterBarPage() {
  return (
    <div className="mx-auto max-w-[960px] px-4 pb-12">
      <header id="filterbar-intro" className={`${SECTION_CLASS} pt-8`}>
        <h1 className="text-[28px] font-semibold tracking-tight text-foreground">
          FilterBar 业务筛选栏
        </h1>
        <p className="mt-3 text-[14px] leading-7 text-muted-foreground">{FILTERBAR_INTRO}</p>
      </header>

      <section id="filterbar-when-to-use" className={`${SECTION_CLASS} mt-12`}>
        <h2 className="mb-4 text-xl font-semibold tracking-tight text-foreground">何时使用</h2>
        <ul className="list-disc space-y-2 pl-5 text-[14px] leading-7 text-muted-foreground">
          {FILTERBAR_WHEN_TO_USE.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section id="filterbar-demos" className={`${SECTION_CLASS} mt-12`}>
        <h2 className="mb-6 text-xl font-semibold tracking-tight text-foreground">代码演示</h2>
        <FilterBarDemosShowcase />
      </section>

      <section id="filterbar-api" className={`${SECTION_CLASS} mt-12 border-t border-border pt-8`}>
        <h2 className="mb-4 text-xl font-semibold tracking-tight text-foreground">API</h2>
        <h3 className="mb-3 text-sm font-semibold text-foreground">FilterBar</h3>
        <ApiTable rows={FILTERBAR_API_ROWS} showVersion />
        <h3 className="mb-3 mt-8 text-sm font-semibold text-foreground">FilterBar.Item</h3>
        <ApiTable rows={FILTERBAR_ITEM_API_ROWS} showVersion />
      </section>

      <section
        id="filterbar-semantic-dom"
        className={`${SECTION_CLASS} mt-12 border-t border-border pt-8`}
      >
        <h2 className="mb-4 text-xl font-semibold tracking-tight text-foreground">语义化 DOM</h2>
        <p className="mb-6 text-[14px] leading-7 text-muted-foreground">
          组件通过 data-filter-bar 标记语义节点：root → primary → secondary → item → label →
          component → actions。business 模式下查询/重置固定右侧。
        </p>
        <FilterBarSemanticShowcase />
      </section>

      <section id="filterbar-tokens" className={`${SECTION_CLASS} mt-12 border-t border-border pt-8`}>
        <h2 className="mb-6 text-xl font-semibold tracking-tight text-foreground">Design Token</h2>

        <h3 className="mb-3 text-sm font-semibold text-foreground">组件 Token</h3>
        <div className="mb-8 overflow-x-auto rounded-lg border">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className={descriptionsDocTableThClass}>Token 名称</th>
                <th className={descriptionsDocTableThClass}>CSS 变量</th>
                <th className={descriptionsDocTableThClass}>说明</th>
              </tr>
            </thead>
            <tbody>
              {FILTERBAR_COMPONENT_TOKENS.map((row) => (
                <tr key={row.token} className="border-b last:border-0">
                  <td className="px-4 py-3 font-mono text-xs">{row.token}</td>
                  <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{row.cssVar}</td>
                  <td className="px-4 py-3 text-muted-foreground">{row.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h3 className="mb-3 text-sm font-semibold text-foreground">全局 Token</h3>
        <div className="overflow-x-auto rounded-lg border">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className={descriptionsDocTableThClass}>Token 名称</th>
                <th className={descriptionsDocTableThClass}>映射变量</th>
                <th className={descriptionsDocTableThClass}>说明</th>
              </tr>
            </thead>
            <tbody>
              {FILTERBAR_GLOBAL_TOKENS.map((row) => (
                <tr key={row.token} className="border-b last:border-0">
                  <td className="px-4 py-3 font-mono text-xs">{row.token}</td>
                  <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{row.cssVar}</td>
                  <td className="px-4 py-3 text-muted-foreground">{row.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
