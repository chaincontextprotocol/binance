// src/tools/binance-wallet/capital-api/index.ts
import { McpServer } from "../../../mcp.ts";
import { registerBinanceWalletAllCoinsInformation } from "./allCoinsInformation.ts";
import { registerBinanceWalletDepositAddress } from "./depositAddress.ts";
import { registerBinanceWalletDepositHistory } from "./depositHistory.ts";
import { registerBinanceWalletWithdrawHistory } from "./withdrawHistory.ts";
import { registerBinanceWalletWithdraw } from "./withdraw.ts";
import { registerBinanceWalletFetchDepositAddressListWithNetwork } from "./fetchDepositAddressListWithNetwork.ts";
import { registerBinanceWalletFetchWithdrawAddressList } from "./fetchWithdrawAddressList.ts";
import { registerBinanceWalletOneClickArrivalDepositApply } from "./oneClickArrivalDepositApply.ts";

export function registerBinanceWalletCapitalApiTools(server: McpServer) {
    registerBinanceWalletAllCoinsInformation(server);
    registerBinanceWalletDepositAddress(server);
    registerBinanceWalletDepositHistory(server);
    registerBinanceWalletWithdrawHistory(server);
    registerBinanceWalletWithdraw(server);
    registerBinanceWalletFetchDepositAddressListWithNetwork(server);
    registerBinanceWalletFetchWithdrawAddressList(server);
    registerBinanceWalletOneClickArrivalDepositApply(server);
}