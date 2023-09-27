module.exports = {
  root /*         */: true,
  env /*          */: {
    node: true,
  },
  parser /*       */: "@typescript-eslint/parser",
  plugins /*      */: ["@typescript-eslint", "prefer-snakecase"],
  extends /*      */: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:prefer-snakecase/recommended",
  ],
  /* eslint-disable prefer-snakecase/prefer-snakecase */
  parserOptions /**/: {
    ecmaVersion /**/: 12,
    sourceType /* */: "module",
  },
  /* eslint-disable prefer-snakecase/prefer-snakecase */
};
