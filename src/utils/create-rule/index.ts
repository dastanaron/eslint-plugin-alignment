import { ESLintUtils } from "@typescript-eslint/utils";

/**
 * Creates a new rule
 */
export const createRule = ESLintUtils.RuleCreator(
  (name) =>
    `https://github.com/zignis/eslint-plugin-alignment/blob/main/docs/rules/${name}.md`
);
