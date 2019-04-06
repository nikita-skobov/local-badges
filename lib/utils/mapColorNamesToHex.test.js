/* global describe it expect */
const { DEFAULT_STATE } = require('../constants/defaults')
const { allColorMap, allColorWords } = require('../constants/colorWords')
const { mapColorNamesToHex } = require('./mapColorNamesToHex')

describe('mapColorNamesToHex function', () => {
  it('should return state as is if colorA, colorB already hex', () => {
    const state = {
      ...DEFAULT_STATE,
      colorA: '#aaa',
      colorB: '#bbb',
    }
    expect(mapColorNamesToHex(state)).toEqual(state)
  })
  it('should prepend a # to the colors if they are not in hex', () => {
    const state = {
      ...DEFAULT_STATE,
      colorA: 'aaa',
      colorB: 'bbb',
    }
    const expectedState = {
      ...DEFAULT_STATE,
      colorA: '#aaa',
      colorB: '#bbb',
    }
    expect(mapColorNamesToHex(state)).toEqual(expectedState)
  })
  it('should map the colors to the correct hex code if they are in the allColorMap object', () => {
    const wordLength = allColorWords.length
    const randomWord = allColorWords[Math.floor(Math.random() * wordLength)]

    const state = {
      ...DEFAULT_STATE,
      colorA: randomWord,
      colorB: randomWord,
    }
    const expectedState = {
      ...DEFAULT_STATE,
      colorA: allColorMap[randomWord],
      colorB: allColorMap[randomWord],
    }
    expect(mapColorNamesToHex(state)).toEqual(expectedState)
  })
})
