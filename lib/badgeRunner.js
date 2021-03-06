const {
  FUNCTION_KEY,
  FILE_KEY,
} = require('./constants/defaults')
const {
  verifyBadge,
  verifyState,
  getRealType,
  mapColorNamesToHex,
} = require('./utils')
const { makeBadge } = require('./makeBadge')

const has = Object.prototype.hasOwnProperty

function overrideState(originalState, newState) {
  const tempState = { ...originalState }

  if (getRealType(newState) === 'object') {
    Object.keys(newState).forEach((key) => {
      if (key !== FUNCTION_KEY && key !== FILE_KEY) {
        tempState[key] = newState[key]
      }
    })
  }
  return tempState
}

function badgeRunner(
  configObj,
  cliObj,
  verifyBadgeFunc = verifyBadge,
  verifyStateFunc = verifyState,
  mapColorNames = mapColorNamesToHex,
  makeBadgeFunc = makeBadge,
) {
  const defaultState = { ...configObj.defaults }
  const { badges } = configObj

  badges.forEach((badge) => {
    verifyBadgeFunc(badge) // throws err if missing required properties

    let badgeState = overrideState(defaultState, badge)
    const hasFunction = has.call(badge, FUNCTION_KEY)
    const functionIsFunction = typeof badge[FUNCTION_KEY] === 'function'

    if (hasFunction && functionIsFunction) {
      const func = badge[FUNCTION_KEY]
      // this is where the users badge function gets called
      badgeState = overrideState(badgeState, func({ ...cliObj }))
    }

    // regardless of whether or not the user provided a function,
    // we will verify the new badgeState to make sure all of the properties
    // are valid, and then use the gh-badges library to generate the badge
    verifyStateFunc(badgeState)
    badgeState = mapColorNames(badgeState)
    makeBadgeFunc(badge, badgeState)
  })
}

module.exports = {
  badgeRunner,
  overrideState,
}
