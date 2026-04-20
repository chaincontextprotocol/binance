// src/tools/binance-copy-trading/FutureCopyTrading-api/index.ts
import { McpServer } from "../../../mcp.ts";
import { registerBinanceGetFuturesLeadTraderStatus } from "./getFuturesLeadTraderStatus.ts";
import { registerBinanceGetFuturesLeadTradingSymbolWhitelist } from "./getFuturesLeadTradingSymbolWhitelist.ts";

// Registers Binance Futures Copy Trading API tools with the MCP server.
export function registerBinanceFutureCopyTradingApiTools(server: McpServer) {
    // Registers an endpoint to get the status of a lead trader in futures copy trading
    registerBinanceGetFuturesLeadTraderStatus(server);

    // Registers an endpoint to get the whitelist of symbols available for futures copy trading
    registerBinanceGetFuturesLeadTradingSymbolWhitelist(server);
}
