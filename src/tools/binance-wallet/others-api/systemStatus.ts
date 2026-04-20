// src/tools/binance-wallet/others-api/systemStatus.ts
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { walletClient } from "../../../config/binanceClient.js";
import { fail } from "../../../utils/toolResponse.js";

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