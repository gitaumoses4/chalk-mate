import { parseNode } from '../parseNode'
import { colors } from '../colors'

const { Instance } = require('chalk')

const chalk = new Instance({ level: 1 })

describe('parseNode', function () {
  it('should return the text from a text node', () => {
    const text = 'text'
    expect(parseNode({ type: 'text', text }, chalk)).toEqual(text)
  })

  it('should parse html entities from a text node', () => {
    const text = '&lt;tag&gt;'
    expect(parseNode({ type: 'text', text }, chalk)).toEqual('<tag>')
  })

  it('should parse child nodes from an element', () => {
    const node = {
      type: 'element',
      tagName: 'tag',
      childNodes: [
        { type: 'text', text: 'hello' },
        {
          type: 'element',
          tagName: 'tag',
          childNodes: [{ type: 'text', text: ' ' }]
        },
        { type: 'text', text: 'world' }
      ]
    }

    expect(parseNode(node, chalk)).toEqual('hello world')
  })

  it('should process tags an apply the styles', () => {
    const node = {
      type: 'element',
      tagName: 'red',
      childNodes: [{ type: 'text', text: 'hello world' }],
      attributes: {
        bold: true,
        underline: true,
        bg: 'yellow'
      }
    }

    expect(parseNode(node, chalk)).toEqual(chalk.hex(colors.red).bgHex(colors.yellow).bold.underline('hello world'))
  })
})
