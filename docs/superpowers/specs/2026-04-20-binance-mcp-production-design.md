# Binance MCP — Production Readiness Design

**Author:** Mr.Roblox (sankyago)
**Date:** 2026-04-20
**Status:** Approved

## Goal

Turn the current Binance MCP server (v1.0.8) into a production-ready package: consistent tool naming, clean dependency tree, no dead code, accurate docs, and a fresh git history.

## Non-Goals

- Audit `@binance/*` SDKs for unwired endpoints and add new tools.
- Introduce a test harness. (Existing `test` script is a no-op; we will neutralize the reference, not build one.)
- Change transport, logging, or server structure.

## Changes

### 1. Naming: `snake_case`

All MCP tool names become `binance_<domain>_<action>`. The domain follows the existing folder layout:

| Folder | Domain token |
|---|---|
| `binance-spot/market-api` | `spot_market` |
| `binance-spot/trade-api` | `spot_trade` |
| `binance-spot/account-api` | `spot_account` |
| `binance-spot/general-api` | `spot_general` |
| `binance-spot/userdatastream-api` | `spot_user_stream` |
| `binance-wallet/{sub}-api` | `wallet_{sub}` |
| `binance-staking/ETH-staking-api` | `staking_eth` |
| `binance-staking/SOL-staking-api` | `staking_sol` |
| `binance-algo/spot-algo` | `algo_spot` |
| `binance-algo/future-algo` | `algo_future` |
| ... | ... |

Example: `BinanceDepth` → `binance_spot_market_depth`. `BinanceWalletDustTransfer` → `binance_wallet_asset_dust_transfer`.

Broken register-like names (`registerBinance*`, `getSolStakingQuotaDetails`) are normalized under the same scheme.

### 2. Packages

- Add missing `zod`.
- Remove references to `@binance/connector-typescript` (legacy only).
- Upgrade every dep/devDep to the latest compatible version via `npm install <pkg>@latest`.
- Delete `pnpm-lock.yaml`. Regenerate `package-lock.json`.
- `engines.node: ">=18"`.

### 3. Code cleanup

- Delete 4 dead legacy files under `src/tools/binance*.ts`.
- Merge `src/config/client.ts` into `src/config/binanceClient.ts`; single source of truth.
- Add `src/utils/toolResponse.ts`: `ok(text)` / `fail(error)` helpers used by every tool.
- `src/index.ts` reads version from `package.json` at runtime.
- Remove stray `console.log`.

### 4. Config

- Fix `config.json` path.
- Add `.env.example`.

### 5. Docs

- `CLAUDE.md` written from scratch (architecture, build/run, how to add a tool, naming rule, env, author).
- `README.md` updated: snake_case tool names, accurate feature checkboxes, author credit to **Mr.Roblox (sankyago)**, corrected install commands (`npm` only).

### 6. Git

- Reinitialize `.git`. Single initial commit on branch `main`, authored by the current git user (Alexander Serdyuk), with co-author line crediting Mr.Roblox (sankyago) in the commit message.

### 7. Release automation

- Add `semantic-release` with `@semantic-release/commit-analyzer`, `@semantic-release/release-notes-generator`, `@semantic-release/npm`, `@semantic-release/github`, `@semantic-release/changelog`, `@semantic-release/git` as devDependencies.
- `.releaserc.json` — main branch, conventional-commits preset.
- GitHub Actions:
  - `.github/workflows/ci.yml` — on PR and push: `npm ci && npm run build`.
  - `.github/workflows/release.yml` — on push to main: build then `npx semantic-release`. Requires `NPM_TOKEN` and `GITHUB_TOKEN` secrets.
- `package.json` `bin` already exposes `binance-mcp`, so once published users can run `npx binance-mcp`.
- Ensure `"publishConfig": { "access": "public" }` and `files` includes `build`.

## Risk

- Tool renaming is a **breaking change** for any existing client referencing the old names. This is acceptable because the package is pre-1.1 and the request was explicit.
- Dep upgrades may surface TypeScript type drift. Mitigation: run `npm run build` after upgrade; patch call sites if types changed.
- Git reset is destructive. User has authorized.

## Verification

1. `npm install` completes clean.
2. `npm run build` exits 0.
3. Grep of `server.tool(` shows every tool name matches `^binance_[a-z_]+$`.
4. `src/tools/binance*.ts` no longer exists as flat files.
5. `git log --oneline | wc -l` returns `1`.
