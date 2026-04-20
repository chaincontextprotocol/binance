// src/tools/binance-fiat/index.ts
import { McpServer } from "../../mcp.ts";
import { registerBinanceGetFiatDepositWithdrawHistory } from "./fiat-api/getFiatDepositWithdrawHistory.ts";
import { registerBinanceGetFiatPaymentsHistory } from "./fiat-api/getFiatPaymentsHistory.ts";

export function registerBinanceFiatDepositWithdrawHistoryTools(server: McpServer) {
    registerBinanceGetFiatDepositWithdrawHistory(server);
    registerBinanceGetFiatPaymentsHistory(server);
}
