// src/tools/binance-staking/SOL-staking-api/solStakingAccount.ts
import { McpServer } from "../../../mcp.ts";
import { stakingClient } from "../../../config/binanceClient.ts";
import { z } from "zod";
import { fail } from "../../../utils/toolResponse.ts";

export function registerBinanceSolStakingAccount(server: McpServer) {
    server.tool(
        "binance_staking_sol_staking_account",
        "SOL Staking Account API allows users to view their SOL staking account details, including their current BNSOL holdings, equivalent SOL balance, and the profit in SOL over the past 30 days.",
        {
            recvWindow: z.number().int().optional().describe("Time window for request validity")
        },
        async (params) => {
            try {
                const response = await stakingClient.restAPI.solStakingAccount({
                    ...(params.recvWindow !== undefined && { recvWindow: params.recvWindow })
                });

                const data = await response.data();

                return {
                    content: [
                        {
                            type: "text",
                            text: `Successfully retrieve SOL staking account details: ${JSON.stringify(data)}`
                        }
                    ]
                };
            } catch (error) {
                return fail("Failed to retrieve SOL staking account details", error);
            }
        }
    );
}
