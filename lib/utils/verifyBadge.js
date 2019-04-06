const { FILE_KEY, FOLDER_KEY } = require('../constants/defaults')
const { getRealType } = require('./verifyState')

const has = Object.prototype.hasOwnProperty

function verifyBadge(badge) {
  const typeofBadge = getRealType(badge)
  if (typeofBadge !== 'object') {
    throw new Error(`Badge item must be an object, you provided ${typeofBadge}`)
  }

  if (!has.call(badge, FILE_KEY)) {
    throw new Error(`Badge item is missing a ${FILE_KEY} property`)
  }

  if (!has.call(badge, FOLDER_KEY)) {
    throw new Error(`Badge item is missing a ${FOLDER_KEY} property`)
  }

  return null
}

module.exports = {
  verifyBadge,
}
