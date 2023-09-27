import { RuleTester } from "@typescript-eslint/rule-tester";
import { align_types } from "./align-types";

const tester = new RuleTester({
  parser: "@typescript-eslint/parser",
});

tester.run("align_types", align_types, {
  valid: [
    {
      name: "interface: normal properties",
      code: `
        interface Layer {
          name /*  */: string;
          locked /**/: boolean;
        }
      `,
    },
    {
      name: "interface: extended interface",
      code: `
        interface Ellipse extends Layer {
          name /*  */: string;
          locked /**/: boolean;
        }
      `,
    },
    {
      name: "interface: disabled",
      code: `
        interface Layer {
          name: string;
          locked: boolean;
        }
      `,
      // eslint-disable-next-line prefer-snakecase/prefer-snakecase
      options: [{ disableInterfaces: true }],
    },
    {
      name: "type: normal properties",
      code: `
        type Layer = {
          name /*  */: string;
          locked /**/: boolean;
        }
      `,
    },
    {
      name: "type: intersected type",
      code: `
        type Ellipse = Layer & {
          name /*  */: string;
          locked /**/: boolean;
        }
      `,
    },
    {
      name: "type: disabled",
      code: `
        type Layer = {
          name: string;
          locked: boolean;
        }
      `,
      // eslint-disable-next-line prefer-snakecase/prefer-snakecase
      options: [{ disableTypeLiterals: true }],
    },
  ],
  invalid: [
    // Interfaces
    {
      name: "interface: normal members with string values",
      code: `
        interface Layer {
          name: string;
          locked: boolean;
          created_at: string;
        }
      `,
      output: `
        interface Layer {
          name /*      */: string;
          locked /*    */: boolean;
          created_at /**/: string;
        }
      `,
      errors: [
        {
          // eslint-disable-next-line prefer-snakecase/prefer-snakecase
          messageId: "interface_not_aligned",
        },
      ],
    },
    {
      name: "interface: optional members",
      code: `
        interface Layer {
          name?: string;
          locked?: boolean;
          created_at: string;
        }
      `,
      output: `
        interface Layer {
          name /*     */?: string;
          locked /*   */?: boolean;
          created_at /**/: string;
        }
      `,
      errors: [
        {
          // eslint-disable-next-line prefer-snakecase/prefer-snakecase
          messageId: "interface_not_aligned",
        },
      ],
    },
    {
      name: "interface: property modifiers",
      code: `
        interface Layer {
          readonly name: string;
          locked?: boolean;
          created_at: string;
        }
      `,
      output: `
        interface Layer {
          readonly name /**/: string;
          locked /*      */?: boolean;
          created_at /*   */: string;
        }
      `,
      errors: [
        {
          // eslint-disable-next-line prefer-snakecase/prefer-snakecase
          messageId: "interface_not_aligned",
        },
      ],
    },
    {
      name: "interface: custom spacing character",
      code: `
        interface Layer {
          name: string;
          locked: boolean;
          created_at: string;
        }
      `,
      output: `
        interface Layer {
          name /*######*/: string;
          locked /*####*/: boolean;
          created_at /**/: string;
        }
      `,
      // eslint-disable-next-line prefer-snakecase/prefer-snakecase
      options: [{ spacingCharacter: "#" }],
      errors: [
        {
          // eslint-disable-next-line prefer-snakecase/prefer-snakecase
          messageId: "interface_not_aligned",
        },
      ],
    },
    // Type literals
    {
      name: "type: normal members with string values",
      code: `
        type Layer = {
          name: string;
          locked: boolean;
          created_at: string;
        }
      `,
      output: `
        type Layer = {
          name /*      */: string;
          locked /*    */: boolean;
          created_at /**/: string;
        }
      `,
      errors: [
        {
          // eslint-disable-next-line prefer-snakecase/prefer-snakecase
          messageId: "type_literal_not_aligned",
        },
      ],
    },
    {
      name: "type: optional members",
      code: `
        type Layer = {
          name?: string;
          locked?: boolean;
          created_at: string;
        }
      `,
      output: `
        type Layer = {
          name /*     */?: string;
          locked /*   */?: boolean;
          created_at /**/: string;
        }
      `,
      errors: [
        {
          // eslint-disable-next-line prefer-snakecase/prefer-snakecase
          messageId: "type_literal_not_aligned",
        },
      ],
    },
    {
      name: "type: property modifiers",
      code: `
        type Layer = {
          readonly name: string;
          locked?: boolean;
          created_at: string;
        }
      `,
      output: `
        type Layer = {
          readonly name /**/: string;
          locked /*      */?: boolean;
          created_at /*   */: string;
        }
      `,
      errors: [
        {
          // eslint-disable-next-line prefer-snakecase/prefer-snakecase
          messageId: "type_literal_not_aligned",
        },
      ],
    },
    {
      name: "type: custom spacing character",
      code: `
        type Layer = {
          name: string;
          locked: boolean;
          created_at: string;
        }
      `,
      output: `
        type Layer = {
          name /*######*/: string;
          locked /*####*/: boolean;
          created_at /**/: string;
        }
      `,
      // eslint-disable-next-line prefer-snakecase/prefer-snakecase
      options: [{ spacingCharacter: "#" }],
      errors: [
        {
          // eslint-disable-next-line prefer-snakecase/prefer-snakecase
          messageId: "type_literal_not_aligned",
        },
      ],
    },
  ],
});
