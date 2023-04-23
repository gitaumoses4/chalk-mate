import { processForegroundColor } from "../processForegroundColor";

const chalk = require("chalk");

jest.mock("chalk", () => {
  return {
    hex: jest.fn().mockImplementation((hex) => `hex-${hex}`),
    rgb: jest
      .fn()
      .mockImplementation((r, g, b) => `rgb-${r + "," + g + "," + b}`),
  };
});

describe("processForegroundColor", function () {
  it("should return the chalk instance if the color is not valid", function () {
    expect(processForegroundColor(chalk, "invalid", {})).toEqual(chalk);
  });

  it("should return the chalk instance if the color is valid", function () {
    expect(processForegroundColor(chalk, "red", {})).toEqual("hex-#ff0000");
  });

  it("should use the hex color if it is a valid color", () => {
    expect(processForegroundColor(chalk, "hex", { value: "#ff0000" })).toEqual(
      "hex-#ff0000"
    );

    expect(chalk.hex).toHaveBeenCalledWith("#ff0000");
  });

  it("should use the rgb color if it is a valid color", () => {
    expect(processForegroundColor(chalk, "rgb", { value: "255,0,0" })).toEqual(
      "rgb-255,0,0"
    );

    expect(chalk.rgb).toHaveBeenCalledWith(255, 0, 0);
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });
});
