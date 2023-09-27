import { BaseNode, Property } from "estree";

/**
 * Predicate function for determining `Property` nodes
 * @param node Node
 */
export const is_property_node = (node: BaseNode): node is Property => {
  return node.type === "Property";
};
