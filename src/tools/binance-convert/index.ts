// src/tools/binance-convert/index.ts
import { McpServer } from "../../mcp.ts";
import { registerBinanceConvertTradeTools } from "./trade-api/index.ts";
import { registerBinanceConvertMarketDataTools } from "./market-data-api/index.ts";

export function registerBinanceConvertTools(server: McpServer) {
    // Register tools for accessing market data from Binance Convert
    registerBinanceConvertMarketDataTools(server);

    // Register tools for performing trades on Binance Convert
    registerBinanceConvertTradeTools(server);
}
