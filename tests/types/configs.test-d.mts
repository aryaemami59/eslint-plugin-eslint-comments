import * as configs from "@eslint-community/eslint-plugin-eslint-comments/configs";
import type { Linter } from "eslint" with { "resolution-mode": "import" };
import { defineConfig } from "eslint-v9/config";
import { expectTypeOf } from "expect-type";

expectTypeOf(configs)
  .toHaveProperty("recommended")
  .toExtend<Linter.FlatConfig>()

expectTypeOf([configs.recommended]).toExtend<Linter.FlatConfig[]>()

expectTypeOf(configs.recommended).toExtend<Linter.FlatConfig>()

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
