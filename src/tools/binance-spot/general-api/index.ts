// src/tools/binance-spot/general-api/index.ts
import { McpServer } from "../../../mcp.ts";
import { registerBinancePing } from "./ping.ts";
import { registerBinanceTime } from "./time.ts";
import { registerBinanceExchangeInfo } from "./exchangeInfo.ts";

export function registerBinanceGeneralApiTools(server: McpServer) {
    registerBinancePing(server);
    registerBinanceTime(server);
    registerBinanceExchangeInfo(server);
    
}
