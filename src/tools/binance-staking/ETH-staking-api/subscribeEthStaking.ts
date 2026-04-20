// src/tools/binance-staking/ETH-staking-api/subscribeEthStaking.ts
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { stakingClient } from "../../../config/binanceClient.js";
import { z } from "zod";
import { fail } from "../../../utils/toolResponse.js";

export function registerBinanceSubscribeEthStaking(server: McpServer) {
    server.tool(
        "binance_staking_eth_subscribe_eth_staking",
        "Subscribe ETH Staking API allows users to stake ETH and receive WBETH, providing the staked amount and the conversion ratio for ETH to WBETH.",
        {
            amount: z.number().min(0).describe("Amount in BETH, limit 4 decimals (mandatory)"),
            recvWindow: z.number().int().optional().describe("Time window for request validity")
        },
        async (params) => {
            try {
                const response = await stakingClient.restAPI.subscribeEthStaking({
                    amount: params.amount,
                    ...(params.recvWindow !== undefined && { recvWindow: params.recvWindow })
                });

                const data = await response.data();

                return {
                    content: [
                        {
                            type: "text",
                            text: `Successfully staked ETH and receive WBETH. Response: ${JSON.stringify(data)}`
                        }
                    ]
                };
            } catch (error) {
                return fail("Failed to stake ETH and receive WBETH", error);
            }
        }
    );
}
