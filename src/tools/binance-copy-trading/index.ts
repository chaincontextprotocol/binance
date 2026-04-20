// src/tools/binance-copy-trading/index.ts
import { McpServer } from "../../mcp.ts";
import { registerBinanceFutureCopyTradingApiTools } from "./FutureCopyTrading-api/index.ts";

// Registers all Binance Copy Trading related tools with the MCP server.
export function registerBinanceCopyTradingTools(server: McpServer) {
    // Register the Binance Futures Copy Trading API tools with the given server.
    registerBinanceFutureCopyTradingApiTools(server);
}
