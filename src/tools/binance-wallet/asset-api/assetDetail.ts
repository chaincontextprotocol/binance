// src/tools/binance-wallet/asset-api/assetDetail.ts
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { walletClient } from "../../../config/binanceClient.js";
import { fail } from "../../../utils/toolResponse.js";

export function registerBinanceWalletAssetDetail(server: McpServer) {
    server.tool(
        "binance_wallet_asset_detail",
        "Get asset details.",
        {
            asset: z.string().optional().describe("Asset symbol"),
            recvWindow: z.number().optional().describe("The value cannot be greater than 60000")
        },
        async ({ asset, recvWindow }) => {
            try {
                const params: any = {};
                if (asset !== undefined) params.asset = asset;
                if (recvWindow !== undefined) params.recvWindow = recvWindow;
                
                const response = await walletClient.restAPI.assetDetail(params);
                const data = await response.data();

                return {
                    content: [
                        {
                            type: "text",
                            text: `Retrieved asset details. Response: ${JSON.stringify(data)}`
                        }
                    ]
                };
            } catch (error) {
                return fail("Failed to retrieve asset details", error);
            }
        }
    );
}