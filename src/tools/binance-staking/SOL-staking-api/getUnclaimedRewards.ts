// src/tools/binance-staking/SOL-staking-api/getUnclaimedRewards.ts
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { stakingClient } from "../../../config/binanceClient.js";
import { z } from "zod";
import { fail } from "../../../utils/toolResponse.js";

export function registerBinanceGetUnclaimedRewards(server: McpServer) {
    server.tool(
        "binance_staking_sol_unclaimed_rewards",
        "Get Unclaimed Rewards API allows users to retrieve information about unclaimed rewards from their SOL staking activities.",
        {
            recvWindow: z.number().int().optional().describe("Time window for request validity")
        },
        async (params) => {
            try {
                const response = await stakingClient.restAPI.getUnclaimedRewards({
                    ...(params.recvWindow !== undefined && { recvWindow: params.recvWindow })
                });

                const data = await response.data();

                return {
                    content: [
                        {
                            type: "text",
                            text: `Successfully retrieved information about unclaimed rewards. Response: ${JSON.stringify(
                                data
                            )}`
                        }
                    ]
                };
            } catch (error) {
                return fail("Failed to retrieve information about unclaimed rewards", error);
            }
        }
    );
}
