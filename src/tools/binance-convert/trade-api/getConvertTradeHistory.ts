// src/tools/binance-convert/trade-api/getConvertTradeHistory.ts
import { McpServer } from "../../../mcp.ts";
import { convertClient } from "../../../config/binanceClient.ts";
import { z } from "zod";
import { fail } from "../../../utils/toolResponse.ts";

export function registerBinanceGetConvertTradeHistory(server: McpServer) {
    server.tool(
        "binance_convert_trade_history",
        "The API retrieves your token conversion trade history within a specified time range, with support for pagination using the limit parameter (up to 1000 records).",
        {
            startTime: z.number().int().describe("Start time in milliseconds"),
            endTime: z.number().int().describe("End time in milliseconds"),
            limit: z
                .number()
                .int()
                .max(1000, "Limit cannot be greater than 1000")
                .optional()
                .describe("Default 100, Max 1000"),
            recvWindow: z.number().int().optional().describe("Time window for request validity")
        },
        async (params) => {
            try {
                const response = await convertClient.restAPI.getConvertTradeHistory({
                    startTime: params.startTime,
                    endTime: params.endTime,
                    ...(params.limit && { limit: params.limit }),
                    ...(params.recvWindow && { recvWindow: params.recvWindow })
                });

                const data = await response.data();

                return {
                    content: [
                        {
                            type: "text",
                            text: `Successfully retrieved your token conversion trade history. Response: ${JSON.stringify(
                                data
                            )}`
                        }
                    ]
                };
            } catch (error) {
                return fail("Failed to retrieve your token conversion", error);
            }
        }
    );
}
