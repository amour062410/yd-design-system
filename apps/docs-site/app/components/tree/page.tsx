import { ApiTable } from "@/components/docs/api-table";
import { CopyCodeBlock } from "@/components/docs/copy-code-block";
import { descriptionsDocTableThClass } from "../descriptions/descriptions-doc-table";
import {
  TREE_API_ROWS,
  TREE_BUSINESS_API_ROWS,
  TREE_CODE_EXAMPLE,
  TREE_INTRO,
  TREE_TOKEN_ROWS,
  TREE_WHEN_TO_USE,
} from "@/lib/data/treeMock";
import { TreeDemosShowcase } from "./tree-showcase";

const SECTION_CLASS = "scroll-mt-24";

export default function TreePage() {
  return (
    <div className="mx-auto max-w-[960px] px-4 pb-12">
      <header id="tree-intro" className={`${SECTION_CLASS} pt-8`}>
        <h1 className="text-[28px] font-semibold tracking-tight text-foreground">Tree 树形控件</h1>
        <p className="mt-3 text-[14px] leading-7 text-muted-foreground">{TREE_INTRO}</p>
      </header>

      <section id="tree-when-to-use" className={`${SECTION_CLASS} mt-12`}>
        <h2 className="mb-4 text-xl font-semibold tracking-tight text-foreground">何时使用</h2>
        <ul className="mb-6 list-disc space-y-2 pl-5 text-[14px] leading-7 text-muted-foreground">
          {TREE_WHEN_TO_USE.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <CopyCodeBlock code={TREE_CODE_EXAMPLE} />
      </section>

      <section id="tree-demos" className={`${SECTION_CLASS} mt-12`}>
        <h2 className="mb-6 text-xl font-semibold tracking-tight text-foreground">代码演示</h2>
        <TreeDemosShowcase />
      </section>

      <section id="tree-api" className={`${SECTION_CLASS} mt-12 border-t border-border pt-8`}>
        <h2 className="mb-4 text-xl font-semibold tracking-tight text-foreground">API</h2>
        <h3 className="mb-3 text-sm font-semibold text-foreground">Tree</h3>
        <ApiTable rows={[...TREE_API_ROWS]} />
        <h3 className="mb-3 mt-8 text-sm font-semibold text-foreground">业务 Tree</h3>
        <ApiTable rows={[...TREE_BUSINESS_API_ROWS]} />
      </section>

      <section id="tree-tokens" className={`${SECTION_CLASS} mt-12 border-t border-border pt-8`}>
        <h2 className="mb-6 text-xl font-semibold tracking-tight text-foreground">Design Token</h2>
        <div className="overflow-x-auto rounded-lg border">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className={descriptionsDocTableThClass}>Token 名称</th>
                <th className={descriptionsDocTableThClass}>CSS 变量</th>
                <th className={descriptionsDocTableThClass}>说明</th>
              </tr>
            </thead>
            <tbody>
              {TREE_TOKEN_ROWS.map((row) => (
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
