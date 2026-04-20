// src/tools/binance-spot/index.ts
import { McpServer } from "../../mcp.ts";
import { registerBinanceAlgoFutureApiTools } from "./future-algo/index.ts";
import { registerBinanceAlgoSpotApiTools } from "./spot-algo/index.ts";

export function registerBinanceAlgoTools(server: McpServer) {
    // Algo API tools
    registerBinanceAlgoFutureApiTools(server);
    registerBinanceAlgoSpotApiTools(server);
}
