import { Rule, AST } from "eslint";
import stringify from "json-stringify-safe";
import { Property, SpreadElement } from "estree";
import {
  getAlignmentSpaces,
  is_function_expression_node,
  is_property_node,
} from "../../utils";

type PropertyWithLocation = {
  key: Property["key"];
  value: Property["value"];
  computed: boolean;
  key_start: number;
  key_end: number;
  value_start: number;
  value_end: number;
};

export const align_objects: Rule.RuleModule = {
  meta: {
    docs: {
      description: "Aligns JS object values",
      recommended: true,
      url: "https://github.com/zignis/eslint-plugin-alignment/blob/main/docs/rules/align-objects.md",
    },
    schema: {
      type: "array",
      minItems: 0,
      maxItems: 2,
      items: [
        {
          enum: ["always", "never"],
        },
        {
          type: "object",
          properties: {
            spacingCharacter: {
              type: "string",
              maxLength: 1,
              minLength: 1,
            },
            ignoreParentTypes: {
              type: "array",
              items: {
                type: "string",
              },
            },
            commentOutsideComputedKey: {
              type: "boolean",
            },
          },
          additionalProperties: false,
        },
      ],
    },
    fixable: "code",
    type: "layout",
  },
  create(context) {
    const [, settings = {}] = context.options;
    const ignore_parent_types: string[] = Array.isArray(
      settings.ignoreParentTypes
    )
      ? settings.ignoreParentTypes
      : [];
    const comment_outside_computed_key = Boolean(
      settings.commentOutsideComputedKey
    );

    // noinspection JSUnusedGlobalSymbols
    return {
      ObjectExpression(node) {
        if (ignore_parent_types.includes(node.parent.type)) {
          return;
        }

        const properties = (
          JSON.parse(stringify(node.properties)) as (Property | SpreadElement)[]
        )
          .filter(is_property_node)
          .filter(
            (node) =>
              // Shorthands cannot be formatted
              !node.shorthand
          );

        const properties_with_location = Object.values(
          properties
            .map(({ key, value, computed, loc }) => ({
              key,
              value,
              computed,
              key_start: loc?.start.column ?? 0, // `start` value of the `Property` node is same for computed and non-computed properties
              key_end: (key.loc?.end.column ?? 0) + (computed ? 1 : 0),
              value_start: value.loc?.start.column ?? 0,
              value_end: value.loc?.end.column ?? 0,
            }))
            // Reduce to elements having the same `start` value for `key`. This assumes
            // that the client code has already been formatted such that every key of
            // the object starts at the same column.
            .reduce(
              (acc, curr) => {
                const start = curr.key_start;
                acc[start] = acc[start] || [];
                acc[start].push(curr);
                return acc;
              },
              {} as Record<number, PropertyWithLocation[]>
            )
        )
          .filter((group) => group.length)
          .flat();

        if (
          !properties_with_location.length ||
          // Skip if the values are already aligned
          properties_with_location.every(
            (location) =>
              location.value_start === properties_with_location[0].value_start
          )
        ) {
          return;
        }

        context.report({
          message: "Values are not aligned in the object expression.",
          node,
          *fix(fixer) {
            const property_with_longest_key = properties_with_location.reduce(
              (prev, current) =>
                prev && prev.key_end > current.key_end ? prev : current
            );

            for (const property of properties_with_location) {
              if (property.computed) {
                if (comment_outside_computed_key) {
                  if (property.key.range === undefined) {
                    return;
                  }

                  const [start, end] = property.key.range as AST.Range;

                  // Insert the comment outside the square brackets for computed
                  // properties: ["computed"] -> ["computed"] /**/
                  yield fixer.insertTextAfterRange(
                    [start + 1, end + 1],
                       getAlignmentSpaces(
                        property_with_longest_key.key_end - property.key_end,
                      )
                  );
                } else {
                  // Insert the comment inside the square brackets for computed
                  // properties: ["computed"] -> ["computed" /**/]
                  yield fixer.insertTextAfter(
                    property.key,
                      getAlignmentSpaces(
                        property_with_longest_key.key_end - property.key_end,
                      )
                  );
                }
              } else {
                yield fixer.insertTextAfter(
                  property.key,
                     getAlignmentSpaces(
                      property_with_longest_key.key_end -
                        property.key_end +
                        // Add an extra column for missing colon on function expressions
                        Number(is_function_expression_node(property.value)),
                    ) + // Handle function expressions (`do_something() {}` does not have a colon)
                    (is_function_expression_node(property.value) ? " " : "")
                );
              }
            }
          },
        });
      },
    };
  },
};
