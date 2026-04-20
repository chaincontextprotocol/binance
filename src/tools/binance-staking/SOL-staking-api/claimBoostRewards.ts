// src/tools/binance-staking/SOL-staking-api/claimBoostRewards.ts
import { McpServer } from "../../../mcp.ts";
import { stakingClient } from "../../../config/binanceClient.ts";
import { z } from "zod";
import { fail } from "../../../utils/toolResponse.ts";

export function registerBinanceClaimBoostRewards(server: McpServer) {
    server.tool(
        "binance_staking_sol_claim_boost_rewards",
        "Claim Boost Rewards API allows users to claim their Boost APR airdrop rewards for staking.",
        {
            recvWindow: z.number().int().optional().describe("Time window for request validity")
        },
        async (params) => {
            try {
                const response = await stakingClient.restAPI.claimBoostRewards({
                    ...(params.recvWindow !== undefined && { recvWindow: params.recvWindow })
                });

                const data = await response.data();

                return {
                    content: [
                        {
                            type: "text",
                            text: `Successfully claim Boost APR airdrop rewards for staking. Response: ${JSON.stringify(
                                data
                            )}`
                        }
                    ]
                };
            } catch (error) {
                return fail("Failed to claim Boost APR airdrop rewards", error);
            }
        }
    );
}
