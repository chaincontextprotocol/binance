// src/tools/binance-wallet/account-api/disableFastWithdrawSwitch.ts
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { walletClient } from "../../../config/binanceClient.js";
import { fail } from "../../../utils/toolResponse.js";

export function registerBinanceWalletDisableFastWithdrawSwitch(server: McpServer) {
    server.tool(
        "binance_wallet_account_disable_fast_withdraw_switch",
        "Disable fast withdraw switch.",
        {
            recvWindow: z.number().optional().describe("The value cannot be greater than 60000")
        },
        async ({ recvWindow }) => {
            try {
                const params: any = {};
                if (recvWindow !== undefined) params.recvWindow = recvWindow;
                
                const response = await walletClient.restAPI.disableFastWithdrawSwitch(params);
                const data = await response.data();

                return {
                    content: [
                        {
                            type: "text",
                            text: `Disabled fast withdraw switch. Response: ${JSON.stringify(data)}`
                        }
                    ]
                };
            } catch (error) {
                return fail("Failed to disable fast withdraw switch", error);
            }
        }
    );
}