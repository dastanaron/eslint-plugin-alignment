# eslint-plugin-alignment

![GitHub Workflow Status](https://github.com/zignis/eslint-plugin-alignment/actions/workflows/main.yaml/badge.svg)
![npm](https://img.shields.io/npm/v/eslint-plugin-alignment?style=plastic)

> [!WARNING]  
> This plugin is still in beta, and some rules might not work as expected.

Format and align your objects, enums, interfaces, and type literals for better readability.

<table>
    <tr>
        <th> Turn this </th>
        <th> Into this </th>
    </tr>
<tr>
<td>

```js
const person = {
  name: "Connor",
  age: 26,
  jobTitle: "Musician",
  city: "New York",
  country: "USA",
  favoriteColor: "Blue",
  hobbies: ["Reading", "Cooking", "Hiking"],
  getSomething: () => "something",
};
```

</td>
<td>

```js
const person = {
  name /*         */: "Connor",
  age /*          */: 26,
  jobTitle /*     */: "Musician",
  city /*         */: "New York",
  country /*      */: "USA",
  favoriteColor /**/: "Blue",
  hobbies /*      */: ["Reading", "Cooking", "Hiking"],
  getSomething /* */: () => "something",
};
```

</td>
</tr>
<tr></tr>
<tr>
<td>

```ts
enum DaysOfWeek {
  MONDAY = "Monday",
  TUESDAY = "Tuesday",
  WEDNESDAY = "Wednesday",
  THURSDAY = "Thursday",
  FRIDAY = "Friday",
  SATURDAY = "Saturday",
  SUNDAY = "Sunday",
}
```

</td>
<td>

```ts
enum DaysOfWeek {
  MONDAY /*   */ = "Monday",
  TUESDAY /*  */ = "Tuesday",
  WEDNESDAY /**/ = "Wednesday",
  THURSDAY /* */ = "Thursday",
  FRIDAY /*   */ = "Friday",
  SATURDAY /* */ = "Saturday",
  SUNDAY /*   */ = "Sunday",
}
```

</td>
</tr>
<tr></tr>
<tr>
<td>

```ts
type ContactInfo = {
  name: string;
  email: string;
  phone?: string;
  address?: string;
};

interface User {
  id: number;
  username: string;
  email: string;
  age: number;
}
```

</td>
<td>

```ts
// prettier-ignore
type ContactInfo = {
  name /*    */: string;
  email /*   */: string;
  phone /*  */?: string;
  address /**/?: string;
};

// prettier-ignore
interface User {
  id /*      */: number;
  username /**/: string;
  email /*   */: string;
  age /*     */: number;
}
```

</td>
</tr>
</table>

## Installation

### Yarn

```bash
yarn add -D eslint-plugin-alignment
```

## Usage

Add `alignment` to your list of plugins and extend the
recommended configuration.

```json
{
  "extends": "plugin:alignment/recommended",
  "plugins": ["alignment"]
}
```

## Rules

| Name                                                     | Description                                          | Fixable (using `--fix`) |
| -------------------------------------------------------- | ---------------------------------------------------- | ----------------------- |
| [`alignment/align-objects`](docs/rules/align-objects.md) | Aligns values inside plain JS object expressions     | Yes                     |
| [`alignment/align-enums`](docs/rules/align-enums.md)     | Aligns members of TS enums                           | Yes                     |
| [`alignment/align-types`](docs/rules/align-types.md)     | Aligns properties of TS interfaces and type literals | Yes                     |
