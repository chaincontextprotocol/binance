#!/usr/bin/env node
/**
 * Codemod: rewrite every tool's catch block to use the shared `fail()` helper.
 * Conservative — only touches files matching the canonical pattern produced by
 * the original generator. Skips anything that diverges.
 *
 * Author: Mr.Roblox (sankyago)
 */
import { readFileSync, writeFileSync } from "node:fs";
import { resolve, relative, dirname } from "node:path";
import { execSync } from "node:child_process";

const ROOT = resolve(new URL("..", import.meta.url).pathname);
const TOOLS_DIR = resolve(ROOT, "src/tools");

function listToolFiles() {
    return execSync(`find "${TOOLS_DIR}" -type f -name '*.ts' ! -name 'index.ts'`, {
        encoding: "utf8",
    }).trim().split("\n").filter(Boolean);
}

function relImportToHelper(filePath) {
    const fileDir = dirname(filePath);
    const helper = resolve(ROOT, "src/utils/toolResponse.js");
    let rel = relative(fileDir, helper).replace(/\\/g, "/");
    if (!rel.startsWith(".")) rel = "./" + rel;
    return rel;
}

// Match common catch patterns used across the codebase. We rewrite the catch
// body wholesale to `return fail("<context>", error);` and remove the now-unused
// errorMessage local.
const CATCH_PATTERNS = [
    /} catch \(error\) \{\s*const errorMessage = error instanceof Error \? error\.message : String\(error\);\s*return \{\s*content: \[\s*\{[^}]*type: "text",\s*text: `([^`]+?): \$\{errorMessage\}`\s*\}\s*\],\s*isError: true\s*\};\s*\}/g,
    /} catch \(error\) \{\s*const errorMessage = error instanceof Error \? error\.message : String\(error\);\s*return \{\s*content: \[\s*\{ type: "text", text: `([^`]+?): \$\{errorMessage\}` \}\s*\],\s*isError: true,?\s*\};\s*\}/g,
    /} catch \(error\) \{\s*const errorMessage = error instanceof Error \? error\.message : String\(error\);\s*return \{\s*content: \[\s*\{\s*type: "text",\s*text: `([^`]+?)\. \$\{errorMessage\}`\s*\}\s*\],\s*isError: true\s*\};\s*\}/g,
];

let touched = 0;
let skipped = 0;
const skipReasons = [];

for (const file of listToolFiles()) {
    let src = readFileSync(file, "utf8");
    if (!src.includes("server.tool(")) continue;
    if (src.includes("} from \"../../../utils/toolResponse.js\"") || src.includes("toolResponse.js\"")) continue;

    let next = src;
    let replaced = false;
    for (const pat of CATCH_PATTERNS) {
        next = next.replace(pat, (_match, context) => {
            replaced = true;
            return `} catch (error) {\n                return fail(${JSON.stringify(context.trim())}, error);\n            }`;
        });
    }

    if (!replaced) {
        skipped++;
        skipReasons.push(relative(ROOT, file));
        continue;
    }

    // Add the import. Place it after the last existing import line.
    const importPath = relImportToHelper(file);
    const importLine = `import { fail } from "${importPath}";`;
    const importBlock = next.match(/(?:^import .+;\n)+/m);
    if (importBlock) {
        next = next.replace(importBlock[0], importBlock[0] + importLine + "\n");
    } else {
        next = importLine + "\n" + next;
    }

    writeFileSync(file, next);
    touched++;
}

console.log(`Adopted helper in ${touched} file(s). Skipped ${skipped} (no canonical catch).`);
if (skipped > 0 && skipped <= 30) {
    for (const r of skipReasons) console.log("  skip: " + r);
}
