// src/tools/binance-spot/general-api/time.ts
import { McpServer } from "../../../mcp.ts";
import { z } from "zod";
import { spotClient } from "../../../config/binanceClient.ts";
import { fail } from "../../../utils/toolResponse.ts";

export function registerBinanceTime(server: McpServer) {
    server.tool("binance_spot_general_time", "Get the current server time from Binance API.", {}, async () => {
        try {
            const response = await spotClient.restAPI.time();

                const data = await response.data();
                
                //@ts-ignore
                const serverTime = new Date(data.serverTime).toISOString();

            return {
                content: [
                    {
                        type: "text",
                        text: `Current Binance server time: ${serverTime} (${
                            data.serverTime
                        }). Response: ${JSON.stringify(data)}`
                    }
                ]
            };
        } catch (error) {
                return fail("Failed to retrieve server time", error);
            }
    });
}
