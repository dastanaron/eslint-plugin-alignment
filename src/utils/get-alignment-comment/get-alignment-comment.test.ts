import { get_alignment_comment } from "./get-alignment-comment";

describe("get_alignment_comment", () => {
  it("generates alignment comment for the specified length", () => {
    expect(get_alignment_comment(5)).toEqual("/*     */");
  });

  it("generates alignment comment with zero length", () => {
    expect(get_alignment_comment()).toEqual("/**/");
  });

  it("generates alignment comment with custom spacing character", () => {
    expect(get_alignment_comment(5, "#")).toEqual("/*#####*/");
  });
});
