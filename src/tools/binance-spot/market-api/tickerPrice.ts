// src/tools/binance-spot/market-api/tickerPrice.ts
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { spotClient } from "../../../config/binanceClient.js";
import { fail } from "../../../utils/toolResponse.js";

export function registerBinanceTickerPrice(server: McpServer) {
    server.tool(
        "binance_spot_market_ticker_price",
        "Get latest price for a symbol or all symbols.",
        {
            symbol: z.string().optional().describe("Symbol of the trading pair (e.g., BTCUSDT)")
        },
        async ({ symbol }) => {
            try {
                const params: any = {};
                if (symbol) params.symbol = symbol;
                
                const response = await spotClient.restAPI.tickerPrice(params);


                const data = await response.data();

                const isArray = Array.isArray(data);
                const responseText = isArray
                    ? `Retrieved latest prices for all symbols. Total items: ${data.length}.`
                    : `Retrieved latest price for ${symbol}: ${data.price}.`;

                return {
                    content: [
                        {
                            type: "text",
                            text: `${responseText} Response: ${JSON.stringify(data)}`
                        }
                    ]
                };
            } catch (error) {
                return fail("Failed to retrieve ticker price", error);
            }
        }
    );
}