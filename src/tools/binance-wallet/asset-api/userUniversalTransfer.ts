
// src/tools/binance-wallet/asset-api/userUniversalTransfer.ts
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { walletClient } from "../../../config/binanceClient.js";
import { fail } from "../../../utils/toolResponse.js";

export function registerBinanceWalletUserUniversalTransfer(server: McpServer) {
    server.tool(
        "binance_wallet_asset_universal_transfer",
        "Make universal transfer between different accounts.",
        {
            type: z.string().describe("Transfer type"),
            asset: z.string().describe("Asset symbol"),
            amount: z.number().describe("Transfer amount"),
            fromSymbol: z.string().optional().describe("Symbol for spot/margin trade pair"),
            toSymbol: z.string().optional().describe("Symbol for spot/margin trade pair"),
            recvWindow: z.number().optional().describe("The value cannot be greater than 60000")
        },
        async ({ type, asset, amount, fromSymbol, toSymbol, recvWindow }) => {
            try {
                const params: any = {
                    type,
                    asset,
                    amount
                };
                if (fromSymbol !== undefined) params.fromSymbol = fromSymbol;
                if (toSymbol !== undefined) params.toSymbol = toSymbol;
                if (recvWindow !== undefined) params.recvWindow = recvWindow;
                
                const response = await walletClient.restAPI.userUniversalTransfer(params);
                const data = await response.data();

                return {
                    content: [
                        {
                            type: "text",
                            text: `Universal transfer completed. Transfer ID: ${data.tranId}. Response: ${JSON.stringify(data)}`
                        }
                    ]
                };
            } catch (error) {
                return fail("Failed to process universal transfer", error);
            }
        }
    );
}