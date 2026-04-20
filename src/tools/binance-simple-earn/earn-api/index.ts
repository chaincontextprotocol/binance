// src/tools/binance-simple-earn/earn-api/index.ts
import { McpServer } from "../../../mcp.ts";
import { registerBinanceSubscribeFlexibleProduct } from "./subscribeFlexibleProduct.ts";
import { registerBinanceRedeemFlexibleProduct } from "./redeemFlexibleProduct.ts";

export function registerBinanceSimpleEarnApiTools(server: McpServer) {
    // Register the route for subscribing to a flexible earn product
    registerBinanceSubscribeFlexibleProduct(server);

    // Register the route for redeeming from a flexible earn product
    registerBinanceRedeemFlexibleProduct(server);
}
