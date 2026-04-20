#!/usr/bin/env node
/**
 * Codemod: rewrite every `server.tool("Name", ...)` registration to use
 * `binance_<domain>_<action>` snake_case naming.
 *
 * Author: Mr.Roblox (sankyago)
 */
import { readFileSync, writeFileSync } from "node:fs";
import { resolve, relative, sep } from "node:path";
import { execSync } from "node:child_process";

const ROOT = resolve(new URL("..", import.meta.url).pathname);
const TOOLS_DIR = resolve(ROOT, "src/tools");

// Map directory-segment fingerprint → domain token (in priority order; first match wins).
const DOMAIN_RULES = [
    { match: ["binance-spot", "market-api"], token: "spot_market" },
    { match: ["binance-spot", "trade-api"], token: "spot_trade" },
    { match: ["binance-spot", "account-api"], token: "spot_account" },
    { match: ["binance-spot", "general-api"], token: "spot_general" },
    { match: ["binance-wallet", "account-api"], token: "wallet_account" },
    { match: ["binance-wallet", "asset-api"], token: "wallet_asset" },
    { match: ["binance-wallet", "capital-api"], token: "wallet_capital" },
    { match: ["binance-wallet", "travel-rule-api"], token: "wallet_travel_rule" },
    { match: ["binance-wallet", "others-api"], token: "wallet_others" },
    { match: ["binance-staking", "ETH-staking-api"], token: "staking_eth" },
    { match: ["binance-staking", "SOL-staking-api"], token: "staking_sol" },
    { match: ["binance-algo", "spot-algo"], token: "algo_spot" },
    { match: ["binance-algo", "future-algo"], token: "algo_future" },
    { match: ["binance-convert", "trade-api"], token: "convert_trade" },
    { match: ["binance-convert", "market-data-api"], token: "convert_market" },
    { match: ["binance-vip-loan", "trade-api"], token: "vip_loan_trade" },
    { match: ["binance-vip-loan", "market-api"], token: "vip_loan_market" },
    { match: ["binance-vip-loan", "userInformation-api"], token: "vip_loan_user" },
    { match: ["binance-dual-investment", "trade-api"], token: "dual_investment_trade" },
    { match: ["binance-dual-investment", "market-api"], token: "dual_investment_market" },
    { match: ["binance-mining", "mining-api"], token: "mining" },
    { match: ["binance-simple-earn", "earn-api"], token: "simple_earn" },
    { match: ["binance-simple-earn", "account-api"], token: "simple_earn_account" },
    { match: ["binance-copy-trading", "FutureCopyTrading-api"], token: "copy_trading_future" },
    { match: ["binance-c2c", "C2C"], token: "c2c" },
    { match: ["binance-fiat", "fiat-api"], token: "fiat" },
    { match: ["binance-nft", "nft-api"], token: "nft" },
    { match: ["binance-pay", "pay-api"], token: "pay" },
    { match: ["binance-rebate", "rebate-api"], token: "rebate" },
];

// Strip these prefixes from the action segment (case-insensitive, longest first).
const STRIP_PREFIXES = [
    "registerBinance",
    "register",
    "BinanceWalletGet",
    "BinanceWallet",
    "BinanceConvertGet",
    "BinanceConvert",
    "BinanceSpotGet",
    "BinanceSpot",
    "BinanceFutureGet",
    "BinanceFuture",
    "BinanceMining",
    "BinanceCopyTrading",
    "BinanceC2C",
    "BinanceFiat",
    "BinanceNFT",
    "BinancePay",
    "BinanceRebate",
    "BinanceDualInvestment",
    "BinanceSimpleEarn",
    "BinanceVipLoan",
    "BinanceStaking",
    "BinanceVolume",
    "BinanceTime",
    "BinanceCheck",
    "BinanceClaim",
    "BinanceCancel",
    "BinanceSubscribe",
    "BinanceRedeem",
    "BinanceWrap",
    "BinanceExtra",
    "BinanceHashRate",
    "BinanceAcquiring",
    "BinanceRequestFor",
    "BinanceGet",
    "Binance",
    "get",
];

function camelToSnake(input) {
    return input
        // insert _ between lower→Upper
        .replace(/([a-z0-9])([A-Z])/g, "$1_$2")
        // insert _ between Upper→UpperLower (handles "TWAPOrder" → "TWAP_Order")
        .replace(/([A-Z]+)([A-Z][a-z])/g, "$1_$2")
        .toLowerCase();
}

function detectDomain(filePath) {
    const segments = relative(TOOLS_DIR, filePath).split(sep);
    for (const rule of DOMAIN_RULES) {
        if (rule.match.every((m) => segments.includes(m))) return rule.token;
    }
    return null;
}

function stripPrefixes(name) {
    let work = name;
    let changed = true;
    while (changed) {
        changed = false;
        for (const prefix of STRIP_PREFIXES) {
            if (work.length > prefix.length && work.startsWith(prefix)) {
                work = work.slice(prefix.length);
                changed = true;
                break;
            }
        }
    }
    return work || name;
}

function buildSnakeName(domain, originalToolName) {
    const stripped = stripPrefixes(originalToolName);
    const action = camelToSnake(stripped).replace(/^_+|_+$/g, "").replace(/_+/g, "_");
    return `binance_${domain}_${action}`;
}

function listToolFiles() {
    const out = execSync(`find "${TOOLS_DIR}" -type f -name '*.ts'`, { encoding: "utf8" });
    return out.trim().split("\n").filter(Boolean);
}

const SERVER_TOOL_RE = /server\.tool\(\s*"([^"]+)"/m;

let renamed = 0;
let skipped = 0;
const renames = [];

for (const file of listToolFiles()) {
    const src = readFileSync(file, "utf8");
    const m = src.match(SERVER_TOOL_RE);
    if (!m) continue;
    const original = m[1];
    const domain = detectDomain(file);
    if (!domain) {
        console.error(`SKIP (no domain match): ${file}`);
        skipped++;
        continue;
    }
    const next = buildSnakeName(domain, original);
    if (next === original) continue;
    const updated = src.replace(SERVER_TOOL_RE, (full) => full.replace(`"${original}"`, `"${next}"`));
    writeFileSync(file, updated);
    renames.push({ file: relative(ROOT, file), from: original, to: next });
    renamed++;
}

console.log(`Renamed ${renamed} tool(s). Skipped ${skipped}.`);
for (const r of renames) {
    console.log(`  ${r.from}  ->  ${r.to}    (${r.file})`);
}
