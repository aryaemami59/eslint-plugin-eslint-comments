/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * See LICENSE file in root directory for full license.
 */
import type { Rule } from "eslint"
import { getDisabledArea } from "../internal/disabled-area.ts"
import * as utils from "../internal/utils.ts"

const disableEnablePair: Rule.RuleModule = {
    meta: {
        docs: {
            description:
                "require a `eslint-enable` comment for every `eslint-disable` comment",
            category: "Best Practices",
            recommended: true,
            url: "https://eslint-community.github.io/eslint-plugin-eslint-comments/rules/disable-enable-pair.html",
        },
        fixable: null as any,
        messages: {
            missingPair: "Requires 'eslint-enable' directive.",
            missingRulePair:
                "Requires 'eslint-enable' directive for '{{ruleId}}'.",
        },
        schema: [
            {
                type: "object",
                properties: {
                    allowWholeFile: {
                        type: "boolean",
                    },
                },
                additionalProperties: false,
            },
        ],
        type: "suggestion",
    },

    create(context) {
        const allowWholeFile: boolean =
            context.options[0] && context.options[0].allowWholeFile
        const disabledArea = getDisabledArea(context as any)

        const sourceCode = context.sourceCode || context.getSourceCode()

        const firstToken =
            sourceCode.ast && sourceCode.ast.tokens && sourceCode.ast.tokens[0]

        if (allowWholeFile && !firstToken) {
            return {}
        }

        for (const area of disabledArea.areas) {
            if (area.end != null) {
                continue
            }
            if (
                allowWholeFile &&
                utils.lte(
                    area.start,
                    utils.getLoc(context as any, firstToken).start,
                )
            ) {
                continue
            }

            context.report({
                loc: utils.toRuleIdLocation(
                    context as any,
                    area.comment,
                    area.ruleId,
                )!,
                messageId: area.ruleId ? "missingRulePair" : "missingPair",
                data: area as Record<string, any>,
            })
        }

        return {}
    },
} as const satisfies Rule.RuleModule

export default disableEnablePair
