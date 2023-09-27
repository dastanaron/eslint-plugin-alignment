import { RuleTester } from "eslint";
import { align_objects } from "./align-objects";

const tester = new RuleTester({
  parser: require.resolve("@typescript-eslint/parser"),
  /* eslint-disable prefer-snakecase/prefer-snakecase */
  parserOptions: {
    ecmaVersion: 6,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
  /* eslint-enable prefer-snakecase/prefer-snakecase */
});

tester.run("align_objects", align_objects, {
  valid: [
    {
      name: "normal keys",
      code: `
        const obj = {
          one: 1,
          two: 2
        };
      `,
    },
    {
      name: "spread syntax",
      code: `
        const obj = {
          one: 1,
          ...other_obj
        };
      `,
    },
    {
      name: "shorthand key",
      code: `
        const obj = {
          one: 1,
          other_key
        };
      `,
    },
    {
      name: "call expression",
      code: `
        doSomething({
          some_key: true,
          other_key: false
        })
      `,
      // eslint-disable-next-line prefer-snakecase/prefer-snakecase
      options: ["always", { ignoreParentTypes: ["CallExpression"] }],
    },
  ],
  invalid: [
    {
      name: "mixed keys",
      code: `
        const obj = {
          some_key: 1,
          other_key: 2,
          key_with_boolean_value: true,
          key_with_string_literal_value: "foo",
          key_with_constructor: String,
          key_with_function_expression() {},
          key_with_arrow_function_expression: () => {},
          ["computed_key"]: true,
          empty_object: {}
        };
      `,
      output: `
        const obj = {
          some_key /*                          */: 1,
          other_key /*                         */: 2,
          key_with_boolean_value /*            */: true,
          key_with_string_literal_value /*     */: "foo",
          key_with_constructor /*              */: String,
          key_with_function_expression /*       */ () {},
          key_with_arrow_function_expression /**/: () => {},
          ["computed_key" /*                  */]: true,
          empty_object /*                      */: {}
        };
      `,
      errors: [
        {
          message: "Values are not aligned in the object expression.",
        },
      ],
    },
    {
      name: "spread syntax",
      code: `
        const obj = {
          some_key: 1,
          another_key: true,
          ...other_obj
        };
      `,
      output: `
        const obj = {
          some_key /*   */: 1,
          another_key /**/: true,
          ...other_obj
        };
      `,
      errors: [
        {
          message: "Values are not aligned in the object expression.",
        },
      ],
    },
    {
      name: "shorthand keys",
      code: `
        const obj = {
          some_key: 1,
          another_key: true,
          other_key
        };
      `,
      output: `
        const obj = {
          some_key /*   */: 1,
          another_key /**/: true,
          other_key
        };
      `,
      errors: [
        {
          message: "Values are not aligned in the object expression.",
        },
      ],
    },
    {
      name: "call expression",
      code: `
        doSomething({
          some_prop: true,
          other_prop: false
        });
      `,
      output: `
        doSomething({
          some_prop /* */: true,
          other_prop /**/: false
        });
      `,
      errors: [
        {
          message: "Values are not aligned in the object expression.",
        },
      ],
    },
    {
      name: "keys with JSX values",
      code: `
        const obj = {
          some_element: <div>hello</div>,
          other_element: <span>world</span>
        };
      `,
      output: `
        const obj = {
          some_element /* */: <div>hello</div>,
          other_element /**/: <span>world</span>
        };
      `,
      errors: [
        {
          message: "Values are not aligned in the object expression.",
        },
      ],
    },
    {
      name: "computed key being the longest key",
      code: `
        const obj = {
          ["long_computed_key"]: true,
          some_key: {}
        };
      `,
      output: `
        const obj = {
          ["long_computed_key" /**/]: true,
          some_key /*             */: {}
        };
      `,
      errors: [
        {
          message: "Values are not aligned in the object expression.",
        },
      ],
    },
    {
      name: "non-computed key being the longest key",
      code: `
        const obj = {
          long_non_computed_key: true,
          ["computed_key"]: {}
        };
      `,
      output: `
        const obj = {
          long_non_computed_key /**/: true,
          ["computed_key" /*     */]: {}
        };
      `,
      errors: [
        {
          message: "Values are not aligned in the object expression.",
        },
      ],
    },
    {
      name: "computed key being the longest key (with comment outside the brackets)",
      code: `
        const obj = {
          ["long_computed_key"]: true,
          some_key: {}
        };
      `,
      output: `
        const obj = {
          ["long_computed_key"] /**/: true,
          some_key /*             */: {}
        };
      `,
      // eslint-disable-next-line prefer-snakecase/prefer-snakecase
      options: ["always", { commentOutsideComputedKey: true }],
      errors: [
        {
          message: "Values are not aligned in the object expression.",
        },
      ],
    },
    {
      name: "non-computed key being the longest key (with comment outside the brackets)",
      code: `
        const obj = {
          long_non_computed_key: true,
          ["computed_key"]: {}
        };
      `,
      output: `
        const obj = {
          long_non_computed_key /**/: true,
          ["computed_key"] /*     */: {}
        };
      `,
      // eslint-disable-next-line prefer-snakecase/prefer-snakecase
      options: ["always", { commentOutsideComputedKey: true }],
      errors: [
        {
          message: "Values are not aligned in the object expression.",
        },
      ],
    },
    {
      name: "computed keys (with comment inside the brackets)",
      code: `
        const obj = {
          ["one"]: 1,
          ["two"]: 2,
          ["three"]: 3,
          ["four"]: 4,
          ["five"]: 5
        };
      `,
      output: `
        const obj = {
          ["one" /*  */]: 1,
          ["two" /*  */]: 2,
          ["three" /**/]: 3,
          ["four" /* */]: 4,
          ["five" /* */]: 5
        };
      `,
      errors: [
        {
          message: "Values are not aligned in the object expression.",
        },
      ],
    },
    {
      name: "computed keys (with comment outside the brackets)",
      code: `
        const obj = {
          ["one"]: 1,
          ["two"]: 2,
          ["three"]: 3,
          foo: "bar",
          ["four"]: 4,
          ["five"]: 5
        };
      `,
      output: `
        const obj = {
          ["one"] /*  */: 1,
          ["two"] /*  */: 2,
          ["three"] /**/: 3,
          foo /*      */: "bar",
          ["four"] /* */: 4,
          ["five"] /* */: 5
        };
      `,
      // eslint-disable-next-line prefer-snakecase/prefer-snakecase
      options: ["always", { commentOutsideComputedKey: true }],
      errors: [
        {
          message: "Values are not aligned in the object expression.",
        },
      ],
    },
    {
      name: "custom spacing character",
      code: `
        const obj = {
          some_key: true,
          other_key: false
        };
      `,
      output: `
        const obj = {
          some_key /*#*/: true,
          other_key /**/: false
        };
      `,
      // eslint-disable-next-line prefer-snakecase/prefer-snakecase
      options: ["always", { spacingCharacter: "#" }],
      errors: [
        {
          message: "Values are not aligned in the object expression.",
        },
      ],
    },
  ],
});
