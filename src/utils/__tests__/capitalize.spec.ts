import { capitalize } from "../capitalize";

describe("capitalize", function () {
  it("should capitalize the first letter", function () {
    expect(capitalize("text")).toEqual("Text");
  });

  it("should lowercase the rest of the text", function () {
    expect(capitalize("TEXT")).toEqual("Text");
  });
});
