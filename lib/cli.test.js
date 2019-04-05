/* global expect describe it jest */

const { parseCommandLineArguments, init } = require('./cli')

describe('The CLI:', () => {
  const argList = [
    'node.exe', 'myFileName.js', 'extra', 'words',
    '--something', 'test phrase', '--something-else', 'test2',
    '-c', '6', '-d', '-q', '--r',
  ]
  const cliObj = {
    something: 'test phrase',
    'something-else': 'test2',
    c: '6',
    d: true,
    q: true,
    r: true,
    _: ['extra', 'words'],
  }

  describe('CLI parsing function', () => {
    it('should return an object created from command line arguments', () => {
      const cliObjTest = parseCommandLineArguments([...argList])
      expect(cliObjTest).toEqual(cliObj)
    })

    it('should throw an error if user provides multiple argument names', () => {
      // because every argument that the user passes in will be available as a
      // key in a cliOptions object, so you cannot override keys
      const modifiedArgList = [...argList, '-something-else', 'appears again']
      const func = () => {
        parseCommandLineArguments([...modifiedArgList])
      }

      expect(func).toThrowError('Duplicate')
    })
  })

  describe('CLI initialization function', () => {
    it('should call the parsing function', () => {
      const mockParsingFunc = jest.fn()
      const someOtherFunc = () => {}
      init([...argList], mockParsingFunc, someOtherFunc)
      expect(mockParsingFunc).toHaveBeenCalled()
    })

    it('should call the next function with the cliObj if successfully parsed', () => {
      const nextFunc = jest.fn()
      init([...argList], parseCommandLineArguments, nextFunc)
      expect(nextFunc).toHaveBeenCalledWith(cliObj)
    })

    it('should exit with code 1 if theres an error', () => {
      const mockExit = jest.spyOn(process, 'exit').mockImplementation(() => {})
      const nextFunc = jest.fn()
      const modifiedArgList = [...argList, '-something-else', 'appears again']

      init([...modifiedArgList], parseCommandLineArguments, nextFunc)
      expect(mockExit).toHaveBeenCalledWith(1)
    })
  })
})
