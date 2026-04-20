// src/tools/binance-simple-earn/index.ts
import { McpServer } from "../../mcp.ts";
import { registerBinanceSimpleEarnApiTools } from "./earn-api/index.ts";
import { registerBinanceSimpleEarnAccountApiTools } from "./account-api/index.ts";

export function registerBinanceSimpleEarnTools(server: McpServer) {
    // Registers core API tools like subscribing to flexible products
    registerBinanceSimpleEarnApiTools(server);

    // Registers account-related tools like viewing product lists and positions
    registerBinanceSimpleEarnAccountApiTools(server);
}
