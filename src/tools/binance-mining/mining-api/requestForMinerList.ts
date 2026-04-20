// src/tools/binance-mining/mining-api/requestForMinerList.ts
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { miningClient } from "../../../config/binanceClient.js";
import { z } from "zod";
import { fail } from "../../../utils/toolResponse.js";

export function registerBinanceRequestForMinerList(server: McpServer) {
    server.tool(
        "binance_mining_request_for_miner_list",
        "Retrieves a list of miners (workers) associated with a mining account, including details such as miner name, status, real-time hashrate, 24H hashrate, rejection rate, and last submission time.",
        {
            algo: z.string().min(1).describe("Algorithm (e.g., sha256)"),
            userName: z.string().min(1).describe("Mining account username"),
            pageIndex: z
                .number()
                .int()
                .min(1)
                .optional()
                .describe("Page number, default is first page, starting from 1"),
            sort: z
                .number()
                .int()
                .min(0)
                .max(1)
                .optional()
                .describe("Sort sequence: 0 = ascending (default), 1 = descending"),
            sortColumn: z
                .number()
                .int()
                .min(1)
                .max(5)
                .optional()
                .describe(
                    `Sort by (default = 1): 1: miner name, 2: real-time computing power, 3: daily average computing power, 4: real-time rejection rate, 5: last submission time`
                ),
            workerStatus: z
                .number()
                .int()
                .min(0)
                .max(3)
                .optional()
                .describe("Miner status (default = 0): 0 = all, 1 = valid, 2 = invalid, 3 = failure"),
            recvWindow: z.number().int().optional().describe("Optional: cannot be greater than 60000")
        },
        async (params) => {
            try {
                const response = await miningClient.restAPI.requestForMinerList({
                    algo: params.algo,
                    userName: params.userName,
                    ...(params.pageIndex && { pageIndex: params.pageIndex }),
                    ...(params.sort && { sort: params.sort }),
                    ...(params.sortColumn && { sortColumn: params.sortColumn }),
                    ...(params.workerStatus && { workerStatus: params.workerStatus }),
                    ...(params.recvWindow && { recvWindow: params.recvWindow })
                });

                const data = await response.data();

                return {
                    content: [
                        {
                            type: "text",
                            text: `Successfully retrieved a list of miners (workers) associated with a mining account. Response: ${JSON.stringify(
                                data
                            )}`
                        }
                    ]
                };
            } catch (error) {
                return fail("Failed to retrieve a list of miners (workers) associated with a mining account", error);
            }
        }
    );
}
