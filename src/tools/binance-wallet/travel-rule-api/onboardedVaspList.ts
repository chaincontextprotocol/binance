// src/tools/binance-wallet/travel-rule-api/onboardedVaspList.ts
import { McpServer } from "../../../mcp.ts";
import { z } from "zod";
import { walletClient } from "../../../config/binanceClient.ts";
import { fail } from "../../../utils/toolResponse.ts";

export function registerBinanceWalletOnboardedVaspList(server: McpServer) {
    server.tool(
        "binance_wallet_travel_rule_onboarded_vasp_list",
        "Get list of onboarded VASPs (Virtual Asset Service Providers).",
        {},
        async () => {
            try {                
                const response = await walletClient.restAPI.vaspList();
                const data = await response.data();

                return {
                    content: [
                        {
                            type: "text",
                            text: `Retrieved onboarded VASP list. Response: ${JSON.stringify(data)}`
                        }
                    ]
                };
            } catch (error) {
                return fail("Failed to retrieve onboarded VASP list", error);
            }
        }
    );
}