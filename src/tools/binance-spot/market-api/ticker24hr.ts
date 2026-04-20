// src/tools/binance-spot/market-api/ticker24hr.ts
import { McpServer } from "../../../mcp.ts";
import { z } from "zod";
import { spotClient } from "../../../config/binanceClient.ts";
import { fail } from "../../../utils/toolResponse.ts";

export function registerBinanceTicker24hr(server: McpServer) {
    server.tool(
        "binance_spot_market_ticker_24hr",
        "Get 24-hour price change statistics for a symbol or all symbols.",
        {
            symbol: z.string().optional().describe("Symbol of the trading pair (e.g., BTCUSDT)")
        },
        async ({ symbol }) => {
            try {
                const params: any = {};
                if (symbol) params.symbol = symbol;
                
                const response = await spotClient.restAPI.ticker24hr(params);


                const data = await response.data();

                const isArray = Array.isArray(data);
                const responseText = isArray
                    ? `Retrieved 24hr statistics for all symbols. Total items: ${data.length}.`
                    : `Retrieved 24hr statistics for ${symbol}.`;

                return {
                    content: [
                        {
                            type: "text",
                            text: `${responseText} Response: ${JSON.stringify(data)}`
                        }
                    ]
                };
            } catch (error) {
                return fail("Failed to retrieve 24hr ticker", error);
            }
        }
    );
}