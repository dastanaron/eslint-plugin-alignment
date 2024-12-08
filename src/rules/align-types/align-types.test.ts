import { RuleTester } from "@typescript-eslint/rule-tester";
import { alignTypes } from "./align-types";

const tester = new RuleTester({
  parser: "@typescript-eslint/parser",
});

tester.run("align_types", alignTypes, {
  valid: [
    {
      name: "interface: normal properties",
      code: `
        interface Layer {
          name:   string;
          locked: boolean;
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
          name: string;
          locked: boolean;
          created_at: string;
        }
      `,
      errors: [
        {
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
          name?:      string;
          locked?:    boolean;
          created_at: string;
        }
      `,
      errors: [
        {
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
          readonly name: string;
          locked?:       boolean;
          created_at:    string;
        }
      `,
      errors: [
        {
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
          name: string;
          locked: boolean;
          created_at: string;
        }
      `,
      errors: [
        {
          
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
          name?:      string;
          locked?:    boolean;
          created_at: string;
        }
      `,
      errors: [
        {
          
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
          readonly name: string;
          locked?:       boolean;
          created_at:    string;
        }
      `,
      errors: [
        {
          
          messageId: "type_literal_not_aligned",
        },
      ],
    },
  ],
});
