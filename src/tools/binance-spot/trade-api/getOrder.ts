// src/tools/binance-spot/trade-api/getOrder.ts
import { McpServer } from "../../../mcp.ts";
import { z } from "zod";
import { spotClient } from "../../../config/binanceClient.ts";
import { fail } from "../../../utils/toolResponse.ts";

export function registerBinanceGetOrder(server: McpServer) {
    server.tool(
        "binance_spot_trade_get_order",
        "Check an order's status on Binance for a specific trading pair.",
        {
            symbol: z.string().describe("Symbol of the trading pair (e.g., BTCUSDT)"),
            orderId: z.string().optional().describe("The order ID to query"),
            origClientOrderId: z.string().optional().describe("Original client order ID")
        },
        async ({ symbol, orderId, origClientOrderId }) => {
            try {
                const params: any = { symbol };
                
                if (orderId) params.orderId = orderId;
                if (origClientOrderId) params.origClientOrderId = origClientOrderId;
                
                const response = await spotClient.restAPI.getOrder(params);

                const data = await response.data();

                return {
                    content: [
                        {
                            type: "text",
                            text: `Order information retrieved successfully. Response: ${JSON.stringify(data)}`
                        }
                    ]
                };
            } catch (error) {
                return fail("Failed to retrieve order information", error);
            }
        }
    );
}