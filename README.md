# Binance MCP Server

> Production-grade [Model Context Protocol](https://modelcontextprotocol.io) server for the Binance exchange — portfolio, trading, staking, earn, NFT, loans, and more.
>
> **Author:** Mr.Roblox (sankyago)

## Overview

`binance-mcp` exposes 150+ Binance REST endpoints as Claude-callable MCP tools. Drop it into Claude Desktop or any MCP host and Claude can read your portfolio, place orders, manage staking, and run TWAP/VP algo trades — all through structured tool calls validated by Zod.

## Features

- ✅ **Spot trading** — market/limit/OCO orders, open/all orders, cancel, fills
- ✅ **Spot market data** — depth, klines, agg trades, tickers, average price
- ✅ **Account & wallet** — balances, snapshots, asset details, fast-withdraw, API-key permissions
- ✅ **Capital flows** — deposit/withdraw, deposit addresses, withdraw history
- ✅ **Algo trading** — Spot & USDⓈ-M Futures TWAP and Volume Participation
- ✅ **Staking** — ETH (BETH), SOL (BNSOL), subscribe / redeem / history
- ✅ **Simple Earn** — flexible product subscribe / redeem / positions
- ✅ **Convert** — quote → accept, limit orders, history
- ✅ **Dual Investment** — products, positions, auto-compound, accounts
- ✅ **VIP Loan** — borrow / renew / repay, interest rates, collateral data
- ✅ **Mining** — accounts, hashrate resale, miner lists, earnings, bonuses
- ✅ **NFT** — assets, deposit/withdraw/transaction history
- ✅ **C2C / Pay / Fiat / Rebate / Copy Trading** — historical reads
- ✅ **Travel Rule** — VASP list, withdraw with travel-rule data
- ✅ **Structured error reporting** — Binance error codes, HTTP status, and body surfaced on every failure

## Quickstart (Claude Desktop)

After this package is published, no clone needed:

```jsonc
{
    "mcpServers": {
        "binance-mcp": {
            "command": "npx",
            "args": ["-y", "binance-mcp"],
            "env": {
                "BINANCE_API_KEY": "your_binance_api_key",
                "BINANCE_API_SECRET": "your_binance_api_secret"
            }
        }
    }
}
```

Restart Claude Desktop. The 150+ `binance_*` tools become available.

## Local development

```sh
git clone https://github.com/your-user/binance-mcp.git
cd binance-mcp
cp .env.example .env       # then fill in your Binance API key/secret
npm install
npm run build
npm start                  # runs build/index.js on stdio
```

Requires Node ≥ 18.

The interactive bootstrapper writes `.env` and registers the server in Claude Desktop in one step:

```sh
npm run init:build
```

## Creating a Binance API key

1. Sign in → profile → **Account → API Management → Create API**.
2. Choose HMAC (system-generated) or Ed25519/RSA (self-generated). HMAC is the simplest.
3. Verify with 2FA. Save the **API Key** and **Secret** somewhere safe — the secret is shown once.
4. **Restrict permissions to what you actually need.** Read-only is enough for portfolio inspection. Enable Spot Trading only if you want Claude to place orders.
5. Optionally restrict by IP for production use.

Reference: [Binance API documentation](https://developers.binance.com/en/).

## Tool naming

All tools follow `binance_<domain>_<action>` in lowercase `snake_case`. Examples:

| Tool | What it does |
|---|---|
| `binance_spot_account_info` | Account info — balances, permissions, status |
| `binance_spot_market_depth` | Order book depth (`{ symbol, limit? }`) |
| `binance_spot_market_klines` | OHLCV klines |
| `binance_spot_trade_new_order` | Place spot order (LIMIT, MARKET, STOP_LOSS, …) |
| `binance_spot_trade_cancel_order` | Cancel a specific order |
| `binance_algo_spot_twap_new_order` | Spot TWAP — large orders, low market impact |
| `binance_algo_future_twap_new_order` | Futures TWAP |
| `binance_algo_future_volume_participation_new_order` | Futures VP algo |
| `binance_wallet_capital_withdraw` | Submit a withdrawal |
| `binance_staking_eth_subscribe_eth_staking` | Subscribe ETH staking → BETH |
| `binance_simple_earn_subscribe_flexible_product` | Subscribe Flexible Earn |
| `binance_convert_trade_send_quote_request` | Get a convert quote |
| `binance_convert_trade_accept_quote` | Accept a convert quote |

The full list lives under `src/tools/**/*.ts` — every `server.tool("name", ...)` call is an MCP tool.

## Configuration

| Variable | Required | Description |
|---|---|---|
| `BINANCE_API_KEY` | yes | Binance API key |
| `BINANCE_API_SECRET` | yes | Binance API secret |

## Error handling

Every tool returns either a success `text` block or `{ isError: true }`. On failure the response includes:

- The Binance error message
- `code=` (Binance error code, e.g. `-1021` for clock skew)
- `http=` (HTTP status from the API)
- `body=` (raw response payload)

This lets Claude diagnose and retry intelligently without round-tripping through the user.

## Release & publishing

This repo uses **[semantic-release](https://github.com/semantic-release/semantic-release)** with the [Conventional Commits](https://www.conventionalcommits.org) preset. Push to `main` triggers `.github/workflows/release.yml`, which:

1. Reads the commit log since the last tag.
2. `feat:` bumps minor, `fix:`/`perf:`/`refactor:` bump patch, `BREAKING CHANGE:` bumps major.
3. Updates `CHANGELOG.md` and `package.json`.
4. Tags + GitHub release.
5. Publishes to npm (requires the `NPM_TOKEN` repo secret).

## Project structure

See [`CLAUDE.md`](./CLAUDE.md) for the full layout and contribution guide.

## License

MIT © Mr.Roblox (sankyago)
