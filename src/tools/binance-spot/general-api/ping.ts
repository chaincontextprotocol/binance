// src/tools/binance-spot/general-api/ping.ts
import { McpServer } from "../../../mcp.ts";
import { z } from "zod";
import { spotClient } from "../../../config/binanceClient.ts";
import { fail } from "../../../utils/toolResponse.ts";

export function registerBinancePing(server: McpServer) {
    server.tool(
        "binance_spot_general_ping",
        "Test connectivity to the Binance API.",
        {},
        async () => {
            try {
                const response = await spotClient.restAPI.ping();


                const data = await response.data();

                return {
                    content: [
                        {
                            type: "text",
                            text: `Successfully pinged Binance API. Response: ${JSON.stringify(data)}`
                        }
                    ]
                };
            } catch (error) {
                return fail("Failed to ping Binance API", error);
            }
        }
    );
}
