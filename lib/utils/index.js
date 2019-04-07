const { verifyState } = require('./verifyState')
const { verifyBadge } = require('./verifyBadge')
const { mapColorNamesToHex } = require('./mapColorNamesToHex')
const { makeFolderIfNotExists } = require('./makeFolderIfNotExists')
const { getRealType } = require('./getRealType')

module.exports = {
  verifyState,
  verifyBadge,
  getRealType,
  mapColorNamesToHex,
  makeFolderIfNotExists,
}
