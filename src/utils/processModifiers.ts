import { Level } from "chalk";
import { ALLOWED_MODIFIERS } from "./constants";
import { Attributes } from "../types";
import { processBackgroundColor } from "./processBackgroundColor";
import { processForegroundColor } from "./processForegroundColor";

const chalk = require("chalk");

export function processModifiers(
  color: string,
  attributes: Attributes,
  colorLevel?: Level
) {
  let chalkInstance = new chalk.Instance({ level: colorLevel });

  chalkInstance = processForegroundColor(chalkInstance, color, attributes);

  if (Object.keys(attributes).length) {
    chalkInstance = processBackgroundColor(chalkInstance, attributes);

    for (const modifier of ALLOWED_MODIFIERS) {
      if (attributes[modifier]) {
        chalkInstance = chalkInstance[modifier];
      }
    }
  }

  return chalkInstance;
}
