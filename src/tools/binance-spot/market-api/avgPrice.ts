// src/tools/binance-spot/market-api/avgPrice.ts
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { spotClient } from "../../../config/binanceClient.js";
import { fail } from "../../../utils/toolResponse.js";

export function registerBinanceAvgPrice(server: McpServer) {
    server.tool(
        "binance_spot_market_avg_price",
        "Get current average price for a trading pair.",
        {
            symbol: z.string().describe("Symbol of the trading pair (e.g., BTCUSDT)")
        },
        async ({ symbol }) => {
            try {
                const response = await spotClient.restAPI.avgPrice({
                    symbol: symbol
                });


                const data = await response.data();

                return {
                    content: [
                        {
                            type: "text",
                            text: `Retrieved current average price for ${symbol}. Average price: ${data.price}. Response: ${JSON.stringify(data)}`
                        }
                    ]
                };
            } catch (error) {
                return fail("Failed to retrieve average price", error);
            }
        }
    );
}