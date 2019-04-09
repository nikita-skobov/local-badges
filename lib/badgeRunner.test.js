/* global describe it expect jest */
const {
  DEFAULT_STATE,
  FUNCTION_KEY,
  FOLDER_KEY,
  FILE_KEY,
} = require('./constants/defaults')
const { badgeRunner, overrideState } = require('./badgeRunner')

describe('badgeRunner module', () => {
  describe('overrideState function', () => {
    const inputA = {
      test: 'yes',
      hello: 'world',
      something: 'else',
    }
    const inputB = {
      test: 'no',
      hello: 'world2',
    }
    it('should not modify any of the input arguments', () => {
      const expectedList = [
        { ...inputA },
        { ...inputB },
      ]

      overrideState(inputA, inputB)
      expect([inputA, inputB]).toEqual(expectedList)
    })

    it('should return the inputA if inputB isnt an object', () => {
      const expectedList = [
        { ...inputA },
        { ...inputA },
        { ...inputA },
        { ...inputA },
      ]
      const results = [
        overrideState(inputA, []),
        overrideState(inputA, 5),
        overrideState(inputA, null),
        overrideState(inputA, undefined),
      ]
      expect(results).toEqual(expectedList)
    })

    it('should return an object containing all properties of inputB, and any properties of inputA that arent in inputB', () => {
      const expectedObj = {
        test: 'no',
        hello: 'world2',
        something: 'else',
      }
      const newState = overrideState(inputA, inputB)
      expect(newState).toEqual(expectedObj)
    })
    it('should not copy the FUNCTION_KEY if present in inputB', () => {
      const expectedObj = {
        test: 'no',
        hello: 'world2',
        something: 'else',
      }
      const inputBWithFunctionKey = {
        ...inputB,
        [FUNCTION_KEY]: () => {},
      }
      const newState = overrideState(inputA, inputBWithFunctionKey)
      expect(newState).toEqual(expectedObj)
    })
    it('should not copy the FILE_KEY if present in inputB', () => {
      const expectedObj = {
        test: 'no',
        hello: 'world2',
        something: 'else',
      }
      const inputBWithFileKey = {
        ...inputB,
        [FILE_KEY]: 'some-file',
      }
      const newState = overrideState(inputA, inputBWithFileKey)
      expect(newState).toEqual(expectedObj)
    })
  })

  describe('badgeRunner function', () => {
    const numBadges = 10
    const badges = Array(numBadges).fill({})
    const defaults = { ...DEFAULT_STATE }
    const configObj = { badges, defaults }
    const cliObj = { some: 'cli option' }

    it('should call verifyBadge for each badge in the badge list', () => {
      const verifyBadgeMock = jest.fn()
      badgeRunner(configObj, cliObj, verifyBadgeMock, undefined, undefined, () => {})
      expect(verifyBadgeMock).toHaveBeenCalledTimes(numBadges)
    })
    it('should call verifyState for each badge in the badge list', () => {
      const verifyStateMock = jest.fn()
      badgeRunner(configObj, cliObj, () => {}, verifyStateMock, () => {}, () => {})
      expect(verifyStateMock).toHaveBeenCalledTimes(numBadges)
    })
    it('should call the users badge function with the cliObj if present', () => {
      const mockFunc = jest.fn(() => ({}))
      const configObj2 = {
        defaults,
        badges: [
          {
            [FUNCTION_KEY]: mockFunc,
          },
        ],
      }
      badgeRunner(configObj2, cliObj, () => {}, () => {}, () => {}, () => {})
      expect(mockFunc).toHaveBeenCalledWith(cliObj)
    })
    it('should call the verifyState function with an overidden state if the users badge object contains properties to override', () => {
      const verifyStateMock = jest.fn()
      const configObj3 = {
        defaults,
        badges: [
          {
            colorA: '#fff',
            text: ['this text is different from', 'the default'],
          },
        ],
      }
      badgeRunner(configObj3, cliObj, () => {}, verifyStateMock, undefined, () => {})
      const expectedObj = {
        ...defaults,
        colorA: '#fff',
        text: ['this text is different from', 'the default'],
      }
      expect(verifyStateMock).toHaveBeenCalledWith(expectedObj)
    })
    it('should call the verifyState function with an overidden state if the users badge object has function that override properties', () => {
      const verifyStateMock = jest.fn()
      const configObj3 = {
        defaults,
        badges: [
          {
            colorA: '#fff',
            text: ['this text is different from', 'the default'],
            [FUNCTION_KEY]: () => ({
              colorB: '#aaaaaa',
            }),
          },
        ],
      }
      badgeRunner(configObj3, cliObj, () => {}, verifyStateMock, undefined, () => {})
      const expectedObj = {
        ...defaults,
        colorA: '#fff',
        colorB: '#aaaaaa',
        text: ['this text is different from', 'the default'],
      }
      expect(verifyStateMock).toHaveBeenCalledWith(expectedObj)
    })
    it('should throw an error if the users badge properties create a state that is not valid', () => {
      const configObj4 = {
        defaults,
        badges: [
          {
            [FILE_KEY]: 'some-file',
            [FOLDER_KEY]: 'some-folder/',
            text: 'text must be an array',
          },
        ],
      }
      const func = () => { badgeRunner(configObj4, cliObj) }
      expect(func).toThrowError('Invalid type for key: text')
    })
    it('should throw an error if the users badge function returns a state that is not valid', () => {
      const configObj5 = {
        defaults,
        badges: [
          {
            [FILE_KEY]: 'some-file',
            [FOLDER_KEY]: 'some-folder/',
            text: ['this', 'is valid'],
            [FUNCTION_KEY]: () => ({
              text: ['this', 'is', 'not', 'valid'], // because more than 2 elements
            }),
          },
        ],
      }
      const func = () => { badgeRunner(configObj5, cliObj) }
      expect(func).toThrowError('Invalid text array')
    })
    it('should call the mapColorNames function with the state', () => {
      const configObj6 = {
        defaults,
        badges: [
          {
            [FILE_KEY]: 'some-file',
          },
        ],
      }
      const mapColorNamesMock = jest.fn()
      badgeRunner(configObj6, cliObj, undefined, undefined, mapColorNamesMock, () => {})
      expect(mapColorNamesMock).toHaveBeenCalledWith(defaults)
    })
    it('should call the makeBadgeFunc with the badge and the badge state', () => {
      const badgeObj = {
        [FILE_KEY]: 'some-file',
      }
      const state = {
        colorA: '#aaa',
        colorB: '#bbb',
        format: 'svg',
        template: 'flat',
        text: ['a', 'b'],
        [FOLDER_KEY]: './',
      }
      const configObj7 = {
        defaults: state,
        badges: [badgeObj],
      }
      const makeBadgeMock = jest.fn()
      badgeRunner(configObj7, cliObj, undefined, undefined, undefined, makeBadgeMock)
      expect(makeBadgeMock).toHaveBeenCalledWith(badgeObj, state)
    })
  })
})
