// src/tools/binance-convert/trade-api/orderStatus.ts
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { convertClient } from "../../../config/binanceClient.js";
import { z } from "zod";
import { fail } from "../../../utils/toolResponse.js";

export function registerBinanceConvertOrderStatus(server: McpServer) {
    server.tool(
        "binance_convert_trade_order_status",
        "The API checks the status of a token conversion order using either the orderId or quoteId, and returns details like conversion status, assets involved, amounts, exchange rate, and order creation time.",
        {
            orderId: z.string().optional().describe("Order ID (either this or quoteId is required)"),
            quoteId: z.string().optional().describe("Quote ID (either this or orderId is required)")
        },
        async (params) => {
            try {
                const response = await convertClient.restAPI.orderStatus({
                    ...(params.orderId && { orderId: params.orderId }),
                    ...(params.quoteId && { quoteId: params.quoteId })
                });

                const data = await response.data();

                return {
                    content: [
                        {
                            type: "text",
                            text: `Successfully get the status of a token conversion . Response: ${JSON.stringify(
                                data
                            )}`
                        }
                    ]
                };
            } catch (error) {
                return fail("Failed to check the status", error);
            }
        }
    );
}
