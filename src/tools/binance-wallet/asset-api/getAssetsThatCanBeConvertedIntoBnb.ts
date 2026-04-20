// src/tools/binance-wallet/asset-api/getAssetsThatCanBeConvertedIntoBnb.ts
import { McpServer } from "../../../mcp.ts";
import { z } from "zod";
import { walletClient } from "../../../config/binanceClient.ts";
import { fail } from "../../../utils/toolResponse.ts";

export function registerBinanceWalletGetAssetsThatCanBeConvertedIntoBnb(server: McpServer) {
    server.tool(
        "binance_wallet_asset_convertible_to_bnb",
        "Get assets that can be converted to BNB.",
        {
            recvWindow: z.number().optional().describe("The value cannot be greater than 60000")
        },
        async ({ recvWindow }) => {
            try {
                const params: any = {};
                if (recvWindow !== undefined) params.recvWindow = recvWindow;
                
                const response = await walletClient.restAPI.getAssetsThatCanBeConvertedIntoBnb(params);
                const data = await response.data();

                return {
                    content: [
                        {
                            type: "text",
                            text: `Retrieved assets that can be converted to BNB. Total: ${data.details?.length || 0}. Response: ${JSON.stringify(data)}`
                        }
                    ]
                };
            } catch (error) {
                return fail("Failed to retrieve convertible assets", error);
            }
        }
    );
}