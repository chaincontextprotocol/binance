// src/tools/binance-staking/ETH-staking-api/getWbethRewardsHistory.ts
import { McpServer } from "../../../mcp.ts";
import { stakingClient } from "../../../config/binanceClient.ts";
import { z } from "zod";
import { fail } from "../../../utils/toolResponse.ts";

export function registerBinanceGetWbethRewardsHistory(server: McpServer) {
    server.tool(
        "binance_staking_eth_wbeth_rewards_history",
        "Get WBETH Rewards History API allows users to retrieve historical reward data earned from WBETH holdings, including estimated rewards in ETH, holding amounts, and APR details.",
        {
            startTime: z.number().int().optional().describe("Start time in milliseconds (e.g., 1641522717552)"),
            endTime: z.number().int().optional().describe("End time in milliseconds (e.g., 1641522720000)"),
            current: z
                .number()
                .int()
                .min(1)
                .default(1)
                .optional()
                .describe("Currently querying page. Start from 1. Default: 1"),
            size: z
                .number()
                .int()
                .min(1)
                .max(100)
                .default(10)
                .optional()
                .describe("Number of results per page. Default: 10, Max: 100"),
            recvWindow: z.number().int().optional().describe("Time window for request validity")
        },
        async (params) => {
            try {
                const response = await stakingClient.restAPI.getWbethRewardsHistory({
                    ...(params.recvWindow !== undefined && { recvWindow: params.recvWindow }),
                    ...(params.startTime !== undefined && { startTime: params.startTime }),
                    ...(params.endTime !== undefined && { endTime: params.endTime }),
                    ...(params.current !== undefined && { current: params.current }),
                    ...(params.size !== undefined && { size: params.size })
                });

                const data = await response.data();

                return {
                    content: [
                        {
                            type: "text",
                            text: `Successfully retrieved historical reward data earned from WBETH holdings. Response: ${JSON.stringify(
                                data
                            )}`
                        }
                    ]
                };
            } catch (error) {
                return fail("Failed to retrieve historical reward data earned from WBETH holdings", error);
            }
        }
    );
}
