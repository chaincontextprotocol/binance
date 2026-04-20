#!/usr/bin/env node
/**
 * Second-pass fixups for over-stripped or awkwardly split tool names.
 *
 * Author: Mr.Roblox (sankyago)
 */
import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { execSync } from "node:child_process";

const ROOT = resolve(new URL("..", import.meta.url).pathname);
const TOOLS_DIR = resolve(ROOT, "src/tools");

// Exact rename map: old -> new
const FIXES = {
    // Stripped verbs that need restoring
    "binance_staking_eth_beth": "binance_staking_eth_wrap_beth",
    "binance_staking_eth_eth": "binance_staking_eth_redeem_eth",
    "binance_staking_eth_eth_staking": "binance_staking_eth_subscribe_eth_staking",
    "binance_staking_sol_sol_staking": "binance_staking_sol_subscribe_sol_staking",
    "binance_staking_sol_boost_rewards": "binance_staking_sol_claim_boost_rewards",
    "binance_dual_investment_trade_dual_investment_products": "binance_dual_investment_trade_subscribe_products",
    "binance_dual_investment_trade_dual_investment_accounts": "binance_dual_investment_trade_check_accounts",
    "binance_dual_investment_trade_dual_investment_positions": "binance_dual_investment_trade_positions",
    "binance_dual_investment_market_dual_investment_product_list": "binance_dual_investment_market_product_list",
    "binance_vip_loan_user_vip_loan_collateral_account": "binance_vip_loan_user_check_collateral_account",
    "binance_vip_loan_user_vip_loan_ongoing_orders": "binance_vip_loan_user_ongoing_orders",
    // c2c double underscore split
    "binance_c2c_c2_c_trade_history": "binance_c2c_trade_history",
    // Pay history doubled
    "binance_pay_pay_trade_history": "binance_pay_trade_history",
    // Mining HashRate split
    "binance_mining_resale_detail": "binance_mining_hashrate_resale_detail",
    "binance_mining_resale_list": "binance_mining_hashrate_resale_list",
    "binance_mining_resale_request": "binance_mining_hashrate_resale_request",
    "binance_mining_hash_rate_resale_configuration": "binance_mining_cancel_hashrate_resale_configuration",
    "binance_mining_algorithm": "binance_mining_acquiring_algorithm",
    "binance_mining_coin_name": "binance_mining_acquiring_coin_name",
    "binance_mining_miner_list": "binance_mining_request_for_miner_list",
    "binance_mining_detail_miner_list": "binance_mining_request_for_detail_miner_list",
    // Wallet doubled "account"/"asset"
    "binance_spot_account_account": "binance_spot_account_info",
    "binance_spot_account_account_commission": "binance_spot_account_commission",
    "binance_wallet_account_account_info": "binance_wallet_account_info",
    "binance_wallet_account_account_status": "binance_wallet_account_status",
    "binance_wallet_account_account_api_trading_status": "binance_wallet_account_api_trading_status",
    "binance_wallet_account_daily_account_snapshot": "binance_wallet_account_daily_snapshot",
    "binance_wallet_asset_asset_detail": "binance_wallet_asset_detail",
    "binance_wallet_asset_asset_dividend_record": "binance_wallet_asset_dividend_record",
    "binance_wallet_asset_user_asset": "binance_wallet_asset_user",
    // Travel rule doubled
    "binance_wallet_travel_rule_deposit_history_travel_rule": "binance_wallet_travel_rule_deposit_history",
    "binance_wallet_travel_rule_submit_deposit_questionnaire_travel_rule": "binance_wallet_travel_rule_submit_deposit_questionnaire_v2",
    "binance_wallet_travel_rule_withdraw_travel_rule": "binance_wallet_travel_rule_withdraw",
    // Spot market 24hr formatting
    "binance_spot_market_ticker24hr": "binance_spot_market_ticker_24hr",
    // Convert duplicated "convert"
    "binance_convert_trade_convert_trade_history": "binance_convert_trade_history",
    // ETH staking doubled
    "binance_staking_eth_eth_staking_account": "binance_staking_eth_staking_account",
    "binance_staking_eth_eth_redemption_history": "binance_staking_eth_redemption_history",
    "binance_staking_eth_current_eth_staking_quota": "binance_staking_eth_current_staking_quota",
    "binance_staking_eth_get_eth_staking_history": "binance_staking_eth_history",
    // SOL staking doubled
    "binance_staking_sol_sol_staking_account": "binance_staking_sol_staking_account",
    "binance_staking_sol_sol_staking_history": "binance_staking_sol_history",
    "binance_staking_sol_sol_redemption_history": "binance_staking_sol_redemption_history",
    "binance_staking_sol_sol_staking_quota_details": "binance_staking_sol_staking_quota_details",
    "binance_staking_sol_get_bnsol_rate_history": "binance_staking_sol_bnsol_rate_history",
    "binance_staking_sol_redeem_sol": "binance_staking_sol_redeem",
    // Algo TWAP / VP normalization
    "binance_algo_future_weighted_average_price_new_order": "binance_algo_future_twap_new_order",
    "binance_algo_future_participation_new_trade": "binance_algo_future_volume_participation_new_order",
    "binance_algo_spot_time_weighted_average_price_new_order": "binance_algo_spot_twap_new_order",
    "binance_algo_spot_cancel_open_twap_order": "binance_algo_spot_cancel_twap_order",
    // Fiat doubled
    "binance_fiat_fiat_payments_history": "binance_fiat_payments_history",
    "binance_fiat_fiat_deposit_withdraw_history": "binance_fiat_deposit_withdraw_history",
    // NFT doubled
    "binance_nft_nft_asset": "binance_nft_asset",
    "binance_nft_nft_deposit_history": "binance_nft_deposit_history",
    "binance_nft_nft_withdraw_history": "binance_nft_withdraw_history",
    "binance_nft_nft_transaction_history": "binance_nft_transaction_history",
    // Copy trading doubled
    "binance_copy_trading_future_futures_lead_trading_symbol_whitelist": "binance_copy_trading_future_lead_trading_symbol_whitelist",
    "binance_copy_trading_future_futures_lead_trader_status": "binance_copy_trading_future_lead_trader_status",
    // Vip loan
    "binance_vip_loan_user_query_application_status": "binance_vip_loan_user_application_status",
    // Rebate
    "binance_rebate_spot_rebate_history_records": "binance_rebate_history_records",
    // Simple earn account doubled
    "binance_simple_earn_account_flexible_product_position": "binance_simple_earn_flexible_product_position",
    "binance_simple_earn_account_flexible_product_list": "binance_simple_earn_flexible_product_list",
    // Wallet asset / capital long names
    "binance_wallet_asset_assets_that_can_be_converted_into_bnb": "binance_wallet_asset_convertible_to_bnb",
    "binance_wallet_asset_toggle_bnb_burn_on_spot_trade_and_margin_interest": "binance_wallet_asset_toggle_bnb_burn",
    "binance_wallet_asset_query_user_universal_transfer_history": "binance_wallet_asset_universal_transfer_history",
    "binance_wallet_asset_query_user_delegation_history": "binance_wallet_asset_delegation_history",
    "binance_wallet_asset_user_universal_transfer": "binance_wallet_asset_universal_transfer",
    "binance_wallet_asset_query_user_wallet_balance": "binance_wallet_asset_balance",
    "binance_wallet_asset_cloud_mining_payment_and_refund_history": "binance_wallet_asset_cloud_mining_history",
    "binance_wallet_capital_fetch_deposit_address_list_with_network": "binance_wallet_capital_deposit_address_list",
    "binance_wallet_capital_fetch_withdraw_address_list": "binance_wallet_capital_withdraw_address_list",
    "binance_wallet_capital_one_click_arrival_deposit_apply": "binance_wallet_capital_one_click_arrival_deposit",
    "binance_wallet_others_symbols_delist_schedule_for_spot": "binance_wallet_others_symbols_delist_schedule",
    // Spot trade
    "binance_spot_trade_delete_open_orders": "binance_spot_trade_cancel_open_orders",
    "binance_spot_trade_delete_order": "binance_spot_trade_cancel_order",
    // Spot account
    "binance_spot_account_my_trades": "binance_spot_account_trades",
    "binance_spot_account_my_allocations": "binance_spot_account_allocations",
    "binance_spot_account_my_prevented_matches": "binance_spot_account_prevented_matches",
};

function listToolFiles() {
    const out = execSync(`find "${TOOLS_DIR}" -type f -name '*.ts'`, { encoding: "utf8" });
    return out.trim().split("\n").filter(Boolean);
}

let touched = 0;
for (const file of listToolFiles()) {
    let src = readFileSync(file, "utf8");
    let changed = false;
    for (const [from, to] of Object.entries(FIXES)) {
        const needle = `"${from}"`;
        if (src.includes(needle)) {
            src = src.split(needle).join(`"${to}"`);
            changed = true;
        }
    }
    if (changed) {
        writeFileSync(file, src);
        touched++;
    }
}
console.log(`Patched ${touched} file(s).`);

// Re-check for duplicates
const dupOut = execSync(
    `grep -rh 'server.tool(' "${TOOLS_DIR}" -A 1 | grep -oE '"binance_[a-z0-9_]+"' | sort | uniq -c | sort -rn | awk '$1 > 1'`,
    { encoding: "utf8" }
).trim();
if (dupOut) {
    console.error("DUPLICATES still present:");
    console.error(dupOut);
    process.exit(1);
}
console.log("No duplicate tool names. ✅");
