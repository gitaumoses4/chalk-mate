import { parseNode } from "./utils/parseNode";
import { allowSingleQuotes } from "./utils/allowSingleQuotes";
import { Level } from "chalk";

const xml = require("xml-parse");

export default function (text: string, colorLevel?: Level) {
  text = allowSingleQuotes(text);
  return xml
    .parse(text)
    .map((node) => parseNode(node, colorLevel))
    .join("");
}
