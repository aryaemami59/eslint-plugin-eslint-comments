import configs = require("@eslint-community/eslint-plugin-eslint-comments/configs")
import expectTypeModule = require("expect-type")
import eslintV9ConfigModule = require("eslint-v9/config")

import type { Linter } from "eslint" with { "resolution-mode": "require" };

import expectTypeOf = expectTypeModule.expectTypeOf
import defineConfig = eslintV9ConfigModule.defineConfig

expectTypeOf(configs)
  .toHaveProperty("recommended")
  .toExtend<Linter.FlatConfig>()

expectTypeOf([configs.recommended]).toExtend<Linter.FlatConfig[]>()

configs.recommended satisfies Linter.FlatConfig

expectTypeOf<typeof configs.recommended>().toExtend<Linter.FlatConfig>()

expectTypeOf(defineConfig).toBeCallableWith<
  Pick<
    typeof configs.recommended,
    | "rules"
    | "name"
  >[]
>()
