// src/tools/binance-algo/future-algo/currentAlgoOpenOrders.ts
import { McpServer } from "../../../mcp.ts";
import { algoClient } from "../../../config/binanceClient.ts";
import { z } from "zod";
import { fail } from "../../../utils/toolResponse.ts";

export function registerBinanceFutureCurrentAlgoOpenOrders(server: McpServer) {
    server.tool(
        "binance_algo_future_current_algo_open_orders",
        "The Query Current Algo Open Orders API retrieves a list of currently active algorithmic orders for USDⓈ-M Contracts in Binance Futures.",
        {
            recvWindow: z.number().int().optional().describe("Time window for request validity")
        },
        async (params) => {
            try {
                const response = await algoClient.restAPI.queryCurrentAlgoOpenOrdersFutureAlgo({
                    ...(params.recvWindow !== undefined && { recvWindow: params.recvWindow })
                });

                const data = await response.data();

                return {
                    content: [
                        {
                            type: "text",
                            text: `Currently active algorithmic orders. Response: ${JSON.stringify(data)}`
                        }
                    ]
                };
            } catch (error) {
                return fail("Failed to Query Current Algo Open Orders", error);
            }
        }
    );
}
