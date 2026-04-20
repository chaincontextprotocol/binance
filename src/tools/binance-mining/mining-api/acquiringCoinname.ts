// src/tools/binance-mining/mining-api/acquiringCoinname.ts
import { McpServer } from "../../../mcp.ts";
import { miningClient } from "../../../config/binanceClient.ts";
import { fail } from "../../../utils/toolResponse.ts";

export function registerBinanceAcquiringCoinName(server: McpServer) {
    server.tool(
        "binance_mining_acquiring_coin_name",
        "Fetch supported mining coins with details like coin name, ID, algorithm name, and associated algorithm ID.",
        {},
        async () => {
            try {
                const response = await miningClient.restAPI.acquiringCoinname();

                const data = await response.data();

                return {
                    content: [
                        {
                            type: "text",
                            text: `Successfully fetched supported mining coins. Response: ${JSON.stringify(data)}`
                        }
                    ]
                };
            } catch (error) {
                return fail("Failed to fetched supported mining coins", error);
            }
        }
    );
}
