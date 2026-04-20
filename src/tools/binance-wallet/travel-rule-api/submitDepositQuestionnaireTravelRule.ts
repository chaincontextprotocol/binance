// src/tools/binance-wallet/travel-rule-api/submitDepositQuestionnaireTravelRule.ts
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { walletClient } from "../../../config/binanceClient.js";
import { fail } from "../../../utils/toolResponse.js";

export function registerBinanceWalletSubmitDepositQuestionnaireTravelRule(server: McpServer) {
    server.tool(
        "binance_wallet_travel_rule_submit_deposit_questionnaire_v2",
        "Submit deposit questionnaire for travel rule.",
        {
            tranId: z.number().describe("Transaction ID"),
            questionnaire: z.string().describe("Travel rule questionnaire"),
            recvWindow: z.number().optional().describe("The value cannot be greater than 60000")
        },
        async ({ tranId, questionnaire, recvWindow }) => {
            try {
                const params: any = {
                    tranId,
                    questionnaire
                };
                if (recvWindow !== undefined) params.recvWindow = recvWindow;
                
                const response = await walletClient.restAPI.submitDepositQuestionnaireTravelRule(params);
                const data = await response.data();

                return {
                    content: [
                        {
                            type: "text",
                            text: `Submitted deposit questionnaire for travel rule. Response: ${JSON.stringify(data)}`
                        }
                    ]
                };
            } catch (error) {
                return fail("Failed to submit deposit questionnaire", error);
            }
        }
    );
}