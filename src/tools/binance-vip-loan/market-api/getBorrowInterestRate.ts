// src/tools/binance-vip-loan/market-api/getBorrowInterestRate.ts
import { McpServer } from "../../../mcp.ts";
import { vipLoanClient } from "../../../config/binanceClient.ts";
import { z } from "zod";
import { fail } from "../../../utils/toolResponse.ts";

export function registerBinanceGetBorrowInterestRate(server: McpServer) {
    server.tool(
        "binance_vip_loan_market_borrow_interest_rate",
        "Retrieves the interest rates for borrowing assets. It provides both daily and yearly interest rates for multiple assets (e.g., BUSD, BTC). You can specify the assets by using a comma-separated list.",
        {
            loanCoin: z.string().min(1).describe("Max 10 assets, multiple split by ','"),
            recvWindow: z.number().int().optional().describe("Optional time window for request validity")
        },
        async (params) => {
            try {
                const response = await vipLoanClient.restAPI.getBorrowInterestRate({
                    loanCoin: params.loanCoin,
                    ...(params.recvWindow && { recvWindow: params.recvWindow })
                });

                const data = await response.data();

                return {
                    content: [
                        {
                            type: "text",
                            text: `Successfully retrieved the interest rates for borrowing assets. Response: ${JSON.stringify(
                                data
                            )}`
                        }
                    ]
                };
            } catch (error) {
                return fail("Failed to retrieve the interest rates for borrowing assets", error);
            }
        }
    );
}
