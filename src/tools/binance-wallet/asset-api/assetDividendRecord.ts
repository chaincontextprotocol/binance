// src/tools/binance-wallet/asset-api/assetDividendRecord.ts
import { McpServer } from "../../../mcp.ts";
import { z } from "zod";
import { walletClient } from "../../../config/binanceClient.ts";
import { fail } from "../../../utils/toolResponse.ts";

export function registerBinanceWalletAssetDividendRecord(server: McpServer) {
    server.tool(
        "binance_wallet_asset_dividend_record",
        "Get asset dividend record.",
        {
            asset: z.string().optional().describe("Asset symbol"),
            startTime: z.number().optional().describe("Start time in milliseconds"),
            endTime: z.number().optional().describe("End time in milliseconds"),
            limit: z.number().optional().describe("Default 20, max 500"),
            recvWindow: z.number().optional().describe("The value cannot be greater than 60000")
        },
        async ({ asset, startTime, endTime, limit, recvWindow }) => {
            try {
                const params: any = {};
                if (asset !== undefined) params.asset = asset;
                if (startTime !== undefined) params.startTime = startTime;
                if (endTime !== undefined) params.endTime = endTime;
                if (limit !== undefined) params.limit = limit;
                if (recvWindow !== undefined) params.recvWindow = recvWindow;
                
                const response = await walletClient.restAPI.assetDividendRecord(params);
                const data = await response.data();

                return {
                    content: [
                        {
                            type: "text",
                            text: `Retrieved asset dividend record. Total records: ${data.total || 0}. Response: ${JSON.stringify(data)}`
                        }
                    ]
                };
            } catch (error) {
                return fail("Failed to retrieve asset dividend record", error);
            }
        }
    );
}