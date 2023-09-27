# alignment/align-types

_This rule is included in `plugin:alignment/recommended` preset._

🔧 The --fix option on the command line can automatically fix the problems reported by this rule.

## Rule Details

Aligns the properties of TypeScript interfaces and type literals.

Examples of **incorrect** code:

```ts
/*eslint align-types: "warn"*/

type Person = {
  fullName: string;
  age: number;
};

interface Product {
  name: string;
  price: number;
  description?: string;
}
```

Examples of **correct** code:

```ts
/*eslint align-types: "warn"*/

type Person = {
  fullName /**/ : string;
  age /*     */ : number;
};

interface Product {
  name /*        */ : string;
  price /*       */ : number;
  description /**/?: string;
}
```

## Options

### `spacingCharacter`

- Type: `string`
- Default: `" "`

The spacing character inserted between the comments. The Length of the character must be one.

```ts
/*eslint align-types: ["warn", "always", { "spacingCharacter": "-" }]*/

// Valid
type Person = {
  fullName /**/ : string;
  age /*-----*/ : number;
};

interface Product {
  name /*--------*/ : string;
  price /*-------*/ : number;
  description /**/?: string;
}
```

### `disableInterfaces`

- Type: `boolean`
- Default: `false`

Disables checking interface declarations for alignment issues.

```ts
/*eslint align-types: ["warn", "always", { "disableInterfaces": true }]*/

// Valid
interface Product {
  name: string;
  price: number;
  description?: string;
}
```

### `disableTypeLiterals`

- Type: `boolean`
- Default: `false`

Disables checking type literals for alignment issues.

```ts
/*eslint align-types: ["warn", "always", { "disableTypeLiterals": true }]*/

// Valid
type Person = {
  fullName: string;
  age: number;
};
```
