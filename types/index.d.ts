import type { ESLint, Linter } from "eslint"

export declare const configs: { recommended: Linter.FlatConfig }

export declare const rules: NonNullable<ESLint.Plugin["rules"]>

export declare const utils: { patch: (ruleId?: string) => void }