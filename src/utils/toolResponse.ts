/**
 * Shared response helpers for MCP tools.
 *
 * `ok(message, data?)` — success payload, stringifies `data` if provided.
 * `fail(context, error)` — surfaces Binance API error codes when present.
 *
 * Author: Mr.Roblox (sankyago)
 */

export interface McpToolResponse {
    [key: string]: unknown;
    content: Array<{ type: "text"; text: string; [key: string]: unknown }>;
    isError?: boolean;
}

export function ok(message: string, data?: unknown): McpToolResponse {
    const text = data === undefined
        ? message
        : `${message} ${JSON.stringify(data)}`;
    return { content: [{ type: "text", text }] };
}

export function fail(context: string, error: unknown): McpToolResponse {
    const detail = formatError(error);
    return {
        content: [{ type: "text", text: `${context}: ${detail}` }],
        isError: true,
    };
}

function formatError(error: unknown): string {
    if (error instanceof Error) {
        const maybeBinance = error as Error & {
            code?: number | string;
            response?: { data?: unknown; status?: number };
        };
        const parts: string[] = [error.message];
        if (maybeBinance.code !== undefined) parts.push(`code=${maybeBinance.code}`);
        if (maybeBinance.response?.status !== undefined) parts.push(`http=${maybeBinance.response.status}`);
        if (maybeBinance.response?.data !== undefined) {
            parts.push(`body=${JSON.stringify(maybeBinance.response.data)}`);
        }
        return parts.join(" | ");
    }
    return String(error);
}
