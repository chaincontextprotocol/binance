// src/tools/binance-wallet/asset-api/tradeFee.ts
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { walletClient } from "../../../config/binanceClient.js";
import { fail } from "../../../utils/toolResponse.js";

export function registerBinanceWalletTradeFee(server: McpServer) {
    server.tool(
        "binance_wallet_asset_trade_fee",
        "Get trade fee.",
        {
            symbol: z.string().optional().describe("Trading pair symbol"),
            recvWindow: z.number().optional().describe("The value cannot be greater than 60000")
        },
        async ({ symbol, recvWindow }) => {
            try {
                const params: any = {};
                if (symbol !== undefined) params.symbol = symbol;
                if (recvWindow !== undefined) params.recvWindow = recvWindow;
                
                const response = await walletClient.restAPI.tradeFee(params);
                const data = await response.data();

                return {
                    content: [
                        {
                            type: "text",
                            text: `Retrieved trade fee information. Response: ${JSON.stringify(data)}`
                        }
                    ]
                };
            } catch (error) {
                return fail("Failed to retrieve trade fee information", error);
            }
        }
    );
}