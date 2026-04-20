// src/tools/binance-dual-investment/trade-api/index.ts
import { McpServer } from "../../../mcp.ts";
import { registerBinanceSubscribeDualInvestmentProducts } from "./subscribeDualInvestmentProducts.ts";
import { registerBinanceCheckDualInvestmentAccounts } from "./checkDualInvestmentAccounts.ts";
import { registerBinanceGetDualInvestmentPositions } from "./getDualInvestmentPositions.ts";
import { registerBinanceChangeAutoCompoundStatus } from "./changeAutoCompoundStatus.ts";

export function registerBinanceDualInvestmentTradeApiTools(server: McpServer) {
    registerBinanceSubscribeDualInvestmentProducts(server);
    registerBinanceCheckDualInvestmentAccounts(server);
    registerBinanceGetDualInvestmentPositions(server);
    registerBinanceChangeAutoCompoundStatus(server);
}
