import { ApiTable } from "@/components/docs/api-table";
import { CopyCodeBlock } from "@/components/docs/copy-code-block";
import {
  DESCRIPTIONS_COMPONENT_TOKENS,
  DESCRIPTIONS_GLOBAL_TOKENS,
  DESCRIPTIONS_INTRO,
  DESCRIPTIONS_ITEM_API_ROWS,
  DESCRIPTIONS_API_ROWS,
  DESCRIPTIONS_NOT_RECOMMENDED_CODE,
  DESCRIPTIONS_RECOMMENDED_CODE,
  DESCRIPTIONS_WHEN_TO_USE,
} from "@/lib/data/descriptionsMock";
import { DescriptionsDemosShowcase } from "./descriptions-showcase";
import { DescriptionsSemanticShowcase } from "./descriptions-semantic-showcase";
import {
  descriptionsDocTableScopeClass,
  descriptionsDocTableThClass,
} from "./descriptions-doc-table";

const SECTION_CLASS = "scroll-mt-24";

export default function DescriptionsPage() {
  return (
    <div className="mx-auto max-w-[960px] px-4 pb-12">
      <header id="descriptions-intro" className={`${SECTION_CLASS} pt-8`}>
        <h1 className="text-[28px] font-semibold tracking-tight text-foreground">
          Descriptions 描述列表
        </h1>
        <p className="mt-3 text-[14px] leading-7 text-muted-foreground">
          {DESCRIPTIONS_INTRO}
        </p>
      </header>

      <section id="descriptions-when-to-use" className={`${SECTION_CLASS} mt-12`}>
        <h2 className="mb-4 text-xl font-semibold tracking-tight text-foreground">
          何时使用
        </h2>
        <ul className="mb-6 list-disc space-y-2 pl-5 text-[14px] leading-7 text-muted-foreground">
          {DESCRIPTIONS_WHEN_TO_USE.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <div className="grid gap-4 lg:grid-cols-2">
          <div>
            <p className="mb-2 text-[13px] font-medium text-foreground">推荐</p>
            <CopyCodeBlock code={DESCRIPTIONS_RECOMMENDED_CODE} />
          </div>
          <div>
            <p className="mb-2 text-[13px] font-medium text-foreground">不推荐</p>
            <CopyCodeBlock code={DESCRIPTIONS_NOT_RECOMMENDED_CODE} />
          </div>
        </div>
      </section>

      <section id="descriptions-demos" className={`${SECTION_CLASS} mt-12`}>
        <h2 className="mb-6 text-xl font-semibold tracking-tight text-foreground">
          代码演示
        </h2>
        <DescriptionsDemosShowcase />
      </section>

      <section id="descriptions-api" className={`${SECTION_CLASS} mt-12 border-t border-border pt-8 ${descriptionsDocTableScopeClass}`}>
        <h2 className="mb-4 text-xl font-semibold tracking-tight text-foreground">API</h2>
        <h3 className="mb-3 text-sm font-semibold text-foreground">Descriptions</h3>
        <ApiTable rows={[...DESCRIPTIONS_API_ROWS]} showVersion />
        <h3 className="mb-3 mt-8 text-sm font-semibold text-foreground">Descriptions.Item</h3>
        <ApiTable rows={[...DESCRIPTIONS_ITEM_API_ROWS]} showVersion />
      </section>

      <section
        id="descriptions-semantic-dom"
        className={`${SECTION_CLASS} mt-12 border-t border-border pt-8`}
      >
        <h2 className="mb-4 text-xl font-semibold tracking-tight text-foreground">
          语义化 DOM
        </h2>
        <p className="mb-6 text-[14px] leading-7 text-muted-foreground">
          组件通过 data-descriptions 标记语义节点：root → header → title → extra → label →
          content。可使用 classNames / styles 分别定制。
        </p>
        <DescriptionsSemanticShowcase />
      </section>

      <section id="descriptions-tokens" className={`${SECTION_CLASS} mt-12 border-t border-border pt-8`}>
        <h2 className="mb-6 text-xl font-semibold tracking-tight text-foreground">
          Design Token
        </h2>

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
              {DESCRIPTIONS_COMPONENT_TOKENS.map((row) => (
                <tr key={row.token} className="border-b last:border-0">
                  <td className="px-4 py-3 font-mono text-xs">{row.token}</td>
                  <td className="px-4 py-3 font-mono text-xs text-muted-foreground">
                    {row.cssVar}
                  </td>
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
              {DESCRIPTIONS_GLOBAL_TOKENS.map((row) => (
                <tr key={row.token} className="border-b last:border-0">
                  <td className="px-4 py-3 font-mono text-xs">{row.token}</td>
                  <td className="px-4 py-3 font-mono text-xs text-muted-foreground">
                    {row.cssVar}
                  </td>
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
