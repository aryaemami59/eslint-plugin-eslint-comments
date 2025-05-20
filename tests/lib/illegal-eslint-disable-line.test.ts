/**
 * Test that multi-line eslint-disable-line comments are not false positives.
 */

import spawn from "cross-spawn"
import type { Linter } from "eslint"
import * as assert from "node:assert"
import * as fs from "node:fs"
import * as path from "node:path"
import rimraf from "rimraf"

/**
 * Run eslint CLI command with a given source code.
 * @param {string} code The source code to lint.
 * @returns {Promise<Message[]>} The result message.
 */
function runESLint(code: string): Promise<Linter.LintMessage[]> {
    return new Promise((resolve, reject) => {
        const cp = spawn(
            "eslint",
            [
                "--stdin",
                "--stdin-filename",
                "test.js",
                "--no-eslintrc",
                "--plugin",
                "@eslint-community/eslint-comments",
                "--format",
                "json",
            ],
            {
                stdio: ["pipe", "pipe", "inherit"],
                // eslint-disable-next-line no-process-env, @eslint-community/mysticatea/node/no-process-env
                env: { ...process.env, ESLINT_USE_FLAT_CONFIG: "false" },
            },
        )
        const chunks: any[] = []
        let totalLength = 0

        cp.stdout?.on("data", (chunk) => {
            chunks.push(chunk)
            totalLength += chunk.length
        })
        cp.stdout?.on("end", () => {
            try {
                const resultsStr = String(Buffer.concat(chunks, totalLength))
                const results = JSON.parse(resultsStr)
                resolve(results[0].messages)
            } catch (error) {
                reject(error)
            }
        })
        cp.on("error", reject)

        cp.stdin?.end(code)
    })
}

describe("multi-line eslint-disable-line comments", () => {
    // Register this plugin.
    const selfPath = path.resolve(process.cwd())
    const pluginPath = path.resolve(
        process.cwd(),
        "node_modules/@eslint-community/eslint-plugin-eslint-comments",
    )
    before(() => {
        fs.mkdirSync(path.dirname(pluginPath), { recursive: true })
        if (fs.existsSync(pluginPath)) {
            rimraf.sync(pluginPath)
        }

        fs.symlinkSync(selfPath, pluginPath, "junction")
    })

    after(() => {
        rimraf.sync(pluginPath)
    })

    describe("`@eslint-community/eslint-comments/*` rules are valid", () => {
        for (const code of [
            `/* eslint @eslint-community/eslint-comments/no-use:[error, {allow: ['eslint']}] */
/* eslint-disable-line
*/`,
            `/* eslint @eslint-community/eslint-comments/no-duplicate-disable:error */
/*eslint-disable no-undef*/
/*eslint-disable-line
no-undef*/
`,
        ]) {
            it(code, () =>
                runESLint(code).then((messages) => {
                    assert.strictEqual(messages.length > 0, true)
                    const normalMessages = messages.filter(
                        (message) => message.ruleId != null,
                    )
                    assert.strictEqual(normalMessages.length, 0)
                }),
            )
        }
    })
})
