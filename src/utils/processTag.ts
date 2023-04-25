import { Chalk } from 'chalk'
import { ALLOWED_MODIFIERS } from './constants'
import { processBackgroundColor } from './processBackgroundColor'
import { processForegroundColor } from './processForegroundColor'

export function processTag(tagName: string, attributes: any = {}, chalk: Chalk) {
  chalk = processForegroundColor(chalk, tagName, (attributes.color || '').trim().toLowerCase())
  chalk = processBackgroundColor(chalk, tagName, (attributes.bg || '').trim().toLowerCase())

  for (const modifier of ALLOWED_MODIFIERS) {
    if (attributes[modifier]) {
      chalk = chalk[modifier]
    }
  }

  if (ALLOWED_MODIFIERS.includes(tagName)) {
    chalk = chalk[tagName]
  }

  return chalk
}
