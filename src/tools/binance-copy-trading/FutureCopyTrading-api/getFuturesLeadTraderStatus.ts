// src/tools/binance-copy-trading/FutureCopyTrading-api/getFuturesLeadTraderStatus.ts
import { McpServer } from "../../../mcp.ts";
import { copyTradingClient } from "../../../config/binanceClient.ts";
import { z } from "zod";
import { fail } from "../../../utils/toolResponse.ts";

export function registerBinanceGetFuturesLeadTraderStatus(server: McpServer) {
    server.tool(
        "binance_copy_trading_future_lead_trader_status",
        "Checks and returns whether the user is currently a Futures Lead Trader in Binance Copy Trading, along with the timestamp of the status check.",
        {
            recvWindow: z.number().int().optional().describe("Optional time window for request validity")
        },
        async (params) => {
            try {
                const response = await copyTradingClient.restAPI.getFuturesLeadTraderStatus({
                    ...(params.recvWindow && { recvWindow: params.recvWindow })
                });

                const data = await response.data();

                return {
                    content: [
                        {
                            type: "text",
                            text: `Successfully retrieved user futures trading details. Response: ${JSON.stringify(
                                data
                            )}`
                        }
                    ]
                };
            } catch (error) {
                return fail("Failed to Check and return whether the user is currently a Futures Lead Trader in Binance Copy Trading", error);
            }
        }
    );
}
