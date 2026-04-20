import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import dotenv from "dotenv";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

import { registerBinanceSpotTools } from "./tools/binance-spot/index.js";
import { registerBinanceSimpleEarnTools } from "./tools/binance-simple-earn/index.js";
import { registerBinanceAlgoTools } from "./tools/binance-algo/index.js";
import { registerBinanceConvertTools } from "./tools/binance-convert/index.js";
import { registerBinanceC2CTradeHistoryTools } from "./tools/binance-c2c/index.js";
import { registerBinanceWalletTools } from "./tools/binance-wallet/index.js";
import { registerBinanceCopyTradingTools } from "./tools/binance-copy-trading/index.js";
import { registerBinanceFiatDepositWithdrawHistoryTools } from "./tools/binance-fiat/index.js";
import { registerBinanceNFTTools } from "./tools/binance-nft/index.js";
import { registerBinancePayTools } from "./tools/binance-pay/index.js";
import { registerBinanceRebateTools } from "./tools/binance-rebate/index.js";
import { registerBinanceDualInvestmentTools } from "./tools/binance-dual-investment/index.js";
import { registerBinanceMiningTools } from "./tools/binance-mining/index.js";
import { registerBinanceVipLoanTools } from "./tools/binance-vip-loan/index.js";
import { registerBinanceStakingTools } from "./tools/binance-staking/index.js";

dotenv.config();

function readPackageVersion(): string {
    const here = dirname(fileURLToPath(import.meta.url));
    // build/index.js → package.json is one level up.
    const pkgPath = resolve(here, "..", "package.json");
    try {
        const raw = readFileSync(pkgPath, "utf8");
        return (JSON.parse(raw) as { version?: string }).version ?? "0.0.0";
    } catch {
        return "0.0.0";
    }
}

export async function main() {
    const server = new McpServer({
        name: "binance-mcp",
        version: readPackageVersion(),
    });

    registerBinanceSpotTools(server);
    registerBinanceAlgoTools(server);
    registerBinanceSimpleEarnTools(server);
    registerBinanceC2CTradeHistoryTools(server);
    registerBinanceConvertTools(server);
    registerBinanceWalletTools(server);
    registerBinanceCopyTradingTools(server);
    registerBinanceFiatDepositWithdrawHistoryTools(server);
    registerBinanceNFTTools(server);
    registerBinancePayTools(server);
    registerBinanceRebateTools(server);
    registerBinanceDualInvestmentTools(server);
    registerBinanceMiningTools(server);
    registerBinanceVipLoanTools(server);
    registerBinanceStakingTools(server);

    const transport = new StdioServerTransport();
    await server.connect(transport);
}

main().catch((error) => {
    console.error("[binance-mcp] fatal:", error);
    process.exit(1);
});
