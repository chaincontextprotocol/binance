// src/tools/binance-spot/market-api/tickerBookTicker.ts
import { McpServer } from "../../../mcp.ts";
import { z } from "zod";
import { spotClient } from "../../../config/binanceClient.ts";
import { fail } from "../../../utils/toolResponse.ts";

export function registerBinanceTickerBookTicker(server: McpServer) {
    server.tool(
        "binance_spot_market_ticker_book_ticker",
        "Get best price/quantity on the order book for a symbol or all symbols.",
        {
            symbol: z.string().optional().describe("Symbol of the trading pair (e.g., BTCUSDT)")
        },
        async ({ symbol }) => {
            try {
                const params: any = {};
                if (symbol) params.symbol = symbol;
                
                const response = await spotClient.restAPI.tickerBookTicker(params);


                const data = await response.data();

                const isArray = Array.isArray(data);
                const responseText = isArray
                    ? `Retrieved best price/quantity on the order book for all symbols. Total items: ${data.length}.`
                    : `Retrieved best price/quantity on the order book for ${symbol}.`;

                return {
                    content: [
                        {
                            type: "text",
                            text: `${responseText} Response: ${JSON.stringify(data)}`
                        }
                    ]
                };
            } catch (error) {
                return fail("Failed to retrieve book ticker", error);
            }
        }
    );
}