// src/tools/binance-wallet/asset-api/getOpenSymbolList.ts
import { McpServer } from "../../../mcp.ts";
import { z } from "zod";
import { walletClient } from "../../../config/binanceClient.ts";
import { fail } from "../../../utils/toolResponse.ts";

export function registerBinanceWalletGetOpenSymbolList(server: McpServer) {
    server.tool(
        "binance_wallet_asset_open_symbol_list",
        "Get open symbol list.",
        {},
        async () => {
            try {
                const response = await walletClient.restAPI.getOpenSymbolList();
                const data = await response.data();

                return {
                    content: [
                        {
                            type: "text",
                            text: `Retrieved open symbol list. Response: ${JSON.stringify(data)}`
                        }
                    ]
                };
            } catch (error) {
                return fail("Failed to retrieve open symbol list", error);
            }
        }
    );
}