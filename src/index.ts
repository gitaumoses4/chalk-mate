import { parseNode } from './utils/parseNode'
import { allowSingleQuotes } from './utils/allowSingleQuotes'
import { Options } from 'chalk'
import parse from 'node-html-parser'

const chalk = require('chalk')

/**
 * Create a new instance of chalk-mate with the given chalk options.
 *
 * @example
 * ```
 * import { Instance } from 'chalk-mate';
 * const chalkMate = Instance({ level: 1});
 *
 * const template = '<red>This text will be red</red> <green>This text will be green</green> <blue>This text will be blue</blue>';
 * console.log(chalkMate(template));
 * ```
 *
 * @param options
 * @constructor
 */
export function Instance(options?: Options) {
  const chalkInstance = new chalk.Instance(options)
  return function (template: string) {
    template = allowSingleQuotes(template)

    const parsed = parse(template)

    return parsed.childNodes.map(node => parseNode(node, chalkInstance)).join('')
  }
}

/**
 * Pass a template string to this function, and it will return a string with the colors stripped.
 *
 * @param template
 */
export function stripColors(template: string) {
  return Instance({ level: 0 })(template)
}

/**
 * Pass a template string to this function, and it will return a string with the colors applied.
 *
 * @example
 * ```
 * import chalkMate from 'chalk-mate';
 * const template = '<red>This text will be red</red> <green>This text will be green</green> <blue>This text will be blue</blue>';
 * console.log(chalkMate(template));
 * ```
 *
 * @param template The template string to parse.
 */
function chalkMate(template: string) {
  return Instance()(template)
}

export default chalkMate
