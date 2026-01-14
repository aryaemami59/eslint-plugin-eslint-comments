import type { Rule } from "eslint"
import disableEnablePair from "./rules/disable-enable-pair.ts"
import noAggregatingEnable from "./rules/no-aggregating-enable.ts"
import noDuplicateDisable from "./rules/no-duplicate-disable.ts"
import noRestrictedDisable from "./rules/no-restricted-disable.ts"
import noUnlimitedDisable from "./rules/no-unlimited-disable.ts"
import noUnusedDisable from "./rules/no-unused-disable.ts"
import noUnusedEnable from "./rules/no-unused-enable.ts"
import noUse from "./rules/no-use.ts"
import requireDescription from "./rules/require-description.ts"

export const rules = {
    "disable-enable-pair": disableEnablePair as Rule.RuleModule,
    "no-aggregating-enable": noAggregatingEnable as Rule.RuleModule,
    "no-duplicate-disable": noDuplicateDisable as Rule.RuleModule,
    "no-restricted-disable": noRestrictedDisable as Rule.RuleModule,
    "no-unlimited-disable": noUnlimitedDisable as Rule.RuleModule,
    "no-unused-disable": noUnusedDisable as Rule.RuleModule,
    "no-unused-enable": noUnusedEnable as Rule.RuleModule,
    "no-use": noUse as Rule.RuleModule,
    "require-description": requireDescription as Rule.RuleModule,
} satisfies Record<string, Rule.RuleModule>
