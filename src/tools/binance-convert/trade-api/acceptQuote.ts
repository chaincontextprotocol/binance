// src/tools/binance-convert/trade-api/acceptQuote.ts
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { convertClient } from "../../../config/binanceClient.js";
import { z } from "zod";
import { fail } from "../../../utils/toolResponse.js";

export function registerBinanceConvertAcceptQuote(server: McpServer) {
    server.tool(
        "binance_convert_trade_accept_quote",
        "The API confirms and executes a token conversion using a previously received quote ID.",
        {
            quoteId: z.string().describe("Quote ID"),
            recvWindow: z
                .number()
                .int()
                .max(60000, "recvWindow cannot be greater than 60000")
                .optional()
                .describe("The value cannot be greater than 60000")
        },
        async (params) => {
            try {
                const response = await convertClient.restAPI.acceptQuote({
                    quoteId: params.quoteId,
                    ...(params.recvWindow && { recvWindow: params.recvWindow })
                });
                const data = await response.data();

                return {
                    content: [
                        {
                            type: "text",
                            text: `Successfully executed the token conversion. Response: ${JSON.stringify(data)}`
                        }
                    ]
                };
            } catch (error) {
                return fail("Failed to execute a token conversion", error);
            }
        }
    );
}
