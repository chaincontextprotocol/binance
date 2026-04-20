// src/tools/binance-wallet/asset-api/toggleBnbBurnOnSpotTradeAndMarginInterest.ts
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { walletClient } from "../../../config/binanceClient.js";
import { fail } from "../../../utils/toolResponse.js";

export function registerBinanceWalletToggleBnbBurnOnSpotTradeAndMarginInterest(server: McpServer) {
    server.tool(
        "binance_wallet_asset_toggle_bnb_burn",
        "Toggle BNB burn on spot trade and margin interest.",
        {
            spotBNBBurn: z.string().optional().describe("'true' or 'false' for spot trade"),
            interestBNBBurn: z.string().optional().describe("'true' or 'false' for margin interest"),
            recvWindow: z.number().optional().describe("The value cannot be greater than 60000")
        },
        async ({ spotBNBBurn, interestBNBBurn, recvWindow }) => {
            try {
                const params: any = {};
                if (spotBNBBurn !== undefined) params.spotBNBBurn = spotBNBBurn;
                if (interestBNBBurn !== undefined) params.interestBNBBurn = interestBNBBurn;
                if (recvWindow !== undefined) params.recvWindow = recvWindow;
                
                const response = await walletClient.restAPI.toggleBnbBurnOnSpotTradeAndMarginInterest(params);
                const data = await response.data();

                return {
                    content: [
                        {
                            type: "text",
                            text: `BNB burn settings updated. Response: ${JSON.stringify(data)}`
                        }
                    ]
                };
            } catch (error) {
                return fail("Failed to update BNB burn settings", error);
            }
        }
    );
}