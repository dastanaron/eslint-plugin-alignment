# alignment/align-enums

_This rule is included in `plugin:alignment/recommended` preset._

🔧 The --fix option on the command line can automatically fix the problems reported by this rule.

## Rule Details

Aligns the members of a TypeScript enum.

Examples of **incorrect** code:

```ts
enum Direction {
  UP = "up",
  DOWN = "down",
  LEFT = "left",
  RIGHT = "right",
}
```

Examples of **correct** code:

```ts
enum Direction {
  UP    = "up",
  DOWN  = "down",
  LEFT  = "left",
  RIGHT = "right",
}
```

## Options
