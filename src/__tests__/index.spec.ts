import { Instance } from '../index'
import { colors } from '../utils/colors'

const ChalkInstance = require('chalk').Instance

const chalk = new ChalkInstance({ level: 2 })

const chalkMate = Instance({ level: 2 })

describe('chalkMate', function () {
  it('should handle properties with single quotes', () => {
    expect(
      chalkMate(`<red bg='yellow'>The quick brown fox jumped <green bg="white">over</green> the lazy dogs.</red>`)
    ).toEqual(
      chalk.hex(colors.red).bgHex(colors.yellow)(
        `The quick brown fox jumped ${chalk.hex(colors.green).bgHex(colors.white)(`over`)} the lazy dogs.`
      )
    )
  })

  it('should handle modifiers', () => {
    expect(
      chalkMate(`<red bg='yellow' bold>The quick brown fox jumped <green bg="white">over</green> the lazy dogs.</red>`)
    ).toEqual(
      chalk
        .hex(colors.red)
        .bgHex(colors.yellow)
        .bold(`The quick brown fox jumped ${chalk.hex(colors.green).bgHex(colors.white)(`over`)} the lazy dogs.`)
    )
  })

  it('should handle multiple tags', () => {
    expect(
      chalkMate(
        `<red bg='yellow' bold>The quick brown fox jumped <green bg="white">over</green> the lazy dogs.</red> 
<blue bg="white">The quick brown fox jumped <green bg="white">over</green> the lazy dogs.</blue>`
      )
    ).toEqual(
      chalk
        .hex(colors.red)
        .bgHex(colors.yellow)
        .bold(`The quick brown fox jumped ${chalk.hex(colors.green).bgHex(colors.white)(`over`)} the lazy dogs.`) +
        ' \n' +
        chalk.hex(colors.blue).bgHex(colors.white)(
          `The quick brown fox jumped ${chalk.hex(colors.green).bgHex(colors.white)(`over`)} the lazy dogs.`
        )
    )
  })

  it('should use the not format the text', () => {
    const chalkMate = require('../index').default

    expect(chalkMate(`The quick brown fox jumped over the lazy dogs.`)).toEqual(
      `The quick brown fox jumped over the lazy dogs.`
    )
  })
})

describe('stripColors', function () {
  it('should strip colors', () => {
    const chalkMate = require('../index').stripColors

    expect(
      chalkMate(`<red bg='yellow' bold>The quick brown fox jumped <green bg="white">over</green> the lazy dogs.</red>`)
    ).toEqual(`The quick brown fox jumped over the lazy dogs.`)
  })
})
