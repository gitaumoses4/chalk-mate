import { processTag } from './processTag'
import { Chalk } from 'chalk'

export function parseNode(node: any, chalk: Chalk) {
  if (node.type === 'text') {
    return node.text
  }

  if (node.type === 'element') {
    const tagName = node.tagName
    const content = node.childNodes.map(node => parseNode(node, chalk)).join('')

    chalk = processTag(tagName, node.attributes, chalk)

    return chalk(content)
  }
}
