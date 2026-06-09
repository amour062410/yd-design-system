import { ApiTable } from "@/components/docs/api-table";
import { CopyCodeBlock } from "@/components/docs/copy-code-block";
import {
  descriptionsDocTableThClass,
} from "../descriptions/descriptions-doc-table";
import {
  DIVIDER_API_ROWS,
  DIVIDER_CODE_EXAMPLE,
  DIVIDER_INTRO,
  DIVIDER_SECTION_CODE,
  DIVIDER_TOKEN_ROWS,
  DIVIDER_WHEN_TO_USE,
} from "@/lib/data/dividerMock";
import { DividerDemosShowcase } from "./divider-showcase";

const SECTION_CLASS = "scroll-mt-24";

export default function DividerPage() {
  return (
    <div className="mx-auto max-w-[960px] px-4 pb-12">
      <header id="divider-intro" className={`${SECTION_CLASS} pt-8`}>
        <h1 className="text-[28px] font-semibold tracking-tight text-foreground">
          Divider 分割线
        </h1>
        <p className="mt-3 text-[14px] leading-7 text-muted-foreground">{DIVIDER_INTRO}</p>
      </header>

      <section id="divider-when-to-use" className={`${SECTION_CLASS} mt-12`}>
        <h2 className="mb-4 text-xl font-semibold tracking-tight text-foreground">何时使用</h2>
        <ul className="mb-6 list-disc space-y-2 pl-5 text-[14px] leading-7 text-muted-foreground">
          {DIVIDER_WHEN_TO_USE.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <div className="grid gap-4 lg:grid-cols-2">
          <div>
            <p className="mb-2 text-[13px] font-medium text-foreground">基础用法</p>
            <CopyCodeBlock code={DIVIDER_CODE_EXAMPLE} />
          </div>
          <div>
            <p className="mb-2 text-[13px] font-medium text-foreground">业务 Pattern</p>
            <CopyCodeBlock code={DIVIDER_SECTION_CODE} />
          </div>
        </div>
      </section>

      <section id="divider-demos" className={`${SECTION_CLASS} mt-12`}>
        <h2 className="mb-6 text-xl font-semibold tracking-tight text-foreground">代码演示</h2>
        <DividerDemosShowcase />
      </section>

      <section id="divider-api" className={`${SECTION_CLASS} mt-12 border-t border-border pt-8`}>
        <h2 className="mb-4 text-xl font-semibold tracking-tight text-foreground">API</h2>
        <ApiTable rows={[...DIVIDER_API_ROWS]} />
      </section>

      <section id="divider-tokens" className={`${SECTION_CLASS} mt-12 border-t border-border pt-8`}>
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
              {DIVIDER_TOKEN_ROWS.map((row) => (
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
