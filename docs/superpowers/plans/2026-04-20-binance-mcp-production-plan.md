# Binance MCP — Production Readiness Plan

**Spec:** `docs/superpowers/specs/2026-04-20-binance-mcp-production-design.md`
**Author:** Mr.Roblox (sankyago)

## Execution order

1. **package.json rewrite**
   - Set `author` → `"Mr.Roblox (sankyago)"`.
   - Set `description` → `"Production-grade MCP server for the Binance exchange — portfolio, trading, staking, earn, NFT, loans, and more."`.
   - Replace BSC-centric keywords with Binance-exchange-focused tags.
   - Add `engines.node: ">=18"`.
   - Add `zod` to deps.
   - Remove `test` and `publish:auto` scripts (no supporting files).
   - Bump every existing dep/devDep marker to `latest`.

2. **Remove pnpm-lock.yaml** — `rm` it.

3. **npm install** — regenerates `package-lock.json` with upgraded versions.

4. **Delete 4 dead legacy files.**

5. **Consolidate client config** — merge `client.ts` into `binanceClient.ts`, export the same symbol names so no import needs to change.

6. **Add `src/utils/toolResponse.ts`** — `ok()` and `fail()` helpers.

7. **Bulk rename** — Node codemod script that walks `src/tools/**/*.ts`, finds each `server.tool("...",...)` first argument, and rewrites it to `binance_<domain>_<action>` using the domain map in the spec. Action segment = the current camelCase/PascalCase name (minus any `Binance` / `register` / `registerBinance` / domain prefix) converted to snake_case.

8. **Fix `src/index.ts`** — import `pkg.version` from `package.json` via JSON import assertion.

9. **Fix `config.json`** — path + use `binance-mcp`.

10. **Add `.env.example`.**

11. **Write `CLAUDE.md`.**

12. **Update `README.md`.**

13. **Build** — `npm run build`. Fix any type drift.

14. **Code review** — `superpowers:code-reviewer` agent over the diff.

15. **Git reset** — `rm -rf .git && git init -b main && git add -A && git commit -m "Initial commit"`.

## Codemod rules (step 7)

For each `*.ts` under `src/tools/`:

- Determine domain token from file path (see spec table).
- Find the first string argument to `server.tool(` (regex: `server\.tool\(\s*"([^"]+)"`).
- Compute new name:
  - Strip leading `register`, `Binance`, or current domain tokens.
  - Convert remaining PascalCase/camelCase to `snake_case`.
  - Prepend `binance_<domain>_`.
- Write back.
- Do NOT rename the exported `register*` TypeScript function — it's an internal identifier.

## Rollback

Since git is getting reset, there's no rollback beyond the filesystem. We run `npm run build` before the git reset so a broken build blocks the commit.
