import { Chalk } from "chalk";
import { Attributes, Rgb } from "../types";
import { HEX_REGEX, RGB_REGEX } from "./constants";
import { colors } from "./colors";

export function processForegroundColor(
  chalk: Chalk,
  color: string,
  attributes: Attributes
): Chalk {
  color = color.trim().toLowerCase();
  if (
    color === "hex" &&
    attributes.value &&
    attributes.value.match(HEX_REGEX)
  ) {
    return chalk.hex(attributes.value);
  }

  if (
    color === "rgb" &&
    attributes.value &&
    attributes.value.match(RGB_REGEX)
  ) {
    const rgb = attributes.value.split(",").map(Number) as Rgb;
    return chalk.rgb(rgb[0], rgb[1], rgb[2]);
  }

  if (Object.keys(colors).includes(color)) {
    return chalk.hex(colors[color]);
  }

  return chalk;
}
