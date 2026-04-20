// src/tools/binance-spot/market-api/historicalTrades.ts
import { McpServer } from "../../../mcp.ts";
import { z } from "zod";
import { spotClient } from "../../../config/binanceClient.ts";
import { fail } from "../../../utils/toolResponse.ts";

export function registerBinanceHistoricalTrades(server: McpServer) {
    server.tool(
        "binance_spot_market_historical_trades",
        "Get older historical trades for a specific trading pair.",
        {
            symbol: z.string().describe("Symbol of the trading pair (e.g., BTCUSDT)"),
            limit: z.number().optional().describe("Default 500; max 1000"),
            fromId: z.number().optional().describe("Trade ID to fetch from")
        },
        async ({ symbol, limit, fromId }) => {
            try {
                const params: any = { symbol };
                
                if (limit !== undefined) params.limit = limit;
                if (fromId !== undefined) params.fromId = fromId;
                
                const response = await spotClient.restAPI.historicalTrades(params);

                const data = await response.data();

                return {
                    content: [
                        {
                            type: "text",
                            text: `Retrieved historical trades for ${symbol}. Total trades: ${data.length}. Response: ${JSON.stringify(data)}`
                        }
                    ]
                };
            } catch (error) {
                return fail("Failed to retrieve historical trades", error);
            }
        }
    );
}