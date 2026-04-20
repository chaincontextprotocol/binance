// src/tools/binance-wallet/asset-api/index.ts
import { McpServer } from "../../../mcp.ts";
import { registerBinanceWalletUserAsset } from "./userAsset.ts";
import { registerBinanceWalletFundingWallet } from "./fundingWallet.ts";
import { registerBinanceWalletAssetDetail } from "./assetDetail.ts";
import { registerBinanceWalletTradeFee } from "./tradeFee.ts";
import { registerBinanceWalletUserUniversalTransfer } from "./userUniversalTransfer.ts";
import { registerBinanceWalletQueryUserUniversalTransferHistory } from "./queryUserUniversalTransferHistory.ts";
import { registerBinanceWalletDustTransfer } from "./dustTransfer.ts";
import { registerBinanceWalletDustlog } from "./dustlog.ts";
import { registerBinanceWalletAssetDividendRecord } from "./assetDividendRecord.ts";
import { registerBinanceWalletGetAssetsThatCanBeConvertedIntoBnb } from "./getAssetsThatCanBeConvertedIntoBnb.ts";
import { registerBinanceWalletToggleBnbBurnOnSpotTradeAndMarginInterest } from "./toggleBnbBurnOnSpotTradeAndMarginInterest.ts";
import { registerBinanceWalletGetCloudMiningPaymentAndRefundHistory } from "./getCloudMiningPaymentAndRefundHistory.ts";
import { registerBinanceWalletQueryUserDelegationHistory } from "./queryUserDelegationHistory.ts";
import { registerBinanceWalletGetOpenSymbolList } from "./getOpenSymbolList.ts";
import { registerBinanceWalletQueryUserWalletBalance } from "./queryUserWalletBalance.ts";

export function registerBinanceWalletAssetApiTools(server: McpServer) {
    registerBinanceWalletUserAsset(server);
    registerBinanceWalletFundingWallet(server);
    registerBinanceWalletAssetDetail(server);
    registerBinanceWalletTradeFee(server);
    registerBinanceWalletUserUniversalTransfer(server);
    registerBinanceWalletQueryUserUniversalTransferHistory(server);
    registerBinanceWalletDustTransfer(server);
    registerBinanceWalletDustlog(server);
    registerBinanceWalletAssetDividendRecord(server);
    registerBinanceWalletGetAssetsThatCanBeConvertedIntoBnb(server);
    registerBinanceWalletToggleBnbBurnOnSpotTradeAndMarginInterest(server);
    registerBinanceWalletGetCloudMiningPaymentAndRefundHistory(server);
    registerBinanceWalletQueryUserDelegationHistory(server);
    registerBinanceWalletGetOpenSymbolList(server);
    registerBinanceWalletQueryUserWalletBalance(server);
}