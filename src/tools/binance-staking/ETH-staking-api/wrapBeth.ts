// src/tools/binance-staking/ETHStaking-api/wrapBeth.ts
import { McpServer } from "../../../mcp.ts";
import { stakingClient } from "../../../config/binanceClient.ts";
import { z } from "zod";
import { fail } from "../../../utils/toolResponse.ts";

export function registerBinanceWrapBeth(server: McpServer) {
    server.tool(
        "binance_staking_eth_wrap_beth",
        "Wrap BETH API allows users to convert BETH into WBETH, providing the wrapped WBETH amount and the exchange rate from BETH to WBETH.",
        {
            amount: z.number().min(0).describe("Amount in BETH, limit 4 decimals (mandatory)"),
            recvWindow: z.number().int().optional().describe("Time window for request validity")
        },
        async (params) => {
            try {
                const response = await stakingClient.restAPI.wrapBeth({
                    amount: params.amount,
                    ...(params.recvWindow !== undefined && { recvWindow: params.recvWindow })
                });

                const data = await response.data();

                return {
                    content: [
                        {
                            type: "text",
                            text: `Successfully convert BETH into WBETH. Response: ${JSON.stringify(data)}`
                        }
                    ]
                };
            } catch (error) {
                return fail("Failed to convert BETH into WBETH", error);
            }
        }
    );
}
