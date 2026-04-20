// src/tools/binance-rebate/index.ts
import { McpServer } from "../../mcp.ts";
import { registerBinanceGetSpotRebateHistoryRecords } from "./rebate-api/getSpotRebateHistoryRecords.ts";

export function registerBinanceRebateTools(server: McpServer) {
    registerBinanceGetSpotRebateHistoryRecords(server);
}
