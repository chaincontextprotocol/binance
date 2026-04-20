// src/tools/binance-staking/index.ts
import { McpServer } from "../../mcp.ts";
import { registerBinanceETHStakingApiTools } from "./ETH-staking-api/index.ts";
import { registerBinanceSOLStakingApiTools } from "./SOL-staking-api/index.ts";

export function registerBinanceStakingTools(server: McpServer) {
    registerBinanceETHStakingApiTools(server);
    registerBinanceSOLStakingApiTools(server);
}
