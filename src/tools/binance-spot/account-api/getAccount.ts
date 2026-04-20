// src/tools/binance-spot/account-api/getAccount.ts
import { McpServer } from "../../../mcp.ts";
import { z } from "zod";
import { spotClient } from "../../../config/binanceClient.ts";
import { fail } from "../../../utils/toolResponse.ts";

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
