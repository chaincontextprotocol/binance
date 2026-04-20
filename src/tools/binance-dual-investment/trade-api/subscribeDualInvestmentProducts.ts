// src/tools/binance-dual-investment/trade-api/subscribeDualInvestmentProducts.ts
import { McpServer } from "../../../mcp.ts";
import { dualInvestmentClient } from "../../../config/binanceClient.ts";
import { z } from "zod";
import { fail } from "../../../utils/toolResponse.ts";

export function registerBinanceSubscribeDualInvestmentProducts(server: McpServer) {
    server.tool(
        "binance_dual_investment_trade_subscribe_products",
        "Subscribe to Dual Investment products by providing product ID, order ID, deposit amount, and auto compound plan to initiate investment with specified terms.",
        {
            id: z.string().describe("Product ID from /sapi/v1/dci/product/list"),
            orderId: z.string().describe("Order ID from /sapi/v1/dci/product/list"),
            depositAmount: z.number().positive().describe("The amount for subscribing"),
            autoCompoundPlan: z
                .enum(["NONE", "STANDARD", "ADVANCED"])
                .describe("Auto-compound plan: NONE (off), STANDARD, or ADVANCED"),
            recvWindow: z
                .number()
                .int()
                .max(60000, "recvWindow cannot be greater than 60000")
                .optional()
                .describe("Optional time window for request validity")
        },
        async (params) => {
            try {
                const response = await dualInvestmentClient.restAPI.subscribeDualInvestmentProducts({
                    id: params.id,
                    orderId: params.orderId,
                    depositAmount: params.depositAmount,
                    autoCompoundPlan: params.autoCompoundPlan,
                    ...(params.recvWindow && { recvWindow: params.recvWindow })
                });

                const data = await response.data();

                return {
                    content: [
                        {
                            type: "text",
                            text: `Successfully subscribed to Dual Investment products. Response: ${JSON.stringify(
                                data
                            )}`
                        }
                    ]
                };
            } catch (error) {
                return fail("Failed to subscribe to dual investment products", error);
            }
        }
    );
}
