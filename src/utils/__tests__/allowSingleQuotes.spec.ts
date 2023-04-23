import { allowSingleQuotes } from "../allowSingleQuotes";

describe("allowSingleQuotes", function () {
  it("should replace single quotes in attributes", function () {
    expect(allowSingleQuotes("<tag attr='value'>")).toEqual(
      '<tag attr="value">'
    );
  });
});
