import { processTag } from '../processTag'
import * as processBackgroundColor from '../processBackgroundColor'
import * as processForegroundColor from '../processForegroundColor'

class ChalkInstance {
  level = 1
  modifiers: Array<string> = []

  public get red() {
    return this
  }

  public get bold() {
    this.modifiers.push('bold')
    return this
  }

  public get underline() {
    this.modifiers.push('underline')
    return this
  }
}

const chalkInstance = new ChalkInstance()

const chalk = require('chalk')

jest.mock('chalk', () => {
  return {
    Instance: jest.fn().mockImplementation(() => chalkInstance)
  }
})

describe('processTag', function () {
  let processForegroundColorSpy
  let processBackgroundColorSpy

  beforeEach(() => {
    processForegroundColorSpy = jest
      .spyOn(processForegroundColor, 'processForegroundColor')
      .mockReturnValue(chalkInstance as any)
    processBackgroundColorSpy = jest
      .spyOn(processBackgroundColor, 'processBackgroundColor')
      .mockReturnValue(chalkInstance as any)
  })

  it('should always process the foreground color', () => {
    processTag('red', {}, chalkInstance as any)

    expect(processForegroundColorSpy).toHaveBeenCalledWith(chalkInstance, 'red', '')
  })

  it('should process the background color if there are attributes', () => {
    processTag('red', { bg: 'red' }, chalkInstance as any)

    expect(processBackgroundColorSpy).toHaveBeenCalledWith(chalkInstance, 'red')
  })

  it('should process allowed modifiers if there are attributes', () => {
    processTag('red', { bg: 'red', bold: true, underline: true }, chalk)

    expect(chalkInstance.modifiers).toEqual(['bold', 'underline'])
  })

  it('should process modifier as the tag name', () => {
    processTag('bold', {}, chalk)

    expect(chalkInstance.modifiers).toEqual(['bold'])
  })

  afterEach(() => {
    chalkInstance.modifiers = []
    processForegroundColorSpy.mockRestore()
    processBackgroundColorSpy.mockRestore()
  })
})
