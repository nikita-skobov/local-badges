const { verifyState } = require('./verifyState')
const { verifyBadge } = require('./verifyBadge')
const { mapColorNamesToHex } = require('./mapColorNamesToHex')
const { makeFolderIfNotExists } = require('./makeFolderIfNotExists')

module.exports = {
  verifyState,
  verifyBadge,
  mapColorNamesToHex,
  makeFolderIfNotExists,
}
