// src/tools/binance-algo/spot-algo/currentAlgoOpenOrders.ts
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { algoClient } from "../../../config/binanceClient.js";
import { z } from "zod";
import { fail } from "../../../utils/toolResponse.js";

export function registerBinanceSpotCurrentAlgoOpenOrders(server: McpServer) {
    server.tool(
        "binance_algo_spot_current_algo_open_orders",
        "This API retrieves all open SPOT TWAP (Time-Weighted Average Price) orders on Binance.",
        {
            recvWindow: z.number().int().optional().describe("Time window for request validity")
        },
        async (params) => {
            try {
                const response = await algoClient.restAPI.queryCurrentAlgoOpenOrdersSpotAlgo({
                    ...(params.recvWindow !== undefined && { recvWindow: params.recvWindow })
                });

                const data = await response.data();

                return {
                    content: [
                        {
                            type: "text",
                            text: `Retrieve all open SPOT TWAP (Time-Weighted Average Price) orders. Response: ${JSON.stringify(
                                data
                            )}`
                        }
                    ]
                };
            } catch (error) {
                return fail("Failed to retrieves all open SPOT TWAP", error);
            }
        }
    );
}
