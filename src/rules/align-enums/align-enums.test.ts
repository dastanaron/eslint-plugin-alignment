import { RuleTester } from "@typescript-eslint/rule-tester";
import { align_enums } from "./align-enums";

const tester = new RuleTester({
  parser: "@typescript-eslint/parser",
});

tester.run("align_enums", align_enums, {
  valid: [
    {
      name: "normal members",
      code: `
        enum Direction {
          UP,
          DOWN,
          LEFT,
          RIGHT,
        }
      `,
    },
  ],
  invalid: [
    {
      name: "members with string values",
      code: `
        enum Direction {
          UP = "up",
          DOWN = "down",
          LEFT = "left",
          RIGHT = "right",
        }
      `,
      output: `
        enum Direction {
          UP    = "up",
          DOWN  = "down",
          LEFT  = "left",
          RIGHT = "right",
        }
      `,
      errors: [
        {
          messageId: "not_aligned",
        },
      ],
    },
    {
      name: "members with number values",
      code: `
        enum Direction {
          UP = 1,
          DOWN = 2,
          LEFT = 3,
          RIGHT = 4,
        }
      `,
      output: `
        enum Direction {
          UP    = 1,
          DOWN  = 2,
          LEFT  = 3,
          RIGHT = 4,
        }
      `,
      errors: [
        {
          messageId: "not_aligned",
        },
      ],
    },
    {
      name: "members with string id",
      code: `
        enum Direction {
          UP = 1,
          "DOWN" = 2,
          "LEFT" = 3,
          RIGHT = 4,
        }
      `,
      output: `
        enum Direction {
          UP     = 1,
          "DOWN" = 2,
          "LEFT" = 3,
          RIGHT  = 4,
        }
      `,
      errors: [
        {
          messageId: "not_aligned",
        },
      ],
    },
    {
      name: "members without initializers",
      code: `
        enum Direction {
          UP = "up",
          DOWN,
          LEFT,
          RIGHT = "right",
        }
      `,
      output: `
        enum Direction {
          UP    = "up",
          DOWN,
          LEFT,
          RIGHT = "right",
        }
      `,
      errors: [
        {
          messageId: "not_aligned",
        },
      ],
    },
  ],
});
