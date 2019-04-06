/* global describe it expect */
const { FILE_KEY, FOLDER_KEY } = require('../constants/defaults')
const { verifyBadge } = require('./verifyBadge')

describe('verifyBadge function', () => {
  it('should throw an error if missing FILE_KEY property', () => {
    const func = () => {
      verifyBadge({
        [FOLDER_KEY]: './someFolder/',
      })
    }
    expect(func).toThrowError(`Badge item is missing a ${FILE_KEY} property`)
  })
  it('should throw an error if missing FOLDER_KEY property', () => {
    const func = () => {
      verifyBadge({
        [FILE_KEY]: 'my-badge-name',
      })
    }
    expect(func).toThrowError(`Badge item is missing a ${FOLDER_KEY} property`)
  })
  it('should throw an error if badge is not an object', () => {
    const func = () => { verifyBadge(7) }
    expect(func).toThrowError('Badge item must be an object')
  })
  it('should return null if badge is valid', () => {
    const validBadge = {
      [FOLDER_KEY]: './someFolder/',
      [FILE_KEY]: 'my-badge-name',
    }
    expect(verifyBadge(validBadge)).toBe(null)
  })
})
