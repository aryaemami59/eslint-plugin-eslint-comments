import type { ESLint, Linter } from "eslint"
import { rules as rulesRecommended } from "./lib/configs/recommended.ts"
import { rules } from "./lib/rules.ts"
import packageJson from "./package.json" with { type: "json" }

const { name, version } = packageJson

const plugin = {
  meta: { name, version },
  rules,
} as const satisfies ESLint.Plugin

export const recommended = {
  name: "@eslint-community/eslint-comments/recommended",
  plugins: {
    "@eslint-community/eslint-comments": plugin,
  },
  rules: rulesRecommended,
} as const satisfies Linter.FlatConfig
