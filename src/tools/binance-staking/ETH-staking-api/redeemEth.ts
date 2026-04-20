// src/tools/binance-staking/ETH-staking-api/redeemEth.ts
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { stakingClient } from "../../../config/binanceClient.js";
import { z } from "zod";
import { fail } from "../../../utils/toolResponse.js";

export function registerBinanceRedeemEth(server: McpServer) {
    server.tool(
        "binance_staking_eth_redeem_eth",
        "Redeem ETH API allows users to redeem WBETH or BETH for ETH, providing the amount, conversion ratio, and arrival time details.",
        {
            amount: z.number().min(0).describe("Amount in BETH, limit 8 decimals (mandatory)"),
            asset: z.string().optional().default("BETH").describe("Asset type, either WBETH or BETH. Default: BETH"),
            recvWindow: z.number().int().optional().describe("Time window for request validity")
        },
        async (params) => {
            try {
                const response = await stakingClient.restAPI.redeemEth({
                    amount: params.amount,
                    asset: params.asset,
                    ...(params.recvWindow !== undefined && { recvWindow: params.recvWindow })
                });

                const data = await response.data();

                return {
                    content: [
                        {
                            type: "text",
                            text: `Successfully redeemed WBETH or BETH for ETH. Response: ${JSON.stringify(data)}`
                        }
                    ]
                };
            } catch (error) {
                return fail("Failed to redeem WBETH or BETH for ETH", error);
            }
        }
    );
}
