# CLAUDE.md

Guidance for Claude Code when working on **binance-mcp** — a production MCP server for the Binance exchange.

**Maintainer:** Mr.Roblox (sankyago)

## What this project is

An MCP (Model Context Protocol) server that exposes the Binance exchange REST API as Claude-callable tools. Each tool wraps one Binance endpoint, validates input with Zod, calls the official `@binance/*` SDK, and returns a `text` content block with the JSON response.

The transport is `StdioServerTransport`, so the binary is meant to be launched by an MCP host (Claude Desktop, Claude Code, etc.), not run as a long-lived daemon.

## Build & run

```sh
npm install
npm run build      # tsc → ./build, chmod +x build/index.js
npm start          # node ./build/index.js
npm run init       # interactive: writes .env + Claude Desktop config
```

Requires Node ≥ 18. The shebang in `build/index.js` lets `npx binance-mcp` work after publish.

## Repository layout

```
src/
  index.ts                 # entrypoint: dotenv, McpServer, register*, stdio transport
  config/
    binanceClient.ts       # single source of truth for every @binance/* SDK client
  utils/
    toolResponse.ts        # ok() / fail() helpers — every tool should use these
  tools/
    binance-<domain>/
      <sub>-api/
        <action>.ts        # one MCP tool per file
        index.ts           # registers all tools in this sub-API
      index.ts             # registers all sub-APIs in this domain
docs/superpowers/
  specs/                   # design docs
  plans/                   # implementation plans
scripts/
  rename-tools.mjs         # codemod: snake_case tool names
  fix-tool-names.mjs       # second-pass fixups
.github/workflows/
  ci.yml                   # build on PR + push to main
  release.yml              # semantic-release on push to main → publishes to npm
.releaserc.json            # conventional-commits → version bumps + changelog
```

## Tool naming convention

**Every** MCP tool name uses lowercase `snake_case` and follows:

```
binance_<domain>_<action>
```

| Domain | Folder source | Examples |
|---|---|---|
| `spot_market` | `binance-spot/market-api` | `binance_spot_market_depth`, `binance_spot_market_klines` |
| `spot_trade` | `binance-spot/trade-api` | `binance_spot_trade_new_order` |
| `spot_account` | `binance-spot/account-api` | `binance_spot_account_info` |
| `spot_general` | `binance-spot/general-api` | `binance_spot_general_ping` |
| `wallet_account` | `binance-wallet/account-api` | `binance_wallet_account_info` |
| `wallet_asset` | `binance-wallet/asset-api` | `binance_wallet_asset_dust_transfer` |
| `wallet_capital` | `binance-wallet/capital-api` | `binance_wallet_capital_withdraw` |
| `wallet_travel_rule` | `binance-wallet/travel-rule-api` | `binance_wallet_travel_rule_withdraw` |
| `wallet_others` | `binance-wallet/others-api` | `binance_wallet_others_system_status` |
| `staking_eth` | `binance-staking/ETH-staking-api` | `binance_staking_eth_subscribe_eth_staking` |
| `staking_sol` | `binance-staking/SOL-staking-api` | `binance_staking_sol_history` |
| `algo_spot` / `algo_future` | `binance-algo/{spot,future}-algo` | `binance_algo_spot_twap_new_order` |
| `convert_trade` / `convert_market` | `binance-convert/{trade,market-data}-api` | `binance_convert_trade_accept_quote` |
| `vip_loan_*` | `binance-vip-loan/*-api` | `binance_vip_loan_trade_borrow` |
| `dual_investment_*` | `binance-dual-investment/*-api` | `binance_dual_investment_trade_positions` |
| `mining` | `binance-mining/mining-api` | `binance_mining_account_list` |
| `simple_earn` | `binance-simple-earn` | `binance_simple_earn_subscribe_flexible_product` |
| `copy_trading_future` | `binance-copy-trading/FutureCopyTrading-api` | `binance_copy_trading_future_lead_trader_status` |
| `c2c`, `fiat`, `nft`, `pay`, `rebate` | self-named | `binance_c2c_trade_history`, `binance_nft_asset` |

The TypeScript `register<Whatever>()` function names are internal — only the `server.tool("...")` first argument is the user-facing tool name.

## Adding a new tool

1. Pick (or create) the right `src/tools/<domain>/<sub>-api/` folder.
2. Create `<actionName>.ts`:
   ```ts
   import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
   import { z } from "zod";
   import { spotClient } from "../../../config/binanceClient.js";
   import { ok, fail } from "../../../utils/toolResponse.js";

   export function registerBinanceMyNewThing(server: McpServer) {
       server.tool(
           "binance_<domain>_<action>",
           "Short description Claude will see.",
           { param: z.string().describe("...") },
           async ({ param }) => {
               try {
                   const response = await spotClient.restAPI.someEndpoint({ param });
                   const data = await response.data();
                   return ok(`Did the thing.`, data);
               } catch (error) {
                   return fail("Failed to do the thing", error);
               }
           },
       );
   }
   ```
3. Add `register*` import + call to the sub-API's `index.ts`.
4. If creating a brand new sub-API, also add it to the domain's `index.ts`.
5. `npm run build` — must exit 0.
6. Append the tool name to the table in `README.md`.

## Credentials

Read from `.env` via `dotenv` at startup. **Never** hard-code or log keys. `.env.example` has the template. The `init` command writes `.env` for the user interactively.

## Error handling

Every tool **must** wrap the SDK call in `try`/`catch` and return via `fail("context", error)`. The helper extracts Binance's `code`, HTTP status, and response body so Claude (or the human reading the tool output) can diagnose without rerunning.

## Release flow

`main` is the only release branch. Push a conventional-commits message — `release.yml` runs `semantic-release`, which:

1. Determines version bump from commit types (`feat:` → minor, `fix:` → patch, etc.).
2. Updates `CHANGELOG.md` and `package.json`.
3. Tags the release on GitHub.
4. Publishes to npm (requires `NPM_TOKEN` secret).
5. Commits the changelog/version bump back with `[skip ci]`.

After publish, end users install via `npx binance-mcp` — no clone required.

## Conventions for Claude

- **Follow existing patterns.** Each tool file is self-contained, small, single-purpose. Don't introduce shared mutable state, classes, or DI frameworks.
- **Don't widen Zod schemas to satisfy a TypeScript error.** If the SDK request type changed, fix the call site, not the schema.
- **Don't add tests in this repo** — there is no test harness. Verification is `npm run build`.
- **Don't `npm install` packages without checking the lockfile diff.** Bump dependency versions in `package.json` and re-run `npm install` so the lock updates atomically.
- **Don't restructure the folder tree.** The naming codemod and the `domain → folder` mapping in `scripts/rename-tools.mjs` are coupled to it.
