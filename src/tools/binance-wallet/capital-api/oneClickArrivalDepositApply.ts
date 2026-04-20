// src/tools/binance-wallet/capital-api/oneClickArrivalDepositApply.ts
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { walletClient } from "../../../config/binanceClient.js";
import { fail } from "../../../utils/toolResponse.js";

export function registerBinanceWalletOneClickArrivalDepositApply(server: McpServer) {
    server.tool(
        "binance_wallet_capital_one_click_arrival_deposit",
        "Apply for one-click arrival deposit.",
        {
            subAccountId: z.string().optional().describe("Sub-account ID"),
            recvWindow: z.number().optional().describe("The value cannot be greater than 60000")
        },
        async ({ subAccountId, recvWindow }) => {
            try {
                const params: any = {};
                if (subAccountId !== undefined) params.subAccountId = subAccountId;
                if (recvWindow !== undefined) params.recvWindow = recvWindow;
                
                const response = await walletClient.restAPI.oneClickArrivalDepositApply(params);
                const data = await response.data();

                return {
                    content: [
                        {
                            type: "text",
                            text: `Applied for one-click arrival deposit. Response: ${JSON.stringify(data)}`
                        }
                    ]
                };
            } catch (error) {
                return fail("Failed to apply for one-click arrival deposit", error);
            }
        }
    );
}