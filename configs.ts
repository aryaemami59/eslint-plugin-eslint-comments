import type { ESLint, Linter, Rule } from "eslint"
import { rulesRecommended } from "./lib/configs/recommended.ts"
import { rules } from "./lib/rules.ts"
import packageJson from "./package.json" with { type: "json" };

const { name, version } = packageJson

const plugin: {
    meta: {
        name: string
        version: string
    }
    rules: {
        "disable-enable-pair": Rule.RuleModule
        "no-aggregating-enable": Rule.RuleModule
        "no-duplicate-disable": Rule.RuleModule
        "no-restricted-disable": Rule.RuleModule
        "no-unlimited": Rule.RuleModule
        "no-unused-disable": Rule.RuleModule
        "no-unused-enable": Rule.RuleModule
        "no-use": Rule.RuleModule
        "require-description": Rule.RuleModule
    }
} = {
    meta: { name, version },
    rules,
} as const satisfies ESLint.Plugin

export const recommended: {
    name: "@eslint-community/eslint-comments/recommended"
    plugins: {
        "@eslint-community/eslint-comments": {
            meta: {
                name: string
                version: string
            }
            rules: {
                "disable-enable-pair": Rule.RuleModule
                "no-aggregating-enable": Rule.RuleModule
                "no-duplicate-disable": Rule.RuleModule
                "no-restricted-disable": Rule.RuleModule
                "no-unlimited": Rule.RuleModule
                "no-unused-disable": Rule.RuleModule
                "no-unused-enable": Rule.RuleModule
                "no-use": Rule.RuleModule
                "require-description": Rule.RuleModule
            }
        }
    }
    rules: {
        "@eslint-community/eslint-comments/disable-enable-pair": "error"
        "@eslint-community/eslint-comments/no-aggregating-enable": "error"
        "@eslint-community/eslint-comments/no-duplicate-disable": "error"
        "@eslint-community/eslint-comments/no-unlimited-disable": "error"
        "@eslint-community/eslint-comments/no-unused-enable": "error"
    }
} = {
    name: "@eslint-community/eslint-comments/recommended",
    plugins: {
        "@eslint-community/eslint-comments": plugin,
    },
    rules: rulesRecommended,
} as const satisfies Linter.FlatConfig
