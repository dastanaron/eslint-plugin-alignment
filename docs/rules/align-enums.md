# alignment/align-enums

_This rule is included in `plugin:alignment/recommended` preset._

🔧 The --fix option on the command line can automatically fix the problems reported by this rule.

## Rule Details

Aligns the members of a TypeScript enum.

Examples of **incorrect** code:

```ts
/*eslint align-enums: "warn"*/

enum Direction {
  UP = "up",
  DOWN = "down",
  LEFT = "left",
  RIGHT = "right",
}
```

Examples of **correct** code:

```ts
/*eslint align-enums: "warn"*/

enum Direction {
  UP /*   */ = "up",
  DOWN /* */ = "down",
  LEFT /* */ = "left",
  RIGHT /**/ = "right",
}
```

## Options

### `spacingCharacter`

- Type: `string`
- Default: `" "`

The spacing character inserted between the comments. The Length of the character must be one.

```ts
/*eslint align-enums: ["warn", "always", { "spacingCharacter": "-" }]*/

// Valid
enum Direction {
  UP /*---*/ = "up",
  DOWN /*-*/ = "down",
  LEFT /*-*/ = "left",
  RIGHT /**/ = "right",
}
```
