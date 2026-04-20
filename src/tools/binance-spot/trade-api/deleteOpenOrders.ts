// src/tools/binance-spot/trade-api/deleteOpenOrders.ts
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { spotClient } from "../../../config/binanceClient.js";
import { fail } from "../../../utils/toolResponse.js";

export function registerBinanceDeleteOpenOrders(server: McpServer) {
    server.tool(
        "binance_spot_trade_cancel_open_orders",
        "Cancel all open orders on Binance for a specific symbol.",
        {
            symbol: z.string().describe("Symbol of the trading pair (e.g., BTCUSDT)")
        },
        async ({ symbol }) => {
            try {
                const response = await spotClient.restAPI.deleteOpenOrders({
                    symbol: symbol
                });

                const data = await response.data();

                return {
                    content: [
                        {
                            type: "text",
                            text: `Successfully canceled all open orders for ${symbol}. Response: ${JSON.stringify(data)}`
                        }
                    ]
                };
            } catch (error) {
                return fail("Failed to cancel open orders", error);
            }
        }
    );
}