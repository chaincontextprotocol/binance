// src/tools/binance-staking/ETH-staking-api/index.ts
import { McpServer } from "../../../mcp.ts";
import { registerBinanceEthStakingAccount } from "./ethStakingAccount.ts";
import { registerBinanceGetCurrentEthStakingQuota } from "./getCurrentEthStakingQuota.ts";
import { registerBinanceGetEthRedemptionHistory } from "./getEthRedemptionHistory.ts";
import { registerBinanceGetEthStakingHistory } from "./getEthStakingHistory.ts";
import { registerBinanceGetWbethRateHistory } from "./getWbethRateHistory.ts";
import { registerBinanceGetWbethRewardsHistory } from "./getWbethRewardsHistory.ts";
import { registerBinanceGetWbethUnwrapHistory } from "./getWbethUnwrapHistory.ts";
import { registerBinanceGetWbethWrapHistory } from "./getWbethWrapHistory.ts";
import { registerBinanceRedeemEth } from "./redeemEth.ts";
import { registerBinanceSubscribeEthStaking } from "./subscribeEthStaking.ts";
import { registerBinanceWrapBeth } from "./wrapBeth.ts";

export function registerBinanceETHStakingApiTools(server: McpServer) {
    registerBinanceEthStakingAccount(server);
    registerBinanceGetCurrentEthStakingQuota(server);
    registerBinanceGetEthRedemptionHistory(server);
    registerBinanceGetEthStakingHistory(server);
    registerBinanceGetWbethRateHistory(server);
    registerBinanceGetWbethRewardsHistory(server);
    registerBinanceGetWbethUnwrapHistory(server);
    registerBinanceGetWbethWrapHistory(server);
    registerBinanceRedeemEth(server);
    registerBinanceSubscribeEthStaking(server);
    registerBinanceWrapBeth(server);
}
