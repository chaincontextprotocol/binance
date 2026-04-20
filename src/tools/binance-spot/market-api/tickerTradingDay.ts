// src/tools/binance-spot/market-api/tickerTradingDay.ts
import { McpServer } from "../../../mcp.ts";
import { z } from "zod";
import { spotClient } from "../../../config/binanceClient.ts";
import { fail } from "../../../utils/toolResponse.ts";

export function registerBinanceTickerTradingDay(server: McpServer) {
    server.tool(
        "binance_spot_market_ticker_trading_day",
        "Get statistics for the current trading day for a symbol or all symbols.",
        {
            symbol: z.string().optional().describe("Symbol of the trading pair (e.g., BTCUSDT)")
        },
        async ({ symbol }) => {
            try {
                const params: any = {};
                if (symbol) params.symbol = symbol;
                
                const response = await spotClient.restAPI.tickerTradingDay(params);


                const data = await response.data();

                const isArray = Array.isArray(data);
                const responseText = isArray
                    ? `Retrieved trading day statistics for all symbols. Total items: ${data.length}.`
                    : `Retrieved trading day statistics for ${symbol}.`;

                return {
                    content: [
                        {
                            type: "text",
                            text: `${responseText} Response: ${JSON.stringify(data)}`
                        }
                    ]
                };
            } catch (error) {
                return fail("Failed to retrieve trading day statistics", error);
            }
        }
    );
}