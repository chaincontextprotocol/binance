// src/tools/binance-spot/market-api/index.ts
import { McpServer } from "../../../mcp.ts";
import { registerBinanceSpotTwapNewTrade } from "./spotTWAPOrder.ts";
import { registerBinanceSpotCancelOpenTWAPOrder } from "./cancelOpenTWAPOrder.ts";
import { registerBinanceSpotSubOrders } from "./subOrders.ts";
import { registerBinanceSpotCurrentAlgoOpenOrders } from "./currentAlgoOpenOrders.ts";
import { registerBinanceSpotHistoricalAlgoOrders } from "./historicalAlgoOrders.ts";

export function registerBinanceAlgoSpotApiTools(server: McpServer) {
    // Register the TWAP (Time-Weighted Average Price) tool for placing new spot algo orders
    registerBinanceSpotTwapNewTrade(server);

    // Register the tool for canceling open TWAP spot algo orders
    registerBinanceSpotCancelOpenTWAPOrder(server);

    // Register the tool to handle sub-orders created under a parent algo order
    registerBinanceSpotSubOrders(server);

    // Register the tool to fetch currently open algo orders for spot trading
    registerBinanceSpotCurrentAlgoOpenOrders(server);

    // Register the tool to fetch historical algo orders for spot trading
    registerBinanceSpotHistoricalAlgoOrders(server);
}
