import { HEX_REGEX, RGB_REGEX } from "./constants";
import { Attributes, Rgb } from "../types";
import { Chalk } from "chalk";
import { colors } from "./colors";

export function processBackgroundColor(
  chalk: Chalk,
  attributes: Attributes
): Chalk {
  let backgroundColor = (attributes.bg || "").trim().toLowerCase();
  if (backgroundColor) {
    if (Object.keys(colors).includes(backgroundColor)) {
      backgroundColor = colors[backgroundColor];
    }
    if (backgroundColor.match(HEX_REGEX)) {
      return chalk.bgHex(backgroundColor);
    } else if (backgroundColor.match(RGB_REGEX)) {
      const rgb = backgroundColor.split(",").map(Number) as Rgb;
      return chalk.bgRgb(rgb[0], rgb[1], rgb[2]);
    }
  }
  return chalk;
}
