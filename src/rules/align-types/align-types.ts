import {
  createRule,
  getAlignmentSpaces,
  is_ts_property_signature_node,
  is_ts_type_literal_node,
} from "../../utils";
import stringify from "json-stringify-safe";
import { TSESTree } from "@typescript-eslint/utils";

type PropertyWithLocation = {
  key: TSESTree.Literal | TSESTree.Identifier;
  type_annotation: TSESTree.TSTypeAnnotation;
  optional: boolean;
  key_start: number;
  key_end: number;
  type_annotation_start?: number;
  type_annotation_end?: number;
};

type Options = [
  {
    spacingCharacter?: string;
    disableInterfaces?: boolean;
    disableTypeLiterals?: boolean;
  },
];

type MessageIds = "interface_not_aligned" | "type_literal_not_aligned";

export const alignTypes = createRule<Options, MessageIds>({
  name: "align-interfaces",
  meta: {
    docs: {
      description: "Aligns TS interfaces and type literals",
      recommended: "stylistic",
    },
    messages: {
      interface_not_aligned: "Interface values are not aligned in the body.",
      type_literal_not_aligned:
        "Type literal values are not aligned in the body.",
    },
    schema: [
      {
        type: "object",
        properties: {
          disableInterfaces: {
            type: "boolean",
          },
          disableTypeLiterals: {
            type: "boolean",
          },
        },
        additionalProperties: false,
      },
    ],
    fixable: "code",
    type: "layout",
  },
  defaultOptions: [
    {
      disableInterfaces: false,
      disableTypeLiterals: false,
    },
  ],
  create(
    context,
    [
      {
        disableInterfaces: disable_interfaces,
        disableTypeLiterals: disable_type_literals,
      },
    ]
  ) {

    const handle_node = (
      node: TSESTree.TSInterfaceBody | TSESTree.TSTypeLiteral
    ) => {
      const is_type_literal_node = is_ts_type_literal_node(node);

      if (
        (disable_type_literals && is_type_literal_node) ||
        (disable_interfaces && !is_type_literal_node)
      ) {
        return;
      }

      const properties = (
        JSON.parse(
          stringify(
            is_type_literal_node
              ? (node as TSESTree.TSTypeLiteral).members
              : (node as TSESTree.TSInterfaceBody).body
          )
        ) as TSESTree.BaseNode[]
      )
        // TODO: Maybe handle `TSIndexSignatureNode` and `TSMethodSignature`
        .filter(is_ts_property_signature_node)
        .filter((node) => node.typeAnnotation !== undefined);

      const properties_with_location = Object.values(
        properties
          .map(({ key, optional, typeAnnotation: type_annotation }) => ({
            key,
            type_annotation,
            optional,
            key_start: key.loc?.start.column ?? 0,
            key_end: key.loc?.end.column ?? 0,
            type_annotation_start: type_annotation?.loc?.start.column,
            type_annotation_end: type_annotation?.loc?.end.column,
          }))
          // Reduce to properties having the same `start` value for `key`. This assumes
          // that the client code has already been formatted such that every property key of
          // the interface starts at the same column.
          .reduce(
            (acc, curr) => {
              const start = curr.key_start;
              acc[start] = acc[start] || [];
              acc[start].push(curr as PropertyWithLocation);
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
            location.type_annotation_start ===
            properties_with_location[0].type_annotation_start
        )
      ) {
        return;
      }

      context.report({
        node,
        messageId: is_ts_type_literal_node(node)
          ? "type_literal_not_aligned"
          : "interface_not_aligned",
        *fix(fixer) {
          const property_with_longest_key = properties_with_location.reduce(
            (prev, current) =>
              prev && prev.key_end > current.key_end ? prev : current
          );

          for (const property of properties_with_location) {
            yield fixer.insertTextAfter(
              property.key,
                getAlignmentSpaces(
                  Math.max(
                    0,
                    property_with_longest_key.key_end -
                      property.key_end -
                      (property.optional ? 1 : 0) // Subtract a column for the question mark
                  ),
                )
            );
          }
        },
      });
    };

    // noinspection JSUnusedGlobalSymbols
    return {
      TSTypeLiteral: handle_node,
      TSInterfaceBody: handle_node,
    };
  },
});
