// src/tools/binance-spot/market-api/index.ts
import { McpServer } from "../../../mcp.ts";
import { registerBinanceKlines } from "./klines.ts";
import { registerBinanceTicker24hr } from "./ticker24hr.ts";
import { registerBinanceDepth } from "./depth.ts";
import { registerBinanceAggTrades } from "./aggTrades.ts";
import { registerBinanceTickerTradingDay } from "./tickerTradingDay.ts";
import { registerBinanceUiKlines } from "./uiKlines.ts";
import { registerBinanceTickerBookTicker } from "./tickerBookTicker.ts";
import { registerBinanceAvgPrice } from "./avgPrice.ts";
import { registerBinanceTickerPrice } from "./tickerPrice.ts";
import { registerBinanceTicker } from "./ticker.ts";
import { registerBinanceHistoricalTrades } from "./historicalTrades.ts";
import { registerBinanceGetTrades } from "./getTrades.ts";

export function registerBinanceMarketApiTools(server: McpServer) {
    registerBinanceKlines(server);
    registerBinanceTicker24hr(server);
    registerBinanceDepth(server);
    registerBinanceAggTrades(server);
    registerBinanceTickerTradingDay(server);
    registerBinanceUiKlines(server);
    registerBinanceTickerBookTicker(server);
    registerBinanceAvgPrice(server);
    registerBinanceTickerPrice(server);
    registerBinanceTicker(server);
    registerBinanceHistoricalTrades(server);
    registerBinanceGetTrades(server);
    
}