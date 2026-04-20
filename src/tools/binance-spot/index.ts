import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { registerBinanceMarketApiTools } from "./market-api/index.js";
import { registerBinanceTradeApiTools } from "./trade-api/index.js";
import { registerBinanceAccountApiTools } from "./account-api/index.js";
import { registerBinanceGeneralApiTools } from "./general-api/index.js";

export function registerBinanceSpotTools(server: McpServer) {
    registerBinanceTradeApiTools(server);
    registerBinanceMarketApiTools(server);
    registerBinanceAccountApiTools(server);
    registerBinanceGeneralApiTools(server);
}
