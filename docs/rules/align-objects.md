# alignment/align-objects

_This rule is included in `plugin:alignment/recommended` preset._

🔧 The --fix option on the command line can automatically fix the problems reported by this rule.

## Rule Details

Aligns the values of an object.

Examples of **incorrect** code:

```jsx
/*eslint align-objects: "warn"*/

const someObj = {
  someKey: true,
  otherLongKey: false,
  oneMoreVeryLongKey: "some_string_value",
  randomNumberKey: 5,
  [SOME_COMPUTED_KEY]: null,
  someArrowFunctionExpression: () => {},
  someReactElement: <List />,
};
```

Examples of **correct** code:

```jsx
/*eslint align-objects: "warn"*/

const someObj = {
  someKey /*                    */: true,
  otherLongKey /*               */: false,
  oneMoreVeryLongKey /*         */: "some_string_value",
  randomNumberKey /*            */: 5,
  [SOME_COMPUTED_KEY /*        */]: null,
  someArrowFunctionExpression /**/: () => {},
  someReactElement /*           */: <List />,
};
```

## Options

### `spacingCharacter`

- Type: `string`
- Default: `" "`

The spacing character inserted between the comments. The Length of the character must be one.

```js
/*eslint align-objects: ["warn", "always", { "spacingCharacter": "-" }]*/

// Valid
const someObj = {
  someKey /*--------------------*/: true,
  otherLongKey /*---------------*/: false,
  oneMoreVeryLongKey /*---------*/: "some_string_value",
  randomNumberKey /*------------*/: 5,
  [SOME_COMPUTED_KEY /*--------*/]: null,
  someArrowFunctionExpression /**/: () => {},
};
```

### `ignoreParentTypes`

- Type: `string[]`
- Default: `[]`

An array of parent AST node types to ignore.

```js
/*eslint align-objects: ["warn", "always", { "ignoreParentTypes": ["CallExpression"] }]*/

// Valid
doSomething({
  some_key: null,
  other_key: "some_value",
});
```

### `commentOutsideComputedKey`

- Type: `boolean`
- Default: `false`

If `true`, the comments are placed outside the square brackets for computed keys.

- With `commentOutsideComputedKey = false`

```js
/*eslint align-objects: ["warn", "always", { "commentOutsideComputedKey": false }]*/

// Valid
const obj = {
  ["some_key" /*  */]: 1,
  ["other_key" /* */]: 2,
  ["random_key" /**/]: 3,
};
```

- With `commentOutsideComputedKey = true`

```js
/*eslint align-objects: ["warn", "always", { "commentOutsideComputedKey": true }]*/

// Valid
const obj = {
  ["some_key" /*  */]: 1,
  ["other_key" /* */]: 2,
  ["random_key" /**/]: 3,
};
```
