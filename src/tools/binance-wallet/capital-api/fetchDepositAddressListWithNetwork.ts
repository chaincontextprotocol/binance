// src/tools/binance-wallet/capital-api/fetchDepositAddressListWithNetwork.ts
import { McpServer } from "../../../mcp.ts";
import { z } from "zod";
import { walletClient } from "../../../config/binanceClient.ts";
import { fail } from "../../../utils/toolResponse.ts";

export function registerBinanceWalletFetchDepositAddressListWithNetwork(server: McpServer) {
    server.tool(
        "binance_wallet_capital_deposit_address_list",
        "Fetch deposit address with network.",
        {
            coin: z.string().describe("Coin symbol"),
            network: z.string().optional().describe("Network"),
            recvWindow: z.number().optional().describe("The value cannot be greater than 60000")
        },
        async ({ coin, network, recvWindow }) => {
            try {
                const params: any = { coin };
                if (network !== undefined) params.network = network;
                if (recvWindow !== undefined) params.recvWindow = recvWindow;
                
                const response = await walletClient.restAPI.fetchDepositAddressListWithNetwork(params);
                const data = await response.data();

                return {
                    content: [
                        {
                            type: "text",
                            text: `Retrieved deposit addresses for ${coin}. Total addresses: ${data.length || 0}. Response: ${JSON.stringify(data)}`
                        }
                    ]
                };
            } catch (error) {
                return fail("Failed to retrieve deposit addresses", error);
            }
        }
    );
}