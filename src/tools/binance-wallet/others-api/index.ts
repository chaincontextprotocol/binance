//src/tools/binance-wallet/others-api/index.ts
import { McpServer } from "../../../mcp.ts";
import { registerBinanceWalletSystemStatus } from "./systemStatus.ts";
import { registerBinanceWalletGetSymbolsDelistScheduleForSpot } from "./getSymbolsDelistScheduleForSpot.ts";

export function registerBinanceWalletOthersApiTools(server: McpServer) {
    registerBinanceWalletSystemStatus(server);
    registerBinanceWalletGetSymbolsDelistScheduleForSpot(server);
    
}