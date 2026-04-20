// src/tools/binance-dual-investment/index.ts
import { McpServer } from "../../mcp.ts";
import { registerBinanceDualInvestmentTradeApiTools } from "./trade-api/index.ts";
import { registerBinanceDualInvestmentMarketApiTools } from "./market-api/index.ts";

export function registerBinanceDualInvestmentTools(server: McpServer) {
    registerBinanceDualInvestmentTradeApiTools(server);
    registerBinanceDualInvestmentMarketApiTools(server);
}
