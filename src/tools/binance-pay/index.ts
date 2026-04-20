// src/tools/binance-pay/index.ts
import { McpServer } from "../../mcp.ts";
import { registerBinanceGetPayTradeHistory } from "./pay-api/getPayTradeHistory.ts";

export function registerBinancePayTools(server: McpServer) {
    registerBinanceGetPayTradeHistory(server);
}
