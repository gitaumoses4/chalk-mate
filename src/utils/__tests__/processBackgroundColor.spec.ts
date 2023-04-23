import { processBackgroundColor } from "../processBackgroundColor";

jest.mock("chalk", () => {
  return {
    bgHex: jest.fn().mockImplementation((hex) => `bgHex-${hex}`),
    bgRgb: jest
      .fn()
      .mockImplementation((r, g, b) => `bgRgb-${r + "," + g + "," + b}`),
  };
});

const chalk = require("chalk");

describe("processBackgroundColor", function () {
  it("should return the chalk instance when there are no attributes", () => {
    expect(processBackgroundColor(chalk, {})).toEqual(chalk);
  });

  it("should use the background color if it is a valid color", () => {
    expect(processBackgroundColor(chalk, { bg: "red" })).toEqual(
      "bgHex-#ff0000"
    );
  });

  it("should not use the background color if it is not a valid color", () => {
    expect(processBackgroundColor(chalk, { bg: "invalid" })).toEqual(chalk);
  });

  it("should use the hex background color if it is a valid color", () => {
    expect(processBackgroundColor(chalk, { bg: "#ff0000" })).toEqual(
      "bgHex-#ff0000"
    );

    expect(chalk.bgHex).toHaveBeenCalledWith("#ff0000");
  });

  it("should use the rgb background color if it is a valid color", () => {
    expect(processBackgroundColor(chalk, { bg: "255,0,0" })).toEqual(
      "bgRgb-255,0,0"
    );

    expect(chalk.bgRgb).toHaveBeenCalledWith(255, 0, 0);
  });
});
