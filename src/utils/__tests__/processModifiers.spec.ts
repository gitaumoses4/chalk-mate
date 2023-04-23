import { processModifiers } from "../processModifiers";
import * as processForegroundColor from "../processForegroundColor";
import * as processBackgroundColor from "../processBackgroundColor";

class ChalkInstance {
  level = 1;
  modifiers: Array<string> = [];

  public get red() {
    return this;
  }

  public get bold() {
    this.modifiers.push("bold");
    return this;
  }

  public get underline() {
    this.modifiers.push("underline");
    return this;
  }
}

const chalkInstance = new ChalkInstance();

const chalk = require("chalk");

jest.mock("chalk", () => {
  return {
    Instance: jest.fn().mockImplementation(() => chalkInstance),
  };
});

describe("processModifiers", function () {
  let processForegroundColorSpy;
  let processBackgroundColorSpy;

  beforeEach(() => {
    processForegroundColorSpy = jest
      .spyOn(processForegroundColor, "processForegroundColor")
      .mockReturnValue(chalkInstance as any);
    processBackgroundColorSpy = jest
      .spyOn(processBackgroundColor, "processBackgroundColor")
      .mockReturnValue(chalkInstance as any);
  });

  it("should create a chalk instance with the level", () => {
    processModifiers("red", {}, 2);

    expect(chalk.Instance).toHaveBeenCalledWith({ level: 2 });
  });

  it("should always process the foreground color", () => {
    processModifiers("red", {}, 2);

    expect(processForegroundColorSpy).toHaveBeenCalledWith(
      chalkInstance,
      "red",
      {}
    );
  });

  it("should process the background color if there are attributes", () => {
    processModifiers("red", { bg: "red" }, 2);

    expect(processBackgroundColorSpy).toHaveBeenCalledWith(chalkInstance, {
      bg: "red",
    });
  });

  it("should process allowed modifiers if there are attributes", () => {
    processModifiers("red", { bg: "red", bold: true, underline: true }, 2);

    expect(chalkInstance.modifiers).toEqual(["bold", "underline"]);
  });

  afterEach(() => {
    processForegroundColorSpy.mockRestore();
    processBackgroundColorSpy.mockRestore();
  });
});
