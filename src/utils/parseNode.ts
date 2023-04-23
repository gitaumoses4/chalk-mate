import { processModifiers } from "./processModifiers";
import { Chalk } from "chalk";

export function parseNode(node: any, chalk: Chalk) {
  if (node.type === "text") {
    return node.text;
  }

  if (node.type === "element") {
    const color = node.tagName;
    const content = node.childNodes
      .map((node) => parseNode(node, chalk))
      .join("");

    chalk = processModifiers(color, node.attributes, chalk);

    return chalk(content);
  }
}
