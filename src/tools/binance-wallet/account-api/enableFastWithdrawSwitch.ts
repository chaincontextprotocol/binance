// src/tools/binance-wallet/account-api/enableFastWithdrawSwitch.ts
import { McpServer } from "../../../mcp.ts";
import { z } from "zod";
import { walletClient } from "../../../config/binanceClient.ts";
import { fail } from "../../../utils/toolResponse.ts";

export function registerBinanceWalletEnableFastWithdrawSwitch(server: McpServer) {
    server.tool(
        "binance_wallet_account_enable_fast_withdraw_switch",
        "Enable fast withdraw switch.",
        {
            recvWindow: z.number().optional().describe("The value cannot be greater than 60000")
        },
        async ({ recvWindow }) => {
            try {
                const params: any = {};
                if (recvWindow !== undefined) params.recvWindow = recvWindow;
                
                const response = await walletClient.restAPI.enableFastWithdrawSwitch(params);
                const data = await response.data();

                return {
                    content: [
                        {
                            type: "text",
                            text: `Enabled fast withdraw switch. Response: ${JSON.stringify(data)}`
                        }
                    ]
                };
            } catch (error) {
                return fail("Failed to enable fast withdraw switch", error);
            }
        }
    );
}