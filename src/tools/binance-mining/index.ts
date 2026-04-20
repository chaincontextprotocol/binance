// src/tools/binance-mining/index.ts
import { McpServer } from "../../mcp.ts";
import { registerBinanceAcquiringAlgorithm } from "./mining-api/acquiringAlgorithm.ts";
import { registerBinanceAcquiringCoinName } from "./mining-api/acquiringCoinname.ts";
import { registerBinanceHashRateResaleList } from "./mining-api/hashrateResaleList.ts";
import { registerBinanceRequestForMinerList } from "./mining-api/requestForMinerList.ts";
import { registerBinanceRequestForDetailMinerList } from "./mining-api/requestForDetailMinerList.ts";
import { registerBinanceExtraBonusList } from "./mining-api/extraBonusList.ts";
import { registerBinanceEarningsList } from "./mining-api/earningsList.ts";
import { registerBinanceCancelHashRateResaleConfiguration } from "./mining-api/cancelHashrateResaleConfiguration.ts";
import { registerBinanceHashRateResaleDetail } from "./mining-api/hashrateResaleDetail.ts";
import { registerBinanceMiningAccountEarning } from "./mining-api/miningAccountEarning.ts";
import { registerBinanceStatisticList } from "./mining-api/statisticList.ts";
import { registerBinanceHashRateResaleRequest } from "./mining-api/hashrateResaleRequest.ts";
import { registerBinanceAccountList } from "./mining-api/accountList.ts";

export function registerBinanceMiningTools(server: McpServer) {
    registerBinanceAcquiringAlgorithm(server);
    registerBinanceAcquiringCoinName(server);
    registerBinanceHashRateResaleList(server);
    registerBinanceRequestForMinerList(server);
    registerBinanceRequestForDetailMinerList(server);
    registerBinanceExtraBonusList(server);
    registerBinanceEarningsList(server);
    registerBinanceCancelHashRateResaleConfiguration(server);
    registerBinanceHashRateResaleDetail(server);
    registerBinanceMiningAccountEarning(server);
    registerBinanceStatisticList(server);
    registerBinanceHashRateResaleRequest(server);
    registerBinanceAccountList(server);
}
