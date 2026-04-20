// src/tools/binance-wallet/capital-api/depositHistory.ts
import { McpServer } from "../../../mcp.ts";
import { z } from "zod";
import { walletClient } from "../../../config/binanceClient.ts";
import { fail } from "../../../utils/toolResponse.ts";

export function registerBinanceWalletDepositHistory(server: McpServer) {
    server.tool(
        "binance_wallet_capital_deposit_history",
        "Get deposit history.",
        {
            coin: z.string().optional().describe("Coin symbol"),
            status: z.number().optional().describe("Deposit status"),
            startTime: z.number().optional().describe("Start time in milliseconds"),
            endTime: z.number().optional().describe("End time in milliseconds"),
            offset: z.number().optional().describe("Pagination offset"),
            limit: z.number().optional().describe("Number of records to return"),
            recvWindow: z.number().optional().describe("The value cannot be greater than 60000")
        },
        async ({ coin, status, startTime, endTime, offset, limit, recvWindow }) => {
            try {
                const params: any = {};
                if (coin !== undefined) params.coin = coin;
                if (status !== undefined) params.status = status;
                if (startTime !== undefined) params.startTime = startTime;
                if (endTime !== undefined) params.endTime = endTime;
                if (offset !== undefined) params.offset = offset;
                if (limit !== undefined) params.limit = limit;
                if (recvWindow !== undefined) params.recvWindow = recvWindow;

                const response = await walletClient.restAPI.depositHistory(params);
                const data = await response.data();

                return {
                    content: [
                        {
                            type: "text",
                            text: `Retrieved deposit history. Total deposits: ${data.length || 0}. Response: ${JSON.stringify(data)}`
                        }
                    ]
                };
            } catch (error) {
                return fail("Failed to retrieve deposit history", error);
            }
        }
    );
}