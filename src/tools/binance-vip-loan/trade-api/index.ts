// src/tools/binance-vip-loan/trade-api/index.ts
import { McpServer } from "../../../mcp.ts";
import { registerBinanceVipLoanRenew } from "./vipLoanRenew.ts";
import { registerBinanceVipLoanRepay } from "./vipLoanRepay.ts";
import { registerBinanceVipLoanBorrow } from "./vipLoanBorrow.ts";

export function registerBinanceVipLoanTradeApiTools(server: McpServer) {
    registerBinanceVipLoanRenew(server);
    registerBinanceVipLoanRepay(server);
    registerBinanceVipLoanBorrow(server);
}
