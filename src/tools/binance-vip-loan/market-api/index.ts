// src/tools/binance-vip-loan/market-api/index.ts
import { McpServer } from "../../../mcp.ts";
import { registerBinanceGetBorrowInterestRate } from "./getBorrowInterestRate.ts";
import { registerBinanceGetLoanableAssetsData } from "./getLoanableAssetsData.ts";
import { registerBinanceGetCollateralAssetData } from "./getCollateralAssetData.ts";

export function registerBinanceVipLoanMarketApiTools(server: McpServer) {
    registerBinanceGetBorrowInterestRate(server);
    registerBinanceGetCollateralAssetData(server);
    registerBinanceGetLoanableAssetsData(server);
}
