// src/tools/binance-staking/SOL-staking-api/getSolStakingQuotaDetails.ts
import { McpServer } from "../../../mcp.ts";
import { stakingClient } from "../../../config/binanceClient.ts";
import { z } from "zod";
import { fail } from "../../../utils/toolResponse.ts";

export function registerBinanceGetSolStakingQuotaDetails(server: McpServer) {
    server.tool(
        "binance_staking_sol_staking_quota_details",
        "Get SOL Staking Quota API allows users to retrieve their current SOL staking quota, including information such as the remaining staking and redemption limits, minimum staking and redeem amounts, commission fees, and the status of staking and redemption availability.",
        {
            recvWindow: z.number().int().optional().describe("Time window for request validity")
        },
        async (params) => {
            try {
                const response = await stakingClient.restAPI.getSolStakingQuotaDetails({
                    ...(params.recvWindow !== undefined && { recvWindow: params.recvWindow })
                });

                const data = await response.data();

                return {
                    content: [
                        {
                            type: "text",
                            text: `Successfully retrieved current SOL staking quota. Response: ${JSON.stringify(data)}`
                        }
                    ]
                };
            } catch (error) {
                return fail("Failed to retrieve current SOL staking quota", error);
            }
        }
    );
}
