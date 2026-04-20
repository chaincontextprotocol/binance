// src/tools/binance-vip-loan/userInformation-api/index.ts
import { McpServer } from "../../../mcp.ts";
import { registerBinanceCheckVIPLoanCollateralAccount } from "./checkVIPLoanCollateralAccount.ts";
import { registerBinanceGetVIPLoanOngoingOrders } from "./getVIPLoanOngoingOrders.ts";
import { registerBinanceQueryApplicationStatus } from "./queryApplicationStatus.ts";

export function registerBinanceVipLoanUserInformationApiTools(server: McpServer) {
    registerBinanceCheckVIPLoanCollateralAccount(server);
    registerBinanceGetVIPLoanOngoingOrders(server);
    registerBinanceQueryApplicationStatus(server);
}
