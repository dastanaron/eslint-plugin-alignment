import { getAlignmentSpaces } from "./get-alignment-comment";

describe("get_alignment_comment", () => {
  it("generates alignment comment for the specified length", () => {
    expect(getAlignmentSpaces(5)).toEqual("     ");
  });

  it("generates alignment comment with zero length", () => {
    expect(getAlignmentSpaces()).toEqual("");
  });
});
