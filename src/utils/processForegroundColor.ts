import { Chalk } from 'chalk'
import { HEX_REGEX, RGB_REGEX } from './constants'
import { colors } from './colors'

export function processForegroundColor(chalk: Chalk, tagName: string, color?: string): Chalk {
  color = (color || '').replace(/\s+/g, '')
  tagName = tagName.trim().toLowerCase()

  if (Object.keys(colors).includes(tagName)) {
    return chalk.hex(colors[tagName])
  }

  if (color.match(HEX_REGEX)) {
    return chalk.hex(color)
  }

  if (color.match(RGB_REGEX)) {
    const rgb = color.split(',').map(Number) as [number, number, number]
    return chalk.rgb(rgb[0], rgb[1], rgb[2])
  }

  if (Object.keys(colors).includes(color)) {
    return chalk.hex(colors[color])
  }

  return chalk
}
