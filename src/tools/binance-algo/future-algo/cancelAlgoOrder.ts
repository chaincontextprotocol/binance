// src/tools/binance-algo/future-algo/cancelAlgoOrder.ts
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { algoClient } from "../../../config/binanceClient.js";
import { z } from "zod";
import { fail } from "../../../utils/toolResponse.js";

export function registerBinanceFutureCancelAlgoOrder(server: McpServer) {
    server.tool(
        "binance_algo_future_cancel_algo_order",
        "The Cancel Algo Order API allows users to cancel an active algorithmic order on USDⓈ-M Contracts in Binance Futures.",
        {
            algoId: z.number().int().describe("Algo order ID (e.g., 14511)"),
            recvWindow: z.number().int().optional().describe("Time window for request validity")
        },
        async (params) => {
            try {
                const response = await algoClient.restAPI.cancelAlgoOrderFutureAlgo({
                    algoId: params.algoId,
                    ...(params.recvWindow !== undefined && { recvWindow: params.recvWindow })
                });

                const data = await response.data();

                return {
                    content: [
                        {
                            type: "text",
                            text: `Algo order ${params.algoId} canceled successfully. Response: ${JSON.stringify(data)}`
                        }
                    ]
                };
            } catch (error) {
                return fail("Failed to cancel Algo Order", error);
            }
        }
    );
}
