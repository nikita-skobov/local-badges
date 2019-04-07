/* global describe it expect afterEach */
const fs = require('fs')
const path = require('path')

const { FOLDER_KEY } = require('../constants/defaults')
const { makeFolderIfNotExists } = require('./makeFolderIfNotExists')

describe('makeFolderIfNotExists function', () => {
  const originalDir = process.cwd()
  const absolutePath = path.resolve(originalDir, 'testFolder/someFolderName')

  afterEach(() => {
    process.chdir(originalDir)
    fs.rmdirSync('./testFolder/someFolderName/')
  })

  const checkDirectory = (dirname) => {
    try {
      fs.statSync(dirname)
      return true
    } catch (e) {
      // statSync throws error if dir does not exist
      return false
    }
  }

  it('should create a folder from a folder name if one does not exist', () => {
    process.chdir('testFolder')
    makeFolderIfNotExists({
      [FOLDER_KEY]: 'someFolderName',
    })
    expect(checkDirectory('someFolderName')).toEqual(true)
  })
  it('should create a folder from a relative path if one does not exist', () => {
    process.chdir('./lib/utils')
    makeFolderIfNotExists({
      [FOLDER_KEY]: '../../testFolder/someFolderName',
    })
    expect(checkDirectory('../../testFolder/someFolderName')).toEqual(true)
  })
  it('should create a folder from an absolute path if one does not exist', () => {
    makeFolderIfNotExists({
      [FOLDER_KEY]: absolutePath,
    })
    expect(checkDirectory(absolutePath)).toEqual(true)
  })
  it('should return false if the folder already exists', () => {
    fs.mkdirSync(absolutePath)
    expect(makeFolderIfNotExists({
      [FOLDER_KEY]: absolutePath,
    })).toEqual(false)
  })
})
