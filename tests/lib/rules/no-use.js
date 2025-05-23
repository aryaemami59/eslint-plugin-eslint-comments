/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * See LICENSE file in root directory for full license.
 */
"use strict"

const semver = require("semver")
const { Linter, RuleTester } = require("eslint")
const rule = require("../../../lib/rules/no-use")
const tester = new RuleTester()

tester.run("no-use", rule, {
    valid: [
        "// eslint foo",
        "// eslint-disable",
        "// eslint-enable",
        "// exported",
        "// global",
        "// globals",
        "// eslint-env",
        "/* just eslint in a normal comment */",
        {
            code: "/* eslint */",
            options: [{ allow: ["eslint"] }],
        },
        {
            code: "/* eslint-env */",
            options: [{ allow: ["eslint-env"] }],
        },
        {
            code: "/* eslint-enable */",
            options: [{ allow: ["eslint-enable"] }],
        },
        {
            code: "/* eslint-disable */",
            options: [{ allow: ["eslint-disable"] }],
        },
        {
            code: "// eslint-disable-line",
            options: [{ allow: ["eslint-disable-line"] }],
        },
        {
            code: "// eslint-disable-next-line",
            options: [{ allow: ["eslint-disable-next-line"] }],
        },
        {
            code: "/* eslint-disable-line */",
            options: [{ allow: ["eslint-disable-line"] }],
        },
        {
            code: "/* eslint-disable-next-line */",
            options: [{ allow: ["eslint-disable-next-line"] }],
        },
        {
            code: "/* exported */",
            options: [{ allow: ["exported"] }],
        },
        {
            code: "/* global */",
            options: [{ allow: ["global"] }],
        },
        {
            code: "/* globals */",
            options: [{ allow: ["globals"] }],
        },
        // Language plugin
        ...(semver.satisfies(Linter.version, ">=9.6.0")
            ? [
                  {
                      code: "/* eslint-disable */ a {}",
                      options: [{ allow: ["eslint-disable"] }],
                      plugins: {
                          css: require("@eslint/css").default,
                      },
                      language: "css/css",
                  },
              ]
            : []),
    ],
    invalid: [
        {
            code: "/* eslint */",
            errors: ["Unexpected ESLint directive comment."],
        },
        {
            code: "/* eslint-env */",
            errors: ["Unexpected ESLint directive comment."],
        },
        {
            code: "/* eslint-enable */",
            errors: ["Unexpected ESLint directive comment."],
        },
        {
            code: "/* eslint-disable */",
            errors: ["Unexpected ESLint directive comment."],
        },
        {
            code: "// eslint-disable-line",
            errors: ["Unexpected ESLint directive comment."],
        },
        {
            code: "// eslint-disable-next-line",
            errors: ["Unexpected ESLint directive comment."],
        },
        {
            code: "/* eslint-disable-line */",
            errors: ["Unexpected ESLint directive comment."],
        },
        {
            code: "/* eslint-disable-next-line */",
            errors: ["Unexpected ESLint directive comment."],
        },
        {
            code: "/* exported */",
            errors: ["Unexpected ESLint directive comment."],
        },
        {
            code: "/* global */",
            errors: ["Unexpected ESLint directive comment."],
        },
        {
            code: "/* globals */",
            errors: ["Unexpected ESLint directive comment."],
        },
        // Language plugin
        ...(semver.satisfies(Linter.version, ">=9.6.0")
            ? [
                  {
                      code: "/* eslint-disable */ a {}",
                      plugins: {
                          css: require("@eslint/css").default,
                      },
                      language: "css/css",
                      errors: ["Unexpected ESLint directive comment."],
                  },
              ]
            : []),
    ],
})
