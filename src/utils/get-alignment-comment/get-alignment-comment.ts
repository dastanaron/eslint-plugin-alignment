/**
 * Generates the alignment comment for the specified length.
 * @param length Number of spacing characters between the comment
 * @param char Custom spacing character
 */
export const getAlignmentSpaces = (
  length: number = 0,
) => {
  return ' '.repeat(length);
};
