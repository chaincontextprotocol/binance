// src/tools/binance-spot/market-api/getTrades.ts
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { spotClient } from "../../../config/binanceClient.js";
import { fail } from "../../../utils/toolResponse.js";

export function registerBinanceGetTrades(server: McpServer) {
    server.tool(
        "binance_spot_market_trades",
        "Get recent trades for a specific trading pair.",
        {
            symbol: z.string().describe("Symbol of the trading pair (e.g., BTCUSDT)"),
            limit: z.number().optional().describe("Default 500; max 1000")
        },
        async ({ symbol, limit }) => {
            try {
                const params: any = { symbol };
                
                if (limit !== undefined) params.limit = limit;
                
                const response = await spotClient.restAPI.getTrades(params);

                const data = await response.data();
                
                return {
                    content: [
                        {
                            type: "text",
                            text: `Retrieved recent trades for ${symbol}. Total trades: ${data.length}. Response: ${JSON.stringify(data)}`
                        }
                    ]
                };
            } catch (error) {
                return fail("Failed to retrieve recent trades", error);
            }
        }
    );
}