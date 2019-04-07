/* global describe expect it */

const { getRealType } = require('./getRealType')

describe('get real type function', () => {
  it('should return "object" for an object', () => {
    const obj = {}
    expect(getRealType(obj)).toEqual('object')
  })
  it('should return "array" for an array', () => {
    const arr = []
    expect(getRealType(arr)).toEqual('array2')
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
