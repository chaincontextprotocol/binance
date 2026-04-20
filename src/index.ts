#!/usr/bin/env node
import { McpServer, StdioServerTransport } from "./mcp.ts";

import { registerBinanceSpotTools } from "./tools/binance-spot/index.ts";
import { registerBinanceSimpleEarnTools } from "./tools/binance-simple-earn/index.ts";
import { registerBinanceAlgoTools } from "./tools/binance-algo/index.ts";
import { registerBinanceConvertTools } from "./tools/binance-convert/index.ts";
import { registerBinanceC2CTradeHistoryTools } from "./tools/binance-c2c/index.ts";
import { registerBinanceWalletTools } from "./tools/binance-wallet/index.ts";
import { registerBinanceCopyTradingTools } from "./tools/binance-copy-trading/index.ts";
import { registerBinanceFiatDepositWithdrawHistoryTools } from "./tools/binance-fiat/index.ts";
import { registerBinanceNFTTools } from "./tools/binance-nft/index.ts";
import { registerBinancePayTools } from "./tools/binance-pay/index.ts";
import { registerBinanceRebateTools } from "./tools/binance-rebate/index.ts";
import { registerBinanceDualInvestmentTools } from "./tools/binance-dual-investment/index.ts";
import { registerBinanceMiningTools } from "./tools/binance-mining/index.ts";
import { registerBinanceVipLoanTools } from "./tools/binance-vip-loan/index.ts";
import { registerBinanceStakingTools } from "./tools/binance-staking/index.ts";

const VERSION = "0.0.1";

export async function main() {
    const server = new McpServer({
        name: "@chaincontextprotocol/binance",
        version: VERSION,
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
    console.error("[@chaincontextprotocol/binance] fatal:", error);
    process.exit(1);
});
