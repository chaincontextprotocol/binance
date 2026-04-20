// src/tools/binance-convert/trade-api/index.ts
import { McpServer } from "../../../mcp.ts";
import { registerBinanceConvertAcceptQuote } from "./acceptQuote.ts";
import { registerBinanceConvertCancelLimitOrder } from "./cancelLimitOrder.ts";
import { registerBinanceGetConvertTradeHistory } from "./getConvertTradeHistory.ts";
import { registerBinanceConvertOrderStatus } from "./orderStatus.ts";
import { registerBinanceConvertPlaceLimitOrder } from "./placeLimitOrder.ts";
import { registerBinanceConvertQueryLimitOpenOrders } from "./queryLimitOpenOrders.ts";
import { registerBinanceConvertSendQuoteRequest } from "./sendQuoteRequest.ts";

export function registerBinanceConvertTradeTools(server: McpServer) {
    // Register the route to accept a quote for a convert trade
    registerBinanceConvertAcceptQuote(server);

    // Register the route to cancel an existing convert limit order
    registerBinanceConvertCancelLimitOrder(server);

    // Register the route to get the convert trade history
    registerBinanceGetConvertTradeHistory(server);

    // Register the route to check the status of a convert order
    registerBinanceConvertOrderStatus(server);

    // Register the route to place a new convert limit order
    registerBinanceConvertPlaceLimitOrder(server);

    // Register the route to query currently open convert limit orders
    registerBinanceConvertQueryLimitOpenOrders(server);

    // Register the route to send a quote request for a convert trade
    registerBinanceConvertSendQuoteRequest(server);
}
