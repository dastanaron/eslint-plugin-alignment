import { BaseNode, FunctionExpression } from "estree";

/**
 * Predicate function for determining `FunctionExpression` nodes
 * @param node Node
 */
export const is_function_expression_node = (
  node: BaseNode
): node is FunctionExpression => {
  return node.type === "FunctionExpression";
};
