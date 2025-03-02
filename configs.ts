import type { Linter } from "eslint"
import { rules as rulesRecommended } from "./lib/configs/recommended.ts"
import { rules } from "./lib/rules.ts"
import packageJson from "./package.json"

const { name, version } = packageJson

const plugin = {
  meta: { name, version },
  rules,
}

export const recommended: Linter.FlatConfig = {
  name: "@eslint-community/eslint-comments/recommended",
  plugins: {
    "@eslint-community/eslint-comments": plugin,
  },
  rules: rulesRecommended,
}
