// src/tools/binance-wallet/index.ts
import { McpServer } from "../../mcp.ts";
import { registerBinanceWalletAccountApiTools } from "./account-api/index.ts";
import { registerBinanceWalletOthersApiTools } from "./others-api/index.ts";
import { registerBinanceWalletTravelRuleApiTools } from "./travel-rule-api/index.ts";
import { registerBinanceWalletAssetApiTools } from "./asset-api/index.ts";
import { registerBinanceWalletCapitalApiTools } from "./capital-api/index.ts";

export function registerBinanceWalletTools(server: McpServer) {
    // Account API tools
    registerBinanceWalletAccountApiTools(server);
    
    // Others API tools
    registerBinanceWalletOthersApiTools(server);
    
    // Travel Rule API tools
    registerBinanceWalletTravelRuleApiTools(server);
    
    // Asset API tools
    registerBinanceWalletAssetApiTools(server);
    
    // Capital API tools
    registerBinanceWalletCapitalApiTools(server);
}