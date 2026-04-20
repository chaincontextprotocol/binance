// src/tools/binance-spot/account-api/myTrades.ts
import { McpServer } from "../../../mcp.ts";
import { z } from "zod";
import { spotClient } from "../../../config/binanceClient.ts";
import { fail } from "../../../utils/toolResponse.ts";

export function registerBinanceMyTrades(server: McpServer) {
    server.tool(
        "binance_spot_account_trades",
        "Get trades for a specific account and symbol.",
        {
            symbol: z.string().describe("Symbol of the trading pair (e.g., BTCUSDT)"),
            orderId: z.number().optional().describe("Order ID"),
            startTime: z.number().optional().describe("Start time in milliseconds"),
            endTime: z.number().optional().describe("End time in milliseconds"),
            fromId: z.number().optional().describe("Trade ID to fetch from"),
            limit: z.number().optional().describe("Default 500; max 1000"),
            recvWindow: z.number().optional().describe("The value cannot be greater than 60000")
        },
        async ({ symbol, orderId, startTime, endTime, fromId, limit, recvWindow }) => {
            try {
                const params: any = { symbol };
                
                if (orderId !== undefined) params.orderId = orderId;
                if (startTime !== undefined) params.startTime = startTime;
                if (endTime !== undefined) params.endTime = endTime;
                if (fromId !== undefined) params.fromId = fromId;
                if (limit !== undefined) params.limit = limit;
                if (recvWindow !== undefined) params.recvWindow = recvWindow;
                
                const response = await spotClient.restAPI.myTrades(params);


                const data = await response.data();

                return {
                    content: [
                        {
                            type: "text",
                            text: `Retrieved trades for ${symbol}. Total trades: ${data.length}. Response: ${JSON.stringify(data)}`
                        }
                    ]
                };
            } catch (error) {
                return fail("Failed to retrieve account trades", error);
            }
        }
    );
}
