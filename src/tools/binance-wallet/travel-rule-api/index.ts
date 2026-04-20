//src/tools/binance-wallet/travel-rule-api/index.ts
import { McpServer } from "../../../mcp.ts";
import { registerBinanceWalletBrokerWithdraw } from "./brokerWithdraw.ts";
import { registerBinanceWalletOnboardedVaspList } from "./onboardedVaspList.ts";
import { registerBinanceWalletSubmitDepositQuestionnaire } from "./submitDepositQuestionnaire.ts";
import { registerBinanceWalletWithdrawHistoryV1 } from "./withdrawHistoryV1.ts";
import { registerBinanceWalletDepositHistoryTravelRule } from "./depositHistoryTravelRule.ts";
import { registerBinanceWalletWithdrawHistoryV2 } from "./withdrawHistoryV2.ts";
import { registerBinanceWalletWithdrawTravelRule } from "./withdrawTravelRule.ts";
import { registerBinanceWalletSubmitDepositQuestionnaireTravelRule } from "./submitDepositQuestionnaireTravelRule.ts";

export function registerBinanceWalletTravelRuleApiTools(server: McpServer) {
    registerBinanceWalletBrokerWithdraw(server);
    registerBinanceWalletOnboardedVaspList(server);
    registerBinanceWalletSubmitDepositQuestionnaire(server);
    registerBinanceWalletWithdrawHistoryV1(server);
    registerBinanceWalletDepositHistoryTravelRule(server);
    registerBinanceWalletWithdrawHistoryV2(server);
    registerBinanceWalletWithdrawTravelRule(server);
    registerBinanceWalletSubmitDepositQuestionnaireTravelRule(server);
    
}