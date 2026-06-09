import { ApiTable } from "@/components/docs/api-table";
import { CopyCodeBlock } from "@/components/docs/copy-code-block";
import { descriptionsDocTableThClass } from "../descriptions/descriptions-doc-table";
import {
  INPUT_NUMBER_API_ROWS,
  INPUT_NUMBER_BUSINESS_API_ROWS,
  INPUT_NUMBER_CODE_EXAMPLE,
  INPUT_NUMBER_INTRO,
  INPUT_NUMBER_SIZE_SPECS,
  INPUT_NUMBER_TOKEN_ROWS,
  INPUT_NUMBER_WHEN_TO_USE,
} from "@/lib/data/inputNumberMock";
import {
  InputNumberAdvancedShowcase,
  InputNumberRegularShowcase,
} from "./input-number-showcase";

const SECTION_CLASS = "scroll-mt-24";

export default function InputNumberPage() {
  return (
    <div className="mx-auto w-full max-w-[960px] pb-12">
      <header id="input-number-intro" className={`${SECTION_CLASS} border-b border-border pb-8`}>
        <h1 className="text-[28px] font-semibold tracking-tight text-foreground">Input Number</h1>
        <p className="mt-3 max-w-[720px] text-[14px] leading-7 text-muted-foreground">{INPUT_NUMBER_INTRO}</p>
      </header>

      <section id="input-number-number" className={`${SECTION_CLASS} mt-12`}>
        <div className="mb-12 space-y-1">
          <h2 className="text-[20px] font-semibold tracking-tight text-foreground">Number</h2>
          <p className="text-[14px] text-muted-foreground">
            步进按钮、精度控制、范围限制、格式化与带单位后缀的业务变体。
          </p>
        </div>
        <InputNumberAdvancedShowcase />
      </section>

      <section id="input-number-regular" className={`${SECTION_CLASS} mt-12`}>
        <div className="mb-12 space-y-1">
          <h2 className="text-[20px] font-semibold tracking-tight text-foreground">Regular</h2>
          <p className="text-[14px] text-muted-foreground">
            基础输入框、三种尺寸、禁用与校验状态。
          </p>
        </div>
        <InputNumberRegularShowcase />
      </section>

      <section id="input-number-when-to-use" className={`${SECTION_CLASS} mt-12 border-t border-border pt-12`}>
        <h2 className="mb-4 text-xl font-semibold tracking-tight text-foreground">何时使用</h2>
        <ul className="mb-6 list-disc space-y-2 pl-5 text-[14px] leading-7 text-muted-foreground">
          {INPUT_NUMBER_WHEN_TO_USE.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <CopyCodeBlock code={INPUT_NUMBER_CODE_EXAMPLE} />
      </section>

      <section id="input-number-sizes" className={`${SECTION_CLASS} mt-12 border-t border-border pt-12`}>
        <h2 className="mb-6 text-xl font-semibold tracking-tight text-foreground">尺寸规格</h2>
        <div className="overflow-x-auto rounded-lg border">
          <table className="w-full min-w-[560px] text-left text-sm">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className={descriptionsDocTableThClass}>尺寸</th>
                <th className={descriptionsDocTableThClass}>高度</th>
                <th className={descriptionsDocTableThClass}>字号</th>
                <th className={descriptionsDocTableThClass}>步进按钮</th>
              </tr>
            </thead>
            <tbody>
              {INPUT_NUMBER_SIZE_SPECS.map((row) => (
                <tr key={row.size} className="border-b last:border-0">
                  <td className="px-4 py-3 capitalize text-foreground">{row.size}</td>
                  <td className="px-4 py-3 text-muted-foreground">{row.height}</td>
                  <td className="px-4 py-3 text-muted-foreground">{row.fontSize}</td>
                  <td className="px-4 py-3 text-muted-foreground">{row.control}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section id="input-number-api" className={`${SECTION_CLASS} mt-12 border-t border-border pt-12`}>
        <h2 className="mb-4 text-xl font-semibold tracking-tight text-foreground">API</h2>
        <h3 className="mb-3 text-sm font-semibold text-foreground">InputNumber</h3>
        <ApiTable rows={[...INPUT_NUMBER_API_ROWS]} />
        <h3 className="mb-3 mt-8 text-sm font-semibold text-foreground">业务预设</h3>
        <ApiTable rows={[...INPUT_NUMBER_BUSINESS_API_ROWS]} />
      </section>

      <section id="input-number-tokens" className={`${SECTION_CLASS} mt-12 border-t border-border pt-12`}>
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
              {INPUT_NUMBER_TOKEN_ROWS.map((row) => (
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
