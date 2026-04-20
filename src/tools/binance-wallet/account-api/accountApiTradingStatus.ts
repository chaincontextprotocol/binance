// src/tools/binance-wallet/account-api/accountApiTradingStatus.ts
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { walletClient } from "../../../config/binanceClient.js";
import { fail } from "../../../utils/toolResponse.js";

export function registerBinanceWalletAccountApiTradingStatus(server: McpServer) {
    server.tool(
        "binance_wallet_account_api_trading_status",
        "Get account API trading status.",
        {
            recvWindow: z.number().optional().describe("The value cannot be greater than 60000")
        },
        async ({ recvWindow }) => {
            try {
                const params: any = {};
                if (recvWindow !== undefined) params.recvWindow = recvWindow;
                
                const response = await walletClient.restAPI.accountApiTradingStatus(params);
                const data = await response.data();

                return {
                    content: [
                        {
                            type: "text",
                            text: `Retrieved account API trading status. Response: ${JSON.stringify(data)}`
                        }
                    ]
                };
            } catch (error) {
                return fail("Failed to retrieve account API trading status", error);
            }
        }
    );
}