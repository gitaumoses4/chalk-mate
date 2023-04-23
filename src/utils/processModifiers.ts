import { Chalk } from "chalk";
import { ALLOWED_MODIFIERS } from "./constants";
import { Attributes } from "../types";
import { processBackgroundColor } from "./processBackgroundColor";
import { processForegroundColor } from "./processForegroundColor";

export function processModifiers(
  color: string,
  attributes: Attributes,
  chalk: Chalk
) {
  chalk = processForegroundColor(chalk, color, attributes);

  if (Object.keys(attributes).length) {
    chalk = processBackgroundColor(chalk, attributes);

    for (const modifier of ALLOWED_MODIFIERS) {
      if (attributes[modifier]) {
        chalk = chalk[modifier];
      }
    }
  }

  return chalk;
}
