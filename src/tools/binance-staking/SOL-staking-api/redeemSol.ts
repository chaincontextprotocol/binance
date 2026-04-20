// src/tools/binance-staking/SOL-staking-api/getUnclaimedRewards.ts
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { stakingClient } from "../../../config/binanceClient.js";
import { z } from "zod";
import { fail } from "../../../utils/toolResponse.js";

export function registerBinanceRedeemSol(server: McpServer) {
    server.tool(
        "binance_staking_sol_redeem",
        " Redeem SOL API allows users to redeem BNSOL and receive SOL in exchange. It enables the conversion of BNSOL tokens into SOL based on the specified amount",
        {
            amount: z.number().min(0).max(99999999).describe("Amount in BNSOL, limit to 8 decimals (mandatory)"),
            recvWindow: z.number().int().optional().describe("Time window for request validity")
        },
        async (params) => {
            try {
                const response = await stakingClient.restAPI.redeemSol({
                    amount: params.amount,
                    ...(params.recvWindow !== undefined && { recvWindow: params.recvWindow })
                });

                const data = await response.data();

                return {
                    content: [
                        {
                            type: "text",
                            text: `Successfully redeem BNSOL and receive SOL in exchange. Response: ${JSON.stringify(
                                data
                            )}`
                        }
                    ]
                };
            } catch (error) {
                return fail("Failed to redeem BNSOL and receive SOL in exchange", error);
            }
        }
    );
}
