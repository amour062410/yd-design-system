import { ApiTable } from "@/components/docs/api-table";
import { CopyCodeBlock } from "@/components/docs/copy-code-block";
import { descriptionsDocTableThClass } from "../descriptions/descriptions-doc-table";
import {
  CARD_API_ROWS,
  CARD_ACTIONS_API_ROWS,
  CARD_COMPOUND_API_ROWS,
  CARD_CODE_EXAMPLE,
  CARD_INTRO,
  CARD_TOKEN_ROWS,
  CARD_WHEN_TO_USE,
  STATISTICS_CARD_API_ROWS,
} from "@/lib/data/cardMock";
import { CardDemosShowcase } from "./card-showcase";

const SECTION_CLASS = "scroll-mt-24";

export default function CardPage() {
  return (
    <div className="mx-auto max-w-[960px] px-4 pb-12">
      <header id="card-intro" className={`${SECTION_CLASS} pt-8`}>
        <h1 className="text-[28px] font-semibold tracking-tight text-foreground">Card 卡片</h1>
        <p className="mt-3 text-[14px] leading-7 text-muted-foreground">{CARD_INTRO}</p>
      </header>

      <section id="card-when-to-use" className={`${SECTION_CLASS} mt-12`}>
        <h2 className="mb-4 text-xl font-semibold tracking-tight text-foreground">何时使用</h2>
        <ul className="mb-6 list-disc space-y-2 pl-5 text-[14px] leading-7 text-muted-foreground">
          {CARD_WHEN_TO_USE.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <CopyCodeBlock code={CARD_CODE_EXAMPLE} />
      </section>

      <section id="card-demos" className={`${SECTION_CLASS} mt-12`}>
        <h2 className="mb-6 text-xl font-semibold tracking-tight text-foreground">代码演示</h2>
        <CardDemosShowcase />
      </section>

      <section id="card-api" className={`${SECTION_CLASS} mt-12 border-t border-border pt-8`}>
        <h2 className="mb-4 text-xl font-semibold tracking-tight text-foreground">API</h2>
        <h3 className="mb-3 text-sm font-semibold text-foreground">Card</h3>
        <ApiTable rows={[...CARD_API_ROWS]} />
        <h3 className="mb-3 mt-8 text-sm font-semibold text-foreground">CardAction / CardActions</h3>
        <ApiTable rows={[...CARD_ACTIONS_API_ROWS]} />
        <h3 className="mb-3 mt-8 text-sm font-semibold text-foreground">CardCover / CardSection</h3>
        <ApiTable rows={[...CARD_COMPOUND_API_ROWS]} />
        <h3 className="mb-3 mt-8 text-sm font-semibold text-foreground">StatisticsCard</h3>
        <ApiTable rows={[...STATISTICS_CARD_API_ROWS]} />
      </section>

      <section id="card-tokens" className={`${SECTION_CLASS} mt-12 border-t border-border pt-8`}>
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
              {CARD_TOKEN_ROWS.map((row) => (
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
