/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * See LICENSE file in root directory for full license.
 */
import type { Rule } from "eslint"
// Patch `Linter#verify` to work.
import patch from "../utils/patch.ts"
patch()

const rule: Rule.RuleModule = {
    meta: {
        docs: {
            description: "disallow unused `eslint-disable` comments",
            category: "Best Practices",
            recommended: false,
            url: "https://eslint-community.github.io/eslint-plugin-eslint-comments/rules/no-unused-disable.html",
        },
        fixable: null as any,
        // eslint-disable-next-line @eslint-community/mysticatea/eslint-plugin/prefer-message-ids
        messages: {},
        schema: [],
        type: "problem",
    },

    create() {
        // This rule patches `Linter#verify` method and:
        //
        // 1. enables `reportUnusedDisableDirectives` option.
        // 2. verifies the code.
        // 3. converts `reportUnusedDisableDirectives` errors to `no-unused-disable` errors.
        //
        // So this rule itself does nothing.
        return {}
    },
}

export default rule
