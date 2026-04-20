// src/tools/binance-simple-earn/account-api/simpleEarnFlexibleProductList.ts
import { McpServer } from "../../../mcp.ts";
import { simpleEarnClient } from "../../../config/binanceClient.ts";
import { z } from "zod";
import { fail } from "../../../utils/toolResponse.ts";

export function registerBinanceSimpleEarnFlexibleProductList(server: McpServer) {
    server.tool(
        "binance_simple_earn_flexible_product_list",
        "Retrieve a list of available Simple Earn Flexible Products, including details like APR, purchase status, and subscription limits.",
        {
            asset: z.string().optional().describe("Asset symbol (optional)"),
            current: z
                .number()
                .int()
                .min(1)
                .default(1)
                .optional()
                .describe("Currently querying page. Starts from 1. Default: 1"),
            size: z.number().int().min(1).max(100).default(10).optional().describe("Page size. Default: 10, Max: 100"),
            recvWindow: z.number().int().optional().describe("Time window for request validity")
        },
        async (params) => {
            try {
                const response = await simpleEarnClient.restAPI.getSimpleEarnFlexibleProductList({
                    ...(params.asset && { asset: params.asset }),
                    ...(params.current && { current: params.current }),
                    ...(params.size && { size: params.size }),
                    ...(params.recvWindow && { recvWindow: params.recvWindow })
                });

                const data = await response.data();

                return {
                    content: [
                        {
                            type: "text",
                            text: `Successfully retrieve a list of available Simple Earn Flexible Products. Response: ${JSON.stringify(
                                data
                            )}`
                        }
                    ]
                };
            } catch (error) {
                return fail("Failed to retrieve a list of available Simple Earn Flexible Products", error);
            }
        }
    );
}
