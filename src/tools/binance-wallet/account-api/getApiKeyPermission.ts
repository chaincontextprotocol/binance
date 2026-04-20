// src/tools/binance-wallet/account-api/getApiKeyPermission.ts
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { walletClient } from "../../../config/binanceClient.js";
import { fail } from "../../../utils/toolResponse.js";

export function registerBinanceWalletGetApiKeyPermission(server: McpServer) {
    server.tool(
        "binance_wallet_account_api_key_permission",
        "Get API key permission.",
        {
            recvWindow: z.number().optional().describe("The value cannot be greater than 60000")
        },
        async ({ recvWindow }) => {
            try {
                const params: any = {};
                if (recvWindow !== undefined) params.recvWindow = recvWindow;
                
                const response = await walletClient.restAPI.getApiKeyPermission(params);
                const data = await response.data();

                return {
                    content: [
                        {
                            type: "text",
                            text: `Retrieved API key permission. Response: ${JSON.stringify(data)}`
                        }
                    ]
                };
            } catch (error) {
                return fail("Failed to retrieve API key permission", error);
            }
        }
    );
}