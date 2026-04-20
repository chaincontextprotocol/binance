// src/tools/binance-convert/market-data-api/index.ts
import { McpServer } from "../../../mcp.ts";
import { registerBinanceConvertQueryOrderQuantityPrecisionPerAsset } from "./queryOrderQuantityPrecisionPerAsset.ts";
import { registerBinanceConvertGetListAllConvertPairs } from "./listAllConvertPairs.ts";

export function registerBinanceConvertMarketDataTools(server: McpServer) {
    // Register the route to get a list of all supported convert trading pairs
    registerBinanceConvertGetListAllConvertPairs(server);

    // Register the route to get quantity precision details for each asset
    registerBinanceConvertQueryOrderQuantityPrecisionPerAsset(server);
}
