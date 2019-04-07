const path = require('path')
const fs = require('fs')

const { FOLDER_KEY } = require('../constants/defaults')

function makeFolderIfNotExists(badge) {
  const currentDirectory = process.cwd()

  const folderName = badge[FOLDER_KEY]

  const absolutePath = path.isAbsolute(folderName)
    ? folderName
    : path.resolve(currentDirectory, folderName)

  try {
    fs.statSync(absolutePath)
    return false
  } catch (e) {
    fs.mkdirSync(absolutePath)
    return true
  }
}

module.exports = {
  makeFolderIfNotExists,
}
