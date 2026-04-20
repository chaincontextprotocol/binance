// src/tools/binance-wallet/account-api/accountStatus.ts
import { McpServer } from "../../../mcp.ts";
import { z } from "zod";
import { walletClient } from "../../../config/binanceClient.ts";
import { fail } from "../../../utils/toolResponse.ts";

export function registerBinanceWalletAccountStatus(server: McpServer) {
    server.tool(
        "binance_wallet_account_status",
        "Get Binance Wallet account status.",
        {
            recvWindow: z.number().optional().describe("The value cannot be greater than 60000")
        },
        async ({ recvWindow }) => {
            try {
                const params: any = {};
                if (recvWindow !== undefined) params.recvWindow = recvWindow;
                
                const response = await walletClient.restAPI.accountStatus(params);
                const data = await response.data();

                return {
                    content: [
                        {
                            type: "text",
                            text: `Retrieved wallet account status. Response: ${JSON.stringify(data)}`
                        }
                    ]
                };
            } catch (error) {
                return fail("Failed to retrieve wallet account status", error);
            }
        }
    );
}