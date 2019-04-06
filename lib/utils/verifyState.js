const { DEFAULT_STATE } = require('../constants/defaults')
const { allColorWords } = require('../constants/colorWords')

function getRealType(item) {
  let itemType = typeof item
  if (itemType === 'object') {
    if (Array.isArray(item)) {
      itemType = 'array'
    } else if (item === null) {
      itemType = 'null'
    }
  }
  return itemType
}

const typeTree = {}
Object.keys(DEFAULT_STATE).forEach((key) => {
  typeTree[key] = getRealType(DEFAULT_STATE[key])
})

function isValidColor(colorString) {
  // check from a list of valid badge colors
  if (allColorWords.indexOf(colorString) !== -1) {
    return true
  }

  // should implement rgb(), rgba(), hsl(), and hsla()
  // verification here, but too lazy for now.

  // check if valid 3-char or 6-char hex string
  const validHexString = (str, len) => {
    const regexp = new RegExp(`^#[0-9A-F]{${len}}$`, 'i')
    return regexp.test(str)
  }
  let str = colorString
  if (str.length === 3 || str.length === 6) {
    str = `#${str}`
  }
  if (str.charAt(0) === '#' && (str.length === 4 || str.length === 7)) {
    return validHexString(str, str.length - 1)
  }

  // otherwise its false.
  return false
}

function isValidText(textArray) {
  const isLength2 = textArray.length === 2
  const allElementsAreStrings = textArray.every(element => getRealType(element) === 'string')
  return isLength2 && allElementsAreStrings
}


function verifyState(state, colorValidFunc = isValidColor, textValidFunc = isValidText) {
  if (!(state instanceof Object)) {
    throw new Error(`Invalid argument to verify state: ${state} is a ${typeof state}, must be an object`)
  }

  // used to check if state argument has every single property that
  // the default state has
  const hasTree = {}
  Object.keys(DEFAULT_STATE).forEach((key) => {
    hasTree[key] = 0
  })

  Object.keys(state).forEach((key) => {
    hasTree[key] = 1
    const typeofStateKey = getRealType(state[key])
    if (typeofStateKey !== typeTree[key]) {
      throw new Error(`Invalid type for key: ${key}. type is ${typeofStateKey} but should be ${typeTree[key]}`)
    }
  })

  Object.keys(hasTree).forEach((key) => {
    if (hasTree[key] === 0) {
      throw new Error(`State is missing property: ${key}`)
    }
  })

  // unique verification steps. if DEFAULT_STATE changes,
  // this will need to change as well.
  const checkColor = (colorName) => {
    if (!colorValidFunc(state[colorName])) {
      throw new Error(`Invalid color: ${state[colorName]} for ${colorName}`)
    }
  }
  checkColor('colorA')
  checkColor('colorB')

  if (!textValidFunc(state.text)) {
    throw new Error(`Invalid text array: ${JSON.stringify(state.text)}`)
  }

  return null
}

module.exports = {
  verifyState,
  isValidColor,
  isValidText,
  typeTree,
  getRealType,
}
