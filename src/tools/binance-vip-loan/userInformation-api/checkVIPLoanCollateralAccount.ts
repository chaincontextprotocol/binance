// src/tools/binance-vip-loan/userInformation-api/checkVIPLoanCollateralAccount.ts
import { McpServer } from "../../../mcp.ts";
import { vipLoanClient } from "../../../config/binanceClient.ts";
import { z } from "zod";
import { fail } from "../../../utils/toolResponse.ts";

export function registerBinanceCheckVIPLoanCollateralAccount(server: McpServer) {
    server.tool(
        "binance_vip_loan_user_check_collateral_account",
        "Allow users to check their collateral accounts and the coins held as collateral. If the logged-in account is a loan account, it will return all associated collateral accounts. If it's a collateral account, it returns details of the current account only.",
        {
            orderId: z.number().int().optional().describe("Optional order ID"),
            collateralAccountId: z.number().int().optional().describe("Optional collateral account ID"),
            recvWindow: z.number().int().optional().describe("Optional time window for request validity")
        },
        async (params) => {
            try {
                const response = await vipLoanClient.restAPI.checkVIPLoanCollateralAccount({
                    ...(params.orderId !== undefined && { orderId: params.orderId }),
                    ...(params.collateralAccountId !== undefined && {
                        collateralAccountId: params.collateralAccountId
                    }),
                    ...(params.recvWindow !== undefined && { recvWindow: params.recvWindow })
                });

                const data = await response.data();

                return {
                    content: [
                        {
                            type: "text",
                            text: `Successfully retrieved collateral accounts and the coins held as collateral. Response: ${JSON.stringify(
                                data
                            )}`
                        }
                    ]
                };
            } catch (error) {
                return fail("Failed to retrieve collateral accounts and the coins held as collateral", error);
            }
        }
    );
}
