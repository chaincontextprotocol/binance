// src/tools/binance-wallet/asset-api/userAsset.ts
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { walletClient } from "../../../config/binanceClient.js";
import { fail } from "../../../utils/toolResponse.js";

export function registerBinanceWalletUserAsset(server: McpServer) {
    server.tool(
        "binance_wallet_asset_user_assets",
        "Get user assets.",
        {
            recvWindow: z.number().optional().describe("The value cannot be greater than 60000"),
            needBtcValuation: z.boolean().optional().describe("Whether to include BTC valuation")
        },
        async ({ recvWindow, needBtcValuation }) => {
            try {
                const params: any = {};
                if (recvWindow !== undefined) params.recvWindow = recvWindow;
                if (needBtcValuation !== undefined) params.needBtcValuation = needBtcValuation;
                
                const response = await walletClient.restAPI.userAsset(params);
                const data = await response.data();

                return {
                    content: [
                        {
                            type: "text",
                            text: `Retrieved user assets. Number of assets: ${data.length || 0}. Response: ${JSON.stringify(data)}`
                        }
                    ]
                };
            } catch (error) {
                return fail("Failed to retrieve user assets", error);
            }
        }
    );
}