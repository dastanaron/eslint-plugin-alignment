import { TSESTree, AST_NODE_TYPES } from "@typescript-eslint/utils";

/**
 * Predicate function for determining `TSTypeLiteral` nodes
 * @param node Node
 */
export const is_ts_type_literal_node = (
  node: TSESTree.BaseNode
): node is TSESTree.TSTypeLiteral => {
  return node.type === AST_NODE_TYPES.TSTypeLiteral;
};
