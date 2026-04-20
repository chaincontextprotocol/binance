// src/tools/binance-spot/account-api/rateLimitOrder.ts
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { spotClient } from "../../../config/binanceClient.js";
import { fail } from "../../../utils/toolResponse.js";

export function registerBinanceRateLimitOrder(server: McpServer) {
    server.tool(
        "binance_spot_account_rate_limit_order",
        "Get current order count usage for each rate limit.",
        {
            recvWindow: z.number().optional().describe("The value cannot be greater than 60000")
        },
        async ({ recvWindow }) => {
            try {
                const params: any = {};
                if (recvWindow !== undefined) params.recvWindow = recvWindow;
                
                const response = await spotClient.restAPI.rateLimitOrder(params);


                const data = await response.data();

                return {
                    content: [
                        {
                            type: "text",
                            text: `Retrieved current order count usage. Response: ${JSON.stringify(data)}`
                        }
                    ]
                };
            } catch (error) {
                return fail("Failed to retrieve order count usage", error);
            }
        }
    );
}
