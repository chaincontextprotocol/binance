// src/tools/binance-algo/spot-algo/cancelOpenTWAPOrder.ts
import { McpServer } from "../../../mcp.ts";
import { algoClient } from "../../../config/binanceClient.ts";
import { z } from "zod";
import { fail } from "../../../utils/toolResponse.ts";

export function registerBinanceSpotCancelOpenTWAPOrder(server: McpServer) {
    server.tool(
        "binance_algo_spot_cancel_twap_order",
        "The Cancel Algo Order API allows users to cancel an open TWAP algorithmic order for spot trading on Binance.",
        {
            algoId: z.number().int().describe("Algo order ID (e.g., 14511)"),
            recvWindow: z.number().int().optional().describe("Time window for request validity")
        },
        async (params) => {
            try {
                const response = await algoClient.restAPI.cancelAlgoOrderSpotAlgo({
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
                return fail("Failed to Cancel Algo Order", error);
            }
        }
    );
}
