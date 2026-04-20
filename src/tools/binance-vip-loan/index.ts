// src/tools/binance-vip-loan/index.ts
import { McpServer } from "../../mcp.ts";
import { registerBinanceVipLoanMarketApiTools } from "./market-api/index.ts";
import { registerBinanceVipLoanTradeApiTools } from "./trade-api/index.ts";
import { registerBinanceVipLoanUserInformationApiTools } from "./userInformation-api/index.ts";

export function registerBinanceVipLoanTools(server: McpServer) {
    registerBinanceVipLoanMarketApiTools(server);
    registerBinanceVipLoanTradeApiTools(server);
    registerBinanceVipLoanUserInformationApiTools(server);
}
