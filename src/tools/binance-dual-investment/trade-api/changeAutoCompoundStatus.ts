// src/tools/binance-dual-investment/trade-api/changeAutoCompoundStatus.ts
import { McpServer } from "../../../mcp.ts";
import { dualInvestmentClient } from "../../../config/binanceClient.ts";
import { z } from "zod";
import { fail } from "../../../utils/toolResponse.ts";

export function registerBinanceChangeAutoCompoundStatus(server: McpServer) {
    server.tool(
        "binance_dual_investment_trade_change_auto_compound_status",
        "Change the Auto-Compound plan for a Dual Investment position to NONE, STANDARD, or ADVANCED using the position ID.",
        {
            positionId: z.string().describe("Get positionId from /sapi/v1/dci/product/positions"),
            autoCompoundPlan: z
                .enum(["NONE", "STANDARD", "ADVANCED"])
                .optional()
                .describe("Auto compound plan: NONE, STANDARD, or ADVANCED"),
            recvWindow: z
                .number()
                .int()
                .max(60000)
                .optional()
                .describe("Optional time window for request validity (max 60000)")
        },
        async (params) => {
            try {
                const response = await dualInvestmentClient.restAPI.changeAutoCompoundStatus({
                    positionId: params.positionId,
                    autoCompoundPlan: params.autoCompoundPlan,
                    ...(params.recvWindow && { recvWindow: params.recvWindow })
                });

                const data = await response.data();

                return {
                    content: [
                        {
                            type: "text",
                            text: `Successfully Changed the Auto-Compound plan for a Dual Investment position. Response: ${JSON.stringify(
                                data
                            )}`
                        }
                    ]
                };
            } catch (error) {
                return fail("Failed to change the Auto-Compound plan for a Dual Investment position", error);
            }
        }
    );
}
