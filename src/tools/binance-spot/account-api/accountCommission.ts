// src/tools/binance-spot/account-api/accountCommission.ts
import { McpServer } from "../../../mcp.ts";
import { z } from "zod";
import { spotClient } from "../../../config/binanceClient.ts";
import { fail } from "../../../utils/toolResponse.ts";

export function registerBinanceAccountCommission(server: McpServer) {
    server.tool(
        "binance_spot_account_commission",
        "Get account commission rates for a specific symbol.",
        {
            symbol: z.string().describe("Symbol of the trading pair (e.g., BTCUSDT)"),
            recvWindow: z.number().optional().describe("The value cannot be greater than 60000")
        },
        async ({ symbol, recvWindow }) => {
            try {
                const params: any = { symbol };
                if (recvWindow !== undefined) params.recvWindow = recvWindow;
                
                const response = await spotClient.restAPI.accountCommission(params);


                const data = await response.data();

                return {
                    content: [
                        {
                            type: "text",
                            text: `Retrieved account commission rates for ${symbol}. Response: ${JSON.stringify(data)}`
                        }
                    ]
                };
            } catch (error) {
                return fail("Failed to retrieve account commission rates", error);
            }
        }
    );
}
