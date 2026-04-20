// src/tools/binance-mining/mining-api/accountList.ts
import { McpServer } from "../../../mcp.ts";
import { miningClient } from "../../../config/binanceClient.ts";
import { z } from "zod";
import { fail } from "../../../utils/toolResponse.ts";

export function registerBinanceAccountList(server: McpServer) {
    server.tool(
        "binance_mining_account_list",
        "Retrieve hashrate statistics for a mining account. It returns both hourly (H_hashrate) and daily (D_hashrate) data, including timestamps, hashrate values, and rejection rates.",
        {
            algo: z.string().min(1).describe("Algorithm (e.g., sha256)"),
            userName: z.string().min(1).describe("Mining account"),
            recvWindow: z.number().int().optional().describe("Optional time window for request validity")
        },
        async (params) => {
            try {
                const response = await miningClient.restAPI.accountList({
                    algo: params.algo,
                    userName: params.userName,
                    ...(params.recvWindow && { recvWindow: params.recvWindow })
                });

                const data = await response.data();

                return {
                    content: [
                        {
                            type: "text",
                            text: `Successfully retrieved hashrate statistics for a mining account.. Response: ${JSON.stringify(
                                data
                            )}`
                        }
                    ]
                };
            } catch (error) {
                return fail("Failed to retrieve hashrate statistics for a mining account.", error);
            }
        }
    );
}
