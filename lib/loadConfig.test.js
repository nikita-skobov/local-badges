/* global describe it expect jest beforeEach afterEach */

const path = require('path')

const {
  DEFAULT_CONFIG_NAME,
  DEFAULT_STATE,
} = require('./constants/defaults')

const {
  loadConfig,
  loadModule,
  isFile,
  hasBadges,
} = require('./loadConfig')

const exampleConfig = require('../exampleConfig')
const testConfig = require('../testFolder/testConfig')

describe('Configuration loader', () => {
  const cliObj = {
    something: 'yes',
    _: ['extra', 'words'],
  }
  const modifiedCliObj = {
    ...cliObj,
    config: DEFAULT_CONFIG_NAME,
  }
  const noop = () => {}

  describe('hasBadges verification function', () => {
    it('should return false if configObj doesnt have "badges" property', () => {
      expect(hasBadges({ })).toBe(false)
    })
    it('should return false if the configObj.badges is not an array', () => {
      expect(hasBadges({ badges: 7 })).toBe(false)
    })
    it('should return false if configObj.badges doesnt have any badges', () => {
      expect(hasBadges({ badges: [] })).toBe(false)
    })
    it('should return true if configObj.badges is an array that isnt empty', () => {
      expect(hasBadges({ badges: [{}] })).toBe(true)
    })
  })

  describe('isFile function', () => {
    const originalDir = process.cwd()
    const absolutePathToTestConfig = path.resolve(originalDir, 'testFolder/testConfig.js')
    const absoluteFakePath = path.resolve(originalDir, 'blah/blah/blah.js')
    const absoluteDirectory = path.resolve(originalDir, 'testFolder/')
    it('should return true if the file exists', () => {
      expect(isFile(absolutePathToTestConfig)).toBe(true)
    })
    it('should return false if the file doesnt exist', () => {
      expect(isFile(absoluteFakePath)).toBe(false)
    })
    it('should return false if the file string is a directory', () => {
      expect(isFile(absoluteDirectory)).toBe(false)
    })
  })

  describe('load module function', () => {
    // i believe jest automatically sets the current working directory to the root
    // of the repo (where the package.json file is located). But just
    // in case, these tests should be ran from the root of the directory
    const originalDir = process.cwd()
    const absolutePathToTestConfig = path.resolve(originalDir, 'testFolder/testConfig.js')

    afterEach(() => {
      process.chdir(originalDir)
    })

    it('should throw an error if it cannot find the module', () => {
      const func = () => { loadModule({ config: 'someFile.js' }) }
      expect(func).toThrowError('unable to resolve')
    })
    it('should return an object if the file exists from a filename if in same directory', () => {
      process.chdir('testFolder')
      const retVal = loadModule({
        config: 'testConfig.js',
      })
      expect(retVal).toEqual(testConfig)
    })
    it('should return an object if the file exists from a relative path', () => {
      process.chdir('testFolder')
      const retVal = loadModule({
        config: '../exampleConfig.js',
      })
      expect(retVal).toEqual(exampleConfig)
    })
    it('should return an object if the file exists from an absolute path', () => {
      process.chdir('../../../')
      const retVal = loadModule({
        config: absolutePathToTestConfig,
      })
      expect(retVal).toEqual(testConfig)
    })
    it('should throw an error if the config name is a directory', () => {
      const func = () => { loadModule({ config: 'testFolder/' }) }
      expect(func).toThrowError('unable to resolve')
    })
  })

  describe('main loading function', () => {
    let loadModuleMock

    beforeEach(() => {
      // returns valid config module
      loadModuleMock = jest.fn(() => ({ badges: [{}] }))
    })

    it('should call a require/import function to actually import the file', () => {
      loadConfig(cliObj, loadModuleMock, noop)
      expect(loadModuleMock).toHaveBeenCalled()
    })

    it('should set the default config file name if no --config option is provided', () => {
      loadConfig(cliObj, loadModuleMock, noop)
      expect(loadModuleMock).toHaveBeenCalledWith(modifiedCliObj)
    })

    it('should call the badge runner with the default state if the config file doesnt have the "defaults" property', () => {
      const badgeRunnerMock = jest.fn()
      const expectedObj = {
        badges: [{}],
        defaults: DEFAULT_STATE,
      }
      loadConfig(modifiedCliObj, loadModuleMock, badgeRunnerMock)
      expect(badgeRunnerMock).toHaveBeenCalledWith(expectedObj, modifiedCliObj)
    })

    it('should exit with code 0 if no badges are found in the configuration', () => {
      const mockExit = jest.spyOn(process, 'exit').mockImplementation(() => {})
      const loadModuleMockWithNoBadges = jest.fn(() => ({ }))
      loadConfig(modifiedCliObj, loadModuleMockWithNoBadges, noop)
      expect(mockExit).toHaveBeenCalledWith(0)
    })

    it('should override the default state with any options present in the config file', () => {
      const loadModuleMockWithDefaults = () => ({ badges: [{}], defaults: { format: 'png' } })
      const badgeRunnerMock = jest.fn()
      loadConfig(modifiedCliObj, loadModuleMockWithDefaults, badgeRunnerMock)
      const overrodeDefaults = {
        badges: [{}],
        defaults: {
          ...DEFAULT_STATE,
          format: 'png',
        },
      }
      expect(badgeRunnerMock).toHaveBeenCalledWith(overrodeDefaults, modifiedCliObj)
    })

    it('[ALTERNATE] should override the default state with any options present in the config file', () => {
      const loadModuleMockWithDefaults = () => ({ badges: [{}], defaults: { text: ['something', 'else'], colorA: 'purple' } })
      const badgeRunnerMock = jest.fn()
      loadConfig(modifiedCliObj, loadModuleMockWithDefaults, badgeRunnerMock)
      const overrodeDefaults = {
        badges: [{}],
        defaults: {
          ...DEFAULT_STATE,
          text: ['something', 'else'],
          colorA: 'purple',
        },
      }
      expect(badgeRunnerMock).toHaveBeenCalledWith(overrodeDefaults, modifiedCliObj)
    })
  })
})
