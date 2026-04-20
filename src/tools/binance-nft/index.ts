// src/tools/binance-fiat/index.ts
import { McpServer } from "../../mcp.ts";
import { registerBinanceGetNFTDepositHistory } from "./nft-api/getNFTDepositHistory.ts";
import { registerBinanceGetNFTWithdrawHistory } from "./nft-api/getNFTWithdrawHistory.ts";
import { registerBinanceGetNFTTransactionHistory } from "./nft-api/getNFTTransactionHistory.ts";
import { registerBinanceGetNFTAsset } from "./nft-api/getNFTAsset.ts";

export function registerBinanceNFTTools(server: McpServer) {
    registerBinanceGetNFTDepositHistory(server);
    registerBinanceGetNFTWithdrawHistory(server);
    registerBinanceGetNFTTransactionHistory(server);
    registerBinanceGetNFTAsset(server);
}
