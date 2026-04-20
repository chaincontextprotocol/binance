// src/tools/binance-wallet/travel-rule-api/submitDepositQuestionnaire.ts
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { walletClient } from "../../../config/binanceClient.js";
import { fail } from "../../../utils/toolResponse.js";

export function registerBinanceWalletSubmitDepositQuestionnaire(server: McpServer) {
    server.tool(
        "binance_wallet_travel_rule_submit_deposit_questionnaire",
        "Submit deposit questionnaire for broker deposit.",
        {
            subAccountId: z.string().describe("Sub-account ID"),
            depositId: z.string().describe("Deposit ID"),
            questionnaire: z.string().describe("Travel rule questionnaire"),
            beneficiaryPii: z.string().describe("Beneficiary PII information"),
            signature: z.string().describe("Signature"),
            recvWindow: z.number().optional().describe("The value cannot be greater than 60000")
        },
        async ({ subAccountId, depositId, questionnaire, beneficiaryPii, signature, recvWindow }) => {
            try {
                const params: any = {
                    subAccountId,
                    depositId,
                    questionnaire,
                    beneficiaryPii,
                    signature
                };
                if (recvWindow !== undefined) params.recvWindow = recvWindow;
                
                const response = await walletClient.restAPI.submitDepositQuestionnaire(params);
                const data = await response.data();

                return {
                    content: [
                        {
                            type: "text",
                            text: `Submitted deposit questionnaire for broker deposit. Response: ${JSON.stringify(data)}`
                        }
                    ]
                };
            } catch (error) {
                return fail("Failed to submit deposit questionnaire", error);
            }
        }
    );
}