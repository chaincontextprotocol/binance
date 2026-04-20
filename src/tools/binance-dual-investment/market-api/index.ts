// src/tools/binance-dual-investment/market-api/index.ts
import { McpServer } from "../../../mcp.ts";
import { registerBinanceGetDualInvestmentProductList } from "./getDualInvestmentProductList.ts";

export function registerBinanceDualInvestmentMarketApiTools(server: McpServer) {
    registerBinanceGetDualInvestmentProductList(server);
}
