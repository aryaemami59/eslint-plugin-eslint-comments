import * as path from "node:path"
import { fileURLToPath } from "node:url"
import type { InlineConfig, UserConfig } from "tsdown"
import { defineConfig } from "tsdown"
import packageJson from "./package.json" with { type: "json" }

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const tsdownConfig = defineConfig((cliOptions) => {
  const commonOptions = {
    clean: false,
    cwd: __dirname,
    dts: {
      emitJs: false,
      newContext: true,
      oxc: false,
      resolver: "tsc",
      sourcemap: true,
    },
    minify: "dce-only",
    treeshake: {
      annotations: true,
      commonjs: true,
      moduleSideEffects: false,
    },
    failOnWarn: true,
    fixedExtension: false,
    format: ["es", "cjs"],
    hash: false,
    nodeProtocol: true,
    shims: true,
    sourcemap: true,
    outExtensions: ({ format }) => ({
      dts: format === "cjs" ? ".d.cts" : ".d.ts",
      js: format === "cjs" ? ".cjs" : ".js",
    }),
    platform: "node",
    target: ["esnext", "node20"],
    tsconfig: path.join(__dirname, "tsconfig.build.json"),
    ...cliOptions,
  } as const satisfies InlineConfig

  return [
    {
      ...commonOptions,
      entry: {
        index: "index.ts",
      },
      name: `${packageJson.name} Modern Dual Format`,
    },
    {
      ...commonOptions,
      entry: {
        configs: "configs.ts",
      },
      name: `${packageJson.name}/configs Modern Dual Format`,
    },
  ] as const satisfies UserConfig[]
})

export default tsdownConfig
