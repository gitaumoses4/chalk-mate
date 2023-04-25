import { processBackgroundColor } from '../processBackgroundColor'

jest.mock('chalk', () => {
  return {
    bgHex: jest.fn().mockImplementation(hex => `bgHex-${hex}`),
    bgRgb: jest.fn().mockImplementation((r, g, b) => `bgRgb-${r + ',' + g + ',' + b}`)
  }
})

const chalk = require('chalk')

describe('processBackgroundColor', function () {
  it('should return the chalk instance when the background is not specified', () => {
    expect(processBackgroundColor(chalk, 'invalid')).toEqual(chalk)
  })

  it('should use the background color from the tag name', () => {
    expect(processBackgroundColor(chalk, 'bg-red')).toEqual('bgHex-#ff0000')
  })

  it('should use the background color from color value', () => {
    expect(processBackgroundColor(chalk, 'blue', 'red')).toEqual('bgHex-#ff0000')
  })

  it('should use the hex background color from a hex value', () => {
    expect(processBackgroundColor(chalk, 'bg-hex', '#ff0000')).toEqual('bgHex-#ff0000')

    expect(chalk.bgHex).toHaveBeenCalledWith('#ff0000')
  })

  it('should use the rgb background color from rgb value', () => {
    expect(processBackgroundColor(chalk, 'bg-rgb', '255, 0, 0')).toEqual('bgRgb-255,0,0')

    expect(chalk.bgRgb).toHaveBeenCalledWith(255, 0, 0)
  })
})
