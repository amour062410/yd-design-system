import { ApiTable } from "@/components/docs/api-table";
import { CopyCodeBlock } from "@/components/docs/copy-code-block";
import { descriptionsDocTableThClass } from "../descriptions/descriptions-doc-table";
import {
  TRANSFER_PRO_API_ROWS,
  TRANSFER_PRO_BUSINESS_API_ROWS,
  TRANSFER_PRO_CODE_EXAMPLE,
  TRANSFER_PRO_INTRO,
  TRANSFER_PRO_TOKEN_ROWS,
  TRANSFER_PRO_WHEN_TO_USE,
} from "@/lib/data/transferProMock";
import {
  TransferProDiffShowcase,
  TransferProInspectorShowcase,
  TransferProListShowcase,
  TransferProRuleShowcase,
  TransferProTableShowcase,
  TransferProTreeShowcase,
} from "./transfer-pro-showcase";

const SECTION_CLASS = "scroll-mt-24";

export default function TransferProPage() {
  return (
    <div className="mx-auto w-full max-w-[1040px] pb-12">
      <header id="transfer-pro-intro" className={`${SECTION_CLASS} border-b border-border pb-8`}>
        <h1 className="text-[28px] font-semibold tracking-tight text-foreground">Transfer Pro</h1>
        <p className="mt-3 max-w-[760px] text-[14px] leading-7 text-muted-foreground">{TRANSFER_PRO_INTRO}</p>
      </header>

      <section id="transfer-pro-list" className={`${SECTION_CLASS} mt-12`}>
        <div className="mb-12 space-y-1">
          <h2 className="text-[20px] font-semibold tracking-tight text-foreground">基础模式</h2>
          <p className="text-[14px] text-muted-foreground">List Transfer 普通穿梭框</p>
        </div>
        <TransferProListShowcase />
      </section>

      <section id="transfer-pro-tree" className={`${SECTION_CLASS} mt-12`}>
        <div className="mb-12 space-y-1">
          <h2 className="text-[20px] font-semibold tracking-tight text-foreground">Tree 模式</h2>
          <p className="text-[14px] text-muted-foreground">门店层级结构穿梭（核心）</p>
        </div>
        <TransferProTreeShowcase />
      </section>

      <section id="transfer-pro-table" className={`${SECTION_CLASS} mt-12`}>
        <div className="mb-12 space-y-1">
          <h2 className="text-[20px] font-semibold tracking-tight text-foreground">Table 模式</h2>
          <p className="text-[14px] text-muted-foreground">运营视角带字段的门店分配</p>
        </div>
        <TransferProTableShowcase />
      </section>

      <section id="transfer-pro-rule" className={`${SECTION_CLASS} mt-12`}>
        <div className="mb-12 space-y-1">
          <h2 className="text-[20px] font-semibold tracking-tight text-foreground">Rule Engine</h2>
          <p className="text-[14px] text-muted-foreground">按规则自动分配巡检员/门店</p>
        </div>
        <TransferProRuleShowcase />
      </section>

      <section id="transfer-pro-diff" className={`${SECTION_CLASS} mt-12`}>
        <div className="mb-12 space-y-1">
          <h2 className="text-[20px] font-semibold tracking-tight text-foreground">Diff View</h2>
          <p className="text-[14px] text-muted-foreground">分配变更审计对比</p>
        </div>
        <TransferProDiffShowcase />
      </section>

      <section id="transfer-pro-inspector" className={`${SECTION_CLASS} mt-12`}>
        <div className="mb-12 space-y-1">
          <h2 className="text-[20px] font-semibold tracking-tight text-foreground">巡检员调度</h2>
          <p className="text-[14px] text-muted-foreground">云盯巡检员分配业务场景</p>
        </div>
        <TransferProInspectorShowcase />
      </section>

      <section id="transfer-pro-when-to-use" className={`${SECTION_CLASS} mt-12 border-t border-border pt-12`}>
        <h2 className="mb-4 text-xl font-semibold tracking-tight text-foreground">何时使用</h2>
        <ul className="mb-6 list-disc space-y-2 pl-5 text-[14px] leading-7 text-muted-foreground">
          {TRANSFER_PRO_WHEN_TO_USE.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <CopyCodeBlock code={TRANSFER_PRO_CODE_EXAMPLE} />
      </section>

      <section id="transfer-pro-api" className={`${SECTION_CLASS} mt-12 border-t border-border pt-12`}>
        <h2 className="mb-4 text-xl font-semibold tracking-tight text-foreground">API</h2>
        <h3 className="mb-3 text-sm font-semibold text-foreground">TransferPro</h3>
        <ApiTable rows={[...TRANSFER_PRO_API_ROWS]} />
        <h3 className="mb-3 mt-8 text-sm font-semibold text-foreground">业务预设</h3>
        <ApiTable rows={[...TRANSFER_PRO_BUSINESS_API_ROWS]} />
      </section>

      <section id="transfer-pro-tokens" className={`${SECTION_CLASS} mt-12 border-t border-border pt-12`}>
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
              {TRANSFER_PRO_TOKEN_ROWS.map((row) => (
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
