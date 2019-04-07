/* global expect it describe jest */

const { allColorWords } = require('../constants/colorWords')
const { DEFAULT_STATE } = require('../loadConfig')
const {
  verifyState,
  isValidColor,
  isValidText,
} = require('./verifyState')

describe('verifyState module', () => {
  describe('isValidColor function', () => {
    const makeHexString = (n) => {
      let length = n
      const chars = '0123456789ABCDEF'
      let str = ''
      while (length > 0) {
        // eslint-disable-next-line
        str += chars[(Math.random() * 16) | 0]
        length -= 1
      }
      return str
    }

    it('should return true for any color in the colorWords list', () => {
      const expectedResponses = Array(allColorWords.length).fill(true)
      const responses = []
      allColorWords.forEach((color) => {
        responses.push(isValidColor(color))
      })

      expect(responses).toEqual(expectedResponses)
    })
    it('should return false for a hex string that isnt 3 or 6 characters', () => {
      expect(isValidColor('aaabbbc')).toEqual(false)
    })
    it('should return true for any valid 3char hex string, regardless of case and having # or not', () => {
      let tryN = 20
      const responses = []
      const expectedResponses = Array(tryN * 4).fill(true)
      while (tryN > 0) {
        const hexStr = makeHexString(3)
        const hexStrHash = `#${hexStr}`
        const hexStrLower = hexStr.toLowerCase()
        const hexStrLowerHash = `#${hexStrLower}`
        responses.push(isValidColor(hexStr))
        responses.push(isValidColor(hexStrLower))
        responses.push(isValidColor(hexStrHash))
        responses.push(isValidColor(hexStrLowerHash))
        tryN -= 1
      }
      expect(responses).toEqual(expectedResponses)
    })
    it('should return true for any valid 6char hex string, regardless of case and having # or not', () => {
      let tryN = 20
      const responses = []
      const expectedResponses = Array(tryN * 4).fill(true)
      while (tryN > 0) {
        const hexStr = makeHexString(6)
        const hexStrHash = `#${hexStr}`
        const hexStrLower = hexStr.toLowerCase()
        const hexStrLowerHash = `#${hexStrLower}`
        responses.push(isValidColor(hexStr))
        responses.push(isValidColor(hexStrLower))
        responses.push(isValidColor(hexStrHash))
        responses.push(isValidColor(hexStrLowerHash))
        tryN -= 1
      }
      expect(responses).toEqual(expectedResponses)
    })
  })

  describe('isValidText function', () => {
    it('should return true if length is 2, and elements are strings', () => {
      expect(isValidText(['dsa', ' 321 321321 321'])).toEqual(true)
    })
    it('should return false if array has more or less than 2 elements', () => {
      const results = []
      const expectedResults = [false, false, false]
      results.push(
        isValidText([]),
        isValidText(['d']),
        isValidText(['dsa', 'dsa', 'dsa']),
      )
      expect(results).toEqual(expectedResults)
    })
    it('should return false if one or more of the elements in array arent strings', () => {
      const results = []
      const expectedResults = [false, false, false]
      results.push(
        isValidText([1, 'dsa']),
        isValidText([null, 'dsa']),
        isValidText(['dsa', []]),
      )
      expect(results).toEqual(expectedResults)
    })
  })

  describe('verify state function', () => {
    it('should return null on a valid state object', () => {
      expect(verifyState(DEFAULT_STATE)).toBeNull()
    })
    it('should throw an error on an invalid state argument', () => {
      const func = () => { verifyState(7) }
      expect(func).toThrowError('Invalid argument')
    })
    it('should throw an error if one of the state properties doesnt match the type tree', () => {
      const invalidState = {
        ...DEFAULT_STATE,
        colorA: 5,
      }
      const func = () => { verifyState(invalidState) }
      expect(func).toThrowError('Invalid type for key: colorA.')
    })
    it('should throw an error if the state object is missing required properties', () => {
      const invalidState = {
        ...DEFAULT_STATE,
      }
      delete invalidState.colorA
      const func = () => { verifyState(invalidState) }
      expect(func).toThrowError('State is missing property: colorA')
    })
    it('should call the isValidColor function twice on a valid state (once for colorA, once for colorB)', () => {
      const isValidColorMock = jest.fn(() => true)
      verifyState(DEFAULT_STATE, isValidColorMock)
      expect(isValidColorMock).toHaveBeenCalledTimes(2)
    })
    it('should call the isValidText function once', () => {
      const isValidTextMock = jest.fn(() => true)
      verifyState(DEFAULT_STATE, undefined, isValidTextMock)
      expect(isValidTextMock).toHaveBeenCalledTimes(1)
    })
    it('should throw an error if using an invalid format', () => {
      const invalidState = {
        ...DEFAULT_STATE,
        format: 'txt',
      }
      const func = () => { verifyState(invalidState) }
      expect(func).toThrowError('Invalid format')
    })
    it('should throw an error if using an invalid template', () => {
      const invalidState = {
        ...DEFAULT_STATE,
        template: 'my-custom-template',
      }
      const func = () => { verifyState(invalidState) }
      expect(func).toThrowError('Invalid template')
    })
  })
})
