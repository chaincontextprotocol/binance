// src/tools/binance-staking/SOL-staking-api/index.ts
import { McpServer } from "../../../mcp.ts";
import { registerBinanceClaimBoostRewards } from "./claimBoostRewards.ts";
import { registerBinanceGetBnsolRateHistory } from "./getBnsolRateHistory.ts";
import { registerBinanceGetBnsolRewardsHistory } from "./getBnsolRewardsHistory.ts";
import { registerBinanceGetBoostRewardsHistory } from "./getBoostRewardsHistory.ts";
import { registerBinanceGetSolRedemptionHistory } from "./getSolRedemptionHistory.ts";
import { registerBinanceGetSolStakingHistory } from "./getSolStakingHistory.ts";
import { registerBinanceGetSolStakingQuotaDetails } from "./getSolStakingQuotaDetails.ts";
import { registerBinanceGetUnclaimedRewards } from "./getUnclaimedRewards.ts";
import { registerBinanceRedeemSol } from "./redeemSol.ts";
import { registerBinanceSolStakingAccount } from "./solStakingAccount.ts";
import { registerBinanceSubscribeSolStaking } from "./subscribeSolStaking.ts";

export function registerBinanceSOLStakingApiTools(server: McpServer) {
    registerBinanceClaimBoostRewards(server);
    registerBinanceGetBnsolRateHistory(server);
    registerBinanceGetBnsolRewardsHistory(server);
    registerBinanceGetBoostRewardsHistory(server);
    registerBinanceGetSolRedemptionHistory(server);
    registerBinanceGetSolStakingHistory(server);
    registerBinanceGetSolStakingQuotaDetails(server);
    registerBinanceGetUnclaimedRewards(server);
    registerBinanceRedeemSol(server);
    registerBinanceSolStakingAccount(server);
    registerBinanceSubscribeSolStaking(server);
}
