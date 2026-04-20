// src/tools/binance-wallet/capital-api/fetchWithdrawAddressList.ts
import { McpServer } from "../../../mcp.ts";
import { z } from "zod";
import { walletClient } from "../../../config/binanceClient.ts";
import { fail } from "../../../utils/toolResponse.ts";

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