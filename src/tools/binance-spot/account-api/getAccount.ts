// src/tools/binance-spot/account-api/getAccount.ts
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { spotClient } from "../../../config/binanceClient.js";
import { fail } from "../../../utils/toolResponse.js";

export function registerBinanceGetAccount(server: McpServer) {
    server.tool(
        "binance_spot_account_info",
        "Get current account information.",
        {
            recvWindow: z.number().optional().describe("The value cannot be greater than 60000")
        },
        async ({ recvWindow }) => {
            try {
                const params: any = {};
                if (recvWindow !== undefined) params.recvWindow = recvWindow;
                
                const response = await spotClient.restAPI.getAccount(params);


                const data = await response.data();

                return {
                    content: [
                        {
                            type: "text",
                            text: `Retrieved account information. Account contains ${data.balances?.length || 0} balances. Response: ${JSON.stringify(data)}`
                        }
                    ]
                };
            } catch (error) {
                return fail("Failed to retrieve account information", error);
            }
        }
    );
}
