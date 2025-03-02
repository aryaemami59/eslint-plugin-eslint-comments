/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * See LICENSE file in root directory for full license.
 */
import { Linter, RuleTester } from "eslint"
import * as semver from "semver"
import rule from "../../../lib/rules/no-duplicate-disable.ts"
const tester = new RuleTester()

tester.run("no-duplicate-disable", rule, {
    valid: [
        `
//eslint-disable-line
`,
        `
/*eslint-disable-line*/
`,
        `
/*eslint-disable no-undef*/
//eslint-disable-line no-unused-vars
//eslint-disable-next-line semi
/*eslint-disable eqeqeq*/
`,
        `
/*eslint-disable no-undef*/
/*eslint-disable-line no-unused-vars*/
/*eslint-disable-next-line semi*/
/*eslint-disable eqeqeq*/
`,
    ],
    invalid: [
        {
            code: `
/*eslint-disable no-undef*/
//eslint-disable-line no-undef
`,
            errors: [
                {
                    message: "'no-undef' rule has been disabled already.",
                    line: 3,
                    column: 23,
                    endLine: 3,
                    endColumn: 31,
                },
            ],
        },
        {
            code: `
/*eslint-disable no-undef*/
/*eslint-disable-line no-undef*/
`,
            errors: [
                {
                    message: "'no-undef' rule has been disabled already.",
                    line: 3,
                    column: 23,
                    endLine: 3,
                    endColumn: 31,
                },
            ],
        },
        {
            code: `
/*eslint-disable no-undef*/
//eslint-disable-next-line no-undef
`,
            errors: [
                {
                    message: "'no-undef' rule has been disabled already.",
                    line: 3,
                    column: 28,
                    endLine: 3,
                    endColumn: 36,
                },
            ],
        },
        {
            code: `
/*eslint-disable no-undef*/
/*eslint-disable-next-line no-undef*/
`,
            errors: [
                {
                    message: "'no-undef' rule has been disabled already.",
                    line: 3,
                    column: 28,
                    endLine: 3,
                    endColumn: 36,
                },
            ],
        },
        {
            code: `
//eslint-disable-next-line no-undef
//eslint-disable-line no-undef
`,
            errors: [
                {
                    message: "'no-undef' rule has been disabled already.",
                    line: 3,
                    column: 23,
                    endLine: 3,
                    endColumn: 31,
                },
            ],
        },
        {
            code: `
/*eslint-disable-next-line no-undef*/
/*eslint-disable-line no-undef*/
`,
            errors: [
                {
                    message: "'no-undef' rule has been disabled already.",
                    line: 3,
                    column: 23,
                    endLine: 3,
                    endColumn: 31,
                },
            ],
        },
        // -- description
        ...(semver.satisfies(Linter.version, ">=7.0.0")
            ? [
                  {
                      code: `
// eslint-disable-next-line no-undef -- description
// eslint-disable-line no-undef -- description
`,
                      errors: [
                          {
                              message:
                                  "'no-undef' rule has been disabled already.",
                              line: 3,
                              column: 24,
                              endLine: 3,
                              endColumn: 32,
                          },
                      ],
                  },
              ]
            : []),
    ],
})
