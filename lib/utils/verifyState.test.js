/* global expect it describe jest */

const { allColorWords } = require('../constants/colorWords')
const { DEFAULT_STATE } = require('../loadConfig')
const { verifyState, isValidColor, getRealType } = require('./verifyState')

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

  describe('get real type function', () => {
    it('should return "object" for an object', () => {
      const obj = {}
      expect(getRealType(obj)).toEqual('object')
    })
    it('should return "array" for an array', () => {
      const arr = []
      expect(getRealType(arr)).toEqual('array')
    })
    it('should return "string" for a string', () => {
      const str = 'dsa'
      expect(getRealType(str)).toEqual('string')
    })
    it('should return "null" for null', () => {
      const nul = null
      expect(getRealType(nul)).toEqual('null')
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
        color: 5,
      }
      const func = () => { verifyState(invalidState) }
      expect(func).toThrowError('Invalid type for key: color.')
    })
    it('should throw an error if the state object is missing required properties', () => {
      const invalidState = {
        ...DEFAULT_STATE,
      }
      delete invalidState.format
      const func = () => { verifyState(invalidState) }
      expect(func).toThrowError('State is missing property: format')
    })

  })
})
