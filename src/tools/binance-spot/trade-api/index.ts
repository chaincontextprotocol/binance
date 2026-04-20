// src/tools/binance-spot/trade-api/index.ts
import { McpServer } from "../../../mcp.ts";
import { registerBinanceDeleteOrder } from "./deleteOrder.ts";
import { registerBinanceAllOrders } from "./allOrders.ts";
import { registerBinanceOpenOrderList } from "./openOrderList.ts";
import { registerBinanceNewOrder } from "./newOrder.ts";
import { registerBinanceGetOrder } from "./getOrder.ts";
import { registerBinanceGetOpenOrders } from "./getOpenOrders.ts";
import { registerBinanceDeleteOpenOrders } from "./deleteOpenOrders.ts";
import { registerBinanceOrderOco } from "./orderOco.ts";

export function registerBinanceTradeApiTools(server: McpServer) {
    registerBinanceDeleteOrder(server);
    registerBinanceAllOrders(server);
    registerBinanceOpenOrderList(server);
    registerBinanceNewOrder(server);
    registerBinanceGetOrder(server);
    registerBinanceGetOpenOrders(server);
    registerBinanceDeleteOpenOrders(server);
    registerBinanceOrderOco(server);
    
}