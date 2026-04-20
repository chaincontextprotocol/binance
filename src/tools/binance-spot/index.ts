import { McpServer } from "../../mcp.ts";
import { registerBinanceMarketApiTools } from "./market-api/index.ts";
import { registerBinanceTradeApiTools } from "./trade-api/index.ts";
import { registerBinanceAccountApiTools } from "./account-api/index.ts";
import { registerBinanceGeneralApiTools } from "./general-api/index.ts";

export function registerBinanceSpotTools(server: McpServer) {
    registerBinanceTradeApiTools(server);
    registerBinanceMarketApiTools(server);
    registerBinanceAccountApiTools(server);
    registerBinanceGeneralApiTools(server);
}
