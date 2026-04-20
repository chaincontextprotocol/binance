// src/tools/binance-wallet/capital-api/fetchWithdrawAddressList.ts
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { walletClient } from "../../../config/binanceClient.js";
import { fail } from "../../../utils/toolResponse.js";

export function registerBinanceWalletFetchWithdrawAddressList(server: McpServer) {
    server.tool(
        "binance_wallet_capital_withdraw_address_list",
        "Fetch withdraw address list.",
        {
        },
        async () => {
            try {
                
                const response = await walletClient.restAPI.fetchWithdrawAddressList();
                const data = await response.data();

                return {
                    content: [
                        {
                            type: "text",
                            text: `Retrieved withdraw address list. Total addresses: ${data || 0}. Response: ${JSON.stringify(data)}`
                        }
                    ]
                };
            } catch (error) {
                return fail("Failed to retrieve withdraw address list", error);
            }
        }
    );
}