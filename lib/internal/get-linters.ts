/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * See LICENSE file in root directory for full license.
 */
import type { Linter } from "eslint"
import * as path from "node:path"
const needle = `${path.sep}node_modules${path.sep}eslint${path.sep}`

const getLinters = (): (typeof Linter)[] => {
    const eslintPaths = new Set(
        Object.keys(require.cache)
            .filter((id) => id.includes(needle))
            .map((id) => id.slice(0, id.indexOf(needle) + needle.length)),
    )
    const linters = []

    for (const eslintPath of eslintPaths) {
        try {
            // eslint-disable-next-line @eslint-community/mysticatea/node/global-require
            const linter: typeof Linter = require(eslintPath).Linter

            if (linter) {
                linters.push(linter)
            }
        } catch (error) {
            if ((error as any).code !== "MODULE_NOT_FOUND") {
                throw error
            }
        }
    }

    return linters
}

export default getLinters
