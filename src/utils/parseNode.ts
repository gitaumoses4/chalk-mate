import { processModifiers } from "./processModifiers";
import { Level } from "chalk";

export function parseNode(node: any, colorLevel?: Level) {
  if (node.type === "text") {
    return node.text;
  }

  if (node.type === "element") {
    const color = node.tagName;
    const content = node.childNodes.map(parseNode).join("");

    const chalk = processModifiers(color, node.attributes, colorLevel);

    return chalk(content);
  }
}
