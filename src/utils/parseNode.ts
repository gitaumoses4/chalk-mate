import { processTag } from './processTag'
import { Chalk } from 'chalk'
import { decode } from 'html-entities'
import { HTMLElement, Node } from 'node-html-parser'

export function parseNode(node: Node, chalk: Chalk) {
  if (node.nodeType === 3) {
    return decode(node.rawText)
  }

  if (node.nodeType === 1) {
    const htmlNode = node as HTMLElement
    const tagName = htmlNode.tagName
    const content = htmlNode.childNodes.map(node => parseNode(node, chalk)).join('')
    chalk = processTag(tagName, htmlNode.attributes, chalk)
    return chalk(content)
  }
}
