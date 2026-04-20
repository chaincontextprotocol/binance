// src/tools/binance-dual-investment/trade-api/checkDualInvestmentAccounts.ts
import { McpServer } from "../../../mcp.ts";
import { dualInvestmentClient } from "../../../config/binanceClient.ts";
import { z } from "zod";
import { fail } from "../../../utils/toolResponse.ts";

export function registerBinanceCheckDualInvestmentAccounts(server: McpServer) {
    server.tool(
        "binance_dual_investment_trade_check_accounts",
        "Retrieve Dual Investment account balances, including total value in BTC and USDT equivalents.",
        {
            recvWindow: z
                .number()
                .int()
                .max(60000)
                .optional()
                .describe("Optional time window for request validity (max 60000)")
        },
        async (params) => {
            try {
                const response = await dualInvestmentClient.restAPI.checkDualInvestmentAccounts({
                    ...(params.recvWindow && { recvWindow: params.recvWindow })
                });

                const data = await response.data();

                return {
                    content: [
                        {
                            type: "text",
                            text: `Successfully retrieve Dual Investment account balances, including total value in BTC and USDT equivalents. Response: ${JSON.stringify(
                                data
                            )}`
                        }
                    ]
                };
            } catch (error) {
                return fail("Failed to retrieve Dual Investment account balances", error);
            }
        }
    );
}
