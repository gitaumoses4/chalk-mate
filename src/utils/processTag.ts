import { Chalk } from 'chalk'
import { ALLOWED_MODIFIERS } from './constants'
import { Attributes } from '../types'
import { processBackgroundColor } from './processBackgroundColor'
import { processForegroundColor } from './processForegroundColor'

export function processTag(tagName: string, attributes: Attributes, chalk: Chalk) {
  chalk = processForegroundColor(chalk, tagName, attributes)

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
