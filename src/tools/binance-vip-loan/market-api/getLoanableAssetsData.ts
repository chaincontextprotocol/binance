// src/tools/binance-vip-loan/market-api/getLoanableAssetsData.ts
import { McpServer } from "../../../mcp.ts";
import { vipLoanClient } from "../../../config/binanceClient.ts";
import { z } from "zod";
import { fail } from "../../../utils/toolResponse.ts";

export function registerBinanceGetLoanableAssetsData(server: McpServer) {
    server.tool(
        "binance_vip_loan_market_loanable_assets_data",
        "Retrieves interest rates and borrowing limits for loanable assets. The borrow limit is expressed in USD. You can request information for specific assets or leave it empty to query all available assets.",
        {
            loanCoin: z.string().optional().describe("Optional: Coin for the loan"),
            vipLevel: z.number().int().optional().describe("Optional: User's VIP level (default is user's vip level)"),
            recvWindow: z.number().int().optional().describe("Optional time window for request validity")
        },
        async (params) => {
            try {
                const response = await vipLoanClient.restAPI.getLoanableAssetsData({
                    ...(params.loanCoin && { loanCoin: params.loanCoin }),
                    ...(params.vipLevel && { vipLevel: params.vipLevel }),
                    ...(params.recvWindow && { recvWindow: params.recvWindow })
                });

                const data = await response.data();

                return {
                    content: [
                        {
                            type: "text",
                            text: `Successfully retrieved interest rates and borrowing limits for loanable assets. Response: ${JSON.stringify(
                                data
                            )}`
                        }
                    ]
                };
            } catch (error) {
                return fail("Failed to retrieve interest rates and borrowing limits for loanable assets", error);
            }
        }
    );
}
