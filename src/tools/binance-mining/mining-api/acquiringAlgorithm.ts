// src/tools/binance-mining/mining-api/acquiringAlgorithm.ts
import { McpServer } from "../../../mcp.ts";
import { miningClient } from "../../../config/binanceClient.ts";
import { fail } from "../../../utils/toolResponse.ts";

export function registerBinanceAcquiringAlgorithm(server: McpServer) {
    server.tool(
        "binance_mining_acquiring_algorithm",
        "Retrieve a list of available mining algorithms, including their name, ID, sequence, and unit.",
        {},
        async () => {
            try {
                const response = await miningClient.restAPI.acquiringAlgorithm();

                const data = await response.data();

                return {
                    content: [
                        {
                            type: "text",
                            text: `Successfully retrieve a list of available mining algorithms. Response: ${JSON.stringify(
                                data
                            )}`
                        }
                    ]
                };
            } catch (error) {
                return fail("Failed to retrieve a list of available mining algorithms", error);
            }
        }
    );
}
