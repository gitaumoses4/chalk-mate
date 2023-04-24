import { Chalk } from 'chalk'
import { ALLOWED_MODIFIERS } from './constants'
import { processBackgroundColor } from './processBackgroundColor'
import { processForegroundColor } from './processForegroundColor'

export function processTag(tagName: string, attributes: any, chalk: Chalk) {
  chalk = processForegroundColor(chalk, tagName, (attributes.value || '').trim().toLowerCase())

  if (Object.keys(attributes).length) {
    chalk = processBackgroundColor(chalk, (attributes.bg || '').trim().toLowerCase())

    for (const modifier of ALLOWED_MODIFIERS) {
      if (attributes[modifier]) {
        chalk = chalk[modifier]
      }
    }
  }

  if (ALLOWED_MODIFIERS.includes(tagName)) {
    chalk = chalk[tagName]
  }

  return chalk
}
