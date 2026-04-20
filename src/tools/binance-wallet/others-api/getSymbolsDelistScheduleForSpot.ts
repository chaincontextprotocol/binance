// src/tools/binance-wallet/others-api/getSymbolsDelistScheduleForSpot.ts
import { McpServer } from "../../../mcp.ts";
import { walletClient } from "../../../config/binanceClient.ts";
import { fail } from "../../../utils/toolResponse.ts";

export function registerBinanceWalletGetSymbolsDelistScheduleForSpot(server: McpServer) {
    server.tool(
        "binance_wallet_others_symbols_delist_schedule",
        "Get delist schedule for spot symbols.",
        {},
        async () => {
            try {
                const response = await walletClient.restAPI.getSymbolsDelistScheduleForSpot();
                const data = await response.data();

                return {
                    content: [
                        {
                            type: "text",
                            text: `Retrieved delist schedule for spot symbols. Response: ${JSON.stringify(data)}`
                        }
                    ]
                };
            } catch (error) {
                return fail("Failed to retrieve delist schedule", error);
            }
        }
    );
}