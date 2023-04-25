import { HEX_REGEX, RGB_REGEX } from './constants'
import { Chalk } from 'chalk'
import { colors } from './colors'

export function processBackgroundColor(chalk: Chalk, tagName: string, backgroundColor = ''): Chalk {
  backgroundColor = (backgroundColor || '').replace(/\s+/g, '')
  tagName = tagName.trim().toLowerCase()

  if (tagName.startsWith('bg-') && Object.keys(colors).includes(tagName.replace('bg-', ''))) {
    return chalk.bgHex(colors[tagName.replace('bg-', '')])
  }

  if (backgroundColor.match(HEX_REGEX)) {
    return chalk.bgHex(backgroundColor)
  }

  if (backgroundColor.match(RGB_REGEX)) {
    const rgb = backgroundColor.split(',').map(Number) as [number, number, number]
    return chalk.bgRgb(rgb[0], rgb[1], rgb[2])
  }

  if (Object.keys(colors).includes(backgroundColor)) {
    return chalk.bgHex(colors[backgroundColor])
  }

  return chalk
}
