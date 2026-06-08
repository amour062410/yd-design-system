# Token 生成脚本（规划中）

## 当前状态

| 能力 | 实现 |
|------|------|
| SSOT 源文件 | `../token.json` |
| 运行时导出 | `../index.ts` → `../src/ssot/*` |
| 消费路径 | `@yd-ds/tokens/json` |
| 全量 codegen | `generate-tokens.mjs --write`（占位，仅演示 `colors.ts`） |

## 命令

```bash
# 检查（默认，不改变文件）
node packages/tokens/scripts/generate-tokens.mjs --check

# 将来：写入 src/generated/
node packages/tokens/scripts/generate-tokens.mjs --write
```

## 迁移阶段（见 `docs/token-migration-plan.md`）

1. **Phase 1**：`--write` 生成 `src/generated/primitives/*.ts`，`src/primitives/*.ts` 改为 re-export
2. **Phase 2**：生成 `semantic/colors.ts` + HSL `tokens.css` 片段
3. **Phase 3**：生成 `component/*-tokens.ts` + `showcase-tokens.css`
4. **Phase 4**：CI `pnpm tokens:validate` = generate + `git diff --exit-code`

## 接入 package.json（待办）

```json
{
  "scripts": {
    "generate": "node scripts/generate-tokens.mjs --write",
    "tokens:validate": "node scripts/generate-tokens.mjs --check"
  }
}
```
