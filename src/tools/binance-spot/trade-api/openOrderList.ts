// src/tools/binance-spot/trade-api/openOrderList.ts
import { McpServer } from "../../../mcp.ts";
import { z } from "zod";
import { spotClient } from "../../../config/binanceClient.ts";
import { fail } from "../../../utils/toolResponse.ts";

export function registerBinanceOpenOrderList(server: McpServer) {
    server.tool(
        "binance_spot_trade_open_oco_orders",
        "Query open OCO orders for a specific account or symbol.",
        {
            symbol: z.string().optional().describe("Symbol of the trading pair (e.g., BTCUSDT)")
        },
        async ({ symbol }) => {
            try {
                const params: any = {};
                if (symbol) params.symbol = symbol;
                
                const response = await spotClient.restAPI.openOrderList(params);

                const data = await response.data();

                return {
                    content: [
                        {
                            type: "text",
                            text: `Retrieved open OCO orders${symbol ? ` for ${symbol}` : ''}. Response: ${JSON.stringify(data)}`
                        }
                    ]
                };
            } catch (error) {
                return fail("Failed to retrieve open OCO orders", error);
            }
        }
    );
}