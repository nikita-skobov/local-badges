/* global describe it expect afterEach */

const fs = require('fs')

const { FILE_KEY, FOLDER_KEY } = require('./constants/defaults')
const { makeBadge } = require('./makeBadge')

describe('makeBadge function', () => {
  afterEach(() => {
    fs.unlinkSync('testFolder/someOtherFolder/badge-name.svg')
    fs.rmdirSync('testFolder/someOtherFolder')
  })

  const fileExists = (path) => {
    try {
      fs.statSync(path)
      return true
    } catch (e) {
      // throws error if path does not exist
      return false
    }
  }

  it('should create a badge and write it to file', () => {
    makeBadge({
      [FILE_KEY]: 'badge-name',
    }, {
      [FOLDER_KEY]: 'testFolder/someOtherFolder',
      format: 'svg',
      template: 'plastic',
      colorA: '#fff',
      colorB: '#a1a',
      text: ['heyooo', 'we have a badge!'],
    })
    expect(fileExists('testFolder/someOtherFolder/badge-name.svg')).toEqual(true)
  })

  it('should return an svg output', () => {
    expect(makeBadge({
      [FILE_KEY]: 'badge-name',
    }, {
      [FOLDER_KEY]: 'testFolder/someOtherFolder',
      format: 'svg',
      template: 'for-the-badge',
      colorA: '#faf',
      colorB: '#bebebe',
      text: ['woohoo!', 'Badge!'],
    })).toEqual(expect.stringMatching('<svg'))
  })
})
