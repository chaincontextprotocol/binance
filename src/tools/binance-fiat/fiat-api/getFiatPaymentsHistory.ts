// src/tools/binance-fiat/fiat-api/getFiatPaymentsHistory.ts
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { fiatClient } from "../../../config/binanceClient.js";
import { z } from "zod";
import { fail } from "../../../utils/toolResponse.js";

export function registerBinanceGetFiatPaymentsHistory(server: McpServer) {
    server.tool(
        "binance_fiat_payments_history",
        "Retrieves fiat buy/sell payment history, including trade amount, currency, crypto received, fees, status, payment method, and timestamps.",
        {
            transactionType: z.enum(["0", "1"]).describe("Transaction type: 0 for buy, 1 for sell"),
            beginTime: z.number().int().optional().describe("Start time in milliseconds"),
            endTime: z.number().int().optional().describe("End time in milliseconds"),
            page: z.number().int().optional().describe("Page number, default is 1"),
            rows: z
                .number()
                .int()
                .max(500, "Rows cannot be greater than 500")
                .optional()
                .describe("Number of records per page, default 100, max 500"),
            recvWindow: z.number().int().optional().describe("Optional time window for request validity")
        },
        async (params) => {
            try {
                const response = await fiatClient.restAPI.getFiatPaymentsHistory({
                    transactionType: params.transactionType,
                    ...(params.beginTime && { beginTime: params.beginTime }),
                    ...(params.endTime && { endTime: params.endTime }),
                    ...(params.page && { page: params.page }),
                    ...(params.rows && { rows: params.rows }),
                    ...(params.recvWindow && { recvWindow: params.recvWindow })
                });

                const data = await response.data();

                return {
                    content: [
                        {
                            type: "text",
                            text: `Successfully retrieved fiat buy/sell payment history. Response: ${JSON.stringify(
                                data
                            )}`
                        }
                    ]
                };
            } catch (error) {
                return fail("Failed to retrieve fiat buy/sell payment history", error);
            }
        }
    );
}
