import { createRule, getAlignmentSpaces } from "../../utils";
import stringify from "json-stringify-safe";
import { TSESTree } from "@typescript-eslint/utils";

type MemberWithLocation = {
  id: TSESTree.TSEnumMember["id"];
  initializer: NonNullable<TSESTree.TSEnumMember["initializer"]>;
  id_start: number;
  id_end: number;
  initializer_start?: number;
  initializer_end?: number;
};

type Options = [
  {
    spacingCharacter?: string;
  },
];

type MessageIds = "not_aligned";

export const align_enums = createRule<Options, MessageIds>({
  name: "align-enums",
  meta: {
    docs: {
      description: "Aligns TS enum members",
      recommended: "stylistic",
    },
    messages: {
      not_aligned: "Enum members are not aligned in the declaration.",
    },
    schema: [
      {
        type: "object",
        properties: {
          spacingCharacter: {
            type: "string",
            maxLength: 1,
            minLength: 1,
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
      spacingCharacter: " ",
    },
  ],
  create(context) {
    // noinspection JSUnusedGlobalSymbols
    return {
      TSEnumDeclaration(node) {
        const members = JSON.parse(
          stringify(node.members)
        ) as (typeof node)["members"];

        const members_with_location = Object.values(
          members
            // Filter members with initializers
            .filter((member) => member.initializer !== undefined)
            .map(({ id, initializer }) => ({
              id,
              initializer,
              id_start: id.loc?.start.column ?? 0,
              id_end: id.loc?.end.column ?? 0,
              initializer_start: initializer?.loc?.start.column,
              initializer_end: initializer?.loc?.end.column,
            }))
            // Reduce to members having the same `start` value for `id`. This assumes
            // that the client code has already been formatted such that every member key of
            // the enum starts at the same column.
            .reduce(
              (acc, curr) => {
                const start = curr.id_start;
                acc[start] = acc[start] || [];
                acc[start].push(curr as MemberWithLocation);
                return acc;
              },
              {} as Record<number, MemberWithLocation[]>
            )
        )
          .filter((group) => group.length)
          .flat();

        if (
          !members_with_location.length ||
          // Skip if the member values are already aligned
          members_with_location.every(
            (location) =>
              location.initializer_start ===
              members_with_location[0].initializer_start
          )
        ) {
          return;
        }

        context.report({
          node: node.id,
          messageId: "not_aligned",
          *fix(fixer) {
            const member_with_longest_key = members_with_location.reduce(
              (prev, current) =>
                prev && prev.id_end > current.id_end ? prev : current
            );

            for (const member of members_with_location) {
              yield fixer.insertTextAfter(
                member.id,
                  getAlignmentSpaces(
                    member_with_longest_key.id_end - member.id_end,
                  )
              );
            }
          },
        });
      },
    };
  },
});
