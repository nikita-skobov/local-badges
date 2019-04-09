const { FILE_KEY } = require('../constants/defaults')
const { getRealType } = require('./getRealType')

const has = Object.prototype.hasOwnProperty

function verifyBadge(badge) {
  const typeofBadge = getRealType(badge)
  if (typeofBadge !== 'object') {
    throw new Error(`Badge item must be an object, you provided ${typeofBadge}`)
  }

  if (!has.call(badge, FILE_KEY)) {
    throw new Error(`Badge item is missing a ${FILE_KEY} property`)
  }

  return null
}

module.exports = {
  verifyBadge,
}
