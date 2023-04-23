import chalkMate from "../index";
import { colors } from "../utils/colors";

const chalk = require("chalk");

describe("chalkMate", function () {
  it("should handle properties with single quotes", () => {
    expect(
      chalkMate(
        `<red bg='yellow'>The quick brown fox jumped <green bg="white">over</green> the lazy dogs.</red>`
      )
    ).toEqual(
      chalk.hex(colors.red).bgHex(colors.yellow)(
        `The quick brown fox jumped ${chalk
          .hex(colors.green)
          .bgHex(colors.white)(`over`)} the lazy dogs.`
      )
    );
  });

  it("should handle modifiers", () => {
    expect(
      chalkMate(
        `<red bg='yellow' bold>The quick brown fox jumped <green bg="white">over</green> the lazy dogs.</red>`
      )
    ).toEqual(
      chalk
        .hex(colors.red)
        .bgHex(colors.yellow)
        .bold(
          `The quick brown fox jumped ${chalk
            .hex(colors.green)
            .bgHex(colors.white)(`over`)} the lazy dogs.`
        )
    );
  });

  it("should handle multiple tags", () => {
    expect(
      chalkMate(
        `<red bg='yellow' bold>The quick brown fox jumped <green bg="white">over</green> the lazy dogs.</red> <blue bg="white">The quick brown fox jumped <green bg="white">over</green> the lazy dogs.</blue>`
      )
    ).toEqual(
      chalk
        .hex(colors.red)
        .bgHex(colors.yellow)
        .bold(
          `The quick brown fox jumped ${chalk
            .hex(colors.green)
            .bgHex(colors.white)(`over`)} the lazy dogs.`
        ) +
        " " +
        chalk.hex(colors.blue).bgHex(colors.white)(
          `The quick brown fox jumped ${chalk
            .hex(colors.green)
            .bgHex(colors.white)(`over`)} the lazy dogs.`
        )
    );
  });
});
