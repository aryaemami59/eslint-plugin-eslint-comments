import type { RulesConfig } from "@eslint/core"
import type { Linter } from "eslint"

export const plugins = ["@eslint-community/eslint-comments"]

export const rules = {
    "@eslint-community/eslint-comments/disable-enable-pair": "error",
    "@eslint-community/eslint-comments/no-aggregating-enable": "error",
    "@eslint-community/eslint-comments/no-duplicate-disable": "error",
    "@eslint-community/eslint-comments/no-unlimited-disable": "error",
    "@eslint-community/eslint-comments/no-unused-enable": "error",
} as const satisfies Linter.RulesRecord satisfies RulesConfig
