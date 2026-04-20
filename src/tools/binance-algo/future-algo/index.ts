// src/tools/binance-spot/market-api/index.ts
import { McpServer } from "../../../mcp.ts";
import { registerBinanceVPNewTrade } from "./VPNewTrade.ts";
import { registerBinanceFutureHistoricalAlgoOrder } from "./historicalAlgoOrder.ts";
import { registerBinanceFutureCancelAlgoOrder } from "./cancelAlgoOrder.ts";
import { registerBinanceFutureCurrentAlgoOpenOrders } from "./currentAlgoOpenOrders.ts";
import { registerBinanceFutureSubOrders } from "./subOrders.ts";
import { registerBinanceTwapNewTrade } from "./TwapNewTrade.ts";

export function registerBinanceAlgoFutureApiTools(server: McpServer) {
    // Registers a new VP (Volume Participation) trade
    registerBinanceVPNewTrade(server);

    // Registers a new TWAP (Time-Weighted Average Price) trade
    registerBinanceTwapNewTrade(server);

    // Registers functionality to cancel an algorithmic order
    registerBinanceFutureCancelAlgoOrder(server);

    // Registers API to query sub-orders of an algorithmic order
    registerBinanceFutureSubOrders(server);

    // Registers API to retrieve currently open algorithmic orders
    registerBinanceFutureCurrentAlgoOpenOrders(server);

    // Registers API to fetch historical algorithmic orders
    registerBinanceFutureHistoricalAlgoOrder(server);
}
