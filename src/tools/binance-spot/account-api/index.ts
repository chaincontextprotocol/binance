// src/tools/binance-spot/account-api/index.ts
import { McpServer } from "../../../mcp.ts";
import { registerBinanceMyPreventedMatches } from "./myPreventedMatches.ts";
import { registerBinanceGetAccount } from "./getAccount.ts";
import { registerBinanceMyAllocations } from "./myAllocations.ts";
import { registerBinanceRateLimitOrder } from "./rateLimitOrder.ts";
import { registerBinanceAccountCommission } from "./accountCommission.ts";
import { registerBinanceMyTrades } from "./myTrades.ts";

export function registerBinanceAccountApiTools(server: McpServer) {
    registerBinanceMyPreventedMatches(server);
    registerBinanceGetAccount(server);
    registerBinanceMyAllocations(server);
    registerBinanceRateLimitOrder(server);
    registerBinanceAccountCommission(server);
    registerBinanceMyTrades(server);
}
