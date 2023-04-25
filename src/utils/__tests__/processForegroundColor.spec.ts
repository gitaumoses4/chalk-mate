import { processForegroundColor } from '../processForegroundColor'

const chalk = require('chalk')

jest.mock('chalk', () => {
  return {
    hex: jest.fn().mockImplementation(hex => `hex-${hex}`),
    rgb: jest.fn().mockImplementation((r, g, b) => `rgb-${r + ',' + g + ',' + b}`)
  }
})

describe('processForegroundColor', function () {
  it('should return the chalk instance if the color is not valid', function () {
    expect(processForegroundColor(chalk, 'invalid')).toEqual(chalk)
  })

  it('should use the color from the tag name', function () {
    expect(processForegroundColor(chalk, 'red')).toEqual('hex-#ff0000')
  })

  it('should use the color from the color value', () => {
    expect(processForegroundColor(chalk, 'text', 'red')).toEqual('hex-#ff0000')
  })

  it('should use color from a hex value', () => {
    expect(processForegroundColor(chalk, 'text', '#ff0000')).toEqual('hex-#ff0000')

    expect(chalk.hex).toHaveBeenCalledWith('#ff0000')
  })

  it('should use color from rgb value', () => {
    expect(processForegroundColor(chalk, 'text', '255, 0, 0')).toEqual('rgb-255,0,0')

    expect(chalk.rgb).toHaveBeenCalledWith(255, 0, 0)
  })

  afterAll(() => {
    jest.restoreAllMocks()
  })
})
