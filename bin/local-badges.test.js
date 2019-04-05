/* global describe it expect jest */
const main = require('./local-badges')

describe('Main function', () => {
  it('should call the init function with process.argv', () => {
    const initMockFunc = jest.fn()
    const noop1 = () => {}
    const noop2 = () => {}
    main(initMockFunc, noop1, noop2)
    expect(initMockFunc).toHaveBeenCalledWith(process.argv, noop1, noop2)
  })
})
