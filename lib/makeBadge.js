const { BadgeFactory } = require('gh-badges')
const path = require('path')
const fs = require('fs')

const { FOLDER_KEY, FILE_KEY } = require('./constants/defaults')
const { makeFolderIfNotExists } = require('./utils')

const bf = new BadgeFactory()

function makeBadge(badge, state) {
  const svg = bf.create(state)
  makeFolderIfNotExists(badge)

  const folderName = badge[FOLDER_KEY]
  const fileName = `${badge[FILE_KEY]}.${state.format}`

  const currentDirectory = process.cwd()
  const absolutePathToFolder = path.isAbsolute(folderName)
    ? folderName
    : path.resolve(currentDirectory, folderName)
  const absolutePathToFile = path.resolve(absolutePathToFolder, fileName)
  fs.writeFileSync(absolutePathToFile, svg)

  return svg
}

module.exports = {
  makeBadge,
}
