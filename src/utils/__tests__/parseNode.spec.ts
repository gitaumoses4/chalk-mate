import { parseNode } from '../parseNode'
import { colors } from '../colors'
import { HTMLElement, TextNode } from 'node-html-parser'

const { Instance } = require('chalk')

const chalk = new Instance({ level: 1 })

describe('parseNode', function () {
  it('should return the text from a text node', () => {
    const text = 'text'
    expect(parseNode({ nodeType: 3, rawText: text } as TextNode, chalk)).toEqual(text)
  })

  it('should parse html entities from a text node', () => {
    const text = '&lt;tag&gt;'
    expect(parseNode({ nodeType: 3, rawText: text } as TextNode, chalk)).toEqual('<tag>')
  })

  it('should parse child nodes from an element', () => {
    const node = {
      nodeType: 1,
      tagName: 'tag',
      childNodes: [
        { nodeType: 3, rawText: 'hello' },
        {
          nodeType: 1,
          tagName: 'tag',
          childNodes: [{ nodeType: 3, rawText: ' ' }]
        },
        { nodeType: 3, rawText: 'world' }
      ]
    } as HTMLElement

    expect(parseNode(node, chalk)).toEqual('hello world')
  })

  it('should process tags an apply the styles', () => {
    const node = {
      nodeType: 1,
      tagName: 'red',
      childNodes: [{ nodeType: 3, rawText: 'hello world' }],
      attributes: {
        bold: true,
        underline: true,
        bg: 'yellow'
      } as any
    } as HTMLElement

    expect(parseNode(node, chalk)).toEqual(chalk.hex(colors.red).bgHex(colors.yellow).bold.underline('hello world'))
  })
})
