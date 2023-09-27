/**
 * Generates the alignment comment for the specified length.
 * @param length Number of spacing characters between the comment
 * @param char Custom spacing character
 */
export const get_alignment_comment = (
  length: number = 0,
  char: string = " "
) => {
  return `/*${char.repeat(length)}*/`;
};
