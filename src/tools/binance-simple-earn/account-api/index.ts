// src/tools/binance-simple-earn/account-api/index.ts
import { McpServer } from "../../../mcp.ts";
import { registerBinanceSimpleEarnFlexibleProductList } from "./simpleEarnFlexibleProductList.ts";
import { registerBinanceGetFlexibleProductPosition } from "./getFlexibleProductPosition.ts";

export function registerBinanceSimpleEarnAccountApiTools(server: McpServer) {
    // Registers a tool to get the list of flexible earning products
    registerBinanceSimpleEarnFlexibleProductList(server);

    // Registers a tool to get the user's position in flexible earning products
    registerBinanceGetFlexibleProductPosition(server);
}
