// src/tools/binance-staking/ETH-staking-api/getCurrentEthStakingQuota.ts
import { McpServer } from "../../../mcp.ts";
import { stakingClient } from "../../../config/binanceClient.ts";
import { z } from "zod";
import { fail } from "../../../utils/toolResponse.ts";

export function registerBinanceGetCurrentEthStakingQuota(server: McpServer) {
    server.tool(
        "binance_staking_eth_current_staking_quota",
        "Get Current ETH Staking Quota API allows users to retrieve their available ETH staking and redemption quotas, reflecting personal and daily limits.",
        {
            recvWindow: z.number().int().optional().describe("Time window for request validity")
        },
        async (params) => {
            try {
                const response = await stakingClient.restAPI.getCurrentEthStakingQuota({
                    ...(params.recvWindow !== undefined && { recvWindow: params.recvWindow })
                });

                const data = await response.data();

                return {
                    content: [
                        {
                            type: "text",
                            text: `Successfully retrieved current ETH Staking Quota API allows users. Response: ${JSON.stringify(
                                data
                            )}`
                        }
                    ]
                };
            } catch (error) {
                return fail("Failed to retrieve current ETH Staking Quota API allows users", error);
            }
        }
    );
}
