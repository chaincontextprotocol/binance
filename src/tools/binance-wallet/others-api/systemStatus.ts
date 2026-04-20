// src/tools/binance-wallet/others-api/systemStatus.ts
import { McpServer } from "../../../mcp.ts";
import { walletClient } from "../../../config/binanceClient.ts";
import { fail } from "../../../utils/toolResponse.ts";

export function registerBinanceWalletSystemStatus(server: McpServer) {
    server.tool(
        "binance_wallet_others_system_status",
        "Get Binance Wallet system status.",
        {},
        async () => {
            try {
                const response = await walletClient.restAPI.systemStatus();
                const data = await response.data();

                return {
                    content: [
                        {
                            type: "text",
                            text: `Retrieved system status. Response: ${JSON.stringify(data)}`
                        }
                    ]
                };
            } catch (error) {
                return fail("Failed to retrieve system status", error);
            }
        }
    );
}