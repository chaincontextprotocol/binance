// src/tools/binance-wallet/account-api/index.ts
import { McpServer } from "../../../mcp.ts";
import { registerBinanceWalletDailyAccountSnapshot } from "./dailyAccountSnapshot.ts";
import { registerBinanceWalletGetApiKeyPermission } from "./getApiKeyPermission.ts";
import { registerBinanceWalletAccountInfo } from "./accountInfo.ts";
import { registerBinanceWalletAccountStatus } from "./accountStatus.ts";
import { registerBinanceWalletAccountApiTradingStatus } from "./accountApiTradingStatus.ts";
import { registerBinanceWalletEnableFastWithdrawSwitch } from "./enableFastWithdrawSwitch.ts";
import { registerBinanceWalletDisableFastWithdrawSwitch } from "./disableFastWithdrawSwitch.ts";

export function registerBinanceWalletAccountApiTools(server: McpServer) {
    registerBinanceWalletDailyAccountSnapshot(server);
    registerBinanceWalletGetApiKeyPermission(server);
    registerBinanceWalletAccountInfo(server);
    registerBinanceWalletAccountStatus(server);
    registerBinanceWalletAccountApiTradingStatus(server);
    registerBinanceWalletEnableFastWithdrawSwitch(server);
    registerBinanceWalletDisableFastWithdrawSwitch(server);
    
}   