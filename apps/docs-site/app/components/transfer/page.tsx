import { ApiTable } from "@/components/docs/api-table";
import { CopyCodeBlock } from "@/components/docs/copy-code-block";
import { descriptionsDocTableThClass } from "../descriptions/descriptions-doc-table";
import {
  TRANSFER_API_ROWS,
  TRANSFER_BUSINESS_API_ROWS,
  TRANSFER_CODE_EXAMPLE,
  TRANSFER_INTRO,
  TRANSFER_TOKEN_ROWS,
  TRANSFER_WHEN_TO_USE,
} from "@/lib/data/transferMock";
import {
  TransferAdvancedShowcase,
  TransferBasicShowcase,
  TransferBusinessShowcase,
} from "./transfer-showcase";

const SECTION_CLASS = "scroll-mt-24";

export default function TransferPage() {
  return (
    <div className="mx-auto w-full max-w-[960px] pb-12">
      <header id="transfer-intro" className={`${SECTION_CLASS} border-b border-border pb-8`}>
        <h1 className="text-[28px] font-semibold tracking-tight text-foreground">Transfer 穿梭框</h1>
        <p className="mt-3 max-w-[720px] text-[14px] leading-7 text-muted-foreground">{TRANSFER_INTRO}</p>
      </header>

      <section id="transfer-basic" className={`${SECTION_CLASS} mt-12`}>
        <div className="mb-12 space-y-1">
          <h2 className="text-[20px] font-semibold tracking-tight text-foreground">基础用法</h2>
          <p className="text-[14px] text-muted-foreground">Basic / Checkable / OneWay</p>
        </div>
        <TransferBasicShowcase />
      </section>

      <section id="transfer-business" className={`${SECTION_CLASS} mt-12`}>
        <div className="mb-12 space-y-1">
          <h2 className="text-[20px] font-semibold tracking-tight text-foreground">业务场景</h2>
          <p className="text-[14px] text-muted-foreground">门店分配 / 巡检员分配 / 权限分配</p>
        </div>
        <TransferBusinessShowcase />
      </section>

      <section id="transfer-advanced" className={`${SECTION_CLASS} mt-12`}>
        <div className="mb-12 space-y-1">
          <h2 className="text-[20px] font-semibold tracking-tight text-foreground">高级能力</h2>
          <p className="text-[14px] text-muted-foreground">搜索过滤 + disabled + 统计</p>
        </div>
        <TransferAdvancedShowcase />
      </section>

      <section id="transfer-when-to-use" className={`${SECTION_CLASS} mt-12 border-t border-border pt-12`}>
        <h2 className="mb-4 text-xl font-semibold tracking-tight text-foreground">何时使用</h2>
        <ul className="mb-6 list-disc space-y-2 pl-5 text-[14px] leading-7 text-muted-foreground">
          {TRANSFER_WHEN_TO_USE.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <CopyCodeBlock code={TRANSFER_CODE_EXAMPLE} />
      </section>

      <section id="transfer-api" className={`${SECTION_CLASS} mt-12 border-t border-border pt-12`}>
        <h2 className="mb-4 text-xl font-semibold tracking-tight text-foreground">API</h2>
        <h3 className="mb-3 text-sm font-semibold text-foreground">Transfer</h3>
        <ApiTable rows={[...TRANSFER_API_ROWS]} />
        <h3 className="mb-3 mt-8 text-sm font-semibold text-foreground">业务预设</h3>
        <ApiTable rows={[...TRANSFER_BUSINESS_API_ROWS]} />
      </section>

      <section id="transfer-tokens" className={`${SECTION_CLASS} mt-12 border-t border-border pt-12`}>
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
              {TRANSFER_TOKEN_ROWS.map((row) => (
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
