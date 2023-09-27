import { TSESTree, AST_NODE_TYPES } from "@typescript-eslint/utils";

/**
 * Predicate function for determining `TSPropertySignature` nodes
 * @param node Node
 */
export const is_ts_property_signature_node = (
  node: TSESTree.BaseNode
): node is TSESTree.TSPropertySignature => {
  return node.type === AST_NODE_TYPES.TSPropertySignature;
};
