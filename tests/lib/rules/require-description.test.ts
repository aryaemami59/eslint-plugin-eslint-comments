/**
 * @author Yosuke Ota <https://github.com/ota-meshi>
 * See LICENSE file in root directory for full license.
 */
import { Linter, RuleTester } from "eslint"
import * as semver from "semver"
import rule from "../../../lib/rules/require-description.ts"
const tester = new RuleTester()

if (semver.satisfies(Linter.version, ">=7.0.0")) {
    // This rule can only be used with ESLint v7.x or later.
    tester.run("require-description", rule, {
        valid: [
            '/* eslint eqeqeq: "off", curly: "error" -- Here\'s a description about why this configuration is necessary. */',
            "/* eslint-disable -- description */",
            "/* eslint-enable -- description */",
            "/* exported -- description */",
            "/* global -- description */",
            "/* globals -- description */",
            "/* eslint-env -- description */",
            "/* just eslint in a normal comment */",
            "// eslint-disable-line -- description",
            "// eslint-disable-next-line -- description",
            "/* eslint-disable-line -- description */",
            "/* eslint-disable-next-line -- description */",
            "// eslint-disable-line eqeqeq -- description",
            "// eslint-disable-next-line eqeqeq -- description",
            {
                code: "/* eslint */",
                options: [{ ignore: ["eslint"] }],
            },
            {
                code: "/* eslint-env */",
                options: [{ ignore: ["eslint-env"] }],
            },
            {
                code: "/* eslint-enable */",
                options: [{ ignore: ["eslint-enable"] }],
            },
            {
                code: "/* eslint-disable */",
                options: [{ ignore: ["eslint-disable"] }],
            },
            {
                code: "// eslint-disable-line",
                options: [{ ignore: ["eslint-disable-line"] }],
            },
            {
                code: "// eslint-disable-next-line",
                options: [{ ignore: ["eslint-disable-next-line"] }],
            },
            {
                code: "/* eslint-disable-line */",
                options: [{ ignore: ["eslint-disable-line"] }],
            },
            {
                code: "/* eslint-disable-next-line */",
                options: [{ ignore: ["eslint-disable-next-line"] }],
            },
            {
                code: "/* exported */",
                options: [{ ignore: ["exported"] }],
            },
            {
                code: "/* global */",
                options: [{ ignore: ["global"] }],
            },
            {
                code: "/* globals */",
                options: [{ ignore: ["globals"] }],
            },
        ],
        invalid: [
            {
                code: "/* eslint */",
                errors: [
                    "Unexpected undescribed directive comment. Include descriptions to explain why the comment is necessary.",
                ],
            },
            {
                code: '/* eslint eqeqeq: "off", curly: "error" */',
                errors: [
                    "Unexpected undescribed directive comment. Include descriptions to explain why the comment is necessary.",
                ],
            },
            {
                code: "/* eslint-env */",
                errors: [
                    "Unexpected undescribed directive comment. Include descriptions to explain why the comment is necessary.",
                ],
            },
            {
                code: "/* eslint-env node */",
                errors: [
                    "Unexpected undescribed directive comment. Include descriptions to explain why the comment is necessary.",
                ],
            },
            {
                code: "/* eslint-enable */",
                errors: [
                    "Unexpected undescribed directive comment. Include descriptions to explain why the comment is necessary.",
                ],
            },
            {
                code: "/* eslint-enable eqeqeq */",
                errors: [
                    "Unexpected undescribed directive comment. Include descriptions to explain why the comment is necessary.",
                ],
            },
            {
                code: "/* eslint-disable */",
                errors: [
                    "Unexpected undescribed directive comment. Include descriptions to explain why the comment is necessary.",
                ],
            },
            {
                code: "/* eslint-disable eqeqeq */",
                errors: [
                    "Unexpected undescribed directive comment. Include descriptions to explain why the comment is necessary.",
                ],
            },
            {
                code: "// eslint-disable-line",
                errors: [
                    "Unexpected undescribed directive comment. Include descriptions to explain why the comment is necessary.",
                ],
            },
            {
                code: "// eslint-disable-line eqeqeq",
                errors: [
                    "Unexpected undescribed directive comment. Include descriptions to explain why the comment is necessary.",
                ],
            },
            {
                code: "// eslint-disable-next-line",
                errors: [
                    "Unexpected undescribed directive comment. Include descriptions to explain why the comment is necessary.",
                ],
            },
            {
                code: "// eslint-disable-next-line eqeqeq",
                errors: [
                    "Unexpected undescribed directive comment. Include descriptions to explain why the comment is necessary.",
                ],
            },
            {
                code: "/* eslint-disable-line */",
                errors: [
                    "Unexpected undescribed directive comment. Include descriptions to explain why the comment is necessary.",
                ],
            },
            {
                code: "/* eslint-disable-line eqeqeq */",
                errors: [
                    "Unexpected undescribed directive comment. Include descriptions to explain why the comment is necessary.",
                ],
            },
            {
                code: "/* eslint-disable-next-line */",
                errors: [
                    "Unexpected undescribed directive comment. Include descriptions to explain why the comment is necessary.",
                ],
            },
            {
                code: "/* eslint-disable-next-line eqeqeq */",
                errors: [
                    "Unexpected undescribed directive comment. Include descriptions to explain why the comment is necessary.",
                ],
            },
            {
                code: "/* exported */",
                errors: [
                    "Unexpected undescribed directive comment. Include descriptions to explain why the comment is necessary.",
                ],
            },
            {
                code: "/* global */",
                errors: [
                    "Unexpected undescribed directive comment. Include descriptions to explain why the comment is necessary.",
                ],
            },
            {
                code: "/* global _ */",
                errors: [
                    "Unexpected undescribed directive comment. Include descriptions to explain why the comment is necessary.",
                ],
            },
            {
                code: "/* globals */",
                errors: [
                    "Unexpected undescribed directive comment. Include descriptions to explain why the comment is necessary.",
                ],
            },
            {
                code: "/* globals _ */",
                errors: [
                    "Unexpected undescribed directive comment. Include descriptions to explain why the comment is necessary.",
                ],
            },
            // empty description
            {
                code: "/* eslint-disable-next-line eqeqeq -- */",
                errors: [
                    "Unexpected undescribed directive comment. Include descriptions to explain why the comment is necessary.",
                ],
            },
        ],
    })
}
