/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * See LICENSE file in root directory for full license.
 */
import escapeStringRegexp from "escape-string-regexp"
import type { AST, Linter } from "eslint"

const LINE_PATTERN = /[^\r\n\u2028\u2029]*(?:\r\n|[\r\n\u2028\u2029]|$)/gu

const DIRECTIVE_PATTERN =
    /^(eslint(?:-env|-enable|-disable(?:(?:-next)?-line)?)?|exported|globals?)(?:\s|$)/u
const LINE_COMMENT_PATTERN = /^eslint-disable-(next-)?line$/u

/**
 * Make the location ignoring `eslint-disable` comments.
 *
 * @param {object} location - The location to convert.
 * @returns {object} Converted location.
 */
export function toForceLocation(
    location: AST.SourceLocation,
): AST.SourceLocation {
    return {
        start: {
            line: location.start.line,
            column: -1,
        },
        end: location.end,
    }
}

/**
 * Calculate the location of the given rule in the given comment token.
 *
 * @param {Token} comment - The comment token to calculate.
 * @param {string|null} ruleId - The rule name to calculate.
 * @returns {object} The location of the given information.
 */
export function toRuleIdLocation(
    comment: AST.Program["comments"][number],
    ruleId: string | null | undefined,
): AST.SourceLocation | null | undefined {
    if (ruleId == null) {
        return toForceLocation(comment.loc!)
    }

    const lines = comment.value.match(LINE_PATTERN)!
    //eslint-disable-next-line require-unicode-regexp
    const ruleIdPattern = new RegExp(
        `([\\s,]|^)${escapeStringRegexp(ruleId)}(?:[\\s,]|$)`,
    )

    {
        const m = ruleIdPattern.exec(lines[0])
        if (m != null) {
            const start = comment.loc!.start
            return {
                start: {
                    line: start.line,
                    column: 2 + start.column + m.index + m[1].length,
                },
                end: {
                    line: start.line,
                    column:
                        2 +
                        start.column +
                        m.index +
                        m[1].length +
                        ruleId.length,
                },
            }
        }
    }

    for (let i = 1; i < lines.length; ++i) {
        const m = ruleIdPattern.exec(lines[i])
        if (m != null) {
            const start = comment.loc!.start
            return {
                start: {
                    line: start.line + i,
                    column: m.index + m[1].length,
                },
                end: {
                    line: start.line + i,
                    column: m.index + m[1].length + ruleId.length,
                },
            }
        }
    }

    /*istanbul ignore next : foolproof */
    return comment.loc
}

/**
 * Checks `a` is less than `b` or `a` equals `b`.
 *
 * @param {{line: number, column: number}} a - A location to compare.
 * @param {{line: number, column: number}} b - Another location to compare.
 * @returns {boolean} `true` if `a` is less than `b` or `a` equals `b`.
 */
export function lte(
    a: Pick<Linter.LintMessage, "column" | "line">,
    b: Pick<Linter.LintMessage, "column" | "line">,
): boolean {
    return a.line < b.line || (a.line === b.line && a.column <= b.column)
}

/**
 * Parse the given comment token as a directive comment.
 *
 * @param {Token} comment - The comment token to parse.
 * @returns {{kind: string, value: string, description: string | null}|null} The parsed data of the given comment. If `null`, it is not a directive comment.
 */
export function parseDirectiveComment(
    comment: AST.Program["comments"][number],
): { kind: string; value: string; description: string | null } | null {
    const { text, description } = divideDirectiveComment(comment.value)
    const match = DIRECTIVE_PATTERN.exec(text)

    if (!match) {
        return null
    }
    const directiveText = match[1]
    const lineCommentSupported = LINE_COMMENT_PATTERN.test(directiveText)

    if (comment.type === "Line" && !lineCommentSupported) {
        return null
    }

    if (
        lineCommentSupported &&
        comment.loc?.start.line !== comment.loc?.end.line
    ) {
        // disable-line comment should not span multiple lines.
        return null
    }

    const directiveValue = text.slice(match.index + directiveText.length)

    return {
        kind: directiveText,
        value: directiveValue.trim(),
        description,
    }
}

/**
 * Divides and trims description text and directive comments.
 * @param {string} value The comment text to strip.
 * @returns {{text: string, description: string | null}} The stripped text.
 */
function divideDirectiveComment(value: string): {
    text: string
    description: string | null
} {
    const divided = value.split(/\s-{2,}\s/u)
    const text = divided[0].trim()
    return {
        text,
        description: divided.length > 1 ? divided[1].trim() : null,
    }
}
