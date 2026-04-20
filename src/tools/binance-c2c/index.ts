// src/tools/binance-c2c/index.ts
import { McpServer } from "../../mcp.ts";
import { registerBinanceGetC2CTradeHistory } from "./C2C/getC2CTradeHistory.ts";

export function registerBinanceC2CTradeHistoryTools(server: McpServer) {
    registerBinanceGetC2CTradeHistory(server);
}
