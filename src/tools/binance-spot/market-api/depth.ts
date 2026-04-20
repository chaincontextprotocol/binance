// src/tools/binance-spot/market-api/depth.ts
import { McpServer } from "../../../mcp.ts";
import { z } from "zod";
import { spotClient } from "../../../config/binanceClient.ts";
import { fail } from "../../../utils/toolResponse.ts";

export function registerBinanceDepth(server: McpServer) {
    server.tool(
        "binance_spot_market_depth",
        "Get order book depth data for a specific trading pair.",
        {
            symbol: z.string().describe("Symbol of the trading pair (e.g., BTCUSDT)"),
            limit: z.number().optional().describe("Depth of the order book. Default 100; max 5000.")
        },
        async ({ symbol, limit }) => {
            try {
                const params: any = { symbol };
                if (limit !== undefined) params.limit = limit;
                
                const response = await spotClient.restAPI.depth(params);


                const data = await response.data();

                return {
                    content: [
                        {
                            type: "text",
                            text: `Retrieved order book depth for ${symbol}. Bids: ${data.bids?.length || 0}, Asks: ${data.asks?.length || 0}. Response: ${JSON.stringify(data)}`
                        }
                    ]
                };
            } catch (error) {
                return fail("Failed to retrieve order book depth", error);
            }
        }
    );
}